import { useState } from "react";
import { Search, MapPin, Calendar, DollarSign, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.append("location", location);
    if (propertyType) params.append("type", propertyType);
    if (priceRange) params.append("price", priceRange);
    
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-card rounded-2xl shadow-xl border p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Location */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            Location
          </label>
          <Input
            placeholder="City, neighborhood..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="h-11"
          />
        </div>

        {/* Property Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Home className="h-4 w-4 text-primary" />
            Property Type
          </label>
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rent">Rentals</SelectItem>
              <SelectItem value="airbnb">Airbnb</SelectItem>
              <SelectItem value="sale">For Sale</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-primary" />
            Price Range
          </label>
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-1000">$0 - $1,000</SelectItem>
              <SelectItem value="1000-2500">$1,000 - $2,500</SelectItem>
              <SelectItem value="2500-5000">$2,500 - $5,000</SelectItem>
              <SelectItem value="5000+">$5,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
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
