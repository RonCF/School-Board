from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from assignment.models import Assignment
from assignment.serializers import AssignmentSerializer

class AddAssignmentView(APIView):
    def post(self, request):
        assignment_name = request.data.get('assignment_name')
        student_name = request.data.get('student_name')
        class_name = request.data.get('class_name')
        assignment_status = request.data.get('assignment_status')
        grade = request.data.get('grade')

        try:
            Assignment.objects.get(assignment_name=assignment_name, student_name=student_name)
            return Response({'message': 'This Student Already Has This Assignment'}, status=400)
        except Assignment.DoesNotExist:
            Assignment.objects.create(assignment_name=assignment_name, student_name=student_name, class_name=class_name, assignment_status=assignment_status, grade=grade)
            return Response({'message': 'Assignment Added!'}, status=200)    

class UpdateAssignmentView(APIView):
    def post(self, request):
        assignment_name = request.data.get('assignment_name')
        student_name = request.data.get('student_name')
        class_name = request.data.get('class_name')
        assignment_status = request.data.get('assignment_status')
        grade = request.data.get('grade')

        try:
            assignment = Assignment.objects.get(assignment_name=assignment_name, student_name=student_name, class_name=class_name)
            assignment.assignment_name = assignment_name
            assignment.student_name = student_name
            assignment.class_name = class_name
            assignment.assignment_status = assignment_status
            assignment.grade = grade

            assignment.save()
            return Response({'message': 'Assignment Updated!'}, status=200)
        except Assignment.DoesNotExist:
            return Response({'message': 'This Assignment Does Not Exist!'}, status=400)

class GetAssignmentsView(APIView):
    def get(self, request):
        student_name = request.GET.get('studentname')
        class_name = request.GET.get('classname')
        assignment_data = []

        assignments = Assignment.objects.filter(class_name=class_name, student_name=student_name)

        for assignment in assignments:
            serializer = AssignmentSerializer(assignment)
            assignment_data.append(serializer.data)

        return Response({'data': assignment_data}, status=200)
