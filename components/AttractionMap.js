import Image from "next/image";
import { useState, useEffect } from "react";
import ReactMapGl, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Geocode from "react-geocode";

export default function AttractionMap({ attraction }) {
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [loading, setLoading] = useState(true);
  const [viewport, setViewport] = useState({
    latitude: "25.105497",
    longitude: "121.597366",
    width: "100%",
    height: "500px",
    zoom: 12,
  });
  useEffect(() => {
    // Get latitude & longitude from address.
    Geocode.fromAddress(attraction.address).then(
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
  Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_API_KEY);
  if (loading) return false;
  console.log(process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN);
  console.log(process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN);

  return (
    <ReactMapGl
      {...viewport}
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
      onViewportChange={(vp) => setViewport(vp)}
    >
      <Marker key={attraction.id} latitude={lat} longitude={lng}>
        <Image src="/images/pin.svg" width={30} height={30} />
      </Marker>
    </ReactMapGl>
  );
}
