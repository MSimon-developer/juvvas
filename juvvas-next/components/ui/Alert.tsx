"use client";

interface AlertProps {
  message: string;
}

export default function Alert({
  message,
}: AlertProps) {
  return (
    <div
      className={`fixed top-4 right-4 z-50 rounded-lg bg-black text-white px-4 py-2 shadow-lg transition-all duration-300 ${
        message
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-2 pointer-events-none"
      }`}
    >
      {message}
    </div>
  );
}