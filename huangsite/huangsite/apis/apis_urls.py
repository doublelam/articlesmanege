"""modules for apis"""
from django.conf.urls import url
from .get_stroke_styles import get_stroke_styles
from ..common import handle_request as hr


URLPATTERNS = [
    url(r'^get_stroke_styles', hr.handle_request('post', get_stroke_styles)),
]
