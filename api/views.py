from django.shortcuts import render, get_object_or_404, redirect
from rest_framework.decorators import action, api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.views import APIView
from django.db.models import Q
from django.http import JsonResponse, HttpResponseForbidden
from django.contrib.auth.hashers import make_password, check_password
from social_django.utils import psa
from django.contrib.auth import login
from .models import *
from authentication.models import Auth
from django.utils.crypto import get_random_string


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


class UserIdView(APIView):
    def get(self, request, user_id):
        users = Users.objects.filter(user_id=user_id)
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def register(request):
    serializer = UserPostSerializer(data=request.data)
    if serializer.is_valid():
        password = serializer.validated_data.get('password_hash')
        email = serializer.validated_data.get('email')
        user = Users.objects.get(email=email)
        if user is not None:
            return Response({'message': 'User already exists'}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save(password_hash=make_password(password))

        if serializer.validated_data.get('role') == 'tutor':
            tutor = Lecturer.objects.create(user=user)
            tutor.save()
        elif serializer.validated_data.get('role') == 'student':
            student = Students.objects.create(user=user)
            student.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request):
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data.get('email')
        password = serializer.validated_data.get('password_hash')
        user = Users.objects.filter(email=email).first()
        if user and check_password(password, user.password_hash):
            request.session['user_id'] = user.user_id
            return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
        return Response({'message': 'Invalid email or password'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def logout(request):
    request.session.flush()
    return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)


@api_view(['POST'])
def reset_password(request):
    auth = Auth()
    serializer = UserResetPasswordSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data.get('email')
        user = Users.objects.filter(email=email).first()
        if user:
            # Generate a password reset token and send it to the user's email
            token = user.generate_token()
            user.send_password_reset_email(token)
            return Response({'message': 'Password reset link sent to your email'}, status=status.HTTP_200_OK)
        return Response({'message': 'User not found'}, status=status.HTTP_400_BAD_REQUEST)

# def custom_redirect(backend, user, response, *args, **kwargs):
#     if backend.name == 'google-oauth2':
#         return redirect('google_login')


@psa('social:complete')
def google_login_complete(request, backend=None):
    social_user = request.backend.do_auth(request.GET.get('code'))
    if social_user and social_user.is_active:
        try:
            user = Users.objects.get(email=social_user.email)
            request.session['user_id'] = user.user_id
            return JsonResponse({
                'status': 'success',
                'message': 'User logged in successfully.',
                'user_id': user.id,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'role': user.role  # Example: Lecturer or Student
            })
        except Users.DoesNotExist:
            return JsonResponse({
                'status': 'error',
                'message': 'User does not exist.'
            }, status=404)
        # Customize the JSON response as needed

    else:
        return JsonResponse({
            'status': 'error',
            'message': 'Authentication failed.'
        }, status=400)


class StudentListView(APIView):
    def get(self, request):
        students = Students.objects.all()
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class LecturerListView(APIView):
    def get(self, request):
        lecturer = Lecturer.objects.all()
        serializer = LecturerSerializer(lecturer, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


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


@api_view(['GET'])
def resources_by_course(request, course_id, resource_id):
    course = get_object_or_404(Courses, course_id=course_id)
    resource = Course_Resources.objects.filter(
        Q(course=course) & Q(resource_id=resource_id))
    serializer = CoursesResourcesSerializer(resource, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def all_resource_by_course(request, course_id):
    course = get_object_or_404(Courses, course_id=course_id)
    resource = Course_Resources.objects.filter(course=course)
    serializer = CoursesResourcesSerializer(resource, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


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


# class ChatListView(APIView):
#     def get(self, request):
#         chats = Chats.objects.all()
#         serializer = ChatsSerializer(chats, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)

#     def post(self, request):
#         serializer = ChatsSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def forums_by_course(request, course_id):
    course = Courses.objects.filter(course_id=course_id).first()
    forum = Forum.objects.filter(course=course)
    serializer = ForumSerializer(forum, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def forum_by_course(request, course_id, forum_id):
    forum_of_course = get_object_or_404(
        Forum, course_id=course_id, forum_id=forum_id)
    serializer = ForumSerializer(forum_of_course, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def comments_in_forum_by_course(request, course_id, forum_id):
    course = Courses.objects.filter(course_id=course_id).first()
    forum = Forum.objects.filter(
        course=course) & Forum.objects.filter(forum_id=forum_id)
    threads = Thread.objects.filter(forum=forum)
    new_data = []
    for thread in threads:
        comments = Chats.objects.filter(thread=thread)
        serializer = ChatsSerializer(comments, many=True)
        new_data.append(serializer.data)
    return Response(new_data, status=status.HTTP_200_OK)


@api_view(['GET'])
def comment_in_forum_by_course(request, course_id, forum_id, chat_id):
    course = Courses.objects.filter(course_id=course_id).first()
    forum = Forum.objects.filter(
        course=course) & Forum.objects.filter(forum_id=forum_id)
    threads = Thread.objects.filter(forum=forum)
    new_data = []
    for thread in threads:
        comments = Chats.objects.filter(Q(thread=thread) & Q(chat_id=chat_id))
        serializer = ChatsSerializer(comments, many=True)
        new_data.append(serializer.data)
    return Response(new_data, status=status.HTTP_200_OK)


@api_view(['GET'])
def announcements(request, course_id):
    course = Courses.objects.filter(course_id=course_id).first()
    announcement = Announcement.objects.filter(course=course)
    serializer = AnnouncementSerializer(announcement, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def comment(request, course_id):
    course = Courses.objects.filter(course_id=course_id).first()
    announcement = Announcement.objects.filter(course=course)
    comments = Comment.objects.filter(announcement=announcement)
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
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
