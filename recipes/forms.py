from django import forms
from .models import Recipe


class RecipeForm(forms.ModelForm):
    class Meta:
        model = Recipe
        fields = ['title', 'description', 'ingredients', 'instructions']
        widgets = {
            'title': forms.Textarea(attrs={'id': 'title'}),
            'description': forms.Textarea(attrs={'id': 'description'}),
            'ingredients': forms.Textarea(attrs={'id': 'ingredients'}),
            'instructions': forms.Textarea(attrs={'id': 'instructions'}),
        }