from django.db import models

class Assignment(models.Model):
    assignment_name = models.CharField(max_length=50)
    student_name = models.CharField(max_length=50)
    class_name = models.CharField(max_length=50)
    assignment_status = models.CharField(max_length=50, default=None)
    grade = models.CharField(max_length=50)
