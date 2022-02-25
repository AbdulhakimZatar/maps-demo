import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import * as turf from "@turf/turf";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

function Mapbox() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  const draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
      polygon: true,
      trash: true,
    },
  });

  function drawPolygon(points) {
    console.log(2);
    map.current.addLayer({
      id: "maine",
      type: "fill",
      source: {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: points,
          },
        },
      },
      layout: {},
      paint: {
        "fill-color": "#088",
        "fill-opacity": 0.3,
      },
    });
  }

  function createArea(e) {
    console.log(1);
    let data = draw.getAll();
    const polygonData = data.features[0].geometry.coordinates;
    drawPolygon(polygonData);
    // polygonDataCalc(data);
  }

  // function polygonDataCalc(data) {
  //   let area = turf.area(data);
  //   let centroid = turf.centroid(data);
  //   let rounded_area = Math.round(area * 100) / 100;
  //   // polygonDiv.innerHTML =
  //   //   "<p><strong>Area: " +
  //   //   rounded_area +
  //   //   " square meter</strong></p><h4>Centroid: <br />" +
  //   //   centroid.geometry.coordinates +
  //   //   "</h4>";
  // }

  function deleteArea(e) {
    console.log(4);
    let data = draw.getAll();
    console.log(data);
    map.current.removeLayer("maine").removeSource("maine");
  }

  function updateArea(e) {
    console.log(3);
    let data = draw.getAll();
    map.current.removeLayer("maine").removeSource("maine");
    const polygonData = data.features[0].geometry.coordinates;
    drawPolygon(polygonData);
    // polygonDataCalc(data);
  }

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    map.current.addControl(draw);
    map.current.on("draw.create", createArea);
    map.current.on("draw.delete", deleteArea);
    map.current.on("draw.update", updateArea);
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />;
    </>
  );
}

export default Mapbox;
