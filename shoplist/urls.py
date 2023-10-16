from django.urls import path

from shoplist.views import *

urlpatterns = [
    path('get_shoplist/', get_shoplist, name='get_shoplist'),
    path('shoplist/', shoplist, name='shoplist'),
]