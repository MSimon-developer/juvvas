"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import PropertyCard from "@/components/property/PropertyCard";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import {
  Home,
  Heart,
  Calendar,
  MessageSquare,
  Plus,
  Eye,
} from "lucide-react";

export default function Dashboard() {
  const [listings, setListings] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("listings");
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("access");

      try {
        const headers: any = {
          "Content-Type": "application/json",
        };

        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        // 🔹 Listings
const resListings = await fetch(
  "https://juvvas.com/api/my-properties/",
  { headers }
);        const listingsData = resListings.ok ? await resListings.json() : [];

        // 🔹 Bookings
        const resBookings = await fetch("/api/bookiings/", { headers });
        const bookingsData = resBookings.ok ? await resBookings.json() : [];

        // 🔹 Favorites
        const resFav = await fetch("/api/favorites/", { headers });
        const favData = resFav.ok ? await resFav.json() : [];

        setListings(listingsData);
        setBookings(bookingsData);
        setFavorites(favData);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <main className="py-8">
    
        <div className="container mx-auto px-4">

          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your properties and bookings
            </p>
          </div>

          {/* ================= STATS ================= */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

            {/* Listings */}
            <Card
              onClick={() => setActiveTab("listings")}
              className="cursor-pointer hover:shadow-md"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">My Listings</CardTitle>
                <Home className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{listings.length}</div>
                <p className="text-xs text-muted-foreground">
                  Your uploaded properties
                </p>
              </CardContent>
            </Card>

            {/* Bookings */}
            <Card
              onClick={() => setActiveTab("bookings")}
              className="cursor-pointer hover:shadow-md"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">Bookings</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{bookings.length}</div>
                <p className="text-xs text-muted-foreground">
                  Your reservations
                </p>
              </CardContent>
            </Card>

            {/* Favorites */}
            <Card
              onClick={() => setActiveTab("favorites")}
              className="cursor-pointer hover:shadow-md"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">Favorites</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{favorites.length}</div>
                <p className="text-xs text-muted-foreground">
                  Saved properties
                </p>
              </CardContent>
            </Card>

            {/* Views (placeholder for now) */}
            <Card className="hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">Total Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">--</div>
                <p className="text-xs text-muted-foreground">
                  Coming soon
                </p>
              </CardContent>
            </Card>

          </div>

          {/* ================= TABS ================= */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList>
              <TabsTrigger value="listings">My Listings</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>

            {/* ================= LISTINGS ================= */}
            <TabsContent value="listings" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">My Listings</h2>
                <Button asChild>
<Link href="/upload-property">
    <Plus className="mr-2 h-4 w-4" />
    Add New Property
  </Link>
</Button>
              </div>

              {loading ? (
                <p>Loading...</p>
              ) : listings.length === 0 ? (
                <p className="text-muted-foreground">No listings yet</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {listings.map((property) => (
                    <PropertyCard key={property.id} {...property} />
                  ))}
                </div>
              )}
            </TabsContent>

            {/* ================= BOOKINGS ================= */}
            <TabsContent value="bookings" className="space-y-6">
              <h2 className="text-2xl font-bold">My Bookings</h2>

              {loading ? (
                <p>Loading...</p>
              ) : bookings.length === 0 ? (
                <p className="text-muted-foreground">No bookings yet</p>
              ) : (
                <div className="space-y-4">
                  {bookings.map((b) => (
                    <Card key={b.id}>
                      <CardContent className="p-4">
                        <p><strong>Property ID:</strong> {b.property}</p>
                        <p><strong>Check-in:</strong> {b.check_in}</p>
                        <p><strong>Check-out:</strong> {b.check_out}</p>
                        <p><strong>Guests:</strong> {b.guests}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* ================= FAVORITES ================= */}
            <TabsContent value="favorites" className="space-y-6">
              <h2 className="text-2xl font-bold">Favorite Properties</h2>

              {loading ? (
                <p>Loading...</p>
              ) : favorites.length === 0 ? (
                <p className="text-muted-foreground">No favorites yet</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favorites.map((property) => (
                    <PropertyCard key={property.id} {...property} />
                  ))}
                </div>
              )}
            </TabsContent>

            {/* ================= MESSAGES ================= */}
            <TabsContent value="messages" className="space-y-6">
              <h2 className="text-2xl font-bold">Messages</h2>
              <Card>
                <CardContent className="p-12 text-center">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
                  <p className="text-muted-foreground">
                    Conversations will appear here
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>
        </div>
      </main>
  )
};

