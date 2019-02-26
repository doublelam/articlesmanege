"""modules for apis"""
from django.conf.urls import url
from .get_stroke_styles import get_stroke_styles
from .send_video_blob import send_video_blob
from .get_videos import get_videos
from ..common import handle_request as hr
from .operate_copywrite import create_copywrite, delete_copywrite
from .get_copywrites import get_copywrites
from .operate_common_object import create_common_object, get_common_objects, delete_common_object, update_common_object


URLPATTERNS = [
    url(r'^create_copywrite', hr.handle_request('post', create_copywrite)),
    url(r'^delete_copywrite', hr.handle_request('post', delete_copywrite)),
    url(r'^get_copywrites', hr.handle_request('get', get_copywrites)),
    url(r'^get_common_objects', hr.handle_request('get', get_common_objects)),
    url(r'^create_common_object', hr.handle_request('post', create_common_object)),
    url(r'^delete_common_object', hr.handle_request('post', delete_common_object)),
    url(r'^update_common_object', hr.handle_request('post', update_common_object)),
]
