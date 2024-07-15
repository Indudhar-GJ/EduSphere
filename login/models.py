from django.db import models
# Create your models here.


class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone_number = models.CharField(max_length=15)
    is_subscribed = models.BooleanField(default=False)

    def __str__(self):
        return self.name
