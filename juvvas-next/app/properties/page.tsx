import Image from "next/image";
import PropertyCard from "@/components/property/PropertyCard";
import SearchBar from "@/components/property/SearchBar";

interface Property {
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

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{
    type?: string;
    location?: string;
  }>;
}) {
  const params = await searchParams;

  const typeFilter = params.type;
  const locationFilter = params.location;

  let properties: Property[] = [];

  try {
    const res = await fetch(
      "https://juvvas.com/api/properties/",
      {
        cache: "no-store",
      }
    );

    if (res.ok) {
      properties = await res.json();
      
    }
    
  } catch (error) {
    console.error(error);
  }

  const filteredProperties = properties.filter(
    (property) => {
      const matchesType =
        !typeFilter ||
        property.type?.toLowerCase() ===
          typeFilter.toLowerCase();

      const matchesLocation =
        !locationFilter ||
        property.location
          ?.toLowerCase()
          .includes(
            locationFilter.toLowerCase()
          );

      return (
        matchesType &&
        matchesLocation
      );
    }
  );

  const heroContent: Record<
    string,
    {
      title: string;
      subtitle: string;
    }
  > = {
    rent: {
      title: "Rental Properties",
      subtitle:
        "Find comfortable long-term rental homes.",
    },

    airbnb: {
      title: "Airbnb Stays",
      subtitle:
        "Discover amazing short-term stays and vacation homes.",
    },

    sale: {
      title: "Properties For Sale",
      subtitle:
        "Browse homes and properties available for purchase.",
    },
  };

  const currentHero = typeFilter
    ? heroContent[typeFilter]
    : {
        title: "All Properties",
        subtitle:
          "Explore all available properties in one place.",
      };

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[550px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-home.jpg"
            alt="Luxury property"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/70 to-white/50" />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="bg-gradient-to-r from-cyan-600 to-orange-500 bg-clip-text text-transparent">
                {currentHero.title}
              </span>
            </h1>

            <p className="text-lg text-gray-700">
              {currentHero.subtitle}
            </p>
          </div>

          <SearchBar />
        </div>
      </section>

      {/* PROPERTIES */}
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-2">
              {currentHero.title}
            </h2>

            <p className="text-gray-500">
              Showing {filteredProperties.length} properties
            </p>
          </div>

          {filteredProperties.length === 0 ? (
            <p className="text-center text-gray-500">
              No properties found.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProperties.map(
                (property) => (
                  <PropertyCard
                    key={property.id}
                    {...property}
                  />
                )
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}