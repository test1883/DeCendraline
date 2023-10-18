from django.urls import path
from . import views

urlpatterns = [
    path('challenges/', views.decendraline, name='challenges'),
]