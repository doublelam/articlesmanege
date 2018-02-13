from ..operate_database.get_videos import get_videos as get_v
from ..common.reform_json import Rejson


def get_videos(*_):
    video_list = get_v()
    print('videolist', video_list)
    return Rejson.success({
        'content': {
            'videos': get_v()
        }
    })
