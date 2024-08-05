from .serializers import CartSerializer, CartItemSerializer
from .models import Cart, CartItem
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
from rest_framework import viewsets, status
from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.decorators import api_view, action, permission_classes
from django.shortcuts import get_object_or_404
from django.db.models import Max
from django.views.decorators.csrf import csrf_exempt


class CourseView(viewsets.ModelViewSet):
    queryset = Course.objects.all().order_by('no_of_registrations')
    serializer_class = CourseSerializer


# class CartViewSet(viewsets.ModelViewSet):
#     serializer_class = CartSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         return Cart.objects.filter(user=self.request.user)

#     def retrieve(self, request, *args, **kwargs):
#         cart, created = Cart.objects.get_or_create(user=request.user)
#         serializer = self.get_serializer(cart)
#         return Response(serializer.data)

#     def create(self, request, *args, **kwargs):
#         cart, created = Cart.objects.get_or_create(user=request.user)
#         product_id = request.data.get('product_id')
#         quantity = request.data.get('quantity', 1)

#         cart_item, item_created = CartItem.objects.get_or_create(
#             cart=cart, product_id=product_id)
#         if not item_created:
#             cart_item.quantity += quantity
#             cart_item.save()

#         return Response({'message': 'Item added to cart'}, status=status.HTTP_201_CREATED)

#     def update(self, request, *args, **kwargs):
#         cart = Cart.objects.get(user=request.user)
#         cart_item = CartItem.objects.get(cart=cart, id=request.data['item_id'])
#         cart_item.quantity = request.data['quantity']
#         cart_item.save()

#         return Response({'message': 'Cart item updated'}, status=status.HTTP_200_OK)

#     def destroy(self, request, *args, **kwargs):
#         cart = Cart.objects.get(user=request.user)
#         cart_item = CartItem.objects.get(cart=cart, id=request.data['item_id'])
#         cart_item.delete()

#         return Response({'message': 'Cart item removed'}, status=status.HTTP_204_NO_CONTENT)


class CourseChapterViewSet(viewsets.ModelViewSet):
    queryset = CourseChapter.objects.all()
    serializer_class = CourseChapterSerializer


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        data = serializer.data

        # Fetch related chapters based on course's chapter_no
        chapters = CourseChapter.objects.filter(
            course=instance, chapter_no=instance.no_of_chapters)
        chapter_serializer = CourseChapterSerializer(chapters, many=True)
        data['chapters'] = chapter_serializer.data

        return Response(data)


@api_view(['GET'])
def search_courses(request):
    query = request.GET.get('q', '')
    domain = request.GET.get('domain', '')
    teacher = request.GET.get('teacher', '')
    chapter = request.GET.get('chapter', '')
    max_price = request.GET.get('max_price', None)

    filters = models.Q()

    if query:
        filters &= models.Q(subject__icontains=query) | models.Q(
            topic__icontains=query)
    if domain:
        filters &= models.Q(domain__icontains=domain)
    if teacher:
        filters &= models.Q(teacher__first_name__icontains=teacher)
    if chapter:
        filters &= models.Q(no_of_chapters__gte=chapter)
    if max_price:
        filters &= models.Q(price__lte=max_price)

    courses = Course.objects.filter(filters)
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_filters(request):
    teachers = Course.objects.values_list(
        'teacher__first_name', flat=True).distinct()
    domains = Course.objects.values_list('domain', flat=True).distinct()
    max_chapter = Course.objects.aggregate(
        max_chapter=Max('no_of_chapters'))['max_chapter']
    max_price = Course.objects.aggregate(max_price=Max('price'))['max_price']

    return Response({
        'uniteachers': teachers,
        'unidomains': domains,
        'unimax_chapter': max_chapter,
        'unimax_price': max_price
    })


@api_view(['GET'])
def get_course_chapters(request, id, chapterId):
    chapters = CourseChapter.objects.filter(course_id=id, chapter_no=chapterId)
    serializer = CourseChapterSerializer(chapters, many=True)
    # print(serializer.data)
    return Response(serializer.data)


@api_view(['GET'])
def get_course(request, id):
    chapters = Course.objects.filter(id=id)
    serializer = CourseSerializer(chapters, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_chapter_no(request, id):
    chapters = CourseChapter.objects.filter(course_id=id)
    chapter_count = chapters.count()
    return Response({
        "chapter_count": chapter_count
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_bought_courses(request):
    user = request.user
    bought_courses = BoughtCourses.objects.filter(cart__user=user)
    course_ids = bought_courses.values_list('course_id', flat=True)
    courses = Course.objects.filter(id__in=course_ids)
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_unbought_courses(request):
    user = request.user
    bought_course_ids = BoughtCourses.objects.filter(
        cart__user=user).values_list('course_id', flat=True)
    unbought_courses = Course.objects.exclude(
        id__in=bought_course_ids).order_by('-rating')[:5]
    serializer = CourseSerializer(unbought_courses, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_bought_courses_table_data(request, id):
    user = request.user
    bought_courses = BoughtCourses.objects.filter(
        cart__user=user, course_id=id)
    serializer = BoughtCoursesSerializer(bought_courses, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_bought_courses_table_data_without_id(request):
    user = request.user
    bought_courses = BoughtCourses.objects.filter(cart__user=user)
    serializer = BoughtCoursesSerializer(bought_courses, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_quiz_data(request, id, chapterId):
    quizdata = CourseChapter.objects.filter(course_id=id, chapter_no=chapterId)
    chapter_ids = quizdata.values_list('id', flat=True)
    quizs = Quiz.objects.filter(chapter_id__in=chapter_ids)
    serializer = QuizSerializer(quizs, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def increment_completed_chapters(request):
    user = request.user
    course_id = request.data.get('course_id')
    chapter_id = request.data.get('chapter_id')

    if not course_id:
        return Response({'detail': 'Course ID is required'}, status=status.HTTP_400_BAD_REQUEST)

    bought_course = get_object_or_404(
        BoughtCourses, cart__user=user, course_id=course_id)

    bought_course.completed_chapters = max(
        int(bought_course.completed_chapters), chapter_id)
    bought_course.save()

    return Response({'message': 'Completed chapters incremented', 'completed_chapters': bought_course.completed_chapters}, status=status.HTTP_200_OK)


class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['post'])
    def add_item(self, request, pk=None):
        user = request.user
        cart = get_object_or_404(Cart, id=pk, user=user)
        course_id = request.data.get('course_id')
        quantity = request.data.get('quantity', 1)

        if not course_id:
            return Response({'detail': 'Course ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        course = get_object_or_404(Course, id=course_id)
        cart_item, created = CartItem.objects.get_or_create(
            cart=cart, course=course)

        if not created:
            cart_item.quantity += quantity
            cart_item.save()

        existing_cart_item = CartItem.objects.filter(
            cart=cart, course=course).first()
        if existing_cart_item:
            return Response({'detail': 'Item already present in cart'}, status=status.HTTP_400_BAD_REQUEST)

        cart_items = CartItem.objects.filter(cart=cart)
        course_ids = list(cart_items.values_list('course_id', flat=True))

        return Response({'cart_id': cart.id, 'course_ids': course_ids}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def remove_item(self, request, pk=None):
        cart = self.get_object()
        course_id = request.data.get('course_id')
        course = get_object_or_404(Course, id=course_id)
        cart_item = get_object_or_404(CartItem, cart=cart, course=course)
        cart_item.delete()

        cart_items = CartItem.objects.filter(cart=cart)
        course_ids = list(cart_items.values_list('course_id', flat=True))

        return Response({'cart_id': cart.id, 'course_ids': course_ids}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def purchase_items(self, request, pk=None):
        user = request.user
        cart = get_object_or_404(Cart, id=pk, user=user)
        cart_items = CartItem.objects.filter(cart=cart)

        if not cart_items.exists():
            return Response({'detail': 'No items in the cart to purchase'}, status=status.HTTP_400_BAD_REQUEST)

        for item in cart_items:
            course = item.course
            total_chapters = CourseChapter.objects.filter(
                course=course).count()
            BoughtCourses.objects.create(
                cart=cart,
                course=course,
                completed_chapters=0,
                total_chapters=total_chapters
            )
            item.delete()

        bought_courses = BoughtCourses.objects.filter(cart=cart)
        serializer = BoughtCoursesSerializer(bought_courses, many=True)

        return Response({'message': 'Purchase completed successfully', 'bought_courses': serializer.data}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_cart(request):
    user = request.user
    if not user.is_authenticated:
        return Response({'detail': 'Authentication credentials were not provided.'}, status=status.HTTP_401_UNAUTHORIZED)

    cart, created = Cart.objects.get_or_create(user=user)
    serializer = CartSerializer(cart)
    return Response(serializer.data)


# @permission_classes([IsAuthenticated])
@api_view(['POST'])
@csrf_exempt
def check_quiz_answers(request):
    # print("request dat      " + str(request.data))
    correct_answer_return = 0
    serializer = QuizAnswerSerializer(data=request.data, many=True)
    if serializer.is_valid():
        quiz_answers = serializer.validated_data
        for answer in quiz_answers:
            try:
                quiz = Quiz.objects.get(id=answer['id'])
                if int(quiz.correct_option) == int(answer['option']):
                    correct_answer_return += 1
                    quiz.solved_at = timezone.now()
                    quiz.save()
                # else:
                #     print("correct answer is : " + str(quiz.correct_option))
                #     print("given answer is : " + str(answer['option']))
                #     print("solved at is : " + str(quiz.solved_at))
            except Quiz.DoesNotExist:
                return Response({'error': 'Quiz not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'score': correct_answer_return}, status=status.HTTP_200_OK)
    else:
        print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
