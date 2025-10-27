from django.urls import path
from baseteste.views import base_index

urlpatterns = [
    path('', base_index, name='indexteste'),
]
