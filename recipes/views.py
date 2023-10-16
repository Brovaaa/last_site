import json

from django.core import serializers
from django.core.paginator import Paginator
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.template.loader import render_to_string
from django.views.generic import CreateView, DetailView
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from recipes.forms import RecipeForm
from recipes.models import Recipe, Ingredient
from .serializer import RecipeSerializer


def add_recipe(request):
    if request.method == 'POST':
        form = RecipeForm(request.POST)
        if form.is_valid():
            recipe = form.save(commit=False)
            recipe.save()
            return redirect('recipe_list')  # Redirect to a list of recipes
    else:
        form = RecipeForm()
    return render(request, 'add_recipe.html', {'form': form})


def recipe_list(request):
    recipes = Recipe.objects.all()
    return render(request, 'recipe_list.html', {'recipes': recipes})


class RecipeDetailView(DetailView):
    model = Recipe
    template_name = 'recipe_detail.html'
    context_object_name = 'recipe'



#               fetching data from django to js

from django.http import JsonResponse
from django.core.serializers.json import DjangoJSONEncoder
from .models import Recipe


def get_recipes(request):
    print("AAAAAAAAAAAAAAAAAAAA")
    all_recipes = Recipe.objects.all()

    recipes_len = len(all_recipes) #needed for quantity of buttons
    paginator = Paginator(all_recipes, per_page=2)
    page_number = request.GET.get('page')   #to get current page

    # Get the Page object for the current page
    page = paginator.get_page(page_number)

    if request.GET.get('html'):
        return render(request, 'test.html', {'page': page, 'recipes': paginator.object_list})

    # serialized_object_list = serializers.serialize('json', page.object_list)
    serialized_recipes = RecipeSerializer(page.object_list, many=True).data
    serialized_recipes = json.dumps(serialized_recipes)#by trial and error this method converts to JSON i need

    json_response_data = {
        'list_len': recipes_len,
        'page_number': page.number,
        'page_count': paginator.num_pages,
        'recipes': serialized_recipes,
    }

    return JsonResponse(json_response_data, safe=False)
    # return JsonResponse({'recipes': serialized_recipes}, safe=False) would use that only if i needed to send data without rendering HTML


# def get_all_recipes(request):
# '''was used before to send all data...below is it is ChatGPT version '''
#     all_recipes = Recipe.objects.all().values()
#     all_recipes = serializers.RecipeSerializer(all_recipes)
#     if request.GET.get('html'):
#         return render(request, 'test.html',)
#
#     return JsonResponse(list(all_recipes), safe=False)

@api_view(['GET'])#ensures that it only can be caused by GET request
def get_all_recipes(request):
    all_recipes = Recipe.objects.all()
    serializer = RecipeSerializer(all_recipes, many=True)

    if request.GET.get('html'):
        return render(request, 'shoplist.html', {'recipes': serializer.data})

    return Response(serializer.data, status=status.HTTP_200_OK)