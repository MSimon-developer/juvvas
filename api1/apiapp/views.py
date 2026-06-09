from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.db.models import Prefetch, Q

from rest_framework import generics, status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import (
    Property,
    PropertyImage,
    Booking,
    Favorite,
)
from .serializers import PropertySerializer


def home(request):
    return JsonResponse({"message": "API Home"})


@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([AllowAny])
def get_properties(request):
    properties = Property.objects.all()

    print("USER:", request.user)
    print("AUTH:", request.user.is_authenticated)
    print("AUTH HEADER:", request.META.get("HTTP_AUTHORIZATION"))

    data = []

    for p in properties:
        is_favorited = False

        if request.user.is_authenticated:
            is_favorited = Favorite.objects.filter(
                user=request.user,
                property=p
            ).exists()

        data.append({
            "id": p.id,
            "title": p.title,
            "price": p.price,
            "location": p.location,
            "beds": p.beds,
            "baths": p.baths,
            "area": p.size,
            "type": p.type,
            "image": (
                request.build_absolute_uri(p.main_image.url)
                if p.main_image else None
            ),
            "is_favorited": is_favorited,
        })

    return Response(data)


@api_view(["GET"])
def get_property_detail(request, pk):
    property = get_object_or_404(
        Property.objects.prefetch_related(
            Prefetch(
                "images",
                queryset=PropertyImage.objects.only("image")
            )
        ),
        pk=pk
    )

    is_favorited = False

    if request.user.is_authenticated:
        is_favorited = Favorite.objects.filter(
            user=request.user,
            property=property
        ).exists()

    data = {
        "id": property.id,
        "title": property.title,
        "price": property.price,
        "location": property.location,
        "beds": property.beds,
        "baths": property.baths,
        "area": property.size,
        "type": property.type,
        "latitude": property.latitude,
        "longitude": property.longitude,
        "images": [
            request.build_absolute_uri(img.image.url)
            for img in property.images.all()
        ],
        "is_favorited": is_favorited,
    }

    return Response(data)


class BookAirbnbView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        property_id = request.data.get("property")
        check_in = request.data.get("check_in")
        check_out = request.data.get("check_out")
        guests = request.data.get("guests", 1)

        if not all([property_id, check_in, check_out]):
            return Response(
                {"detail": "Missing booking fields"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        property = Property.objects.filter(
            id=property_id,
            type="airbnb",
        ).first()

        if not property:
            return Response(
                {"detail": "Invalid Airbnb property"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        overlap = Booking.objects.filter(
            property=property,
            check_in__lt=check_out,
            check_out__gt=check_in,
        ).exists()

        if overlap:
            return Response(
                {"detail": "Property already booked for selected dates"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        Booking.objects.create(
            user=request.user,
            property=property,
            check_in=check_in,
            check_out=check_out,
            guests=guests,
        )

        return Response(
            {"detail": "Booking successful"},
            status=status.HTTP_201_CREATED,
        )


class AllBookingsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        bookings = Booking.objects.select_related(
            "user",
            "property",
        )

        data = [
            {
                "username": b.user.username,
                "property": b.property.title,
                "check_in": b.check_in,
                "check_out": b.check_out,
            }
            for b in bookings
        ]

        return Response(data)


class FavoriteToggleView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        prop = get_object_or_404(Property, pk=pk)

        fav = Favorite.objects.filter(
            user=request.user,
            property=prop,
        ).first()

        if fav:
            fav.delete()
            return Response(
                {"favorited": False},
                status=status.HTTP_200_OK,
            )

        Favorite.objects.create(
            user=request.user,
            property=prop,
        )

        return Response(
            {"favorited": True},
            status=status.HTTP_201_CREATED,
        )


class FavoriteListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        favorites = (
            Favorite.objects.filter(user=request.user)
            .select_related("property")
            .order_by("-created_at")
        )

        data = [
            {
                "id": f.property.id,
                "title": f.property.title,
                "price": f.property.price,
                "location": f.property.location,
                "beds": f.property.beds,
                "baths": f.property.baths,
                "area": f.property.size,
                "type": f.property.type,
                "image": (
                    request.build_absolute_uri(
                        f.property.main_image.url
                    )
                    if f.property.main_image
                    else None
                ),
            }
            for f in favorites
        ]

        return Response(
            data,
            status=status.HTTP_200_OK,
        )


class PropertyListCreateView(generics.ListCreateAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer

    parser_classes = (
        MultiPartParser,
        FormParser,
    )
