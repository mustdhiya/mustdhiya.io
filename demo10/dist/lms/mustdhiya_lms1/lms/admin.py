from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *

class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ('username', 'email', 'role', 'is_staff', 'is_superuser')
    list_filter = ('role', 'is_staff', 'is_superuser')
    search_fields = ('username', 'email')

    fieldsets = UserAdmin.fieldsets + (
        ('Role dan Profil', {'fields': ('role', 'foto_profil')}),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Role dan Profil', {'fields': ('role', 'foto_profil')}),
    )

    def save_model(self, request, obj, form, change):
        if obj.is_superuser:
            obj.role = 'admin'
        super().save_model(request, obj, form, change)

admin.site.register(User, CustomUserAdmin)

@admin.register(Kursus)
class KursusAdmin(admin.ModelAdmin):
    list_display = ('judul', 'instruktur', 'status', 'harga', 'jumlah_siswa', 'created_at')
    search_fields = ('judul', 'instruktur__username')
    list_filter = ('status', 'harga')
    ordering = ('-created_at',)
    list_editable = ('status', 'harga')
    date_hierarchy = 'created_at'  # ✅ Pakai 'created_at' yang bertipe DateTimeField

@admin.register(Modul)
class ModulAdmin(admin.ModelAdmin):
    list_display = ('judul', 'kursus', 'urutan')
    search_fields = ('judul', 'kursus__judul')
    ordering = ('kursus', 'urutan')

@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ('judul', 'modul', 'urutan')
    search_fields = ('judul', 'modul__judul')
    ordering = ('modul', 'urutan')
