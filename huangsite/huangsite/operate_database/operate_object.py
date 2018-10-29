"""Modules of pymongo"""
from pymongo import MongoClient
from bson.objectid import ObjectId
from bson.json_util import dumps


def create_object(name_space, object_content):
    client = MongoClient()
    db = client['common_db']
    collection = db[name_space]
    id = collection.insert(object_content)
    client.close()
    return id


def get_objects(name_space, find, sort):
    client = MongoClient()
    db = client['common_db']
    collection = db[name_space]
    print('find',find,'sort', sort)
    cursor = collection.find(filter=find, sort=sort)
    client.close()
    return list(cursor)


def delete_object(name_space, id):
    client = MongoClient()
    db = client['common_db']
    collection = db[name_space]
    collection.delete_one({'_id': ObjectId(id)})
    client.close()
