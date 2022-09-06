from rest_framework import serializers

from .models import User

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'age',
            'email',
            'first_name',
            'middle_name',
            'last_name',
            'password',
            'sex'
        ]
        extra_kwargs = {'password': {'write_only': True}}
