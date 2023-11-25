from rest_framework import serializers
from BlogApp.models import Blog , Contest

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ('blog_id',
                  'user_name',
                  'blog_content',
                  'like_count')

class ContestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contest
        fields = ('contestId',
                  'contestPassword',
                  'contestName',
                  'contestStartDate',
                  'contestEndDate',
                  'contestFile',
                  'contestSetter',)