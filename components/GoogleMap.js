import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import Geocode from "react-geocode";
import { NEXT_GOOGLE_MAP_API_KEY } from "@/config/index";
import adll from "@/config/index";

const Marker = ({ text }) => (
  <div className="marker">
    <span className="marker__name">{text}</span>
  </div>
);

export default function SimpleMap({ address }) {
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const defaultProps = {
    center: {
      lat,
      lng,
    },
    zoom: 12,
  };

  useEffect(() => {
    Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
        setViewport({ ...viewport, latitude: lat, longitude: lng });
        setLoading(false);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  Geocode.setApiKey(NEXT_GOOGLE_MAP_API_KEY);
  console.log({ NEXT_GOOGLE_MAP_API_KEY });
  console.log({ adll });

  return (
    <div className="w-full h-[350px]">
      <GoogleMapReact
        bootstrapURLKeys={{ key: NEXT_GOOGLE_MAP_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
      >
        <Marker lat={lat} lng={lng} />
      </GoogleMapReact>
    </div>
  );
}
