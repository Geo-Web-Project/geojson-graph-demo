import * as React from "react";
import { useState } from "react";
import ReactMapGL, { Source, Layer } from "react-map-gl";
import { gql, useQuery } from "@apollo/client";

const query = gql`
  {
    landParcels(first: 5) {
      geometry {
        type
        coordinates {
          pointBR {
            lon
            lat
          }
          pointBL {
            lon
            lat
          }
          pointTR {
            lon
            lat
          }
          pointTL {
            lon
            lat
          }
        }
      }
    }
  }
`;

function convertToGeoJson(data) {
  let features = data.landParcels.map((parcel) => {
    let coordinates = parcel.geometry.coordinates.map((c) => {
      return [
        [
          [c.pointBL.lon, c.pointBL.lat],
          [c.pointBR.lon, c.pointBR.lat],
          [c.pointTR.lon, c.pointTR.lat],
          [c.pointTL.lon, c.pointTL.lat],
        ],
      ];
    });
    return {
      type: "Feature",
      geometry: {
        type: "MultiPolygon",
        coordinates: coordinates,
      },
    };
  });
  return {
    type: "FeatureCollection",
    features: features,
  };
}

function Map() {
  const { loading, data } = useQuery(query);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 46.785869,
    longitude: -121.735288,
    zoom: 19,
  });

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {loading == false ? (
        <Source id="my-data" type="geojson" data={convertToGeoJson(data)}>
          <Layer
            id="park-boundary"
            type="fill"
            paint={{
              "fill-color": "#888888",
              "fill-opacity": 0.4,
            }}
          />
        </Source>
      ) : null}
    </ReactMapGL>
  );
}

export default Map;
