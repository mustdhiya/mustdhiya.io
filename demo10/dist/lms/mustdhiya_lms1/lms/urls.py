from django.urls import path
from .views import *

urlpatterns = [
    # Halaman utama
    path('home/', home_view, name='home'),

    # Autentikasi
    path("register/", register, name="register"),
    path("login/", login_user, name="login"),
    path("logout/", logout_user, name="logout"),

    # Dashboard berdasarkan peran
    path('dashboard/admin/', admin_dashboard, name='admin_dashboard'),
    path('dashboard/instruktur/', instruktur_dashboard, name='instruktur_dashboard'),
    path('dashboard/siswa/', siswa_dashboard, name='siswa_dashboard'),

    # Manajemen User
    path('dashboard/admin/users/', user_list, name='user_list'),
    path('dashboard/admin/users/tambah/', tambah_user, name='tambah_user'),
    path('dashboard/admin/users/edit/<int:user_id>/', edit_user, name='edit_user'),
    path('dashboard/admin/users/hapus/<int:user_id>/', hapus_user, name='hapus_user'),

    # Manajemen Kursus
    path('kursus/', kursus_list, name='kursus_list'),
    path('kursus/tambah/', tambah_kursus, name='tambah_kursus'),
    path('kursus/<int:kursus_id>/', detail_kursus, name='detail_kursus'),
    path('kursus/<int:kursus_id>/edit/', edit_kursus, name='edit_kursus'),
    path('kursus/<int:kursus_id>/hapus/', hapus_kursus, name='hapus_kursus'),

    # Manajemen Modul
    path('kursus/<int:kursus_id>/tambah-modul/', tambah_modul, name='tambah_modul'),
    path('modul/<int:modul_id>/', detail_modul, name='detail_modul'),
    path('modul/<int:modul_id>/edit/', edit_modul, name='edit_modul'),
    path('modul/<int:modul_id>/hapus/', hapus_modul, name='hapus_modul'),

    # Manajemen Page
    path('modul/<int:modul_id>/tambah-page/', tambah_page, name='tambah_page'),
    path('page/<int:page_id>/', detail_page, name='detail_page'),
    path('page/<int:page_id>/edit/', edit_page, name='edit_page'),
    path('page/<int:page_id>/hapus/', hapus_page, name='hapus_page'),
]
