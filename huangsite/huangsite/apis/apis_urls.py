"""modules for apis"""
from django.conf.urls import url
from .get_stroke_styles import get_stroke_styles
from .send_video_blob import send_video_blob
from .get_videos import get_videos
from ..common import handle_request as hr


URLPATTERNS = [
    url(r'^get_stroke_styles', hr.handle_request('post', get_stroke_styles)),
    url(r'^send_video_blob', hr.handle_request('post', send_video_blob)),
    url(r'^get_videos', hr.handle_request('post', get_videos))
]
