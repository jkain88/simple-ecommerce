from rest_framework import serializers

from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'age',
            'email',
            'first_name',
            'middle_name',
            'last_name',
            'sex'
        ]


class UserRegisterSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        fields = UserSerializer.Meta.fields + ['password']
        extra_kwargs = {
            'password': {
                'write_only': True, 
            }
        }
