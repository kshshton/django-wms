import uuid

from django.contrib.auth.models import User
from django.db import models


class Employee(models.Model):
    id = models.UUIDField(primary_key=True, auto_created=True, max_length=8)
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=100)

    def __init__(self):
        self.id = uuid.uuid4

    def __str__(self):
        return self.name


class Sector(models.Model):
    id = models.UUIDField(primary_key=True, auto_created=True, max_length=8)
    name = models.CharField(max_length=100)
    capacity = models.PositiveIntegerField()

    def __init__(self):
        self.id = uuid.uuid4

    def __str__(self):
        return self.name


class Product(models.Model):
    id = models.UUIDField(primary_key=True, auto_created=True, max_length=8)
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField()

    def __init__(self):
        self.id = uuid.uuid4

    def __str__(self):
        return self.name


class Order(models.Model):
    id = models.UUIDField(primary_key=True, auto_created=True, max_length=8)
    content = models.ForeignKey(
        Product, on_delete=models.SET_NULL, blank=True, null=True)
    complete = models.BooleanField(default=False, null=True, blank=False)

    def __init__(self):
        self.id = uuid.uuid4


class Scanner(models.Model):
    id = models.UUIDField(primary_key=True, auto_created=True, max_length=8)
    order = models.ForeignKey(
        Order, on_delete=models.SET_NULL, blank=True, null=True)

    def __init__(self):
        self.id = uuid.uuid4

    def order_list(self):
        return [_ for _ in order]
