"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Search,
  MapPin,
  Home,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SearchBar = () => {
  const router = useRouter();

  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] =
    useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (location) {
      params.append("location", location);
    }

    if (propertyType) {
      params.append("type", propertyType);
    }

    router.push(
      `/properties?${params.toString()}`
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-card rounded-2xl shadow-xl border p-4">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* LOCATION */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            Location
          </label>

          <Input
            placeholder="City, neighborhood..."
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
            className="h-11"
          />
        </div>

        {/* PROPERTY TYPE */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Home className="h-4 w-4 text-primary" />
            Property Type
          </label>

          <Select
            value={propertyType}
            onValueChange={setPropertyType}
          >
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="rent">
                Rentals
              </SelectItem>

              <SelectItem value="airbnb">
                Airbnb
              </SelectItem>

              <SelectItem value="sale">
                For Sale
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* SEARCH BUTTON */}
        <div className="flex items-end">
          <Button
            onClick={handleSearch}
            className="w-full h-11"
            size="lg"
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>

      </div>
    </div>
  );
};

export default SearchBar;