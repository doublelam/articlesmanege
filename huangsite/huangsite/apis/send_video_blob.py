"""Rejson for reconsctruct json"""
from ..common.reform_json import Rejson
from django.core.files.base import ContentFile, os
from ..operate_database.add_video_url import add_video_url
from datetime import datetime
import hashlib


def send_video_blob(req):
    BASE_PATH = 'huangsite/static/'
    folder = 'videos'
    file = req.FILES['videoFile'].read()
    hash_name = hashlib.md5(file).hexdigest()
    try:
        os.mkdir(os.path.join(BASE_PATH, folder))
    except:
        pass
    full_name = os.path.join(BASE_PATH, folder, hash_name)
    file_content = ContentFile(file)
    fout = open(full_name + '.webm', 'wb+')
    try:
        # Iterate through the chunks.
        for chunk in file_content.chunks():
            fout.write(chunk)
        fout.close()
        add_video_url({
            'url': '/static/videos/' + hash_name + '.webm',
            'update_time': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        })
        return Rejson.success({
            'content': {
                'url': 'static/videos/' + hash_name + '.webm'
            }
        })
    except:
        return Rejson.error({
            'message': 'CANNOT SAVE THE FILE'
        })
