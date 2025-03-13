from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from .decorators import role_required
from .models import Course, ClassSession, Discussion, Grade, Certificate, Notification
from .forms import CourseForm, ClassSessionForm, DiscussionForm, GradeForm, CertificateForm
from django.utils.timezone import now
from django.utils import timezone
from .utils import send_notification
from django.contrib.admin.views.decorators import staff_member_required
from django.urls import path
from django.http import HttpResponse
from django.contrib import admin
from django.template.response import TemplateResponse

class CustomAdminSite(admin.AdminSite):
    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('course-report/', self.admin_view(self.course_report), name='course_report'),
        ]
        return custom_urls + urls

    def course_report(self, request):
        context = {'title': 'Laporan Kursus'}
        return TemplateResponse(request, "admin/course_report.html", context)

admin.site = CustomAdminSite()

@login_required
@role_required(['admin'])
def course_report(request):
    courses = Course.objects.annotate(total_students=Count('enrollments'))
    return render(request, 'lms/course_report.html', {'courses': courses})

@login_required
def notifications(request):
    notifs = Notification.objects.filter(user=request.user).order_by('-created_at')
    return render(request, 'lms/notifications.html', {'notifs': notifs})

@login_required
@role_required(['instructor'])
def grade_student(request, course_id, student_id):
    student = get_object_or_404(User, id=student_id, role='student')
    course = get_object_or_404(Course, id=course_id)
    
    if request.method == 'POST':
        form = GradeForm(request.POST)
        if form.is_valid():
            grade = form.save(commit=False)
            grade.student = student
            grade.course = course
            grade.save()

            # Kirim notifikasi nilai
            send_notification(student, f"Anda telah mendapatkan nilai {grade.score} untuk kursus {course.title}.")

            # Berikan sertifikat jika nilai cukup
            if grade.score >= 70:
                Certificate.objects.get_or_create(student=student, course=course)
                send_notification(student, f"Selamat! Anda telah mendapatkan sertifikat untuk kursus {course.title}.")
                
            return redirect('course_detail', course_id=course.id)
    else:
        form = GradeForm()

    return render(request, 'lms/grade_student.html', {'form': form, 'student': student, 'course': course})

@login_required
@role_required(['instructor'])
def create_certificate(request):
    if request.method == 'POST':
        form = CertificateForm(request.POST)
        if form.is_valid():
            certificate = form.save(commit=False)
            certificate.issued_date = timezone.now()
            certificate.save()
            return redirect('my_certificates')  # Redirect ke halaman sertifikat
    else:
        form = CertificateForm()

    return render(request, 'lms/create_certificate.html', {'form': form})

# Instruktur menilai siswa
@login_required
@role_required(['instructor'])
def grade_student(request, course_id, student_id):
    student = get_object_or_404(User, id=student_id, role='student')
    course = get_object_or_404(Course, id=course_id)
    
    if request.method == 'POST':
        form = GradeForm(request.POST)
        if form.is_valid():
            grade = form.save(commit=False)
            grade.student = student
            grade.course = course
            grade.save()

            # Berikan sertifikat jika nilai cukup
            if grade.score >= 70:
                Certificate.objects.get_or_create(student=student, course=course, issued_date=now())
                
            return redirect('course_detail', course_id=course.id)
    else:
        form = GradeForm()

    return render(request, 'lms/grade_student.html', {'form': form, 'student': student, 'course': course})

# Siswa melihat sertifikatnya
@login_required
@role_required(['student'])
def my_certificates(request):
    certificates = Certificate.objects.filter(student=request.user)
    return render(request, 'lms/my_certificates.html', {'certificates': certificates})

# Forum diskusi dalam kelas
@login_required
def discussion(request, session_id):
    session = get_object_or_404(ClassSession, id=session_id)
    discussions = session.discussions.all()
    if request.method == 'POST':
        form = DiscussionForm(request.POST)
        if form.is_valid():
            discussion = form.save(commit=False)
            discussion.user = request.user
            discussion.session = session
            discussion.save()
            return redirect('discussion', session_id=session.id)
    else:
        form = DiscussionForm()
    return render(request, 'lms/discussion.html', {'session': session, 'discussions': discussions, 'form': form})

# Tambah sesi kelas (Hanya instruktur)
@login_required
@role_required(['instructor'])
def add_class(request, course_id):
    course = get_object_or_404(Course, id=course_id)
    if request.method == 'POST':
        form = ClassSessionForm(request.POST)
        if form.is_valid():
            session = form.save(commit=False)
            session.course = course
            session.save()
            return redirect('class_list', course_id=course.id)
    else:
        form = ClassSessionForm()
    return render(request, 'lms/add_class.html', {'form': form, 'course': course})

# Daftar sesi kelas untuk kursus tertentu
@login_required
def class_list(request, course_id):
    course = get_object_or_404(Course, id=course_id)
    sessions = course.sessions.all()
    return render(request, 'lms/class_list.html', {'course': course, 'sessions': sessions})

# Daftar kursus (Semua bisa melihat)
def course_list(request):
    courses = Course.objects.all()
    return render(request, 'lms/course_list.html', {'courses': courses})

# Tambah kursus (Hanya instruktur)
@login_required
@role_required(['instructor'])
def add_course(request):
    if request.method == 'POST':
        form = CourseForm(request.POST)
        if form.is_valid():
            course = form.save(commit=False)
            course.instructor = request.user
            course.save()
            return redirect('course_list')
    else:
        form = CourseForm()
    return render(request, 'lms/add_course.html', {'form': form})

# Detail kursus
def course_detail(request, course_id):
    course = get_object_or_404(Course, id=course_id)
    return render(request, 'lms/course_detail.html', {'course': course})

# Daftar ke kursus (Hanya siswa)
@login_required
@role_required(['student'])
def enroll_course(request, course_id):
    course = get_object_or_404(Course, id=course_id)
    course.students.add(request.user)
    return redirect('course_detail', course_id=course.id)

# Halaman utama (bisa diakses semua pengguna)
def home(request):
    return render(request, 'lms/home.html')

# Dashboard Admin (hanya admin)
@login_required
@role_required(['admin'])
def admin_dashboard(request):
    return render(request, 'lms/admin_dashboard.html')

# Dashboard Instruktur (hanya instruktur)
@login_required
@role_required(['instructor'])
def instructor_dashboard(request):
    courses = Course.objects.filter(instructor=request.user)
    return render(request, 'lms/instructor_dashboard.html', {'courses': courses})

# Dashboard Siswa (hanya siswa)
@login_required
@role_required(['student'])
def student_dashboard(request):
    return render(request, 'lms/student_dashboard.html')
