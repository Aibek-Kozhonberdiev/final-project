from rest_framework import permissions


class IsAdminOrReadOnlyCustom(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True  # Allowed for GET operation (and other safe methods)
        return request.user and request.user.is_staff  # Allowed only to administrators for other operations
