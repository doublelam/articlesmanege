from ..operate_database.get_copywrites import get_copywrites as get_c
from ..common.reform_json import Rejson
import json

def get_copywrites(req):
    find = json.loads(req.GET.get('find') or '{}')
    sort = eval(req.GET.get('sort') or '[]')
    return Rejson.success({
        'content': {
            'copywrites': get_c(find, sort)
        }
    })