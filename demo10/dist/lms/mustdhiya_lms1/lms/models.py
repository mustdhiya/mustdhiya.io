from django.contrib.auth.models import AbstractUser
from django.db import models
from ckeditor.fields import RichTextField


# ✅ Model Kustom untuk User
class User(AbstractUser):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('instruktur', 'Instruktur'),
        ('siswa', 'Siswa'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='siswa')
    foto_profil = models.ImageField(upload_to='profile_pics/', blank=True, null=True)

    def __str__(self):
        return self.username


# ✅ Model Kursus
class Kursus(models.Model):
    STATUS_CHOICES = [
        ('dibuka', 'Pendaftaran Dibuka'),
        ('berjalan', 'Sedang Berlangsung'),
        ('ditutup', 'Ditutup'),
    ]

    judul = models.CharField(max_length=200)
    deskripsi = models.TextField()
    thumbnail = models.ImageField(upload_to='kursus_thumbnails/', blank=True, null=True)
    instruktur = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'instruktur'})
    harga = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='dibuka')
    jumlah_siswa = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.judul


# ✅ Model Modul
class Modul(models.Model):
    kursus = models.ForeignKey(Kursus, on_delete=models.CASCADE, related_name='moduls')
    judul = models.CharField(max_length=200)
    deskripsi = models.TextField()
    urutan = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['urutan']

    def __str__(self):
        return self.judul


# ✅ Model Page (Halaman dalam Modul)
class Page(models.Model):
    modul = models.ForeignKey(Modul, on_delete=models.CASCADE, related_name='pages')
    judul = models.CharField(max_length=200)
    konten = RichTextField()
    urutan = models.PositiveIntegerField(default=0)
    file = models.FileField(upload_to='page_files/', blank=True, null=True)

    class Meta:
        ordering = ['urutan']

    def __str__(self):
        return self.judul
