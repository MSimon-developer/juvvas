from django.urls import path
from .views import get_properties,home, get_property_detail
from .views import BookAirbnbView, FavoriteToggleView, FavoriteListView, AllBookingsView, PropertyListCreateView

urlpatterns = [
    path('', home), 
    path('properties/', get_properties),
    path('properties/<int:pk>/', get_property_detail, name='property-detail'),
    path("bookings/", BookAirbnbView.as_view(), name="book-airbnb"),
    path("favorites/", FavoriteListView.as_view(), name="favorite-list"),
    path("favorites/toggle/<int:pk>/", FavoriteToggleView.as_view(), name="favorite-toggle"),
    path("bookiings/", AllBookingsView.as_view()),
    path(
        "propertiescreate/",
        PropertyListCreateView.as_view(),
        name="properties"
    ),
]

 


