import React from "react";
import { Map, Polygon, GoogleApiWrapper } from "google-maps-react";
import togeojson from "@mapbox/togeojson";
import { averageGeolocation, getBounds, getBoundsZoomLevel } from "../helpers";
export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
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
        const initalCenter = averageGeolocation(
          json.features.map((feature) => {
            return averageGeolocation(
              feature.geometry.coordinates[0].map((coord) => {
                return { lat: coord[1], lng: coord[0] };
              })
            );
          })
        );

        const bounds = getBounds(
          json.features
            .map((feature) => {
              return feature.geometry.coordinates[0].map((coord) => {
                return { lat: coord[1], lng: coord[0] };
              });
            })
            .flat()
        );

        const { clientHeight, clientWidth } = this.myRef.current.mapRef.current;

        const zoom = getBoundsZoomLevel(bounds, {
          width: clientWidth,
          height: clientHeight,
        });

        this.setState({
          center: initalCenter,
          zoom: zoom,
          areas: json.features,
          poly: json.features.map((area) => {
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

      const bounds = getBounds(
        this.state.areas[
          this.props.selectedProject.id
        ].geometry.coordinates[0].map((coord) => {
          return { lat: coord[1], lng: coord[0] };
        })
      );

      const { clientHeight, clientWidth } = this.myRef.current.mapRef.current;

      const zoom = getBoundsZoomLevel(bounds, {
        width: clientWidth,
        height: clientHeight,
      });

      this.setState({
        center: {
          lng: areaCenter.lng,
          lat: areaCenter.lat,
        },
        zoom: zoom,
      });
    }
  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={this.state.zoom}
        center={this.state.center}
        ref={this.myRef}
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
