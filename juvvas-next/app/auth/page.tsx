"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Home } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Alert from "@/components/ui/Alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";


/* ================= TOKEN REFRESH ================= */

export const refreshAccessToken = async () => {
  const refresh = localStorage.getItem("refresh");

  if (!refresh) return null;

  try {
    const res = await fetch(
      "https://juvvas.com/api/token/refresh/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh,
        }),
      }
    );

    if (!res.ok) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("username");
      localStorage.removeItem("is_staff");

      return null;
    }

    const data = await res.json();

    localStorage.setItem(
      "access",
      data.access
    );

    return data.access;
  } catch {
    return null;
  }
};

/* ================= CONFIG ================= */

const API_BASE =
  "https://juvvas.com/api/auth";

export default function AuthPage() {
  const [isLoading, setIsLoading] =
  useState(false);

const [message, setMessage] =
  useState("");

  

  const router = useRouter();
  const showMessage = (
  text: string
) => {
  setMessage(text);

  setTimeout(() => {
    setMessage("");
  }, 3000);
};

  /* ================= SIGN IN ================= */

  const handleSignIn = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setIsLoading(true);

    const form = e.currentTarget;

    const email = (
      form.elements.namedItem(
        "email"
      ) as HTMLInputElement
    ).value;

    const password = (
      form.elements.namedItem(
        "password"
      ) as HTMLInputElement
    ).value;

    try {
      const res = await fetch(
        `${API_BASE}/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.detail || "Login failed"
        );
      }

      localStorage.setItem(
        "access",
        data.access
      );

      localStorage.setItem(
        "refresh",
        data.refresh
      );

      if (
        data.user &&
        data.user.username
      ) {
        localStorage.setItem(
          "username",
          data.user.username
        );

        localStorage.setItem(
          "is_staff",
          String(data.user.is_staff)
        );
      }

      showMessage(
  "Welcome! You are now signed in."
);

setTimeout(() => {
  window.dispatchEvent(
  new Event("authChanged")
);
   router.push("/");
  router.refresh();
}, 1000);
    } catch (err: any) {
      showMessage(
  err.message || "Login failed"
);
    } finally {
      setIsLoading(false);
    }
  };

  /* ================= SIGN UP ================= */

  const handleSignUp = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setIsLoading(true);

    const form = e.currentTarget;

    const username = (
      form.elements.namedItem(
        "username"
      ) as HTMLInputElement
    ).value;

    const email = (
      form.elements.namedItem(
        "email"
      ) as HTMLInputElement
    ).value;

    const phone = (
      form.elements.namedItem(
        "phone"
      ) as HTMLInputElement
    ).value;

    const password = (
      form.elements.namedItem(
        "password"
      ) as HTMLInputElement
    ).value;

    const confirm = (
      form.elements.namedItem(
        "confirm"
      ) as HTMLInputElement
    ).value;

    if (password !== confirm) {
      showMessage(
  "Passwords do not match."
);

      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${API_BASE}/register/`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            phone,
            password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.detail ||
            JSON.stringify(data) ||
            "Signup failed"
        );
      }

      showMessage(
  "Account created successfully. You can now sign in."
);
    } catch (err: any) {
      showMessage(
  err?.message ||
  "Unable to create account."
);
    } finally {
      setIsLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
  <>
    <Alert message={message} />

    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md">

        <Link
          href="/"
          className="flex items-center justify-center gap-2 mb-8"
        >
          <Home className="h-8 w-8 text-primary" />

          <span className="text-2xl font-bold">
            Juvvas
          </span>
        </Link>

        <Tabs defaultValue="signin">

          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="signin">
              Sign In
            </TabsTrigger>

            <TabsTrigger value="signup">
              Sign Up
            </TabsTrigger>
          </TabsList>

          {/* SIGN IN */}

          <TabsContent value="signin">
            <Card>
              <CardHeader>
                <CardTitle>
                  Welcome back
                </CardTitle>

                <CardDescription>
                  Sign in to continue
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form
                  onSubmit={
                    handleSignIn
                  }
                  className="space-y-4"
                >
                  <div>
                    <Label>Email</Label>

                    <Input
                      name="email"
                      type="email"
                      required
                    />
                  </div>

                  <div>
                    <Label>
                      Password
                    </Label>

                    <Input
                      name="password"
                      type="password"
                      required
                    />
                  </div>

                  <Button
                    className="w-full"
                    disabled={
                      isLoading
                    }
                  >
                    {isLoading
                      ? "Signing in..."
                      : "Sign In"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SIGN UP */}

          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>
                  Create account
                </CardTitle>

                <CardDescription>
                  Get started today
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form
                  onSubmit={
                    handleSignUp
                  }
                  className="space-y-4"
                >
                  <div>
                    <Label>
                      Username
                    </Label>

                    <Input
                      name="username"
                      required
                    />
                  </div>

                  <div>
                    <Label>Email</Label>

                    <Input
                      name="email"
                      type="email"
                      required
                    />
                  </div>

                  <div>
                    <Label>Phone</Label>

                    <Input
                      name="phone"
                      required
                    />
                  </div>

                  <div>
                    <Label>
                      Password
                    </Label>

                    <Input
                      name="password"
                      type="password"
                      required
                    />
                  </div>

                  <div>
                    <Label>
                      Confirm Password
                    </Label>

                    <Input
                      name="confirm"
                      type="password"
                      required
                    />
                  </div>

                  <Button
                    className="w-full"
                    disabled={
                      isLoading
                    }
                  >
                    {isLoading
                      ? "Creating..."
                      : "Create Account"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  </>
  );
}