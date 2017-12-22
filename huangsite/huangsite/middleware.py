# """HTTP module"""
# from django.http import HttpResponseForbidden
"""Module regular expression"""
import re
import json
# import os


class OutputMessage(object):
    """
      For outputing messages
    """

    def __init__(self, res):
        self.get_response = res
        return None

    def __call__(self, req):
        print('--------------------------')
        print('form middleware' + str(req))
        print('--------------------------')
        # if True:
        #   return HttpResponseForbidden('<h1>Forbidden</h1>')
        return self.get_response(req)


class TransformReqStrToJSON(object):
    """
      For transforming the string of request to JSON format
    """

    def __init__(self, res):
        self.get_response = res
        return None

    def __call__(self, req):
        if re.match('application/json', req.content_type, re.I) and req.body:
            req._body = json.loads(req.body)
        response = self.get_response(req)
        return response


class NoCacheWhenDevEnv(object):
    """
      setting No-Cache when dev environment
    """

    def __init__(self, res):
        print('NoCacheWhenDevEnv init')
        self.get_response = res
        return None

    def __call__(self, req):
        response = self.get_response(req)
        host_path = 'CAN NOT GET HTTP_ORIGIN'
        try:
            host_path = req.META['HTTP_ORIGIN']
        except ValueError:
            print('Error:', ValueError)
        except:
            print('Error! can not get req.META[\'HTTP_ORIGIN\']')
        if bool(re.match(r'^.*\/\/localhost:.*$', host_path)):
            print('matched')
            response['Cache-Control'] = 'must-revalidate, no-cache'
        return response
