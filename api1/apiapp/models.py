from django.db import models
from django.conf import settings
from django.db import models
from django.core.exceptions import ValidationError
from django.utils.timezone import now
User = settings.AUTH_USER_MODEL



class Property(models.Model):
    PROPERTY_TYPES = [
        ('rent', 'For Rent'),
        ('sale', 'For Sale'),
        ('airbnb', 'Airbnb'),
    ]

    title = models.CharField(max_length=255)
    price = models.CharField(max_length=50)
    latitude = models.DecimalField(
        max_digits=20, decimal_places=9, null=True, blank=True
    )
    longitude = models.DecimalField(
        max_digits=20, decimal_places=9, null=True, blank=True
    )
    location = models.CharField(max_length=255)
    beds = models.IntegerField()
    baths = models.IntegerField()
    size = models.IntegerField()  # sqft
    type = models.CharField(max_length=20, choices=PROPERTY_TYPES)

    # ⭐ MAIN IMAGE (USED ON HOME PAGE)
    main_image = models.ImageField(
        upload_to="property_images/",
        blank=True,
        null=True
    )

    def __str__(self):
        return self.title


class PropertyImage(models.Model):
    property = models.ForeignKey(
        Property,
        related_name="images",
        on_delete=models.CASCADE
    )
    image = models.ImageField(upload_to="property_images/")

    def __str__(self):
        return f"Image for {self.property.title}"



class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bookings")
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name="bookings")

    check_in = models.DateField()
    check_out = models.DateField()

    guests = models.PositiveIntegerField(default=1)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def clean(self):
        if self.check_in >= self.check_out:
            raise ValidationError("Check-out date must be after check-in date.")

    
        overlapping = Booking.objects.filter(
            property=self.property,
            check_in__lt=self.check_out,
            check_out__gt=self.check_in,
        ).exclude(pk=self.pk)

        if overlapping.exists():
            raise ValidationError("This property is already booked for these dates.")

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.property.title} | {self.check_in} → {self.check_out}"

class Favorite(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="favorites")
    property = models.ForeignKey("Property", on_delete=models.CASCADE, related_name="favorited_by")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "property")  # prevents duplicates

    def __str__(self):
        return f"{self.user} ❤️ {self.property}"