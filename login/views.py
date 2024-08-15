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
from .models import *
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
from django.core.mail import send_mail, EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags

from itertools import count
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
from rest_framework import viewsets, status
from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.decorators import api_view, action, permission_classes
from django.shortcuts import get_object_or_404
from django.db.models import Max
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime, timedelta
from pytz import timezone as pytz_timezone
from rest_framework.views import APIView
from random import randint


class ContactListCreate(generics.ListCreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer


@ensure_csrf_cookie
def get_csrf_token(request):
    # response = HttpResponse("Cookie Set")
    # response.set_cookie('csrfToken', get_token(request))
    return JsonResponse({'csrfToken': get_token(request)})


@csrf_exempt
def check_otp(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        otp = data.get('otp')
        print("THe otp is " + otp)
        # register()
        return JsonResponse({'message': "OTP received.", "status": "200"})


@csrf_exempt
def generate_otp(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            emailId = data.get('email')
            if not emailId:
                return JsonResponse({'message': "Email ID is required.", "status": "400"})

            record = ActiveOtps.objects.filter(email=emailId).first()

            if record:
                time_difference = datetime.now() - record.sent_at.replace(tzinfo=None)
                # time_difference = time_difference - \
                #     timedelta(hours=5, minutes=30)
                # print("Time difference: ", time_difference)

                if time_difference > timedelta(minutes=10):
                    record.delete()
                    otp = randint(100000, 999999)
                    ActiveOtps.objects.create(
                        email=emailId, otp=otp, sent_at=datetime.now()
                    )
                    context = {"otp": otp}
                    html_mes = render_to_string(
                        "content/sendotp.html", context=context)
                    plain_mes = strip_tags(html_mes)
                    mes = EmailMultiAlternatives(
                        "Verify Your Email Address – EduSphere OTP Confirmation",
                        plain_mes,
                        "noreply.edusphere@gmail.com",
                        [emailId]
                    )
                    mes.attach_alternative(html_mes, "text/html")
                    mes.send()

                    return JsonResponse({'message': "OTP sent to email Id.", "status": "200"})
                else:
                    return JsonResponse({'message': "OTP was already sent recently. Please wait for 10 minutes before trying again.", "status": "400"})

            else:
                otp = randint(100000, 999999)
                ActiveOtps.objects.create(
                    email=emailId, otp=otp, sent_at=datetime.now()
                )
                context = {"otp": otp}
                html_mes = render_to_string(
                    "content/sendotp.html", context=context)
                plain_mes = strip_tags(html_mes)
                mes = EmailMultiAlternatives(
                    "Verify Your Email Address – EduSphere OTP Confirmation",
                    plain_mes,
                    "noreply.edusphere@gmail.com",
                    [emailId]
                )
                mes.attach_alternative(html_mes, "text/html")
                mes.send()

                return JsonResponse({'message': "OTP sent to email Id.", "status": "400"})

        except json.JSONDecodeError:
            return JsonResponse({'message': "Invalid JSON format.", "status": "400"})

        except Exception as e:
            print("An error occurred: ", str(e))
            return JsonResponse({'message': "An unexpected error occurred.", "status": "500"})

    return JsonResponse({'message': "Invalid request method.", "status": "500"})


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
            email = data.get('email')
            getotp = data.get('otp')
            # print("getotp1 " + str(getotp))
            if getotp:
                check = ActiveOtps.objects.filter(otp=getotp)
                # if check.otp != getotp:
                #     return JsonResponse({'message': 'Incorrect OTP', "status": "400"})
                # print("check " + str(check))
                if not check:
                    return JsonResponse({'message': 'Incorrect OTP', "status": "400"})
            # print("getotp2 " + str(getotp))

            if not username:
                return JsonResponse({'message': 'Username is required', "status": "400"})

            if User.objects.filter(username=username).exists():
                return JsonResponse({'message': 'User not registered! Username already exists.', "status": "400"})
            if User.objects.filter(email=email).exists():
                return JsonResponse({'message': 'User not registered! Email already exists.', "status": "400"})

            user = User.objects.create_user(
                first_name=first_name,
                last_name=last_name,
                username=username,
                password=password,
                email=email
            )
            check = ActiveOtps.objects.filter(otp=getotp)
            check.delete()
            context = {
                "name": username
            }

            html_mes = render_to_string("content/email.html", context=context)
            plain_mes = strip_tags(html_mes)

            mes = EmailMultiAlternatives(
                "Welcome to EduSphere! Your Learning Journey Begins Here",
                plain_mes,
                "noreply.edusphere@gmail.com",
                [email]
            )

            mes.attach_alternative(html_mes, "text/html")
            mes.send()

            return JsonResponse({'message': 'User registered successfully!', "status": "200"})

        except json.JSONDecodeError:
            return JsonResponse({'message': 'Invalid JSON', "status": "400"})
    else:
        print("Not a POST request")
        return JsonResponse({'message': 'Only POST requests are allowed', "status": "405"})


@csrf_exempt
def change_password(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        newPassword = data.get('password')
        email = data.get('email')

        record = User.objects.filter(email=email).first()
        if newPassword:
            record.set_password(newPassword)
            record.save()
            return JsonResponse({"message": "Password Changed Successfully!!", "status": "200"})
        else:
            return JsonResponse({"message": "Invalid Password!!", "status": "400"})


@csrf_exempt
def check_otp_forgot_password(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        otp = data.get('otp')
        email = data.get('email')
        # print("otp is " + str(otp))
        record = ActiveOtps.objects.filter(email=email).last()
        # print("record is " + str(record.otp))
        # print("are they equal " + str(record.otp) == str(otp))
        # print((record.otp) == int(otp))

        if record and (record.otp == int(otp)):
            return JsonResponse({'message': "OTP verified", 'status': "200"})
        else:
            return JsonResponse({"message": "Invalid OTP", "status": "400"})


@csrf_exempt
def forgot_password(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')

        if User.objects.filter(email=email).exists():
            user = User.objects.filter(email=email).first()
            otp = randint(100000, 999999)
            ActiveOtps.objects.create(
                email=email, otp=otp, sent_at=datetime.now()
            )
            context = {
                "name": user.username,
                "otp": otp
            }
            html_mes = render_to_string("content/forgot.html", context=context)
            plain_mes = strip_tags(html_mes)

            mes = EmailMultiAlternatives(
                "Reset Your Password – EduSphere OTP Verification",
                plain_mes,
                "noreply.edusphere@gmail.com",
                [email]
            )

            mes.attach_alternative(html_mes, "text/html")
            mes.send()
            return JsonResponse({'message': 'OTP Sent', "status": "200"})
        else:
            return JsonResponse({'message': 'No account with this Email exists', "status": "400"})


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
