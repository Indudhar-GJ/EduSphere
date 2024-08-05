from django.db import models
from django.contrib.auth.models import User


class Teacher(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    age = models.IntegerField()
    email = models.EmailField(unique=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Course(models.Model):
    subject = models.CharField(max_length=50)
    topic = models.CharField(max_length=50)
    domain = models.CharField(max_length=50)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    no_of_chapters = models.IntegerField()
    no_of_registrations = models.IntegerField(default=0)
    price = models.IntegerField(default=0)
    rating = models.FloatField(default=0)

    def __str__(self):
        return f"{self.subject} {self.topic}"


class CourseChapter(models.Model):
    chapter_title = models.CharField(max_length=50)
    chapter_no = models.IntegerField(default=-1)
    time_to_complete = models.IntegerField()
    text_data = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    course = models.ForeignKey(
        Course, related_name='chapters', on_delete=models.CASCADE)


class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cart of {self.user.username}"


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name='items',
                             on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.course.subject} ({self.quantity})"


class BoughtCourses(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    completed_chapters = models.IntegerField(default=0)
    total_chapters = models.IntegerField()
    Bought_at = models.DateTimeField(auto_now_add=True)


class Quiz(models.Model):
    question = models.CharField(max_length=100)
    option1 = models.CharField(max_length=50)
    option2 = models.CharField(max_length=50)
    option3 = models.CharField(max_length=50)
    option4 = models.CharField(max_length=50)
    correct_option = models.IntegerField()
    solved_at = models.DateTimeField(blank=True)
    chapter = models.ForeignKey(CourseChapter, on_delete=models.CASCADE)
