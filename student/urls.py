from django.urls import path
from . import views

urlpatterns = [
    path('resources/<int:course_id>', views.resources),
    path('courses', views.courses),
    path('students', views.students),
]
