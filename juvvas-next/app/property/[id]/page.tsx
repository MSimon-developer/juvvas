import PropertyDetailsClient from "@/components/property/PropertyDetailsClient";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PropertyPage({
  params,
}: PageProps) {
  const { id } = await params;

  try {
    const res = await fetch(
      `https://juvvas.com/api/properties/${id}/`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Property not found");
    }

    const property = await res.json();

    return (
      <PropertyDetailsClient
        property={{
          ...property,
          latitude: Number(property.latitude),
          longitude: Number(property.longitude),
          images: property.images || [],
        }}
      />
    );
  } catch (error) {
    console.error(error);

    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold">
          Property not found
        </h1>
      </div>
    );
  }
}