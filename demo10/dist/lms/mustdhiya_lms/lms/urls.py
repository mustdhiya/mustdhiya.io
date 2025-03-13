from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('admin-dashboard/', views.admin_dashboard, name='admin_dashboard'),
    path('instructor-dashboard/', views.instructor_dashboard, name='instructor_dashboard'),
    path('student-dashboard/', views.student_dashboard, name='student_dashboard'),

    path('courses/', views.course_list, name='course_list'),
    path('courses/add/', views.add_course, name='add_course'),
    path('courses/<int:course_id>/', views.course_detail, name='course_detail'),
    path('courses/<int:course_id>/enroll/', views.enroll_course, name='enroll_course'),
    
    path('courses/<int:course_id>/classes/', views.class_list, name='class_list'),
    path('courses/<int:course_id>/classes/add/', views.add_class, name='add_class'),
    path('classes/<int:session_id>/discussion/', views.discussion, name='discussion'),
    
    path('courses/<int:course_id>/grade/<int:student_id>/', views.grade_student, name='grade_student'),
    path('my-certificates/', views.my_certificates, name='my_certificates'),
    path('create-certificate/', views.create_certificate, name='create_certificate'),
    
    path('notifications/', views.notifications, name='notifications'),
    path('admin/course-report/', views.course_report, name='course_report'),
]
