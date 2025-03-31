"use client"

import { useEffect, useState } from "react";
import GooglePlacesAutocomplete, { geocodeByPlaceId } from "react-google-places-autocomplete";

interface GooglePlacesInputProps {
  apiKey: string;
  onSelect?: (address: string, lat: number, lng: number) => void;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
  isDisabled?: boolean;
}

const GooglePlacesInput = ({
  apiKey,
  onSelect = () => {},
  placeholder = "Enter address",
  className = "",
  defaultValue = "",
  isDisabled = false,
}: GooglePlacesInputProps) => {
  const [value, setValue] = useState<any>(null);

  useEffect(() => {
    if (defaultValue) {
      setValue({ label: defaultValue, value: { place_id: "" } });
    }
  }, [defaultValue]);


//   const fetchPlaceDetails = async (placeId: string, label: string) => {
//     try {
//       const results = await geocodeByPlaceId(placeId);
//       const location = results[0]?.geometry?.location;
//       if (location) {
//         const lat = location.lat();
//         const lng = location.lng();
//         onSelect(label, lat, lng); 
//       }
//     } catch (error) {
//       console.error("Error fetching place details:", error);
//     }
//   };

  const fetchPlaceDetails = async (placeId: string, label: string) => {
    try {
      const results = await geocodeByPlaceId(placeId);
      console.log("GeocodeResults:", results); // Debugging log
  
      if (results.length === 0) {
        console.warn("No results found for the given place ID.");
        return;
      }
  
      const location = results[0]?.geometry?.location;
      if (location) {
        const lat = location.lat();
        const lng = location.lng();
        console.log("Selected Address:", label);
        console.log("Coordinates:", { lat, lng });
        onSelect(label, lat, lng);
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };
  

  return (
    <div className={`${className}`}>
      <GooglePlacesAutocomplete
        apiKey={apiKey}
        selectProps={{
          value,
          onChange: (place) => {
            console.log(place, "place___")
            setValue(place);
            if (place?.value?.place_id && place?.label) {
              fetchPlaceDetails(place.value.place_id, place.label);
            }
          },
          placeholder,
          isDisabled: isDisabled, 
          styles: {
            control: (provided) => ({
              ...provided,
              padding: "6px",
              borderRadius: "8px",
              borderColor: "#e4e7ec",
              boxShadow: "none",
              "&:hover": { borderColor: "#cbd5e1" },
            }),
            menu: (provided) => ({
              ...provided,
              borderRadius: "8px",
              backgroundColor: "white",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isFocused ? "#f3f4f6" : "white",
              color: "#333",
              padding: "10px",
              borderRadius: "4px",
            }),
          },
        }}
      />
    </div>
  );
};

export default GooglePlacesInput;