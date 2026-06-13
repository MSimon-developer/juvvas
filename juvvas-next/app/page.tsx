import Link from "next/link";
import Image from "next/image";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchBar from "@/components/property/SearchBar";
import PropertyCard from "@/components/property/PropertyCard";

import {
  ArrowRight,
  Home as HomeIcon,
  Key,
  DollarSign,
} from "lucide-react";

import { Button } from "@/components/ui/button";

async function getProperties() {
  try {
    const res = await fetch(
      "https://juvvas.com/api/properties/",
      {
        cache: "no-store",
      }
    );

    if (!res.ok) return [];

    return await res.json();
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const allProperties = await getProperties();

  const displayedProperties = allProperties.slice(0, 3);

  const categories = [
    {
      icon: HomeIcon,
      title: "Rentals",
      description:
        "Find your perfect long-term rental home",
      link: "/properties?type=rent",
    },
    {
      icon: Key,
      title: "Airbnb Stays",
      description:
        "Book unique short-term accommodations",
      link: "/properties?type=airbnb",
    },
    {
      icon: DollarSign,
      title: "For Sale",
      description:
        "Discover properties to own",
      link: "/properties?type=sale",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      

      {/* HERO */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-home.jpg"
            alt="Modern luxury home"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="container mx-auto px-4 py-10 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Find Your Dream{" "}
              <span className="text-cyan-400">
                Property
              </span>
            </h1>

            <p className="text-lg text-gray-200">
              Discover the perfect place to rent,
              stay, or own.
            </p>
          </div>

          <SearchBar />
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.title}
                href={category.link}
                className="group p-8 rounded-2xl bg-card border hover:shadow-lg transition"
              >
                <category.icon className="h-8 w-8 mb-4 text-primary" />

                <h3 className="text-xl font-semibold">
                  {category.title}
                </h3>

                <p className="text-muted-foreground">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section
        id="properties-section"
        className="py-16"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10">
            Featured Properties
          </h2>

          {displayedProperties.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No properties found.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProperties.map(
                (property: any) => (
                  <PropertyCard
                    key={property.id}
                    {...property}
                  />
                )
              )}
            </div>
          )}

          <div className="mt-10 text-center">
            <Button asChild variant="outline">
              <Link href="/properties">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

    
    </div>
  );
}