from django.db import models

class Classes(models.Model):
    class_name = models.CharField(max_length=50)
    teacher_name = models.CharField(max_length=50)
    grade = models.CharField(max_length=5, default="A")
