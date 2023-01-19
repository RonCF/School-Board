from django.shortcuts import render
from user.models import User
from classes.models import Classes
from rest_framework.views import APIView
from rest_framework.response import Response
from user.serializers import UserSerializer

class LoginAndGetUserView(APIView):
    def get(self, request):
        username = request.GET.get('username')
        password = request.GET.get('password')

        try:
            User.objects.get(username=username)

            try:
                user_data = User.objects.get(username=username, password=password)

                serialized_user = UserSerializer(user_data)

            except User.DoesNotExist:
                return Response({'message': 'Incorrect Password'}, status=400)   
                             
        except User.DoesNotExist:
            return Response({'message': 'Username Does Not Exist'}, status=400)
        
        return Response({'data': serialized_user.data}, status=200)

class AddUserView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        name = request.data.get('name')
        last_name = request.data.get('lastname')
        user_type = request.data.get('type')

        try:
            User.objects.get(username=username)

            return Response({'message': 'User Already Exists'}, status=400)

        except User.DoesNotExist:
            User.objects.create(username=username, password=password, name=name, last_name=last_name, user_type=user_type)
            return Response({'message': 'User Created'}, status=200)
