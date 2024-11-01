from django.urls import path
from . import views

urlpatterns = [
    path('resources/upload', views.resources_upload),
    path('resources/', views.resources),
    path('students/', views.students),
    # path(''),
]
