from django.http import HttpResponse
from django.shortcuts import redirect

def role_required(allowed_roles=[]):
    def decorator(view_func):
        def wrapper(request, *args, **kwargs):
            if request.user.is_authenticated and request.user.role in allowed_roles:
                return view_func(request, *args, **kwargs)
            return HttpResponse("Anda tidak memiliki izin untuk mengakses halaman ini.", status=403)
        return wrapper
    return decorator
