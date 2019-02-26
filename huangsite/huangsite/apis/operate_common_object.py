from ..common.reform_json import Rejson
from ..operate_database.operate_object import create_object, delete_object, get_objects, update_object
from datetime import datetime
from ..operate_database.get_copywrites import get_copywrites
from pymongo.errors import ConnectionFailure
import sys
import json



def create_common_object(req):
    name_space = req.body.get('name_space')
    JSON_content = req.body.get('content')
    name_spaces = get_copywrites(find={"name": "validate_database_space_names"})[
        0].get('content')
    if (name_space not in name_spaces):
        return Rejson.error({
            'message': 'INVALID NAME SPACE'
        })
    try:
        id = create_object(name_space, dict(
            {"create_time": datetime.now()}, **JSON_content))
        return Rejson.success({
            'content': {'name_space': name_space, 'id': str(id)}
        })
    except:
        e = sys.exc_info()[0]
        return Rejson.error({
            'message': 'THIS OBJECT NOT CREATED: %s' % e
        })


def get_common_objects(req):
    name_space = req.GET.get('name_space')
    find = json.loads(req.GET.get('find') or '{}')
    sort = eval(req.GET.get('sort') or '[]')
    try:
        rslt = get_objects(name_space, find, sort)

        def addId(v):
            id_item = {'id': str(v.get('_id'))}
            newV = dict(v, **id_item)
            newV.pop('_id', None)
            return newV

        return Rejson.success({
            'content': {
                'objects': list(map(addId, rslt))
            }
        })
    except:
        e = sys.exc_info()[0]
        return Rejson.error({
            'message': 'CANNOT GET OBJECTS: %s' % e
        })


def delete_common_object(req):
    name_space = req.body.get('name_space')
    id = req.body.get('id')
    try:
        delete_object(name_space, id)
        return Rejson.success({
            'content': {'id': id}
        })
    except:
        e = sys.exc_info()[0]
        return Rejson.error({
            'message': 'DELETE FAILD: %s' % e
        })


def update_common_object(req):
    name_space = req.body.get('name_space')
    JSON_content = req.body.get('content')
    id = req.body.get('id')
    name_spaces = get_copywrites(find={"name": "validate_database_space_names"})[
        0].get('content')
    if (name_space not in name_spaces):
        return Rejson.error({
            'message': 'INVALID NAME SPACE'
        })
    try:
        rslt = update_object(name_space, id, JSON_content)
        return Rejson.success({
            'content': rslt
        })
    except:
        e = sys.exc_info()[0]
        print(JSON_content, e)
        return Rejson.error({
            'message': 'UPDATED FAILD: %s' % e
        })