"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phone = "254792001203";

  return (
    <a
      href={`https://wa.me/${phone}`}
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed
        bottom-6
        right-6
        z-50
        flex
        items-center
        gap-2
        bg-green-500
        hover:bg-green-600
        text-white
        px-4
        py-3
        rounded-full
        shadow-lg
        transition-all
      "
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">
        WhatsApp Us
      </span>
    </a>
  );
}