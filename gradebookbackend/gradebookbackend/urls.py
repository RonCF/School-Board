"""gradebookbackend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from assignment.views import AddAssignmentView, UpdateAssignmentView, GetAssignmentsView
from user.views import LoginAndGetUserView, AddUserView
from classes.views import GetClassDataView, GetStudentsInClassView
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('admin/', admin.site.urls),
    path('addassignment/', csrf_exempt(AddAssignmentView.as_view())),
    path('editassignment/', csrf_exempt(UpdateAssignmentView.as_view())),
    path('getassignments/', csrf_exempt(GetAssignmentsView.as_view())),
    path('login/', csrf_exempt(LoginAndGetUserView.as_view())),
    path('adduser/', csrf_exempt(AddUserView.as_view())),
    path('getclass/', csrf_exempt(GetClassDataView.as_view())),
    path('getstudents/', csrf_exempt(GetStudentsInClassView.as_view())),
]
