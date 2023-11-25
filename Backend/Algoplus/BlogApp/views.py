from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

# Create your views here.
from BlogApp.models import Blog , Contest
from BlogApp.serializers import BlogSerializer ,  ContestSerializer

@csrf_exempt
def blogApi(request,id=""):
    if request.method=='GET':
        info = Blog.objects.all()
        info_serializer = BlogSerializer(info, many=True)
        return JsonResponse(info_serializer.data, safe=False)

    elif request.method=='POST':
        user_data=JSONParser().parse(request)
        info_serializer = BlogSerializer(data=user_data)
        if info_serializer.is_valid():
            info_serializer.save()
            return JsonResponse("Added Successfully!!" , safe=False)
        return JsonResponse("Failed to Add.",safe=False)
    
    elif request.method=='PUT':
        user_data = JSONParser().parse(request)
        info=Blog.objects.get(blog_id=user_data['blog_id'])
        info_serializer=BlogSerializer(info,data=user_data)
        if info_serializer.is_valid():
            info_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)

    elif request.method=='DELETE':
        info=Blog.objects.get(blog_id=id)
        info.delete()
        return JsonResponse("Deleted Succeffully!!", safe=False)


@csrf_exempt
def contestApi(request,id=""):
    if request.method=='GET':
        info = Contest.objects.all()
        info_serializer = ContestSerializer(info, many=True)
        return JsonResponse(info_serializer.data, safe=False)

    elif request.method=='POST':
        user_data=JSONParser().parse(request)
        info_serializer = ContestSerializer(data=user_data)
        if info_serializer.is_valid():
            info_serializer.save()
            return JsonResponse("Added Successfully!!" , safe=False)
        return JsonResponse("Failed to Add.",safe=False)
    
    elif request.method=='PUT':
        user_data = JSONParser().parse(request)
        info=Contest.objects.get(contestId=user_data['contestId'])
        info_serializer=ContestSerializer(info,data=user_data)
        if info_serializer.is_valid():
            info_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)

    elif request.method=='DELETE':
        info=Contest.objects.get(contestId=id)
        info.delete()
        return JsonResponse("Deleted Succeffully!!", safe=False)