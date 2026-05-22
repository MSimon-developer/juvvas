from django.contrib import admin
from .models import Property,PropertyImage,Booking,Favorite

admin.site.register(Property)
admin.site.register(PropertyImage)
admin.site.register(Booking)
admin.site.register(Favorite)