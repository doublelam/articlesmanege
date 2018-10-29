"""Modules of pymongo"""
from pymongo import MongoClient


def get_copywrites(find={}, sort=[]):
    client = MongoClient()
    db = client['common_db']
    collection = db['copies_store']
    cursor = collection.find(filter=find, sort=sort)
    docs = []
    for doc in cursor:
        print(doc)
        docs.append({
            'name': doc.get('name', 'NAME_NOT_FOUND'),
            'content': doc.get('content', []),
            'update_time': doc.get('update_time', "TIME_NOT_FOUND"),
            'id': str(doc.get('_id'))
        })

    return docs
