from django.shortcuts import render
from django.http import HttpResponse
from django.forms.models import model_to_dict
# Create your views here.
import json
from bson.objectid import ObjectId
import requests
from .models import devs


def allDevs(request):
    devList = json.loads(devs.objects.all().to_json())
    for dev in devList:
        dev['_id'] = dev['_id']['$oid']

    return HttpResponse(json.dumps(devList), content_type='application/json')


def addDev(request):
    body = json.loads(request.body.decode('utf-8'))
    try:
        devs.objects.get(github_username=body['github_username'])
        return HttpResponse('Dev Already Exist!')
    except Exception as err:
        git_hub_api = requests.get(f'https://api.github.com/users/{body["github_username"]}').json()
        if 'message' in git_hub_api.keys():
            return HttpResponse('Dev Not Found on GitHub!')

        dev = devs()
        techs_array = [tech.strip() for tech in body['techs'].split(',')]

        location = {
            "type": 'Point',
            "coordinates": [body['longitude'], body['latitude']]
        }

        dev.github_username = body['github_username']
        dev.name = git_hub_api['name'] or git_hub_api['login']
        dev.avatar_url = git_hub_api['avatar_url']
        dev.bio = git_hub_api['bio']
        dev.techs = techs_array
        dev.location = location
        dev.save()
        return HttpResponse('Dev Created!')


def delDev(request):
    body = json.loads(request.body.decode('utf-8'))
    try:
        dev = devs.objects.get(_id=ObjectId(body['id']))
        dev.delete()
        return HttpResponse("Dev Removed!")
    except Exception as err:
        return HttpResponse(err)


def searchNearby(request):
    latitude = float(request.GET['latitude'])
    longitude = float(request.GET['longitude'])
    techs = request.GET['techs']
    techs_array = [tech.strip() for tech in techs.split(',')]

    devList = json.loads(devs.objects(
        techs__in=techs_array,
        location__near={"type": "Point", "coordinates": [longitude, latitude]},
        location__max_distance=10000
    ).to_json())
    for dev in devList:
        dev['_id'] = dev['_id']['$oid']

    return HttpResponse(json.dumps(devList), content_type='application/json')
