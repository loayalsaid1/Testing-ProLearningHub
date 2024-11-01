from django.urls import path, include
from . import views

urlpatterns = [
    path('users/', views.UserListView.as_view(),
         name='api_users'),  # {'get': 'list'}
    path('user/<int:user_id>', views.UserIdView.as_view(), name='api_user_by_id'),
    path('register/', views.register, name='api_register'),
    path('reset_password/', views.register, name='api_reset_password'),
    path('login/', views.login, name='api_login'),
    path('logout/', views.login, name='api_logout'),
    path('students/', views.StudentListView.as_view(), name='api_students'),
    path('lecturers/', views.LecturerListView.as_view(), name='api_lecturers'),
    path('courses/', views.CoursesListView.as_view(), name='api_courses'),
    path('course_resources/', views.CourseResourcesListView.as_view(),
         name='api_course_resources'),
    path('course/<int:course_id>/resource/<int:resource_id>',
         views.resources_by_course, name='api_resource_of_course'),
    path('course/<int:course_id>/resources/',
         views.all_resource_by_course, name='api_resources_of_course'),
    path('facial_recognitions/',
         views.FacialRecognitionListView.as_view(), name='api_facial_recognitions'),
    #     path('chats/', views.ChatListView.as_view()),
    path('enrollments/', views.EnrollmentListView.as_view(), name='api_enrollments'),
    path("course/details/<int:course_id>",
         views.course_detail_view, name="course_detail_view"),

    path("course/<int:course_id>/forum",
         views.forums_by_course, name="forums_by_course"),
    path("course/<int:course_id>/forum/<int:forum_id>",
         views.forum_by_course, name="forum_by_course"),
    path("course/<int:course_id>/forum/<int:forum_id>/comment",
         views.comments_in_forum_by_course, name="comments_in_forum_by_course"),
    path("course/<int:course_id>/forum/<int:forum_id>/comment/<int:chat_id>",
         views.comment_in_forum_by_course, name="comment_in_forum_by_course"),
    path("course/<int:course_id>/anouncements",
         views.announcements, name="announcements"),
    path("course/<int:course_id>/comment",
         views.comment, name="comment"),

]
# PATH:api/views.py
