from django.urls import re_path as url
from BlogApp import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[
    url(r'^blog/$',views.blogApi),
    url(r'^blog/([0-9a-z]+)$',views.blogApi),

    url(r'^contest/$',views.contestApi),
    url(r'^contest/([0-9a-z]+)$',views.contestApi)
]
