from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):

    STATUS = (
        ("monkey", "monkey"),
        ("middle", "middle"),
        ("crazy", "crazy"),
        ("creator", "creator")
    )

    age = models.IntegerField(null=True, blank=True)
    height = models.IntegerField(null=True, blank=True)
    weight = models.DecimalField(max_digits=4, decimal_places=1,null=True, blank=True)
    status = models.CharField(max_length=100, choices=STATUS, default='monkey')
    description = models.TextField(null=True, blank=True, max_length=690)

    def __str__(self):
        return self.username
