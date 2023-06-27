import json
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie
from warehouse.models import Product


def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        return JsonResponse(data)


def all_products(request):
    products = list(Product.objects.values())
    return JsonResponse(products, safe=False)


@ensure_csrf_cookie
def get_csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrftoken': csrf_token})
