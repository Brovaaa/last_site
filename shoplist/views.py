from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from shoplist.models import Shoplist
from shoplist.serializers import ShoplistSerializer


@api_view(['GET'])#ensures that it only can be caused by GET request
def get_shoplist(request):
    all_lists = Shoplist.objects.all()
    print("BBBBBBBBBBBBBBBBB")
    print(all_lists)
    serializer = ShoplistSerializer(all_lists)

    if request.GET.get('html'):
        return render(request, 'test.html', {'recipes': serializer.data})

    return Response(serializer.data, status=status.HTTP_200_OK)


def shoplist(request):
    return render(request, 'shoplist.html')