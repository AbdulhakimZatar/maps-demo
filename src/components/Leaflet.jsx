import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import ReactLeafletKml from "react-leaflet-kml";
import togeojson from "@mapbox/togeojson";
import { averageGeolocation } from "../helper";

function App({ selectedProject }) {
  const [kml, setKml] = useState(null);
  const [center, setCenter] = useState([52.5708409794646, 10.9105508607193]);
  const [zoom, setZoom] = useState(8);
  const [areas, setAreas] = useState([]);
  useEffect(() => {
    fetch("/files/test.kml")
      .then((res) => res.text())
      .then(async (kmlText) => {
        const parser = new DOMParser();
        const kml = parser.parseFromString(kmlText, "text/xml");
        const json = togeojson.kml(kml);
        // console.log(json);
        setKml(kml);
        setAreas(json.features);
      });
  }, []);

  useEffect(() => {
    if (areas[0]) {
      const areaCenter = averageGeolocation(
        areas[selectedProject.id].geometry.coordinates[0].map((coord) => {
          return { lat: coord[1], lng: coord[0] };
        })
      );
      setCenter([areaCenter.lat, areaCenter.lng]);
      setZoom(10);
    }
  }, [selectedProject]);

  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  return (
    <MapContainer id="map" center={center} zoom={zoom}>
      <ChangeView center={center} zoom={zoom} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {kml && <ReactLeafletKml kml={kml} />}
    </MapContainer>
  );
}

export default App;
