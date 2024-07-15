from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
import json
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_protect
from django.http import request
from django.http import HttpResponse
from django.contrib.auth import authenticate, login
from django.contrib.sessions.models import Session
from rest_framework import generics
from .models import Contact
from .serializers import ContactSerializer
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

# If you are using a blacklist app in Django for JWT tokens
from rest_framework_simplejwt.exceptions import TokenError

# If you have enabled token blacklisting, ensure you have this import
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken


# @ensure_csrf_cookie
# @csrf_protect

from django.views.decorators.csrf import csrf_exempt
# @method_decorator(csrf_protect, name='dispatch')


class ContactListCreate(generics.ListCreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer


@ensure_csrf_cookie
def get_csrf_token(request):
    # response = HttpResponse("Cookie Set")
    # response.set_cookie('csrfToken', get_token(request))
    return JsonResponse({'csrfToken': get_token(request)})


# @ensure_csrf_cookie
@csrf_exempt
def register(request):
    print("Request received")

    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            first_name = data.get('fname')
            last_name = data.get('lname')
            username = data.get('username')
            password = data.get('password')

            if not username:
                return JsonResponse({'message': 'Username is required'}, status=400)

            if User.objects.filter(username=username).exists():
                return JsonResponse({'message': 'User not registered successfully! Username already exists.'}, status=400)

            user = User.objects.create_user(
                first_name=first_name,
                last_name=last_name,
                username=username,
                password=password
            )

            return JsonResponse({'message': 'User registered successfully!'}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'message': 'Invalid JSON'}, status=400)
    else:
        print("Not a POST request")
        return JsonResponse({'message': 'Only POST requests are allowed'}, status=405)


@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        print(request)
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            # set user-specific data in the session
            request.session['username'] = username
            request.session.save()
            return JsonResponse({'message': 'Logged in successfully'}, status=400)
        else:
            return JsonResponse({'message': 'Invalid Username'}, status=400)


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
