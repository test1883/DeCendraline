from django.contrib import admin
from django.urls import path
from challenges.views import *
urlpatterns = [
    path('challenge/new', ChallengeView.as_view(), name="new"),
    path('weather/get', WeatherView.as_view(), name="get"),
    path('admin/', admin.site.urls),
]
