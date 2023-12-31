from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="Snippets API",
      default_version='v1.2.3',
      description="api documentation",
      terms_of_service="#",
      contact=openapi.Contact(email="ratroniii@gmail.com"),
      license=openapi.License(name=""),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,)
)
