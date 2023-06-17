from django.db import models
from django.contrib.auth.models import User


class Employee(models.Model):
    id = models.UUIDField(auto_created=True, max_length=8)
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Sector(models.Model):
    id = models.UUIDField(auto_created=True, max_length=8)
    name = models.CharField(max_length=100)
    capacity = models.PositiveIntegerField()

    def __str__(self):
        return self.name


class Product(models.Model):
    id = models.UUIDField(auto_created=True, max_length=8)
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return self.name


class Order(models.Model):
    id = models.UUIDField(auto_created=True, max_length=8)
    content = models.ForeignKey(
        Stock, on_delete=models.SET_NULL, blank=True, null=True)
    complete = models.BooleanField(default=False, null=True, blank=False)


class Scanner(models.Model):
    id = models.UUIDField(auto_created=True, max_length=8)
    order = models.ForeignKey(
        Order, on_delete=models.SET_NULL, blank=True, null=True)

    def order_list(self):
        return [_ for _ in order]