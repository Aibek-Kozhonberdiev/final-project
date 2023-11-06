from django.contrib import admin

from .models import UserProfile


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone', 'point', 'number_of_completed_games',)
    search_fields = ('id', 'user__username', 'phone', 'point', 'number_of_completed_games')
    readonly_fields = ('user', 'number_of_completed_games',)
