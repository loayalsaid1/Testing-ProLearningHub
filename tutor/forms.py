# forms.py
from django import forms
from student.models import Courses, Course_Resources


class CourseForm(forms.ModelForm):
    class Meta:
        model = Courses
        exclude = ['lecturer', 'course_id']


class CourseResourceForm(forms.ModelForm):
    class Meta:
        model = Course_Resources
        exclude = ['resource_id', 'course', 'upload_date']
