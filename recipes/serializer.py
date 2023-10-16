from rest_framework import serializers
from .models import Recipe, Ingredient


class RecipeSerializer(serializers.ModelSerializer):
    # ingredients = IngredientSerializer(many=True)
    # ingredients = serializers.PrimaryKeyRelatedField(queryset=Ingredient.objects.all(), many=True)
    ingredients = serializers.SerializerMethodField()#here i create Custom serialization and function get_ingredients fulfills it
    # the purpose is to return name of ingredient however idk how the data returns itself when for example my ingredient will have an img field

    class Meta:
        model = Recipe
        fields = ("id", "title", "image", "description", "instructions", "ingredients")

    def get_ingredients(self, obj):
        return [ingredient.name for ingredient in obj.ingredients.all()]


class IngredientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ingredient
        fields = ('id', 'name', )




