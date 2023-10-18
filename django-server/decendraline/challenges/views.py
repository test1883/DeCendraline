from .utils import challenge, weather
from rest_framework.views import APIView
from .models import *
from rest_framework.response import Response

class ChallengeView(APIView):

    def post(self, request):
        print(request.data)
        message = challenge(f'{request.data.get("duration")} hours', request.data.get("type"), request.data.get("difficulty"), request.data.get("place"))
        return Response({"message": message})
        
class WeatherView(APIView):
    def post(self, request):
        res = (weather(request.data.get("lat"), request.data.get("lon")))
        return Response({"message": res})