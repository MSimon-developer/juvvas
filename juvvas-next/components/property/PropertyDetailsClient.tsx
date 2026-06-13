"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import PropertyMap from "@/components/property/PropertyMap";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { refreshAccessToken } from "@/lib/auth";

import {
  MapPin,
  Bed,
  Bath,
  Square,
  Phone,
} from "lucide-react";

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

interface Props {
  property: Property;
}

const PropertyDetailsClient = ({
  property,
}: Props) => {
  const router = useRouter();

  const [isAdmin, setIsAdmin] =
    useState(false);

  useEffect(() => {
  const checkAdmin = async () => {
    let token = localStorage.getItem("access");

    if (!token) {
      token = await refreshAccessToken();
    }

    if (!token) {
      setIsAdmin(false);
      return;
    }

    setIsAdmin(
      localStorage.getItem("is_staff") === "true"
    );
  };

  checkAdmin();
}, []);

 const handleDelete = async () => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this property?"
  );

  if (!confirmed) return;

  let token = localStorage.getItem("access");

  if (!token) {
    token = await refreshAccessToken();
  }

  if (!token) {
    alert("Please login again.");
    return;
  }

  try {
    let res = await fetch(
      `https://juvvas.com/api/properties/${property.id}/delete/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 401) {
      const newToken =
        await refreshAccessToken();

      if (!newToken) {
        alert(
          "Session expired. Please login again."
        );
        return;
      }

      res = await fetch(
        `https://juvvas.com/api/properties/${property.id}/delete/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        }
      );
    }

    if (!res.ok) {
      throw new Error("Delete failed");
    }

    alert(
      "Property deleted successfully"
    );

    router.push("/properties");
  } catch (err) {
    console.error(err);
    alert("Delete failed");
  }
};
  const handleInterestedClick = () => {
    alert("📞 Call us via 0792001203");
  };

  return (
    <main className="py-8">
      <div className="container mx-auto px-4">

        {/* IMAGES */}
        {property.images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 rounded-xl overflow-hidden">

            {/* MAIN IMAGE */}
            <div className="relative min-h-[400px]">
              <Image
                src={property.images[0]}
                alt={property.title}
                fill
                priority
                className="object-cover rounded-xl"
              />
            </div>

            {/* GALLERY */}
            <div className="grid grid-cols-2 gap-4">
              {property.images
                .slice(1)
                .map((img, i) => (
                  <div
                    key={i}
                    className="relative min-h-[190px]"
                  >
                    <Image
                      src={img}
                      alt={`Property ${
                        i + 1
                      }`}
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>
                ))}
            </div>

          </div>
        )}

        {/* CONTENT */}
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
            {Number.isFinite(
              property.latitude
            ) &&
              Number.isFinite(
                property.longitude
              ) && (
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
                  onClick={
                    handleInterestedClick
                  }
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

                {isAdmin && (
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={
                      handleDelete
                    }
                  >
                    Delete Property
                  </Button>
                )}

              </CardContent>
            </Card>

          </div>

        </div>
      </div>
    </main>
  );
};

export default PropertyDetailsClient;