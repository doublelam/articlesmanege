""" view for test """
from django.http import HttpResponse


def hello(*_):
    """ for test function """
    HttpResponse('hello world')
