from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.UserListView.as_view(),
         name='api_users'),  # {'get': 'list'}
    path('students/', views.StudentListView.as_view(), name='api_students'),
    path('lecturers/', views.LecturerListView.as_view(), name='api_lecturers'),
    path('courses/', views.CoursesListView.as_view(), name='api_courses'),
    path('course_resources/',
         views.CourseResourcesListView.as_view(), name='api_course_resources'),
    path('facial_recognitions/',
         views.FacialRecognitionListView.as_view(), name='api_facial_recognitions'),
    path('chats/', views.ChatListView.as_view()),
    path('enrollments/', views.EnrollmentListView.as_view(), name='api_enrollments'),
    path("course/details/<int:course_id>",
         views.course_detail_view, name="course_detail_view"),
]
# PATH:api/views.py
