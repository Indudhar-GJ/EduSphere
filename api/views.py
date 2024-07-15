from .serializers import CartSerializer, CartItemSerializer
from .models import Cart, CartItem
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import viewsets, status
from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.decorators import api_view, action, permission_classes
from django.shortcuts import get_object_or_404
from django.db.models import Max


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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_cart(request):
    user = request.user
    if not user.is_authenticated:
        return Response({'detail': 'Authentication credentials were not provided.'}, status=status.HTTP_401_UNAUTHORIZED)

    cart, created = Cart.objects.get_or_create(user=user)
    serializer = CartSerializer(cart)
    return Response(serializer.data)
