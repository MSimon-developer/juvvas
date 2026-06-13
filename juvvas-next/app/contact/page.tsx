import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata = {
title: "Contact Us | Juvvas",
description:
"Get in touch with Juvvas for property inquiries, rentals, bookings, and purchases.",
};

export default function ContactPage() {
return ( <section className="relative overflow-hidden">
{/* Background */} <div className="absolute inset-0 z-0"> <Image
       src="/hero-home.jpg"
       alt="Contact Juvvas"
       fill
       priority
       className="object-cover"
     />

```
    <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-white/85" />
  </div>

  {/* Content */}
  <div className="container mx-auto px-4 pt-6 pb-20 relative z-10">
    <div className="max-w-5xl mx-auto">

      <h1 className="text-5xl md:text-6xl font-bold mb-8 text-center">
        <span className="bg-gradient-to-r from-cyan-600 to-orange-500 bg-clip-text text-transparent">
          Contact Us
        </span>
      </h1>

      <p className="text-center text-lg text-gray-700 mb-12">
        Whether you're looking to rent, book an Airbnb stay,
        purchase a property, schedule a viewing, or list your
        property with us, our team is ready to assist.
      </p>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white/80 backdrop-blur rounded-2xl p-8 shadow-lg text-center">
          <Phone className="h-10 w-10 mx-auto mb-4 text-cyan-600" />

          <h2 className="text-xl font-bold mb-2">
            Phone
          </h2>

          <p>+254 792 001 203</p>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-2xl p-8 shadow-lg text-center">
          <Mail className="h-10 w-10 mx-auto mb-4 text-orange-500" />

          <h2 className="text-xl font-bold mb-2">
            Email
          </h2>

          <p>juvvasofficialonline@gmail.com</p>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-2xl p-8 shadow-lg text-center">
          <MapPin className="h-10 w-10 mx-auto mb-4 text-cyan-600" />

          <h2 className="text-xl font-bold mb-2">
            Location
          </h2>

          <p>Nairobi, Kenya</p>
        </div>

      </div>

      <div className="mt-12 bg-white/80 backdrop-blur rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          How We Can Help
        </h2>

        <ul className="list-disc pl-6 space-y-3">
          <li>Property rentals</li>
          <li>Airbnb bookings</li>
          <li>Property purchases</li>
          <li>Property viewings</li>
          <li>Property listing assistance</li>
          <li>General inquiries and support</li>
        </ul>
      </div>

    </div>
  </div>
</section>

);
}
