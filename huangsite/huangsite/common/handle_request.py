"""import re and http modules"""
import re
from django.http import JsonResponse
# from django.shortcuts import render


def handle_request(req_type, method):
    """judge if correct request method"""
    def rtrn(req):
        """return funtion for judging if right method"""
        if not re.match('^' + req_type + '$', req.method, re.I):
            return JsonResponse({'success': False, 'message': 'Invalid method'}, status=502)
        return method(req)
    return rtrn
