"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-slate-50">
      <div className="container mx-auto px-4 py-12">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center"
            >
              <Image
                src="/favicon.ico"
                alt="Juvvas"
                width={32}
                height={32}
                className="object-contain block -mr-1"
              />

              <span className="text-xl font-bold tracking-tight leading-none">
                uvvas
              </span>
            </Link>

            <p className="text-sm text-gray-500">
              Your trusted platform for finding the
              perfect property. Rent, stay, or buy
              with confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2">
              <li>
                <Link
                  href="/properties"
                  className="text-sm text-gray-500 hover:text-cyan-600 transition-colors"
                >
                  Browse Properties
                </Link>
              </li>

              <li>
                <Link
                  href="/properties?type=rent"
                  className="text-sm text-gray-500 hover:text-cyan-600 transition-colors"
                >
                  Rentals
                </Link>
              </li>

              <li>
                <Link
                  href="/properties?type=airbnb"
                  className="text-sm text-gray-500 hover:text-cyan-600 transition-colors"
                >
                  Airbnbs
                </Link>
              </li>

              <li>
                <Link
                  href="/properties?type=sale"
                  className="text-sm text-gray-500 hover:text-cyan-600 transition-colors"
                >
                  For Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">
              Company
            </h3>

            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-500 hover:text-cyan-600 transition-colors"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-500 hover:text-cyan-600 transition-colors"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="text-sm text-gray-500 hover:text-cyan-600 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-500 hover:text-cyan-600 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">
              Contact Us
            </h3>

            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-500">
                <Mail className="h-4 w-4" />
                <span>
                  Juvvasofficialonline@gmail.com
                </span>
              </li>

              <li className="flex items-center gap-2 text-sm text-gray-500">
                <Phone className="h-4 w-4" />
                <span>
                  +254 792 001 203
                </span>
              </li>

              <li className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="h-4 w-4" />
                <span>
                  Nairobi, Kenya
                </span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Juvvas.
            All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;