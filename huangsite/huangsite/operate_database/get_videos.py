"""Modules of pymongo"""
from pymongo import MongoClient

def get_videos():
    client = MongoClient()
    db = client['make_video_db']
    collection = db['videos_urls']
    cursor = collection.find(sort=[('$natural', -1)], limit=100)
    docs = []
    for doc in cursor:
      print(doc)
      docs.append({
        'url': doc['url'],
        'id': str(doc['_id']),
        'update_time': doc['update_time']
      })

    return docs
