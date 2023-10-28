from django.contrib import admin

from .models import Quiz, Question, Category, Room

admin.site.register(Quiz)
admin.site.register(Question)
admin.site.register(Category)
admin.site.register(Room)
