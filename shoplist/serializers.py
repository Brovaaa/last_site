from rest_framework import serializers
from .models import Shoplist


class ShoplistSerializer(serializers.ModelSerializer):

    class Meta:
        model = Shoplist
        fields = "__all__"







