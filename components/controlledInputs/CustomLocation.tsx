"use client";

import React, { useRef, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";

const libraries: "places"[] = ["places"];

const CustomLocation = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 51.5074, // Default to London
    lng: -0.1278,
  });

  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

  const handlePlacesChanged = () => {
    const places = searchBoxRef.current?.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      const lat = place.geometry?.location?.lat();
      const lng = place.geometry?.location?.lng();

      if (lat && lng) {
        setLocation({ lat, lng });

        // Format the data for your backend
        const payload = {
          type: "Point",
          coordinates: [lng, lat], // GeoJSON format
        };
        console.log("Selected Location Payload:", payload);
      }
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      libraries={libraries}
    >
      <div className="w-full  flex flex-col gap-4">
        {/* Search Box */}
        <StandaloneSearchBox
          onLoad={(ref) => (searchBoxRef.current = ref)}
          onPlacesChanged={handlePlacesChanged}
        >
          <input
            type="text"
            placeholder="Search location..."
            className="w-full h-12 p-4 border rounded-[10px] outline-none"
          />
        </StandaloneSearchBox>

        {/* Map */}
        <GoogleMap
          center={location}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "400px" }}
        >
          <Marker position={location} />
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default CustomLocation;
