import * as React from "react";
import { useState } from "react";
import ReactMapGL, { Source, Layer } from "react-map-gl";

const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-121.353637, 40.584978],
            [-121.284551, 40.584758],
            [-121.275349, 40.541646],
            [-121.246768, 40.541017],
            [-121.251343, 40.423383],
            [-121.32687, 40.423768],
            [-121.360619, 40.43479],
            [-121.363694, 40.409124],
            [-121.439713, 40.409197],
            [-121.439711, 40.423791],
            [-121.572133, 40.423548],
            [-121.577415, 40.550766],
            [-121.539486, 40.558107],
            [-121.520284, 40.572459],
            [-121.487219, 40.550822],
            [-121.446951, 40.56319],
            [-121.370644, 40.563267],
            [-121.353637, 40.584978],
          ],
        ],
      },
    },
  ],
};

function Map() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 40.492392,
    longitude: -121.403732,
    zoom: 10,
  });

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      <Source id="my-data" type="geojson" data={geojson}>
        <Layer
          id="park-boundary"
          type="fill"
          paint={{
            "fill-color": "#888888",
            "fill-opacity": 0.4,
          }}
        />
      </Source>
    </ReactMapGL>
  );
}

export default Map;
