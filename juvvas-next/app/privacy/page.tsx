import Image from "next/image";

export const metadata = {
title: "Privacy Policy | Juvvas",
description:
"Learn how Juvvas collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
return (
  <section className="relative overflow-hidden">
{/* Background */} 
<div className="absolute inset-0 z-0">
     <Image
       src="/hero-home.jpg"
       alt="Privacy Policy"
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
          Privacy Policy
        </span>
      </h1>

      <div className="space-y-8 text-gray-700">

        <div className="bg-white/80 backdrop-blur rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">
            1. Introduction
          </h2>

          <p>
            Juvvas is committed to protecting your privacy and
            safeguarding your personal information. This Privacy
            Policy explains how we collect, use, store, and
            protect information obtained through our platform.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">
            2. Information We Collect
          </h2>

          <p className="mb-4">
            We may collect the following information:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Name and username.</li>
            <li>Email address.</li>
            <li>Phone number.</li>
            <li>Property inquiry information.</li>
            <li>Booking and viewing requests.</li>
            <li>Account and authentication information.</li>
            <li>Technical information such as device and browser data.</li>
          </ul>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">
            3. How We Use Your Information
          </h2>

          <p className="mb-4">
            Juvvas uses collected information to:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Provide access to platform services.</li>
            <li>Facilitate property inquiries and viewings.</li>
            <li>Coordinate rentals, bookings, and purchases.</li>
            <li>Communicate with users regarding their requests.</li>
            <li>Improve platform functionality and security.</li>
            <li>Comply with legal obligations.</li>
          </ul>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">
            4. Communication Through Juvvas
          </h2>

          <p>
            When you submit a property inquiry, booking request,
            rental request, or purchase inquiry, Juvvas
            representatives may contact you using the information
            you provide in order to coordinate and facilitate the
            requested service.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">
            5. Sharing of Information
          </h2>

          <p>
            Juvvas does not sell personal information. We may
            share relevant information with property owners,
            property managers, or authorized representatives when
            necessary to facilitate viewings, rentals, bookings,
            purchases, or related property services.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">
            6. Data Security
          </h2>

          <p>
            We implement reasonable technical and organizational
            measures to protect personal information from
            unauthorized access, disclosure, alteration, or
            destruction. However, no internet-based service can
            guarantee absolute security.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">
            7. Cookies and Analytics
          </h2>

          <p>
            Juvvas may use cookies and similar technologies to
            improve user experience, remember preferences, and
            analyze website performance.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">
            8. Your Rights
          </h2>

          <p className="mb-4">
            Depending on applicable laws, you may have the right
            to:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Access your personal information.</li>
            <li>Request correction of inaccurate information.</li>
            <li>Request deletion of your account information.</li>
            <li>Withdraw consent where applicable.</li>
          </ul>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">
            9. Changes to This Policy
          </h2>

          <p>
            Juvvas may update this Privacy Policy from time to
            time. Updated versions will be published on this page,
            and continued use of the platform constitutes
            acceptance of the revised policy.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">
            10. Contact Information
          </h2>

          <p>
            For questions regarding this Privacy Policy, please
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
