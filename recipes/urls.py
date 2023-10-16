from django.urls import path
from .views import *

urlpatterns = [
    path('add_recipe/', add_recipe, name='add_recipe'),
    path('recipe_list/', recipe_list, name='recipe_list'),
    path('recipe_detail/<int:pk>/', RecipeDetailView.as_view(), name='recipe_detail'),
    path('api/recipes/', get_recipes, name='recipe-list'),

    path('test-features/', get_recipes),
    path('all-recipes/', get_all_recipes),
]
