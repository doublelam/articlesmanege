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
        'url': doc.get('url'),
        'id': str(doc.get('_id')),
        'update_time': doc.get('update_time')
      })

    return docs
