import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyMap from "@/components/PropertyMap";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  MapPin,
  Bed,
  Bath,
  Square,
  Phone,
} from "lucide-react";

/* ---------------- TYPES ---------------- */
interface Property {
  id: number;
  title: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  area: number;
  type: string;
  images: string[];
  latitude: number;
  longitude: number;
}

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH PROPERTY ---------------- */
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/properties/${id}/`
        );

        if (!res.ok) {
          throw new Error("Property not found");
        }

        const data = await res.json();

        console.log("PROPERTY DATA:", data);
        console.log("IMAGES:", data.images);

        setProperty({
          ...data,
          latitude: Number(data.latitude),
          longitude: Number(data.longitude),
          images: data.images || [],
        });
      } catch (error) {
        console.error(error);
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <p className="text-center py-20">
        Loading property...
      </p>
    );
  }

  /* ---------------- NOT FOUND ---------------- */
  if (!property) {
    return (
      <p className="text-center py-20">
        Property not found.
      </p>
    );
  }

  const handleInterestedClick = () => {
    alert("📞 Call us via 0792001203");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">

          {/* ---------------- IMAGES ---------------- */}
          {property.images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 rounded-xl overflow-hidden">

              {/* MAIN IMAGE */}
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover min-h-[400px] rounded-xl"
              />

              {/* OTHER IMAGES */}
              <div className="grid grid-cols-2 gap-4">
                {property.images.slice(1).map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Property ${i + 1}`}
                    className="w-full h-full object-cover min-h-[190px] rounded-xl"
                  />
                ))}
              </div>
            </div>
          )}

          {/* ---------------- CONTENT ---------------- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* LEFT SIDE */}
            <div className="lg:col-span-2 space-y-8">

              {/* PROPERTY INFO */}
              <div>
                <Badge>
                  {property.type.toUpperCase()}
                </Badge>

                <h1 className="text-3xl font-bold mt-2">
                  {property.title}
                </h1>

                <div className="flex items-center text-muted-foreground mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {property.location}
                </div>

                <div className="flex gap-6 mt-4 text-muted-foreground flex-wrap">

                  <div className="flex items-center gap-2">
                    <Bed className="h-5 w-5" />
                    {property.beds} Beds
                  </div>

                  <div className="flex items-center gap-2">
                    <Bath className="h-5 w-5" />
                    {property.baths} Baths
                  </div>

                  <div className="flex items-center gap-2">
                    <Square className="h-5 w-5" />
                    {property.area} sqft
                  </div>

                </div>
              </div>

              {/* MAP */}
              {Number.isFinite(property.latitude) &&
                Number.isFinite(property.longitude) && (
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold mb-4">
                        Location
                      </h2>

                      <div className="w-full h-[350px] rounded-lg overflow-hidden">
                        <PropertyMap
                          lat={property.latitude}
                          lng={property.longitude}
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-6">

              <Card>
                <CardContent className="p-6 space-y-4">

                  <p className="text-3xl font-bold text-primary">
                    Ksh {property.price}
                  </p>

                  <Button
                    className="w-full"
                    onClick={handleInterestedClick}
                  >
                    ❤️ I’m Interested
                  </Button>

                  <p className="text-sm text-center text-muted-foreground">
                    Click to call us directly
                  </p>

                  <Button
                    variant="outline"
                    className="w-full"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Call 0792001203
                  </Button>

                </CardContent>
              </Card>

            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PropertyDetails;