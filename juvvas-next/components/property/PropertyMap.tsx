"use client";

import {
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

interface PropertyMapProps {
  lat: number;
  lng: number;
}

const containerStyle = {
  width: "100%",
  height: "100%",
};

export default function PropertyMap({
  lat,
  lng,
}: PropertyMapProps) {
  const { isLoaded, loadError } =
    useJsApiLoader({
      googleMapsApiKey:
        process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
      mapIds: [
        process.env.NEXT_PUBLIC_GOOGLE_MAP_ID || "",
      ],
    });

  if (loadError) {
    return (
      <p className="p-4">
        Map failed to load
      </p>
    );
  }

  if (!isLoaded) {
    return (
      <p className="p-4">
        Loading map...
      </p>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat, lng }}
      zoom={15}
      options={{
        mapId:
          process.env.NEXT_PUBLIC_GOOGLE_MAP_ID,
        disableDefaultUI: false,
      }}
    >
      <Marker position={{ lat, lng }} />
    </GoogleMap>
  );
}