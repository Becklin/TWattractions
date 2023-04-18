import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import Geocode from "react-geocode";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MAP_API_KEY } from "@/config/index";

const Marker = () => (
  <Image alt="map marker" src="/images/pin.svg" width={30} height={30} />
);

export default function SimpleMap({ address }) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(true);

  const defaultProps = {
    center: {
      lat,
      lng,
    },
    zoom: 14,
  };

  useEffect(() => {
    Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
        setLoading(false);
      },
      (error) => {
        toast.error(error);
      }
    );
  }, [address]);

  Geocode.setApiKey(MAP_API_KEY);
  if (loading) return false;
  return (
    <div className="w-[200px] h-[150px]">
      <GoogleMapReact
        bootstrapURLKeys={{ key: MAP_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
      >
        <Marker lat={defaultProps.center.lat} lng={defaultProps.center.lng} />
      </GoogleMapReact>
    </div>
  );
}
