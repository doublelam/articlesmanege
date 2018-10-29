"""Modules of pymongo"""
from pymongo import MongoClient


def add_video_url(url_list):
    client = MongoClient()
    db = client['make_video_db']
    collection = db['videos_urls']
    collection.insert(url_list)
