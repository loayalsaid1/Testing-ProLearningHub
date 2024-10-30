from django.db import models

# Create your models here.
from rest_framework import serializers
from student.models import *


class UserSerializer(serializers.ModelSerializer):
    profile_image = serializers.ImageField(required=False)

    class Meta:
        model = Users
        exclude = ['password_hash', 'reset_token']


class UserPostSerializer(serializers.ModelSerializer):
    profile_image = serializers.ImageField(required=False)

    class Meta:
        model = Users
        fields = '__all__'


class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Students
        fields = '__all__'


class LecturerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lecturer
        fields = '__all__'


class CoursesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courses
        fields = '__all__'


class CoursesResourcesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course_Resources
        fields = '__all__'


class FacialRecognitionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Facial_Recognition
        fields = '__all__'


class ChatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chats
        fields = '__all__'


class EnrollmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollments
        fields = '__all__'
