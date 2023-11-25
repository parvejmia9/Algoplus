from django.db import models

# Create your models here.
class Blog(models.Model):
    blog_id = models.AutoField(primary_key=True)
    user_name = models.CharField(max_length=1000)
    blog_content = models.CharField(blank=True, max_length=200000)
    like_count = models.IntegerField(blank=True, null= True)

class Contest(models.Model):
    contestId = models.AutoField(primary_key = True)
    contestPassword = models.CharField(max_length=10000)
    contestName = models.CharField(max_length=10000)
    contestStartDate = models.CharField(max_length=10000)
    contestEndDate = models.CharField(max_length=1000)
    contestFile = models.CharField(max_length=1000000)
    contestSetter=models.CharField(max_length=10000,blank=True, null=True)
