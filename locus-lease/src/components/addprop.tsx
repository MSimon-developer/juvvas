import { useState } from "react";
import axios from "axios";

const UploadProperty = () => {
  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState<string | null>(
    null
  );

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

  const [mainImage, setMainImage] =
    useState<File | null>(null);

  const [images, setImages] = useState<File[]>([]);

  /* ---------------- HANDLE INPUTS ---------------- */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ---------------- MAIN IMAGE ---------------- */
  const handleMainImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      setMainImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  /* ---------------- MULTIPLE IMAGES ---------------- */
  const handleImages = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  /* ---------------- LOCATION ---------------- */
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          latitude:
            position.coords.latitude.toString(),
          longitude:
            position.coords.longitude.toString(),
        }));
      },
      () => {
        alert("Could not fetch location");
      }
    );
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem(
        "access"
      )?.replace(/"/g, "");

      if (!token) {
        alert("Please login first");
        return;
      }

      const data = new FormData();

      /* TEXT FIELDS */
      data.append("title", formData.title);
      data.append("price", formData.price);
      data.append("location", formData.location);
      data.append("type", formData.type);

      /* NUMBERS */
      if (formData.latitude) {
        data.append(
          "latitude",
          formData.latitude
        );
      }

      if (formData.longitude) {
        data.append(
          "longitude",
          formData.longitude
        );
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

      /* MAIN IMAGE */
      if (mainImage) {
        data.append(
          "main_image",
          mainImage
        );
      }

      /* MULTIPLE IMAGES */
      images.forEach((img) => {
        data.append("images", img);
      });

      /* DEBUG */
      for (let pair of data.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/propertiescreate/",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      alert("Property uploaded successfully");

      /* RESET */
      setFormData({
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

      setMainImage(null);
      setImages([]);
      setPreview(null);

    } catch (error: any) {
      console.log(
        "STATUS:",
        error.response?.status
      );

      console.log(
        "ERROR DATA:",
        error.response?.data
      );

      console.log("FULL ERROR:", error);

      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold mb-8">
          Upload Property
        </h1>

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

          {/* LAT/LONG */}
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

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-72 object-cover rounded-xl mt-4"
              />
            )}
          </div>

          {/* MULTIPLE IMAGES */}
          <div>
            <label className="font-medium">
              Gallery Images
            </label>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImages}
              className="w-full border rounded-lg p-3 mt-2"
            />

            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">

                {images.map((img, index) => (
                  <img
                    key={`${img.name}-${index}`}
                    src={URL.createObjectURL(img)}
                    alt="Preview"
                    className="h-32 w-full object-cover rounded-lg"
                  />
                ))}
              </div>
            )}
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-xl text-lg font-semibold"
          >
            {loading
              ? "Uploading..."
              : "Upload Property"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default UploadProperty;