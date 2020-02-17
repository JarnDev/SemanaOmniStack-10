from django.db import models
from json import load
from mongoengine import connect, DynamicDocument
# Create your models here.
import os

with open(f'{os.getcwd()}/devFinder/private.json') as f:
    db_uri = load(f)['db_uri']

connect('devFinder', host=db_uri)


class devs(DynamicDocument):
    pass
