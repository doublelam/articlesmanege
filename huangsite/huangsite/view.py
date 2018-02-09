""" view for test """
from django.http import HttpResponse
from django.shortcuts import render

def hello(*_):
    """ for test function """
    HttpResponse('hello world')

def default(request):
    """ Return default file or message """
    return render(request, 'index.html')
