"""For reforming json"""
# from django.http import JsonResponse
from .common.reform_json import Rejson


def temp(*_):
    """TEST FOR RESPONDING JSON"""
    print('rejson.success', str(Rejson.success))
    # return JsonResponse({'content': 'some content'})
    return Rejson.success({'content': 'some content'})
