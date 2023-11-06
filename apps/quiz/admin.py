from django.contrib import admin

from .models import Quiz, Question, Category, Room


@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ('id','title', 'create', 'update', 'question', 'user', 'cat',)
    search_fields = ('id','title', 'create', 'update', 'question', 'user', 'cat',)
    readonly_fields = ('update',)


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('text', 'choice_a', 'choice_b', 'choice_c', 'choice_d', 'correct_choice', 'time', 'quiz')
    search_fields = ('text', 'quiz__title')


@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ('name', 'status', 'quizzes',)
    readonly_fields = ('password', )
    search_fields = ('name', 'status', 'quizzes',)

admin.site.register(Category)
