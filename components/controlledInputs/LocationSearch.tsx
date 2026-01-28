"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ArrowLeft } from "lucide-react";

type Props = {};

interface PlaceResult {
  place_id: string;
  description: string;
  geometry?: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

const LocationSearch = (props: Props) => {
  const [location, setLocation] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<PlaceResult[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<PlaceResult | null>(
    null
  );

  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const marker = useRef<google.maps.Marker | null>(null);
  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);
  // In Next.js/TS, setTimeout may be typed as NodeJS.Timeout instead of number.
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load Google Maps API
  useEffect(() => {
    if (typeof window !== "undefined" && !window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        initializeServices();
      };
      document.head.appendChild(script);
    } else if (window.google) {
      initializeServices();
    }
  }, []);

  // Initialize map when location is selected
  useEffect(() => {
    if (showMap && selectedLocation && window.google && mapContainer.current) {
      initializeMap();
    }
  }, [showMap, selectedLocation]);

  const initializeServices = () => {
    if (window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
  };

  const initializeMap = () => {
    if (!window.google || !mapContainer.current || !selectedLocation) return;

    const center = selectedLocation.geometry?.location || {
      lat: 40.7128,
      lng: -74.006,
    };

    map.current = new window.google.maps.Map(mapContainer.current, {
      center: center,
      zoom: 13,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "on" }],
        },
      ],
    });

    // Add marker
    if (marker.current) {
      marker.current.setMap(null);
    }

    marker.current = new window.google.maps.Marker({
      position: center,
      map: map.current,
      title: selectedLocation.description,
    });

    // Initialize places service for getting place details
    placesService.current = new window.google.maps.places.PlacesService(
      map.current
    );
  };

  const searchLocation = (query: string) => {
    if (!query.trim() || !autocompleteService.current) {
      setSuggestions([]);
      return;
    }

    const request = {
      input: query,
      types: ["establishment", "geocode"],
      componentRestrictions: { country: "us" }, // Adjust country as needed
    };

    autocompleteService.current.getPlacePredictions(
      request,
      (predictions, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          predictions
        ) {
          setSuggestions(
            predictions.map((prediction) => ({
              place_id: prediction.place_id,
              description: prediction.description,
            }))
          );
          setShowSuggestions(true);
        } else {
          setSuggestions([]);
        }
      }
    );
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);

    // Clear previous timeout
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    // Debounce search
    searchTimeout.current = setTimeout(() => {
      searchLocation(value);
    }, 300);
  };

  const handleLocationSelect = (selectedPlace: PlaceResult) => {
    setLocation(selectedPlace.description);
    setShowSuggestions(false);
    setSuggestions([]);

    // Get place details including geometry
    if (placesService.current) {
      const request = {
        placeId: selectedPlace.place_id,
        fields: ["geometry", "name", "formatted_address"],
      };

      placesService.current.getDetails(request, (place, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          place
        ) {
          const locationWithGeometry = {
            ...selectedPlace,
            geometry: {
              location: {
                lat: place.geometry?.location?.lat() || 0,
                lng: place.geometry?.location?.lng() || 0,
              },
            },
          };
          setSelectedLocation(locationWithGeometry);
          setShowMap(true);
        }
      });
    } else {
      // Fallback: use geocoder service
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode(
        { placeId: selectedPlace.place_id },
        (results, status) => {
          if (status === "OK" && results && results[0]) {
            const locationWithGeometry = {
              ...selectedPlace,
              geometry: {
                location: {
                  lat: results[0].geometry.location.lat(),
                  lng: results[0].geometry.location.lng(),
                },
              },
            };
            setSelectedLocation(locationWithGeometry);
            setShowMap(true);
          }
        }
      );
    }
  };
  return (
    <div>
      {/* Primary Location */}
      <div className="flex flex-col gap-2">
        <label className="text-lg font-semibold text-gray-900">
          Primary Location
        </label>
        <div className="relative">
          <input
            type="text"
            value={location}
            onChange={handleLocationChange}
            placeholder="Select your location or region"
            className="w-full p-4 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          />
          <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />

          {/* Location Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.place_id}
                  className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  onClick={() => handleLocationSelect(suggestion)}
                >
                  <div className="text-sm font-medium text-gray-900">
                    {suggestion.description}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Map Display */}
      {showMap && (
        <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden relative">
          <div
            ref={mapContainer}
            className="w-full h-full"
            style={{ minHeight: "256px" }}
          />

          {/* Fallback if Google Maps fails to load */}
          {!window.google && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <div className="text-gray-500 mb-2">Map Loading...</div>
                <div className="text-sm text-gray-400">
                  Please add your Google Maps API key
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;