from django.urls import re_path as url
from ProfileApp import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[
    url(r'^user/$',views.userApi),
    url(r'^user/([0-9a-z]+)$',views.userApi)
] 