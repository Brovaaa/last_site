from django.urls import path, include
from .views import *

urlpatterns = [
    path('start/', start, name='start'),
    path('', home, name='home'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('sign_up/', sign_up_view, name='sign_up'),

]