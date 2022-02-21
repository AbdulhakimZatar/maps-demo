import React, { useEffect, useState } from "react";
import { Viewer, Entity, GeoJsonDataSource, PolygonGraphics } from "resium";
import { Cartesian3, Color } from "cesium";
import togeojson from "@mapbox/togeojson";

function Cesium() {
  const [json, setJson] = useState(null);
  const [clicked, setClicked] = useState(false);
  const positions = Cartesian3.fromDegreesArray([
    -108.0, 42.0, -100.0, 42.0, -104.0, 40.0,
  ]);

  useEffect(() => {
    fetch("/files/test.kml")
      .then((res) => res.text())
      .then(async (kml) => {
        const parser = new DOMParser();
        const kmlDoc = parser.parseFromString(kml, "text/xml");
        const json = togeojson.kml(kmlDoc);
        console.log(json);
        setJson(json);
      });
  }, []);
  return (
    <Viewer className="cesium-container">
      <GeoJsonDataSource data={json} />
      {/* <button onClick={() => setClicked(true)}>Draw Polygon</button> */}
      {/* {clicked && ( */}
      {/* <Entity name="PolygonGraphics" description="PolygonGraphics!!">
        <PolygonGraphics hierarchy={positions} material={Color.GREEN} />
      </Entity> */}
      {/* )} */}
    </Viewer>
  );
}

export default Cesium;
