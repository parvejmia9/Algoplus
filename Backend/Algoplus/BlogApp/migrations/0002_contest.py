# Generated by Django 4.1.4 on 2022-12-21 12:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('BlogApp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Contest',
            fields=[
                ('contestId', models.AutoField(primary_key=True, serialize=False)),
                ('contestPassword', models.CharField(max_length=10000)),
                ('contestName', models.CharField(max_length=10000)),
                ('contestStartDate', models.CharField(max_length=10000)),
                ('contestEndDate', models.CharField(max_length=1000)),
                ('contestFile', models.CharField(max_length=1000000)),
            ],
        ),
    ]