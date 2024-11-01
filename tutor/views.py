from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse, HttpResponseForbidden
from student.models import *
from .forms import *
from django.contrib.auth.decorators import login_required


# Create your views here.

@login_required
def add_course(request):
    # check if requested user is a lecturer
    try:
        lecturer = Lecturer.objects.get(user=request.user)
    except Lecturer.DoesNotExist:
        # Restrict access
        return HttpResponseForbidden("You are not authorized to add courses.")

    # handle form submission
    if request == 'POST':
        form = CourseForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('course list')
    else:
        form = CourseForm()
    return render(request, 'add_course.html', {'course_form': form})


@login_required
def edit_course(request, course_id):
    # check if requested user is a lecturer
    try:
        lecturer = Lecturer.objects.get(user=request.user)
    except Lecturer.DoesNotExist:
        # Restrict access
        return HttpResponseForbidden("You are not authorized to add courses.")

    course = get_object_or_404(Courses, pk=course_id)
    if request.method == "POST":
        form = CourseForm(request.POST, instance=course)
        if form.is_valid():
            form.save()
            # Redirect to course detail
            return redirect('course_detail', course_id=course_id)
    else:
        form = CourseForm(instance=course)
    return render(request, 'add_course.html', {'form': form, 'course': course})


''' hold on, working on a better one below ⬇️
@login_required
def course_detail(request, course_id):
    course = get_object_or_404(Courses, pk=course_id)
    resources = course.course_resources_set.all()
    students = Enrollments.objects.filter(course_id=course_id)
    return render(request, 'course_detail.html', {'course': course, 'resources': resources, 'students': students})
'''

# for adding resources


def add_resource(request, course_id):
    ''' A view to Upload a Resource '''
    course = get_object_or_404(Courses, pk=course_id)
    if request.method == "POST":
        form = CourseResourceForm(request.POST, request.FILES)
        if form.is_valid():
            resource = form.save(commit=False)
            resource.course = course
            resource.save()
            return redirect("course_detail", course_id=course_id)
    else:
        form = CourseResourceForm()
    return render(request, "add_resource.html", {"form": form, "course": course})

# edit a resource detail


def edit_resource(request, resource_id):
    resource = get_object_or_404(Course_Resources, pk=resource_id)
    if request.method == "POST":
        form = CourseResourceForm(
            request.POST, request.FILES, instance=resource)
        if form.is_valid():
            form.save()
            return redirect("course_detail", course_id=resource.course.id)
    else:
        form = CourseResourceForm(instance=resource)
    return render(request, "add_resource.html", {"form": form, "resource": resource})

# For enrolling a student (lecturer view)


@login_required
def enroll_student(request, course_id):
    course = get_object_or_404(Courses, pk=course_id)
    if request.method == "POST":
        form = EnrollmentForm(request.POST)
        if form.is_valid():
            enrollment = form.save(commit=False)
            enrollment.course = course
            enrollment.save()
            return redirect("course_detail", course_id=course_id)
    else:
        form = EnrollmentForm()
    return render(request, "enroll_student.html", {"form": form, "course": course})
