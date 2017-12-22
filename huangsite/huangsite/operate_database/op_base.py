"""Modules of pymongo and REJSON"""
from pymongo import MongoClient
from ..common.reform_json import Rejson


def list_bases(req):
    """For listing bases"""
    print('reqbody', req.body)
    client = MongoClient()
    bases = client.database_names()
    return Rejson.success({
        'content': bases
    })
