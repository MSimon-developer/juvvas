import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import SearchBar from "@/components/SearchBar";

import heroImage from "@/assets/hero-home.jpg";

const Properties = () => {
  const [searchParams] = useSearchParams();

  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* PAGINATION */
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 24;

  /* ---------------- FETCH WITH AUTO TOKEN REFRESH ---------------- */
  const fetchProperties = async () => {
    try {
      setLoading(true);

      let accessToken = localStorage.getItem("access");

      /* INITIAL REQUEST */
      let res = await fetch(
        "http://127.0.0.1:8000/properties/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(accessToken &&
            accessToken !== "null" &&
            accessToken !== "undefined"
              ? {
                  Authorization: `Bearer ${accessToken}`,
                }
              : {}),
          },
        }
      );

      /* TOKEN EXPIRED -> REFRESH TOKEN */
      if (res.status === 401) {
        const refreshToken =
          localStorage.getItem("refresh");

        if (!refreshToken) {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");

          setProperties([]);
          return;
        }

        const refreshRes = await fetch(
          "http://127.0.0.1:8000/api/token/refresh/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              refresh: refreshToken,
            }),
          }
        );

        /* REFRESH FAILED */
        if (!refreshRes.ok) {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");

          setProperties([]);
          return;
        }

        const refreshData =
          await refreshRes.json();

        /* SAVE NEW ACCESS TOKEN */
        localStorage.setItem(
          "access",
          refreshData.access
        );

        accessToken = refreshData.access;

        /* RETRY ORIGINAL REQUEST */
        res = await fetch(
          "http://127.0.0.1:8000/properties/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      }

      if (!res.ok) {
        throw new Error(
          `HTTP error! status: ${res.status}`
        );
      }

      const data = await res.json();

      setProperties(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(
        "Error fetching properties:",
        error
      );

      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  /* FETCH ON PAGE LOAD + FILTER CHANGE */
  useEffect(() => {
    fetchProperties();
  }, [searchParams]);

  /* ---------------- FILTER ---------------- */
  const typeFilter = searchParams.get("type");

  const filteredProperties = typeFilter
    ? properties.filter(
        (p) =>
          p.type?.toLowerCase() ===
          typeFilter.toLowerCase()
      )
    : properties;

  /* RESET TO PAGE 1 WHEN FILTER CHANGES */
  useEffect(() => {
    setCurrentPage(1);
  }, [typeFilter]);

  /* ---------------- PAGINATION ---------------- */
  const totalPages = Math.ceil(
    filteredProperties.length / propertiesPerPage
  );

  const indexOfLastProperty =
    currentPage * propertiesPerPage;

  const indexOfFirstProperty =
    indexOfLastProperty - propertiesPerPage;

  const currentProperties = filteredProperties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  /* ---------------- HERO CONTENT ---------------- */
  const heroContent: any = {
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
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[550px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Luxury property"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/50" />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {currentHero.title}
              </span>
            </h1>

            <p className="text-lg text-muted-foreground">
              {currentHero.subtitle}
            </p>
          </div>

          <SearchBar />
        </div>
      </section>

      {/* PROPERTIES */}
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-2">
              {currentHero.title}
            </h2>

            <p className="text-muted-foreground">
              Showing {filteredProperties.length} properties
            </p>
          </div>

          {/* LOADING */}
          {loading ? (
            <p className="text-center text-lg">
              Loading properties...
            </p>
          ) : filteredProperties.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No properties found.
            </p>
          ) : (
            <>
              {/* PROPERTY GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    {...property}
                  />
                ))}
              </div>

              {/* PAGINATION */}
              <div className="flex justify-center items-center gap-3 mt-12 flex-wrap">
                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.max(prev - 1, 1)
                    )
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border disabled:opacity-50"
                >
                  Previous
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() =>
                        setCurrentPage(index + 1)
                      }
                      className={`px-4 py-2 rounded-lg border ${
                        currentPage === index + 1
                          ? "bg-primary text-white"
                          : ""
                      }`}
                    >
                      {index + 1}
                    </button>
                  )
                )}

                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, totalPages)
                    )
                  }
                  disabled={
                    currentPage === totalPages
                  }
                  className="px-4 py-2 rounded-lg border disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Properties;