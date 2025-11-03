from django.contrib import admin
from django.urls import path
from contas import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('contas/', views.contas, name="contas"),
]
