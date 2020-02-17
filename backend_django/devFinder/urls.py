from django.contrib import admin
from django.urls import path

from .views import allDevs, addDev, delDev, searchNearby

urlpatterns = [
    path('', allDevs, name='allDevs'),
    path('addDev', addDev, name='addDev'),
    path('removeDev', delDev, name='delDev'),
    path('searchNearby', searchNearby, name='searchNearby'),


]
