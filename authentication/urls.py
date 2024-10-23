from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register),
    path('login/', views.login),
    path('face/', views.face),
    path('me/', views.me),
    path('logout/', views.logout),
    path('forgot_password/', views.forgot_password),
    path('reset_password', views.reset_password),
    path('password_reset_request/<str: token>', views.password_reset_request)

]
