from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from ProfileApp.models import User
from ProfileApp.serializers import UserSerializer

from django.core.files.storage import default_storage

# Create your views here.
@csrf_exempt
def userApi(request,id=""):
    if request.method=='GET':
        info = User.objects.all()
        info_serializer = UserSerializer(info, many=True)
        return JsonResponse(info_serializer.data, safe=False)

    elif request.method=='POST':
        user_data=JSONParser().parse(request)
        info_serializer = UserSerializer(data=user_data)
        if info_serializer.is_valid():
            info_serializer.save()
            return JsonResponse("Added Successfully!!" , safe=False)
        return JsonResponse("Failed to Add.",safe=False)
    
    elif request.method=='PUT':
        user_data = JSONParser().parse(request)
        info=User.objects.get(user_name=user_data['user_name'])
        info_serializer=UserSerializer(info,data=user_data)
        if info_serializer.is_valid():
            info_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)

    elif request.method=='DELETE':
        info=User.objects.get(user_name=id)
        info.delete()
        return JsonResponse("Deleted Succeffully!!", safe=False)
