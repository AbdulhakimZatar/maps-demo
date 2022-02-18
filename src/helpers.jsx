export const averageGeolocation = (coords) => {
  if (coords.length === 1) {
    return coords[0];
  }

  let x = 0.0;
  let y = 0.0;
  let z = 0.0;

  for (let coord of coords) {
    let lat = (coord.lat * Math.PI) / 180;
    let lng = (coord.lng * Math.PI) / 180;

    x += Math.cos(lat) * Math.cos(lng);
    y += Math.cos(lat) * Math.sin(lng);
    z += Math.sin(lat);
  }

  let total = coords.length;

  x = x / total;
  y = y / total;
  z = z / total;

  let centralLng = Math.atan2(y, x);
  let centralSquareRoot = Math.sqrt(x * x + y * y);
  let centralLat = Math.atan2(z, centralSquareRoot);

  return {
    lat: (centralLat * 180) / Math.PI,
    lng: (centralLng * 180) / Math.PI,
  };
};

export const getBounds = (coords) => {
  let minLat = 90;
  let maxLat = -90;
  let minLng = 180;
  let maxLng = -180;

  for (let coord of coords) {
    minLat = Math.min(minLat, coord.lat);
    maxLat = Math.max(maxLat, coord.lat);
    minLng = Math.min(minLng, coord.lng);
    maxLng = Math.max(maxLng, coord.lng);
  }

  return {
    minLat,
    maxLat,
    minLng,
    maxLng,
    ne: { lat: maxLat, lng: maxLng },
    sw: { lat: minLat, lng: minLng },
  };
};

export const getBoundsZoomLevel = (bounds, mapDim) => {
  var WORLD_DIM = { height: 256, width: 256 };
  var ZOOM_MAX = 21;

  function latRad(lat) {
    var sin = Math.sin((lat * Math.PI) / 180);
    var radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
    return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
  }

  function zoom(mapPx, worldPx, fraction) {
    return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
  }

  var ne = bounds.ne;
  var sw = bounds.sw;

  var latFraction = (latRad(ne.lat) - latRad(sw.lat)) / Math.PI;

  var lngDiff = ne.lng - sw.lng;
  var lngFraction = (lngDiff < 0 ? lngDiff + 360 : lngDiff) / 360;

  var latZoom = zoom(mapDim.height, WORLD_DIM.height, latFraction);
  var lngZoom = zoom(mapDim.width, WORLD_DIM.width, lngFraction);

  return Math.min(latZoom, lngZoom, ZOOM_MAX);
};
