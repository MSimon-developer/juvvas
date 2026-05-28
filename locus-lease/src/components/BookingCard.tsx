//import { useState } from "react";
/*  import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BookingCardProps {
  propertyId: number;
}

const BookingCard = ({ propertyId }: BookingCardProps) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    const token = localStorage.getItem("access");

    if (!token) {
      setMessage("❌ Please login to book.");
      return;
    }

    if (!checkIn || !checkOut) {
      setMessage("❌ Please select dates.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://127.0.0.1:8000/bookings/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          property: propertyId,
          check_in: checkIn,
          check_out: checkOut,
          guests,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Booking failed");
      }

      setMessage("✅ Booking confirmed!");
      setCheckIn("");
      setCheckOut("");
      setGuests(1);
    } catch (err: any) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <h3 className="text-xl font-bold">Book this Airbnb</h3>

        <div>
          <Label>Check-in</Label>
          <Input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
        </div>

        <div>
          <Label>Check-out</Label>
          <Input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
        </div>

        <div>
          <Label>Guests</Label>
          <Input
            type="number"
            min={1}
            value={guests}
            onChange={e => setGuests(Number(e.target.value))}
          />
        </div>

        <Button
          className="w-full"
          onClick={handleBooking}
          disabled={loading}
        >
          {loading ? "Booking..." : "Book Now"}
        </Button>

        {message && (
          <p className="text-sm text-center">{message}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingCard;*/
