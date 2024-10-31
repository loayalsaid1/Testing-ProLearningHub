from django.db import models
import uuid


# Create your models here.


class Users(models.Model):

    user_id = models.BigAutoField(auto_created=True, primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    password_hash = models.CharField(max_length=200)
    role = models.CharField(max_length=50)
    profile_image = models.ImageField(
        upload_to='profile_images/', null=True, blank=True)
    reset_token = models.CharField(
        max_length=32, blank=True, null=True)  # For password reset

    def __str__(self):
        return self.first_name + " " + self.last_name


class Lecturer(models.Model):
    lecturer_id = models.BigAutoField(auto_created=True, primary_key=True)
    user = models.OneToOneField(Users, on_delete=models.CASCADE)
    department = models.CharField(max_length=100, null=True, blank=True)
    office_number = models.IntegerField(null=True, blank=True)
    annoucement = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.user.first_name + " " + self.user.last_name


class Students(models.Model):
    student_id = models.BigAutoField(auto_created=True, primary_key=True)
    user = models.OneToOneField(Users, on_delete=models.CASCADE)
    student_number = models.UUIDField(default=uuid.uuid4, editable=False)
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=50, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    phone_number = models.CharField(max_length=50, null=True, blank=True)
    guardian_name = models.CharField(max_length=100, null=True, blank=True)
    guardian_phone_number = models.CharField(
        max_length=50, null=True, blank=True)
    guardian_email = models.EmailField(null=True, blank=True)
    guardian_address = models.CharField(max_length=200, null=True, blank=True)
    enrollment_year = models.DateTimeField(auto_now_add=True)
    program_of_study = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.user.first_name + " " + self.user.last_name


class Courses(models.Model):
    course_id = models.BigAutoField(auto_created=True, primary_key=True)
    course_name = models.CharField(max_length=100)
    course_code = models.CharField(max_length=100, null=True, blank=True)
    course_description = models.TextField(null=True, blank=True)
    course_credit = models.IntegerField(null=True, blank=True)
    course_level = models.CharField(max_length=100, null=True, blank=True)
    course_department = models.CharField(max_length=100, null=True, blank=True)
    lecturer = models.ForeignKey(
        Lecturer, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"{self.course_name}  ({self.course_code})"


class Course_Resources(models.Model):
    resource_id = models.BigAutoField(auto_created=True, primary_key=True)
    course = models.ForeignKey(Courses, on_delete=models.CASCADE)
    resource_name = models.CharField(max_length=100)
    resource_file = models.FileField(
        upload_to='course_resources/', null=True, blank=True)
    upload_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.resource_name}  ({self.course.course_code})"


class Enrollments(models.Model):
    enrollment_id = models.BigAutoField(auto_created=True, primary_key=True)
    student = models.ForeignKey(Students, on_delete=models.CASCADE)
    course = models.CharField(max_length=100, null=True, blank=True)
    semester = models.CharField(max_length=50, null=True, blank=True)
    year = models.CharField(max_length=50, null=True, blank=True)
    grade = models.CharField(max_length=50, null=True, blank=True)
    course_id = models.ForeignKey(Courses, on_delete=models.CASCADE)

    def __str__(self):
        return self.student.user.first_name + " " + self.student.user.last_name + " - " + self.course


class Facial_Recognition(models.Model):
    log_id = models.BigAutoField(auto_created=True, primary_key=True)
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='facial_recognition/')
    attempt_time = models.DateTimeField(auto_now_add=True)
    success = models.BooleanField(default=False)

    def __str__(self):
        return self.user.first_name + " " + self.user.last_name + " - " + str(self.attempt_time)


class Forum(models.Model):
    forum_id = models.BigAutoField(auto_created=True, primary_key=True)
    course = models.ForeignKey(Courses, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    creator = models.ForeignKey(Users, on_delete=models.CASCADE)

    def __str__(self):
        return self.title + " - " + self.course.course_name


class Thread(models.Model):
    thread_id = models.BigAutoField(auto_created=True, primary_key=True)
    forum = models.ForeignKey(Forum, on_delete=models.CASCADE)
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title + " - " + self.forum.title


class Chats(models.Model):

    chat_id = models.BigAutoField(auto_created=True, primary_key=True)
    sender = models.ForeignKey(
        Users, on_delete=models.CASCADE, related_name='sender')
    receiver = models.ForeignKey(
        Users, on_delete=models.CASCADE, related_name='receiver')
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.sender.first_name + " " + self.sender.last_name + " - " + self.receiver.first_name + " " + self.receiver.last_name
