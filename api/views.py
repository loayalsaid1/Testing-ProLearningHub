import requests
import secrets
import logging
from django.shortcuts import render, get_object_or_404, redirect
from rest_framework.decorators import action, api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.views import APIView
from django.db.models import Q
from django.http import JsonResponse, HttpResponseForbidden, HttpResponseRedirect
from django.contrib.auth.hashers import make_password, check_password
from social_django.utils import psa
from django.contrib.auth import login
from .models import *
from authentication.models import Auth
from django.utils.crypto import get_random_string
from social_django.utils import load_strategy, load_backend
from social_core.exceptions import AuthMissingParameter, AuthForbidden
from django.conf import settings

# Create your views here.


def home_view(request):
    return JsonResponse({"message": "Welcome to School Hub Api page"})


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
            token = auth.generate_token()
            reset_link = request.build_absolute_uri(
                f'/api/reset_token/{token}')
            auth.send_password_reset_email(user, reset_link)
            # Saves the token to the database
            user.reset_token = token
            user.save()
            return Response({'message': 'Password reset link sent to your email'}, status=status.HTTP_200_OK)
        return Response({'message': 'User not found'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def reset_token(request, token):
    if request.method == 'POST':
        # Gets the JSON format new password and confirmed password
        new_password = request.data.get('new_password')
        confirm_password = request.data.get('confirm_password')

        # If both passwords are not the same, returns a JSON error message with a 404 status
        if new_password != confirm_password:
            return Response({'message': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)

        # Gets user with corresponding reset token
        user = Users.objects.filter(reset_token=token).first()

        # Encrypts the input password, clean the reset token and saves it to the database
        user.password_hash = make_password(new_password)
        user.reset_token = None
        user.save()
        return Response({'message': 'New password created'}, status=status.HTTP_201_CREATED)
    # Gets user with corresponding reset token
    user = Users.objects.filter(reset_token=token).first()
    if user:
        # if user is valid serializes the user data and return a JSON response
        serializer = UserResetTokenSerializer(user, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response({'message': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)

# def custom_redirect(backend, user, response, *args, **kwargs):
#     if backend.name == 'google-oauth2':
#         return redirect('google_login')


def google_login(request):
    """Initiates Google OAuth2 login"""
    # Redirect to the Google OAuth2 backend's start endpoint
    return HttpResponseRedirect('/oauth/login/google-oauth2/')


logger = logging.getLogger(__name__)


@api_view(['GET'])
def google_callback(request):

    code = request.GET.get('code')
    if not code:
        print(f'Token: {code}')
        return Response({'message': 'No code'}, status=status.HTTP_400_BAD_REQUEST)

     # Exchange authorization code for an access token
    token_response = requests.post(
        'https://oauth2.googleapis.com/token',
        data={
            'code': code,
            'client_id': f'{settings.SOCIAL_AUTH_GOOGLE_OAUTH2_KEY}',
            'client_secret': f'{settings.SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET}',
            # Must match your redirect URI
            'redirect_uri': 'http://127.0.0.1:8000/auth/google/callback/',
            'grant_type': 'authorization_code'
        }
    )
    token_json = token_response.json()
    print(f'Response: {token_json}')
    access_token = token_json.get('access_token')
    print(f'Acces Token: {access_token}')

    if access_token:
        # Now use the access token to fetch user info
        user_info_response = requests.get(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            headers={'Authorization': f'Bearer {access_token}'}
        )

        user_info = user_info_response.json()
        email = user_info.get('email')
    if email:
        user = Users.objects.filter(email=email).first()
        request.session['user_id'] = user.user_id
        return redirect('me')
        # Now you can use the email for your application logic
        # return Response({'message': f'{email}'}, status=status.HTTP_200_OK)
    else:
        return Response({'message': 'Request Unsuccessfull'}, status=status.HTTP_403_FORBIDDEN)


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
def thread_upvote(request, thread_id):
    thread = get_object_or_404(Thread, thread_id=thread_id)
    thread.upvotes += 1
    thread.save()
    return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
def chat_upvote(request, chat_id):
    chat = get_object_or_404(Chats, chat_id=chat_id)
    chat.upvotes += 1
    chat.save()
    return Response(status=status.HTTP_200_OK)


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
