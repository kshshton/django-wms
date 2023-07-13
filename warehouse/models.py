from uuid import uuid4

from django.contrib.auth.models import User
from django.db import models


class Employee(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False, unique=True)
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=100, null=True)
    email = models.CharField(max_length=100, null=True)

    def __str__(self) -> str:
        return self.name


class Sector(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False, unique=True)
    capacity = models.PositiveIntegerField()
    name = models.CharField(max_length=100, null=True)

    def __str__(self) -> str:
        return self.name


class Product(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False, unique=True)
    name = models.CharField(max_length=100, null=True)
    category = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField()

    def __str__(self) -> str:
        return self.name


class Order(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False, unique=True)
    name = models.CharField(max_length=100, null=True)
    content = models.ForeignKey(
        Product, on_delete=models.SET_NULL, blank=True, null=True)
    complete = models.BooleanField(default=False, null=True, blank=False)

    def __str__(self) -> str:
        return self.name


class Scanner(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False, unique=True)
    order = models.ForeignKey(
        Order, on_delete=models.SET_NULL, blank=True, null=True)

    def __str__(self) -> str:
        return self.order
