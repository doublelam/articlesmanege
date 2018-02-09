"""Rejson for reconsctruct json"""
from ..common.reform_json import Rejson


def get_stroke_styles(*_):
    """Of getting styles and send them"""
    return Rejson.success({
        "content": {
            'widths': [1, 2, 3, 5, 8, 12],
            'colors': [
                '#9E9E9E',
                '#F44336',
                '#E91E63',
                '#9C27B0',
                '#673AB7',
                '#3F51B5',
                '#2196F3',
                '#03A9F4',
                '#00BCD4',
                '#009688',
                '#4CAF50',
                '#8BC34A',
                '#CDDC39',
                '#FFEB3B',
                '#FFC107',
                '#FF9800',
                '#FF5722',
                '#795548',
                '#607D8B',
            ],
            'durations': [
                {'name': '10 FPS', 'duration': 100},
                {'name': '5 FPS', 'duration': 200},
                {'name': '2 FPS', 'duration': 500},
                {'name': '24 FPS', 'duration': 41.667},
                {'name': '60 FPS', 'duration': 16.667},
            ]
        }
    })
