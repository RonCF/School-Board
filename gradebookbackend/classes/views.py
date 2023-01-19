from django.shortcuts import render
from classes.models import Classes
from user.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from classes.serializers import ClassesSerializer
from user.serializers import UserSerializer

class GetClassDataView(APIView):
    def get(self, request):
        class_id = request.GET.get('class_id')

        try:
            class_data = Classes.objects.get(id=class_id)

            serialized_class = ClassesSerializer(class_data)
                
        except Classes.DoesNotExist:
            return Response({'message': 'Class Does Not Exist'}, status=400)
        return Response({'data': serialized_class.data}, status=200)

class GetStudentsInClassView(APIView):
    def get(self, request):
        class_id = request.GET.get('class_id')

        users = User.objects.filter(classes=class_id, user_type="Student")
        
        serialized_users = []

        for user in users:
            serialized_user = UserSerializer(user)

            serialized_users.append(serialized_user.data)    

        return Response({'data': serialized_users}, status=200)
