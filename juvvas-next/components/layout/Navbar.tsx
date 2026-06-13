"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { refreshAccessToken } from "@/lib/auth";

import {
  Menu,
  X,
  Heart,
  LogOut,
  LogIn,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const router = useRouter();

  /* ---------------- CHECK AUTH ---------------- */
  useEffect(() => {
  const checkAuth = async () => {
    let token = localStorage.getItem("access");

    if (!token) {
      const newToken = await refreshAccessToken();

      if (!newToken) {
        setIsLoggedIn(false);
        setIsAdmin(false);
        return;
      }

      token = newToken;
    }

    setIsLoggedIn(true);

    setIsAdmin(
      localStorage.getItem("is_staff") === "true"
    );
  };

  checkAuth();

  const handleAuthChange = () => {
    checkAuth();
  };

  window.addEventListener(
    "authChanged",
    handleAuthChange
  );

  window.addEventListener(
    "storage",
    handleAuthChange
  );

  return () => {
    window.removeEventListener(
      "authChanged",
      handleAuthChange
    );

    window.removeEventListener(
      "storage",
      handleAuthChange
    );
  };
}, []);

  /* ---------------- LOGOUT ---------------- */
  const handleLogout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("username");
  localStorage.removeItem("is_staff");

  setIsLoggedIn(false);
  setIsAdmin(false);

  window.dispatchEvent(
    new Event("authChanged")
  );

  router.push("/auth");
};

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">

          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center"
          >
            <Image
              src="/FAVICONJUVVAS2.png"
              alt="Juvvas"
              width={32}
              height={32}
              className="object-contain block -mr-1"
            />

            <span className="text-xl font-bold tracking-tight leading-none hover:text-cyan-600 transition-colors">
              uvvas
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/properties"
              className="text-sm font-medium text-gray-600 hover:text-cyan-600 transition-colors"
            >
              Browse Properties
            </Link>

            <Link
              href="/properties?type=rent"
              className="text-sm font-medium text-gray-600 hover:text-cyan-600 transition-colors"
            >
              Rentals
            </Link>

            <Link
              href="/properties?type=airbnb"
              className="text-sm font-medium text-gray-600 hover:text-cyan-600 transition-colors"
            >
              Airbnbs
            </Link>

            <Link
              href="/properties?type=sale"
              className="text-sm font-medium text-gray-600 hover:text-cyan-600 transition-colors"
            >
              For Sale
            </Link>
          </div>

          {/* DESKTOP ACTIONS */}
          <div className="hidden md:flex items-center space-x-4">

            <Button
              variant="ghost"
              asChild
              className="flex items-center gap-2"
            >
              <Link href="/?favorites=1">
                <Heart className="h-5 w-5" />
                <span>Saved</span>
              </Link>
            </Button>

            {isLoggedIn ? (
              <Button
                variant="destructive"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            ) : (
              <Button variant="outline" asChild>
                <Link
                  href="/auth"
                  className="flex items-center gap-2"
                >
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Link>
              </Button>
            )}

            {isAdmin && (
              <Button asChild>
                <Link href="/dashboard">
                  Dashboard
                </Link>
              </Button>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-cyan-50 transition-colors"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-3 border-t">

            <Link
              href="/properties"
              onClick={() => setIsOpen(false)}
              className="block py-3 px-4 border-b hover:bg-cyan-50 hover:text-cyan-600 transition-colors"
            >
              Browse Properties
            </Link>

            <Link
              href="/properties?type=rent"
              onClick={() => setIsOpen(false)}
              className="block py-3 px-4 border-b hover:bg-cyan-50 hover:text-cyan-600 transition-colors"
            >
              Rentals
            </Link>

            <Link
              href="/properties?type=airbnb"
              onClick={() => setIsOpen(false)}
              className="block py-3 px-4 border-b hover:bg-cyan-50 hover:text-cyan-600 transition-colors"
            >
              Airbnbs
            </Link>

            <Link
              href="/properties?type=sale"
              onClick={() => setIsOpen(false)}
              className="block py-3 px-4 border-b hover:bg-cyan-50 hover:text-cyan-600 transition-colors"
            >
              For Sale
            </Link>

            <Link
              href="/?favorites=1"
              onClick={() => setIsOpen(false)}
              className="block py-3 px-4 hover:bg-cyan-50 hover:text-cyan-600 transition-colors"
            >
              Saved
            </Link>

            <div className="flex flex-col gap-2 px-4 pt-2">

              {isLoggedIn ? (
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="w-full"
                  asChild
                >
                  <Link
                    href="/auth"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                </Button>
              )}

              {isAdmin && (
                <Button
                  className="w-full"
                  asChild
                >
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                </Button>
              )}

            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;