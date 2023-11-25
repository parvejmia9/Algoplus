from django.db import models

# Create your models here.
class User(models.Model):
    user_name = models.CharField(max_length=1000,primary_key=True)
    user_email = models.CharField(max_length=1000)
    user_password = models.CharField(max_length=1000)
    user_full_name = models.CharField(max_length=1000)
    user_institution = models.CharField(max_length=1000)
    user_cf_handle = models.CharField(max_length=1000 , blank=True, null=True)
    user_atcoder_handle = models.CharField(max_length=1000 , blank=True, null=True)
    user_codechef_handle = models.CharField(max_length=1000 , blank=True, null=True)
    user_contribution = models.IntegerField(blank=True, null=True)
    isAdmin = models.IntegerField(blank=True, null=True)