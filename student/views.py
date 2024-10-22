from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
# from .models import Student
# from .forms import StudentForm

# Create your views here.

# class StudentListView(LoginRequiredMixin, ListView):
#     model = Student
# Create your views here.


def resources(request, course_id):
    pass


def resources_upload(request, course_id):
    pass


def students(request):
    pass


def courses(request):
    pass
