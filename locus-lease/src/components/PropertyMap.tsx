import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

interface PropertyMapProps {
  lat: number;
  lng: number;
}

const containerStyle = {
  width: "100%",
  height: "100%",
};

const PropertyMap = ({ lat, lng }: PropertyMapProps) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    mapIds: [import.meta.env.VITE_GOOGLE_MAP_ID], // 👈 IMPORTANT
  });

  if (loadError) return <p>Map failed to load</p>;
  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat, lng }}
      zoom={15}
      options={{
        mapId: import.meta.env.VITE_GOOGLE_MAP_ID,
        disableDefaultUI: false,
      }}
    >
      <Marker position={{ lat, lng }} />
    </GoogleMap>
  );
};

export default PropertyMap;
