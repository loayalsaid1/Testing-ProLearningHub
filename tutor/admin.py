from django.contrib import admin
from student import models

# Register your models here.


class LecturerAdmin(admin.ModelAdmin):
    list_display = ('lecturer_id', 'user')


class CoursesAdmin(admin.ModelAdmin):
    list_display = ('course_id', 'course_name')


admin.site.register(models.Lecturer, LecturerAdmin)
admin.site.register(models.Courses, CoursesAdmin)
