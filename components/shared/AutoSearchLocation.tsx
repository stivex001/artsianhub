"use client";

import React, { useState, useCallback } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

type PlacePrediction = {
  description: string;
  place_id: string;
};

const AutoSearchLocation = () => {
  const [query, setQuery] = useState("");
  const [predictions, setPredictions] = useState<PlacePrediction[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPredictions = useCallback(async (input: string) => {
    if (!input) {
      setPredictions([]);
      return;
    }

    setLoading(true);

    const res = await fetch("/api/places?input=" + encodeURIComponent(input));
    const data = await res.json();
    setPredictions(data);
    setLoading(false);
  }, []);

  return (
    <Command className="rounded-lg border shadow-md md:min-w-[450px]">
      <CommandInput
        placeholder="Type a location..."
        value={query}
        onValueChange={(value) => {
          setQuery(value);
          fetchPredictions(value);
        }}
      />
      <CommandList>
        {loading && <div className="p-2 text-sm">Loading...</div>}
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {predictions.map((predict) => (
            <CommandItem key={predict.place_id}>
              {predict.description}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default AutoSearchLocation;
