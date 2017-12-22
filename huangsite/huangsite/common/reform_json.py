"""For formatting datetime format"""
from datetime import datetime
from django.http import JsonResponse


class Rejson(object):
    """
      reform the json format of responding
    """
    @staticmethod
    def __get_current_time__():
        return datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    @staticmethod
    def success(content):
        """Success response output"""
        _json = {
            'success': True,
            'server_time': Rejson.__get_current_time__(),
        }
        reform_json = dict(_json, **content)
        return JsonResponse(reform_json)

    @staticmethod
    def error(error):
        """Error response output"""
        _json = {
            'success': False,
            'server_time': Rejson.__get_current_time__(),
            'error': error,
        }
        reform_json = dict(_json, **error)
        return JsonResponse(reform_json)
