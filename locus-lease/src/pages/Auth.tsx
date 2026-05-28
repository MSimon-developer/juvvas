import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

/* ================= TOKEN REFRESH ================= */
export const refreshAccessToken = async () => {
  const refresh = localStorage.getItem("refresh");

  if (!refresh) return null;

  try {
    const res = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh }),
    });

    if (!res.ok) {
      // ❌ Refresh expired → clear session
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("username");
      return null;
    }

    const data = await res.json();

    localStorage.setItem("access", data.access);

    return data.access;
  } catch {
    return null;
  }
};

/* ================= CONFIG ================= */
const API_BASE = "http://127.0.0.1:8000/auth";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  /* ================= SIGN IN ================= */
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    try {
      const res = await fetch(`${API_BASE}/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Login failed");
      }

      /* ✅ STORE TOKENS */
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      /* ✅ STORE USERNAME */
      if (data.user && data.user.username) {
        localStorage.setItem("username", data.user.username);
        localStorage.setItem("is_staff", data.user.is_staff);
      }

      toast({
        title: "Welcome back 👋",
        description: "You are now signed in.",
      });

      navigate("/");
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: err.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  /* ================= SIGN UP ================= */
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.currentTarget;
    const username = (form.elements.namedItem("username") as HTMLInputElement)
      .value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    const confirm = (form.elements.namedItem("confirm") as HTMLInputElement)
      .value;

    if (password !== confirm) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Passwords do not match",
      });
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          phone,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.detail || JSON.stringify(data) || "Signup failed"
        );
      }

      toast({
        title: "Account created 🎉",
        description: "You can now sign in.",
      });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: err.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <Home className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">Juvvas</span>
        </Link>

        <Tabs defaultValue="signin">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {/* SIGN IN */}
          <TabsContent value="signin">
            <Card>
              <CardHeader>
                <CardTitle>Welcome back</CardTitle>
                <CardDescription>Sign in to continue</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <Label>Email</Label>
                    <Input name="email" type="email" required />
                  </div>
                  <div>
                    <Label>Password</Label>
                    <Input name="password" type="password" required />
                  </div>
                  <Button className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SIGN UP */}
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Create account</CardTitle>
                <CardDescription>Get started today</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div>
                    <Label>Username</Label>
                    <Input name="username" required />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input name="email" type="email" required />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input name="phone" required />
                  </div>
                  <div>
                    <Label>Password</Label>
                    <Input name="password" type="password" required />
                  </div>
                  <div>
                    <Label>Confirm Password</Label>
                    <Input name="confirm" type="password" required />
                  </div>
                  <Button className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating..." : "Create Account"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;