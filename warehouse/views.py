import json

from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse
from django.middleware.csrf import get_token
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie

from warehouse.models import Employee, Product


def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)['data']
        user = User.objects.create_user(
            username=data.get('username'),
            password=data.get('password'),
        )
        Employee.objects.create(
            user=user,
            name=data.get('username'),
            email=data.get('email'),
        )
        return JsonResponse(data)


def all_products(request):
    products = list(Product.objects.values())
    return JsonResponse(products, safe=False)


@ensure_csrf_cookie
def get_csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrftoken': csrf_token})
