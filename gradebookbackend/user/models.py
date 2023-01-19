from django.db import models
from classes.models import Classes

class User(models.Model):
    username = models.CharField(max_length=50, default=None)
    password = models.CharField(max_length=50, default=None)
    name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    user_type = models.CharField(max_length=50)
    classes = models.ManyToManyField(Classes)
