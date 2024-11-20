from rest_framework.permissions import BasePermission
from rest_framework.exceptions import AuthenticationFailed
from django.utils.translation import gettext_lazy as _
from .models import Token
from datetime import datetime, timedelta
class IsAdminUser(BasePermission):
    def has_permission(self, request, view):
        # Extract the token from the request headers
        auth_header = request.headers.get('Authorization')

        if not auth_header:
            raise AuthenticationFailed(_('Authentication credentials were not provided.'))

        try:
            # Token is typically in the format 'Token <token_key>', so split it
            token_key = auth_header.split(' ')[1]
        except IndexError:
            raise AuthenticationFailed(_('Invalid token format.'))

        # Retrieve the token document from the MongoDB database using mongoengine
        token = Token.objects(key=token_key).first()

        if not token:
            raise AuthenticationFailed(_('Invalid or expired token.'))

        # Check if the token has expired
        if token.expires_at < datetime.utcnow():
            raise AuthenticationFailed(_('Token has expired.'))

        # Check if the user has the admin role
        if token.user.role != 'ADMIN':
            raise AuthenticationFailed(_('You do not have permission to perform this action.'))

        return True


class IsAuthenticatedUser(BasePermission):
    def has_permission(self, request, view):
        # Extract the token from the request headers
        auth_header = request.headers.get('Authorization')

        if not auth_header:
            raise AuthenticationFailed(_('Authentication credentials were not provided.'))

        try:
            # Token is typically in the format 'Token <token_key>', so split it
            token_key = auth_header.split(' ')[1]
        except IndexError:
            raise AuthenticationFailed(_('Invalid token format.'))

        # Retrieve the token document from the MongoDB database using mongoengine
        token = Token.objects(key=token_key).first()

        if not token:
            raise AuthenticationFailed(_('Invalid or expired token.'))

        # Check if the token has expired
        if token.expires_at < datetime.utcnow():
            raise AuthenticationFailed(_('Token has expired.'))
        request.user = token.user
        # If the token is valid and not expired, grant access
        return True
# class IsDriverOnly(BasePermission):
#     def has_permission(self, request, view):
#