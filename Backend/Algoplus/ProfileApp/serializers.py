from rest_framework import serializers
from ProfileApp.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('user_name',
                  'user_email',
                  'user_password',
                  'user_full_name',
                  'user_institution',
                  'user_cf_handle',
                  'user_atcoder_handle',
                  'user_codechef_handle',
                  'user_contribution',
                  'isAdmin')
                  