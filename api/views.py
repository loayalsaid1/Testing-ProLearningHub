from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import action, api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.views import APIView
from django.http import JsonResponse, HttpResponseForbidden
from django.contrib.auth.hashers import make_password, check_password
from .models import *

# Create your views here.


class UserListView(APIView):
    def get(self, request):
        users = Users.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # def post(self, request):
    #     serializer = UserSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def register(request):
    serializer = UserPostSerializer(data=request.data)
    if serializer.is_valid():
        password = serializer.validated_data.get('password_hash')
        serializer.save(password_hash=make_password(password))
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StudentListView(APIView):
    def get(self, request):
        students = Students.objects.all()
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LecturerListView(APIView):
    def get(self, request):
        lecturer = Lecturer.objects.all()
        serializer = LecturerSerializer(lecturer, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = LecturerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CoursesListView(APIView):
    def get(self, request):
        courses = Courses.objects.all()
        serializer = CoursesSerializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CoursesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CourseResourcesListView(APIView):
    def get(self, request):
        course_resources = Course_Resources.objects.all()
        serializer = CoursesResourcesSerializer(course_resources, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CoursesResourcesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FacialRecognitionListView(APIView):
    def get(self, request):
        facial = Facial_Recognition.objects.all()
        serializer = FacialRecognitionsSerializer(facial, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = FacialRecognitionsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EnrollmentListView(APIView):
    def get(self, request):
        enrollments = Enrollments.objects.all()
        serializer = EnrollmentsSerializer(enrollments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = EnrollmentsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChatListView(APIView):
    def get(self, request):
        chats = Chats.objects.all()
        serializer = ChatsSerializer(chats, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ChatsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def course_detail_view(request, course_id):
    course = get_object_or_404(Courses, course_id=course_id)
    lecturer = {
        "lecturer_id": course.lecturer.lecturer_id,
        "name": f"{course.lecturer.user.first_name} {course.lecturer.user.last_name}",
        "department": course.lecturer.department
    }

    resources = [
        {
            "resource_id": resource.resource_id,
            "resource_name": resource.resource_name,
            "upload_date": resource.upload_date.strftime("%Y-%m-%d")
        }
        for resource in Course_Resources.objects.filter(course=course)
    ]

    enrollments = [
        {
            "student": {
                "student_id": enrollment.student.student_id,
                "name": f"{enrollment.student.user.first_name} {enrollment.student.user.last_name}",
                "student_number": str(enrollment.student.student_number)
            },
            "semester": enrollment.semester,
            "year": enrollment.year,
            "grade": enrollment.grade
        }
        for enrollment in Enrollments.objects.filter(course_id=course_id)
    ]

    response_data = {
        "course": {
            "course_id": course.course_id,
            "course_name": course.course_name,
            "course_code": course.course_code,
            "lecturer": lecturer,
            "resources": resources,
            "enrollments": enrollments
        }
    }

    return JsonResponse(response_data)
