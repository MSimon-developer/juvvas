import Image from "next/image";

export const metadata = {
  title: "Terms of Service | Juvvas",
  description:
    "Terms and conditions governing the use of the Juvvas platform.",
};

export default function TermsPage() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-home.jpg"
          alt="Terms of Service"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-white/85" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pt-6 pb-20 relative z-10">
        <div className="max-w-5xl mx-auto">

          <h1 className="text-5xl md:text-6xl font-bold mb-10 text-center">
            <span className="bg-gradient-to-r from-cyan-600 to-orange-500 bg-clip-text text-transparent">
              Terms of Service
            </span>
          </h1>

          <div className="space-y-8 text-gray-700">

            <div className="bg-white/80 backdrop-blur rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">
                1. Acceptance of Terms
              </h2>

              <p>
                By accessing or using Juvvas, you agree to be bound
                by these Terms of Service and all applicable laws and
                regulations.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">
                2. Platform Services
              </h2>

              <p>
                Juvvas provides a platform for listing, discovering,
                renting, booking, and purchasing properties. We do
                not own or directly manage the properties listed on
                the platform unless explicitly stated.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">
                3. User Responsibilities
              </h2>

              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate information.</li>
                <li>Maintain account security.</li>
                <li>Use the platform lawfully.</li>
                <li>
                  <b>Communication Through Juvvas</b><br></br>

To promote a secure and transparent experience, users may be contacted by Juvvas representatives regarding inquiries, bookings, viewings, rentals, purchases, or other property-related requests submitted through the platform.

Users agree to provide accurate contact information and to cooperate with reasonable verification procedures when required.

                </li>
              </ul>
            </div>

            <div className="bg-white/80 backdrop-blur rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">
                4. Property Listings
              </h2>

              <p>
             Property Listings<br></br>

Property owners are responsible for providing accurate information when submitting listings. While Juvvas strives to review and maintain accurate property information, we reserve the right to modify, suspend, reject, or remove listings that violate our policies or contain misleading information.

              </p>
            </div>

            <div className="bg-white/80 backdrop-blur rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">
                5. Bookings and Transactions
              </h2>

              <p>
                Bookings, Rentals, and Property Purchases

All rental inquiries, Airbnb bookings, property viewings, and purchase requests submitted through Juvvas are coordinated and facilitated by authorized Juvvas representatives.

Users are encouraged to communicate through official Juvvas channels whenever possible. Juvvas may assist in coordinating appointments, negotiations, and property-related communications, but final agreements remain subject to the terms agreed upon by the relevant parties and applicable laws.

              </p>
            </div>

            <div className="bg-white/80 backdrop-blur rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">
                6. Intellectual Property
              </h2>

              <p>
                All branding, content, logos, and platform features
                are owned by Juvvas and may not be copied,
                distributed, or reproduced without permission.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">
                7. Limitation of Liability
              </h2>

              <p>
                Juvvas shall not be liable for any indirect,
                incidental, or consequential damages arising from the
                use of the platform or interactions between users.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">
                8. Changes to These Terms
              </h2>

              <p>
                We reserve the right to update or modify these Terms
                of Service at any time. Continued use of the platform
                constitutes acceptance of the updated terms.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">
                9. Contact Information
              </h2>

              <p>
                For questions regarding these Terms of Service,
                contact:
              </p>

              <div className="mt-4 space-y-2">
                <p>Email: juvvasofficialonline@gmail.com</p>
                <p>Phone: +254 792 001 203</p>
                <p>Location: Nairobi, Kenya</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}