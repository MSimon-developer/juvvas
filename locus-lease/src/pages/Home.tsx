import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Home as HomeIcon,
  Key,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import PropertyCard from "@/components/PropertyCard";
import heroImage from "@/assets/hero-home.jpg";
import { refreshAccessToken } from "@/pages/Auth"; // ✅ ADD THIS

const Home = () => {
  const [allProperties, setAllProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const showFavorites = searchParams.get("favorites") === "1";

  /* ---------------- FETCH PROPERTIES ---------------- */
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        let token = localStorage.getItem("access");

        let res = await fetch("http://127.0.0.1:8000/properties/", {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        // 🔥 HANDLE TOKEN EXPIRY
        if (res.status === 401) {
          const newToken = await refreshAccessToken();

          if (!newToken) {
            localStorage.clear();
            setAllProperties([]);
            return;
          }

          token = newToken;

          // retry request
          res = await fetch("http://127.0.0.1:8000/properties/", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
        }

        // 🔥 SAFE JSON PARSE (fix '<!DOCTYPE' error)
        const text = await res.text();
        let data: any[] = [];

        try {
          data = text ? JSON.parse(text) : [];
        } catch {
          console.error("Invalid JSON response:", text);
          data = [];
        }

        setAllProperties(data);
      } catch (err) {
        console.error(err);
        setAllProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ---------------- SCROLL TO FAVORITES ---------------- */
  useEffect(() => {
    if (showFavorites) {
      window.scrollTo({ top: 0, behavior: "auto" });

      setTimeout(() => {
        const el = document.getElementById("properties-section");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  }, [showFavorites]);

  /* ---------------- FILTER DISPLAY ---------------- */
  const displayedProperties = showFavorites
    ? allProperties.filter((p) => p.is_favorited)
    : allProperties.slice(0, 3);

  const categories = [
    {
      icon: HomeIcon,
      title: "Rentals",
      description: "Find your perfect long-term rental home",
      link: "/?type=rent#properties",
    },
    {
      icon: Key,
      title: "Airbnb Stays",
      description: "Book unique short-term accommodations",
      link: "/properties?type=airbnb",
    },
    {
      icon: DollarSign,
      title: "For Sale",
      description: "Discover properties to own",
      link: "/properties?type=sale",
    },
  ];

  const username = localStorage.getItem("username");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Modern luxury home"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/50" />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Find Your Dream{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Property
              </span>
              {username ? `, ${username}` : ""}
            </h1>

            <p className="text-lg text-muted-foreground">
              Discover the perfect place to rent, stay, or own.
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
                to={category.link}
                className="group p-8 rounded-2xl bg-card border hover:shadow-lg transition"
              >
                <category.icon className="h-8 w-8 mb-4 text-primary" />
                <h3 className="text-xl font-semibold">{category.title}</h3>
                <p className="text-muted-foreground">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROPERTIES */}
      <section id="properties-section" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10">
            {showFavorites ? "Your Favorites" : "Featured Properties"}
          </h2>

          {loading ? (
            <p className="text-center">Loading properties...</p>
          ) : displayedProperties.length === 0 ? (
            <p className="text-center text-muted-foreground">
              {showFavorites
                ? "You have no favorites yet."
                : "No properties found."}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  {...property}
                  is_favorited={property.is_favorited} // 🔥 IMPORTANT
                />
              ))}
            </div>
          )}

          {!showFavorites && (
            <div className="mt-10 text-center">
              <Button asChild variant="outline">
                <Link to="/properties">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;