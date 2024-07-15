from django.urls import path
from .views import *

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login_view, name='login'),
    path('get-csrf-token/', get_csrf_token, name='get_csrf_token'),
    path('contacts/', ContactListCreate.as_view(), name='contact-list-create'),
    path('logout/', LogoutView.as_view(), name='logout')
]
