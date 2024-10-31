from django.contrib import admin
from . import models

# Register your models here.


class UsersAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name')


class StudentsAdmin(admin.ModelAdmin):
    list_display = ('student_id', 'user')


class CourseResourcesAdmin(admin.ModelAdmin):
    list_display = ('resource_name', 'course')


admin.site.register(models.Users, UsersAdmin)
admin.site.register(models.Students, StudentsAdmin)
admin.site.register(models.Course_Resources, CourseResourcesAdmin)
