from django.contrib import admin
from student import models

# Register your models here.


class LecturerAdmin(admin.ModelAdmin):
    list_display = ('lecturer_id', 'user')


admin.site.register(models.Lecturer, LecturerAdmin)
