"""Modules of pymongo"""
from pymongo import MongoClient
from bson.objectid import ObjectId


def create_copy(copy_write):
    client = MongoClient()
    db = client['common_db']
    collection = db['copies_store']
    collection.insert(copy_write)
    client.close()


def delete_copy(id):
    client = MongoClient()
    db = client['common_db']
    collection = db['copies_store']
    collection.delete_one({'_id': ObjectId(id)})
    client.close()
