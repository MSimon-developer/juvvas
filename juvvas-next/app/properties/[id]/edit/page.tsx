"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Property {
  id: number;
  title: string;
  price: string;
  latitude: number | string | null;
  longitude: number | string | null;
  location: string;
  beds: number | string;
  baths: number | string;
  size: number | string;
  type: "rent" | "sale" | "airbnb";
  main_image?: string | null;
  images?: string[];
}

const EditProperty = () => {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [property, setProperty] = useState<Property | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    latitude: "",
    longitude: "",
    location: "",
    beds: "",
    baths: "",
    size: "",
    type: "rent",
  });

  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] =
    useState<string | null>(null);

  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // --------------------------------------------------
  // FETCH PROPERTY
  // --------------------------------------------------

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const token = localStorage
          .getItem("access")
          ?.replace(/"/g, "");

        if (!token) {
          alert("Please login first");
          router.push("/login");
          return;
        }

        const response = await fetch(
          `https://juvvas.com/api/properties/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            alert("Your session has expired. Please login again.");
            router.push("/login");
            return;
          }

          if (response.status === 403) {
            alert("You do not have permission to edit this property.");
            router.push("/dashboard");
            return;
          }

          throw new Error("Failed to load property");
        }

        const data = await response.json();

        console.log("Property:", data);

        setProperty(data);

        setFormData({
          title: data.title || "",
          price: data.price || "",
          latitude:
            data.latitude !== null && data.latitude !== undefined
              ? String(data.latitude)
              : "",
          longitude:
            data.longitude !== null && data.longitude !== undefined
              ? String(data.longitude)
              : "",
          location: data.location || "",
          beds:
            data.beds !== null && data.beds !== undefined
              ? String(data.beds)
              : "",
          baths:
            data.baths !== null && data.baths !== undefined
              ? String(data.baths)
              : "",
          size:
            data.size !== null && data.size !== undefined
              ? String(data.size)
              : "",
          type: data.type || "rent",
        });

        if (data.main_image) {
          setMainImagePreview(data.main_image);
        }
      } catch (error) {
        console.error(error);
        alert("Could not load property.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id, router]);

  // --------------------------------------------------
  // HANDLE INPUTS
  // --------------------------------------------------

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // --------------------------------------------------
  // MAIN IMAGE
  // --------------------------------------------------

  const handleMainImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setMainImage(file);

    const previewUrl = URL.createObjectURL(file);
    setMainImagePreview(previewUrl);
  };

  // --------------------------------------------------
  // GALLERY IMAGES
  // --------------------------------------------------

  const handleImages = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);

    setImages(selectedFiles);

    const previews = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );

    setImagePreviews(previews);
  };

  // --------------------------------------------------
  // CURRENT LOCATION
  // --------------------------------------------------

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
        }));
      },
      () => {
        alert("Could not fetch location.");
      }
    );
  };

  // --------------------------------------------------
  // UPDATE PROPERTY
  // --------------------------------------------------

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setSaving(true);

      const token = localStorage
        .getItem("access")
        ?.replace(/"/g, "");

      if (!token) {
        alert("Please login first");
        router.push("/login");
        return;
      }

      const data = new FormData();

      // Text fields
      data.append("title", formData.title);
      data.append("price", formData.price);
      data.append("location", formData.location);
      data.append("type", formData.type);

      // Numbers
      if (formData.latitude) {
        data.append("latitude", formData.latitude);
      }

      if (formData.longitude) {
        data.append("longitude", formData.longitude);
      }

      if (formData.beds) {
        data.append("beds", formData.beds);
      }

      if (formData.baths) {
        data.append("baths", formData.baths);
      }

      if (formData.size) {
        data.append("size", formData.size);
      }

      // Replace main image only if user selected a new one
      if (mainImage) {
        data.append("main_image", mainImage);
      }

      // Add new gallery images
      images.forEach((image) => {
        data.append("images", image);
      });

      // Debug
      for (const pair of data.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await fetch(
        `https://juvvas.com/api/properties/${id}/update/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        console.error("Update error:", errorData);

        if (response.status === 403) {
          alert(
            "You do not have permission to update this property."
          );
          return;
        }

        if (response.status === 401) {
          alert(
            "Your session has expired. Please login again."
          );
          router.push("/login");
          return;
        }

        throw new Error(
          errorData?.error || "Update failed"
        );
      }

      const result = await response.json();

      console.log("Updated:", result);

      alert("Property updated successfully.");

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to update property.");
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-lg font-medium">
          Loading property...
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // PROPERTY NOT FOUND
  // --------------------------------------------------

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            Property not found
          </h1>

          <button
            onClick={() => router.push("/dashboard")}
            className="mt-4 bg-black text-white px-5 py-3 rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // FORM
  // --------------------------------------------------

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            Edit Property
          </h1>

          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Back
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* TITLE */}

          <div>
            <label className="font-medium">
              Property Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 mt-2"
              placeholder="Modern Apartment"
            />
          </div>

          {/* PRICE + TYPE */}

          <div className="grid md:grid-cols-2 gap-4">

            <div>
              <label className="font-medium">
                Price
              </label>

              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3 mt-2"
                placeholder="Ksh 45,000"
              />
            </div>

            <div>
              <label className="font-medium">
                Property Type
              </label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-2"
              >
                <option value="rent">
                  For Rent
                </option>

                <option value="sale">
                  For Sale
                </option>

                <option value="airbnb">
                  Airbnb
                </option>
              </select>
            </div>

          </div>

          {/* LOCATION */}

          <div>
            <label className="font-medium">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 mt-2"
              placeholder="Westlands, Nairobi"
            />
          </div>

          {/* LATITUDE / LONGITUDE */}

          <div className="grid md:grid-cols-2 gap-4">

            <div>
              <label className="font-medium">
                Latitude
              </label>

              <input
                type="text"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

            <div>
              <label className="font-medium">
                Longitude
              </label>

              <input
                type="text"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

          </div>

          <button
            type="button"
            onClick={getCurrentLocation}
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            Use Current Location
          </button>

          {/* BEDS / BATHS / SIZE */}

          <div className="grid md:grid-cols-3 gap-4">

            <div>
              <label className="font-medium">
                Beds
              </label>

              <input
                type="number"
                name="beds"
                value={formData.beds}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

            <div>
              <label className="font-medium">
                Baths
              </label>

              <input
                type="number"
                name="baths"
                value={formData.baths}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

            <div>
              <label className="font-medium">
                Size
              </label>

              <input
                type="number"
                name="size"
                value={formData.size}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

          </div>

          {/* MAIN IMAGE */}

          <div>
            <label className="font-medium">
              Main Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleMainImage}
              className="w-full border rounded-lg p-3 mt-2"
            />

            {mainImagePreview && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">
                  Current / New Main Image
                </p>

                <img
                  src={mainImagePreview}
                  alt="Main property"
                  className="w-full h-72 object-cover rounded-xl"
                />
              </div>
            )}
          </div>

          {/* NEW GALLERY IMAGES */}

          <div>
            <label className="font-medium">
              Add Gallery Images
            </label>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImages}
              className="w-full border rounded-lg p-3 mt-2"
            />

            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">

                {imagePreviews.map(
                  (image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`New image ${index + 1}`}
                      className="h-32 w-full object-cover rounded-lg"
                    />
                  )
                )}

              </div>
            )}
          </div>

          {/* UPDATE */}

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-black text-white py-4 rounded-xl text-lg font-semibold disabled:opacity-50"
          >
            {saving
              ? "Updating..."
              : "Update Property"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default EditProperty;