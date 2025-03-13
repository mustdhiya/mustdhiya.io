from django.contrib.auth.models import AbstractUser, User
from django.db import models

# 1️⃣ Model Custom User untuk Admin, Instruktur, dan Siswa
class User(AbstractUser):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('instructor', 'Instructor'),
        ('student', 'Student'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

# 2️⃣ Model Kursus
class Course(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    instructor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='courses')
    students = models.ManyToManyField(User, related_name='enrolled_courses', blank=True)

    def __str__(self):
        return self.title

# 3️⃣ Model Enrollment (Pendaftaran Kursus)
class Enrollment(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'student'})
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    enrolled_at = models.DateTimeField(auto_now_add=True)

# 4️⃣ Model Forum Diskusi
class ClassSession(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='sessions')
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateTimeField()
    
    def __str__(self):
        return f"{self.title} - {self.course.title}"

class Discussion(models.Model):
    session = models.ForeignKey(ClassSession, on_delete=models.CASCADE, related_name='discussions')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Discussion by {self.user.username} on {self.session.title}"

# 5️⃣ Model Sertifikat
class Grade(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'student'})
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    score = models.FloatField()
    feedback = models.TextField(blank=True, null=True)
    date_graded = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.username} - {self.course.title}: {self.score}"

class Certificate(models.Model):
    id = models.AutoField(primary_key=True)
    student = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'student'})
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    issued_date = models.DateTimeField(auto_now_add=True)
    certificate_id = models.CharField(max_length=20, unique=True)

    class Meta:
        unique_together = ('student', 'course') 
        
    def save(self, *args, **kwargs):
        if not self.certificate_id:
            self.certificate_id = f"CERT-{self.student.id}-{self.course.id}-{self.issued_date.strftime('%Y%m%d')}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Certificate {self.certificate_id} for {self.student.username}"

class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"Notif untuk {self.user.username}: {self.message}"
