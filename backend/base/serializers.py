from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('_id', 'name', 'image', 'brand', 'category', 'description',
                  'rating', 'numReviews', 'price', 'countInStock', 'createdAt')
