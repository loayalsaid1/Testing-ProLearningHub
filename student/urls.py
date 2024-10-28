from django.urls import path
from . import views

urlpatterns = [
    path('resources/<int:course_id>', views.resources, name='resources'),
    path('courses', views.courses, name='courses'),
    path('students', views.students, name='students'),
    path('chat/', views.chat, name='chat'),
    path('messages/<int:user_id>/', views.message, name='messages'),
]
