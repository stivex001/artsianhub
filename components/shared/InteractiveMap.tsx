"use client";

import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { MapPin, Navigation, ExternalLink } from "lucide-react";

const GOOGLE_MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

// Stable reference — must not be defined inside component
const LIBRARIES: [] = [];

const MAP_STYLES: google.maps.MapTypeStyle[] = [
  { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
  { featureType: "transit", elementType: "labels", stylers: [{ visibility: "off" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#c9e4f5" }] },
  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#f8f9fa" }] },
];

interface InteractiveMapProps {
  address?: string | null;
  height?: string;
  className?: string;
  zoom?: number;
}

// Shown when Google Maps JS API fails to load (invalid key, network, etc.)
// Uses a free OSM-based iframe — no API key required
const IframeFallback = ({
  address,
  height,
  className,
}: {
  address: string;
  height: string;
  className: string;
}) => (
  <div className={`${height} ${className} rounded-xl overflow-hidden relative shadow-sm`}>
    <iframe
      title="Location map"
      src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed&z=14`}
      className="w-full h-full border-0"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="absolute bottom-2 right-2 flex items-center gap-1 bg-white/90 backdrop-blur-sm text-[11px] font-medium text-[#02198B] px-2.5 py-1.5 rounded-lg shadow-sm hover:bg-white transition-colors"
    >
      <ExternalLink className="w-3 h-3" />
      Open in Maps
    </a>
  </div>
);

const LoadingState = ({ height, className }: { height: string; className: string }) => (
  <div
    className={`${height} ${className} rounded-xl bg-gray-100 flex flex-col items-center justify-center gap-2`}
  >
    <div className="w-8 h-8 rounded-full bg-[#02198B]/10 flex items-center justify-center">
      <Navigation className="w-4 h-4 text-[#02198B] animate-spin" />
    </div>
    <p className="text-xs text-gray-400 animate-pulse">Locating address…</p>
  </div>
);

const ErrorState = ({
  address,
  height,
  className,
}: {
  address?: string | null;
  height: string;
  className: string;
}) => (
  <div
    className={`${height} ${className} rounded-xl bg-gray-50 border border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 px-4`}
  >
    <MapPin className="w-5 h-5 text-gray-300" />
    <p className="text-xs text-gray-400">Could not load map for this location</p>
    {address && (
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-[11px] font-medium text-[#02198B] hover:underline"
      >
        <ExternalLink className="w-3 h-3" />
        View on Google Maps
      </a>
    )}
  </div>
);

export const InteractiveMap = ({
  address,
  height = "h-48",
  className = "",
  zoom = 14,
}: InteractiveMapProps) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_KEY,
    libraries: LIBRARIES,
  });

  const [coords, setCoords] = useState<google.maps.LatLngLiteral | null>(null);
  const [geocoding, setGeocoding] = useState(false);
  const [geocodeError, setGeocodeError] = useState(false);

  useEffect(() => {
    if (!isLoaded || !address) return;

    setCoords(null);
    setGeocodeError(false);
    setGeocoding(true);

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      setGeocoding(false);
      if (status === window.google.maps.GeocoderStatus.OK && results?.[0]) {
        const loc = results[0].geometry.location;
        setCoords({ lat: loc.lat(), lng: loc.lng() });
      } else {
        setGeocodeError(true);
      }
    });
  }, [isLoaded, address]);

  if (!address) {
    return (
      <div
        className={`${height} ${className} rounded-xl bg-gray-50 border border-gray-100 flex flex-col items-center justify-center gap-2`}
      >
        <MapPin className="w-5 h-5 text-gray-300" />
        <p className="text-xs text-gray-400">No location provided</p>
      </div>
    );
  }

  // Google Maps JS API failed to load — use iframe embed as fallback
  if (loadError) {
    return <IframeFallback address={address} height={height} className={className} />;
  }

  if (!isLoaded || geocoding) {
    return <LoadingState height={height} className={className} />;
  }

  if (geocodeError || !coords) {
    return <ErrorState address={address} height={height} className={className} />;
  }

  return (
    <div className={`${height} ${className} rounded-xl overflow-hidden shadow-sm relative`}>
      <GoogleMap
        mapContainerClassName="w-full h-full"
        center={coords}
        zoom={zoom}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          clickableIcons: false,
          styles: MAP_STYLES,
          zoomControlOptions: {
            position: window.google.maps.ControlPosition.RIGHT_BOTTOM,
          },
        }}
      >
        <Marker
          position={coords}
          icon={{
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: "#02198B",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2.5,
          }}
        />
      </GoogleMap>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-2 right-2 flex items-center gap-1 bg-white/90 backdrop-blur-sm text-[11px] font-medium text-[#02198B] px-2.5 py-1.5 rounded-lg shadow-sm hover:bg-white transition-colors"
      >
        <ExternalLink className="w-3 h-3" />
        Open in Maps
      </a>
    </div>
  );
};
