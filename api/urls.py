from django.urls import include, path
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'coursedata', CourseView, basename='landing')
# router.register(r'cartdata', CartViewSet1, basename='cartdata')
router.register(r'chapters', CourseChapterViewSet)
router.register(r'carts', CartViewSet)
# router.register(r'courses', CourseViewSet)

urlpatterns = [
    path('search/', search_courses, name='search_courses'),
    path('search/unique/', get_filters, name='get_filters'),
    path('cart/', get_user_cart, name='get_user_cart'),
    path('courses/chapterscount/<int:id>/',
         get_chapter_no, name='get_chapter_no'),
    path('courses/<int:id>/',
         get_course, name='get_course'),
    path('courses/<int:id>/<int:chapterId>/',
         get_course_chapters, name='course-chapters'),
    path('quizs/<int:id>/<int:chapterId>/',
         get_quiz_data, name='get_quiz_data'),
    path('bought_courses/', get_bought_courses, name='get_bought_courses'),
    path('bought_courses_table_data/<int:id>/', get_bought_courses_table_data,
         name='get_bought_courses_table_data'),
    path('get_bought_courses_table_data_without_id/', get_bought_courses_table_data_without_id,
         name='get_bought_courses_table_data_without_id'),
    path('top5_courses/', get_unbought_courses, name='get_unbought_courses'),
    path('increment_completed_chapters/', increment_completed_chapters,
         name='increment_completed_chapters'),
    path('check-quiz-answers/', check_quiz_answers, name='check_quiz_answers'),
    path('', include(router.urls)),
]
