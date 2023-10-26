from django.contrib import admin

from .models import Quiz, Question, Category, Group

admin.site.register(Quiz)
admin.site.register(Question)
admin.site.register(Category)
admin.site.register(Group)
