from django.contrib import admin
from . import models

# Register your models here.


class UsersAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name')


admin.site.register(models.Users, UsersAdmin)
