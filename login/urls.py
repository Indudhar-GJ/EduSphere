from django.urls import path
from .views import *

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login_view, name='login'),
    path('get-csrf-token/', get_csrf_token, name='get_csrf_token'),
    path('contacts/', ContactListCreate.as_view(), name='contact-list-create'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('generate_otp/', generate_otp, name='generate_otp'),
    path('check_otp/', check_otp, name='check_otp'),
    path('forgot_password/', forgot_password, name='forgot_password'),
    path('change_password/', change_password, name='change_password'),
    path('check_otp_forgot_password/', check_otp_forgot_password,
         name='check_otp_forgot_password')
]
