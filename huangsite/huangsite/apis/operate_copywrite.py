from ..common.reform_json import Rejson
from ..operate_database.operate_copy import create_copy, delete_copy 
from datetime import datetime

def create_copywrite(req):
    name = req.body.get('name')
    JSON_content = req.body.get('content')
    try:
        create_copy({
            'name': name,
            'content': JSON_content,
            'update_time': datetime.now()
        })
        return Rejson.success({
            'content': {'name': name, 'content': JSON_content}
        })
    except:
        return Rejson.error({
          'message': 'NOT CREATE THIS COPYWRITE'
        })

def delete_copywrite(req):
    id = req.body.get('id')
    try:
        delete_copy(id)
        return Rejson.success({
            'content': {'id': id}
        })
    except:
        return Rejson.error({
          'message': 'DELETE FAIL'
        })
        