from django.db import models


# Create your models here.


class Users(models.Model):

    user_id = models.BigAutoField(auto_created=True, primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    password_hash = models.CharField(max_length=200)
    role = models.CharField(max_length=50)
    profile_image = models.ImageField(upload_to='profile_images/')

    def __str__(self):
        return self.first_name + " " + self.last_name


class Lecturer(models.Model):
    lecturer_id = models.BigAutoField(auto_created=True, primary_key=True)
    user = models.OneToOneField(Users, on_delete=models.CASCADE)
    department = models.CharField(max_length=100)
    office_number = models.IntegerField()


class Students(models.Model):
    student_id = models.BigAutoField(auto_created=True, primary_key=True)
    user = models.OneToOneField(Users, on_delete=models.CASCADE)
    student_number = models.CharField(max_length=50)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=50)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=50)
    guardian_name = models.CharField(max_length=100)
    guardian_phone_number = models.CharField(max_length=50)
    guardian_email = models.EmailField()
    guardian_address = models.CharField(max_length=200)
    enrollment_year = models.DateTimeField(auto_now_add=True)
    program_of_study = models.CharField(max_length=100)

    def __str__(self):
        return self.user.first_name + " " + self.user.last_name


class Courses(models.Model):
    course_id = models.BigAutoField(auto_created=True, primary_key=True)
    course_name = models.CharField(max_length=100)
    course_code = models.CharField(max_length=100)
    course_description = models.TextField()
    course_credit = models.IntegerField()
    course_level = models.CharField(max_length=100)
    course_department = models.CharField(max_length=100)
    lecturer = models.ForeignKey(Lecturer, on_delete=models.CASCADE)


class Course_Resources(models.Model):
    resource_id = models.BigAutoField(auto_created=True, primary_key=True)
    course = models.ForeignKey(Courses, on_delete=models.CASCADE)
    resource_name = models.CharField(max_length=100)
    resource_file = models.FileField(upload_to='course_resources/')
    upload_date = models.DateTimeField(auto_now_add=True)


class Enrollments(models.Model):
    enrollment_id = models.BigAutoField(auto_created=True, primary_key=True)
    student = models.ForeignKey(Students, on_delete=models.CASCADE)
    course = models.CharField(max_length=100)
    semester = models.CharField(max_length=50)
    year = models.CharField(max_length=50)
    grade = models.CharField(max_length=50)
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


class Chats(models.Model):

    chat_id = models.BigAutoField(auto_created=True, primary_key=True)
    sender = models.ForeignKey(
        Users, on_delete=models.CASCADE, related_name='sender')
    receiver = models.ForeignKey(
        Users, on_delete=models.CASCADE, related_name='receiver')
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.sender.first_name + " " + self.sender.last_name + " - " + self.receiver.first_name + " " + self.receiver.last_name
