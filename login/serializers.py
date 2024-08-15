from rest_framework import serializers
from .models import *


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'


class ActiveOtpsSerializer(serializers.Serializer):
    class Meta:
        model = ActiveOtps
        fields = '__all__'
