import Image from "next/image";

export const metadata = {
  title: "About Us | Juvvas",
  description:
    "Learn more about Juvvas, Kenya's trusted platform for rentals, Airbnb stays, and properties for sale.",
};

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-home.jpg"
            alt="Juvvas Properties"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-white/85" />
        </div>

        {/* CONTENT */}
        <div className="container mx-auto px-4 py-10 relative z-10">
          <div className="max-w-5xl mx-auto">

            <h1 className="text-5xl md:text-6xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-cyan-600 to-orange-500 bg-clip-text text-transparent">
                About Juvvas
              </span>
            </h1>

            <div className="space-y-8 text-lg text-gray-700">

              <p>
               Juvvas is a modern property platform dedicated to helping individuals and families find quality homes, rental properties, Airbnb stays, and real estate investment opportunities across Kenya.

Unlike traditional listing websites, Juvvas actively facilitates property transactions through authorized representatives. Whether you are looking for a long-term rental, a short-term stay, or a property to purchase, our team helps coordinate inquiries, property viewings, bookings, and purchase discussions to ensure a smooth and secure experience.

              </p>

              <p>
                We believe that finding a property should be simple,
                transparent, and stress-free. Whether you are looking
                for a long-term rental, a short-term stay, or a
                property to purchase, Juvvas brings everything
                together in one convenient platform.
              </p>

              <div className="bg-white/80 backdrop-blur rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold mb-4">
                  Our Mission
                </h2>

                <p>
                  ### Our Mission

Our mission is to simplify the property search process by providing a trusted platform where every rental inquiry, property viewing, booking, and purchase request is professionally facilitated through Juvvas representatives. We strive to create transparency, convenience, and confidence for both property owners and property seekers.

                </p>
              </div>

              <div className="bg-white/80 backdrop-blur rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold mb-4">
                  What We Offer
                </h2>

                <p></p>How Juvvas Works<br></br>

1. Property owners submit properties for listing on the platform.<br></br>
2. Juvvas reviews and publishes approved listings.<br></br>
3. Interested clients submit inquiries through Juvvas.<br></br>
4. A Juvvas representative coordinates property viewings, bookings, rentals, or purchase discussions.<br></br>
5. Transactions are guided through official Juvvas communication channels to promote security and transparency.<br></br>

Our goal is to ensure that every interaction on the platform is supported by professional assistance from the Juvvas team.

              </div>

              <div className="bg-white/80 backdrop-blur rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold mb-4">
                  Why Choose Juvvas?
                </h2>

                <ul className="space-y-3 list-disc pl-6">
                  <li>Easy-to-use property search experience</li>
                  <li>Wide range of property options</li>
                  <li>Responsive customer support</li>
                  <li>Modern and secure platform</li>
                  <li>Trusted by property seekers across Kenya</li>
                </ul>
              </div>

              <div className="bg-white/80 backdrop-blur rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold mb-4">
                  Contact Us
                </h2>

                <p>
                  Email:
                  <br />
                  Juvvasofficialonline@gmail.com
                </p>

                <p className="mt-4">
                  Phone:
                  <br />
                  +254 792 001 203
                </p>

                <p className="mt-4">
                  Location:
                  <br />
                  Nairobi, Kenya
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}