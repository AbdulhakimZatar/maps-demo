import React from "react";
import { Map, Polygon, GoogleApiWrapper } from "google-maps-react";
import togeojson from "@mapbox/togeojson";
import { averageGeolocation } from "../helper";
export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      areas: [],
      zoom: 8,
      poly: [],
      center: {
        lng: 0,
        lat: 0,
      },
    };
  }

  componentDidMount() {
    fetch("/files/test.kml")
      .then((res) => res.text())
      .then(async (kml) => {
        const parser = new DOMParser();
        const kmlDoc = parser.parseFromString(kml, "text/xml");
        const json = togeojson.kml(kmlDoc);
        this.setState({
          areas: json.features,
          poly: json.features.map((area, index) => {
            if (index === 0) {
              this.setState({
                center: {
                  lng: area.geometry.coordinates[0][0][0],
                  lat: area.geometry.coordinates[0][0][1],
                },
              });
            }
            return area.geometry.coordinates[0].map((coord) => {
              return { lat: coord[1], lng: coord[0] };
            });
          }),
        });
      });
  }

  componentDidUpdate(prevProps) {
    if (
      this.state.areas[0] &&
      prevProps.selectedProject !== this.props.selectedProject
    ) {
      const areaCenter = averageGeolocation(
        this.state.areas[
          this.props.selectedProject.id
        ].geometry.coordinates[0].map((coord) => {
          return { lat: coord[1], lng: coord[0] };
        })
      );
      this.setState({
        center: {
          lng: areaCenter.lng,
          lat: areaCenter.lat,
        },
        zoom: 10,
      });
    }
  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={this.state.zoom}
        center={this.state.center}
      >
        {this.state.poly.map((coord, index) => {
          return (
            <Polygon
              key={index}
              paths={coord}
              strokeColor="#0000FF"
              strokeOpacity={0.8}
              strokeWeight={2}
              fillColor="#0000FF"
              fillOpacity={0.35}
              onClick={() => {
                alert(`Polygon ${index} clicked`);
              }}
            />
          );
        })}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API,
})(MapContainer);
