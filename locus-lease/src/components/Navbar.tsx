import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Heart, LogOut, LogIn } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  /* ---------------- CHECK AUTH ---------------- */
  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(!!localStorage.getItem("access"));
      setIsAdmin(localStorage.getItem("is_staff") === "true");
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);

    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  /* ---------------- LOGOUT ---------------- */
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");
    localStorage.removeItem("is_staff");

    setIsLoggedIn(false);
    setIsAdmin(false);

    navigate("/auth");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center space-x-2">
            <Home className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">Juvvas</span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/properties" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Browse Properties
            </Link>
            <Link to="/properties?type=rent">
              Rentals
            </Link>
            <Link to="/properties?type=airbnb">
              Airbnbs
            </Link>
            <Link to="/properties?type=sale">
              For Sale
            </Link>
          </div>

          {/* DESKTOP ACTIONS */}
          <div className="hidden md:flex items-center space-x-4">

           {/* FAVORITES */}
<Button variant="ghost" asChild className="flex items-center gap-2">
  <Link to="/?favorites=1">
    <Heart className="h-5 w-5" />
    <span>Saved</span>
  </Link>
</Button>
            {/* AUTH */}
            {isLoggedIn ? (
              <Button variant="destructive" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            ) : (
              <Button variant="outline" asChild>
                <Link to="/auth" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Link>
              </Button>
            )}

            {/* DASHBOARD (ADMIN ONLY) */}
            {isAdmin && (
              <Button variant="default" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-accent"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-3 border-t">

            <Link to="/properties" onClick={() => setIsOpen(false)}>
              Browse Properties
            </Link>

            <Link to="/properties?type=rent" onClick={() => setIsOpen(false)}>
              Rentals
            </Link>

            <Link to="/properties?type=airbnb" onClick={() => setIsOpen(false)}>
              Airbnbs
            </Link>

            <Link to="/properties?type=sale" onClick={() => setIsOpen(false)}>
              For Sale
            </Link>

            <Link to="/?favorites=1" onClick={() => setIsOpen(false)}>
              saved
            </Link>

            <div className="flex flex-col gap-2 px-4 pt-2">

              {/* AUTH */}
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
                  onClick={() => setIsOpen(false)}
                >
                  <Link to="/auth">Sign In</Link>
                </Button>
              )}

              {/* DASHBOARD (ADMIN ONLY) */}
              {isAdmin && (
                <Button
                  className="w-full"
                  asChild
                  onClick={() => setIsOpen(false)}
                >
                  <Link to="/dashboard">Dashboard</Link>
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