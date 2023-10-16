from django.db import models
from accounts.models import CustomUser


class Shoplist(models.Model):
    user = models.ForeignKey(CustomUser, on_delete= models.CASCADE)
    dish_title = models.CharField(max_length=255)
    bought = models.BooleanField(default=False)
    eaten = models.BooleanField(default=False)
    skipped = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
