from django.contrib import admin
from . import models

# Register your models here.


class UsersAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name')


class StudentsAdmin(admin.ModelAdmin):
    list_display = ('student_id', 'user')


admin.site.register(models.Users, UsersAdmin)
admin.site.register(models.Students, StudentsAdmin)
