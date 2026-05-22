from rest_framework import serializers
from .models import Booking, Property, PropertyImage


# ---------------- BOOKING SERIALIZER ---------------- #
class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = [
            "id",
            "property",
            "check_in",
            "check_out",
            "guests",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)


# ---------------- PROPERTY IMAGE SERIALIZER ---------------- #
class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ["id", "image"]


# ---------------- PROPERTY SERIALIZER ---------------- #
class PropertySerializer(serializers.ModelSerializer):

    # multiple uploaded images
    images = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True,
        required=False
    )

    # images returned from database
    property_images = PropertyImageSerializer(
        source="images",
        many=True,
        read_only=True
    )

    class Meta:
        model = Property

        fields = [
            "id",
            "title",
            "price",
            "latitude",
            "longitude",
            "location",
            "beds",
            "baths",
            "size",
            "type",
            "main_image",
            "images",
            "property_images",
        ]

    def create(self, validated_data):

        # remove uploaded images from validated data
        uploaded_images = validated_data.pop("images", [])

        # create property first
        property_instance = Property.objects.create(
            **validated_data
        )

        # save multiple gallery images
        for image in uploaded_images:
            PropertyImage.objects.create(
                property=property_instance,
                image=image
            )

        return property_instance