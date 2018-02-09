from django.http import JsonResponse


def get_post(req):
    return JsonResponse({'success': True, 'content': req.body})
