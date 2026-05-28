import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Heart, MapPin, Bed, Bath, Square } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PropertyCardProps {
  id: number;
  image: string;
  title: string;
  price: number;
  location: string;
  beds: number;
  baths: number;
  size: number;
  type: "rent" | "airbnb" | "sale";
  is_favorited?: boolean;
}

const PropertyCard = ({
  id,
  image,
  title,
  price,
  location,
  beds,
  baths,
  size,
  type,
  is_favorited,
}: PropertyCardProps) => {
  const [isFav, setIsFav] = useState(false);
  const [favLoading, setFavLoading] = useState(false);

  // ✅ IMPORTANT: sync state when props change
  useEffect(() => {
    setIsFav(Boolean(is_favorited));
  }, [is_favorited]);

  const typeLabels = {
    rent: "For Rent",
    airbnb: "Airbnb",
    sale: "For Sale",
  };

  const typeColors = {
    rent: "bg-primary/10 text-primary",
    airbnb: "bg-accent/10 text-accent",
    sale: "bg-secondary text-secondary-foreground",
  };

  const toggleFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const token = localStorage.getItem("access");

    if (!token || token === "null" || token === "undefined") {
      alert("Please login to add favorites.");
      return;
    }

    const previous = isFav;
    setIsFav(!isFav);
    setFavLoading(true);

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/favorites/toggle/${id}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 401) {
        localStorage.removeItem("access");
        alert("Session expired. Please login again.");
        setIsFav(previous);
        return;
      }

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.detail || "Failed to update favorites.");
      }

      setIsFav(Boolean(data?.favorited));
    } catch (err: any) {
      setIsFav(previous);
      alert(err?.message || "Failed to update favorites.");
    } finally {
      setFavLoading(false);
    }
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all">
      <Link to={`/property/${id}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition"
          />

          <div className="absolute top-3 left-3 right-3 flex justify-between">
            <Badge className={typeColors[type]}>
              {typeLabels[type]}
            </Badge>

           <Button
  variant="secondary"
  onClick={toggleFavorite}
  disabled={favLoading}
  className="flex items-center gap-2"
>
  <Heart
    className={`h-4 w-4 ${
      isFav ? "fill-red-500 text-red-500" : ""
    }`}
  />

  <span>
    {isFav ? "Saved" : "Save"}
  </span>
</Button>
          </div>
        </div>
      </Link>

      <CardContent className="p-4 space-y-2">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-primary font-bold">
          KES {price.toLocaleString()}
        </p>

        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          {location}
        </div>

        <div className="flex gap-4 text-sm border-t pt-2">
          <span>
            <Bed className="inline h-4 w-4" /> {beds}
          </span>
          <span>
            <Bath className="inline h-4 w-4" /> {baths}
          </span>
          <span>
            <Square className="inline h-4 w-4" /> {size} sqft
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;