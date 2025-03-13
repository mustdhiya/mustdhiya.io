from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.core.files.storage import default_storage
from .models import *
from .decorators import role_required
from django.core.exceptions import PermissionDenied

User = get_user_model()

@login_required
def user_list(request):
    if not request.user.is_staff:
        raise PermissionDenied

    users = User.objects.all()
    return render(request, 'dashboard/admin.html', {'users': users})


@login_required
def tambah_user(request):
    if not request.user.is_staff:
        raise PermissionDenied

    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        role = request.POST['role']

        user = User.objects.create_user(username=username, email=email, password=password)
        user.role = role
        user.save()
        messages.success(request, f'User {username} berhasil ditambahkan.')
        return redirect('user_list')

    return render(request, 'dashboard/tambah_user.html')


@login_required
def edit_user(request, user_id):
    if not request.user.is_staff:
        raise PermissionDenied

    user = get_object_or_404(User, id=user_id)

    if request.method == 'POST':
        user.username = request.POST['username']
        user.email = request.POST['email']
        user.role = request.POST['role']
        if request.POST['password']:
            user.set_password(request.POST['password'])
        user.save()
        messages.success(request, f'User {user.username} berhasil diperbarui.')
        return redirect('user_list')

    return render(request, 'dashboard/edit_user.html', {'user': user})

@login_required
def hapus_user(request, user_id):
    if not request.user.is_staff:
        raise PermissionDenied

    user = get_object_or_404(User, id=user_id)
    if request.method == 'POST':
        user.delete()
        messages.success(request, 'User berhasil dihapus.')
        return redirect('user_list')

    return render(request, 'dashboard/hapus_user.html', {'user': user})

def detail_page(request, page_id):
    page = get_object_or_404(Page, id=page_id)
    return render(request, "kursus/detail_page.html", {"page": page})

@login_required
def hapus_modul(request, modul_id):
    modul = get_object_or_404(Modul, id=modul_id)
    kursus = modul.kursus

    # Hanya Admin atau Instruktur kursus yang bisa menghapus modul
    if request.user.role != 'admin' and request.user != kursus.instruktur:
        return redirect('detail_kursus', kursus_id=kursus.id)

    modul.delete()
    return redirect('detail_kursus', kursus_id=kursus.id)


@login_required
def edit_modul(request, modul_id):
    modul = get_object_or_404(Modul, id=modul_id)
    kursus = modul.kursus

    # Hanya Admin atau Instruktur kursus yang bisa mengedit modul
    if request.user.role != 'admin' and request.user != kursus.instruktur:
        return redirect('detail_kursus', kursus_id=kursus.id)

    if request.method == "POST":
        modul.judul = request.POST['judul']
        modul.deskripsi = request.POST['deskripsi']
        modul.save()
        return redirect('detail_kursus', kursus_id=kursus.id)

    return render(request, 'kursus/edit_modul.html', {'modul': modul})

def detail_modul(request, modul_id):
    modul = get_object_or_404(Modul, id=modul_id)
    pages = modul.pages.all()  # Ambil semua page dalam modul
    return render(request, "kursus/detail_modul.html", {"modul": modul, "pages": pages})


@login_required
def tambah_modul(request, kursus_id):
    kursus = get_object_or_404(Kursus, id=kursus_id)

    if request.method == "POST":
        judul = request.POST.get("judul")
        deskripsi = request.POST.get("deskripsi")

        if judul and deskripsi:  # Validasi sederhana
            urutan_baru = kursus.moduls.count() + 1  # Urutan berdasarkan jumlah modul
            Modul.objects.create(kursus=kursus, judul=judul, deskripsi=deskripsi, urutan=urutan_baru)
            return redirect('detail_kursus', kursus_id=kursus.id)

    return render(request, "kursus/tambah_modul.html", {"kursus": kursus})


def detail_kursus(request, kursus_id):
    kursus = get_object_or_404(Kursus, id=kursus_id)
    modul_list = kursus.moduls.all()
    return render(request, 'kursus/detail_kursus.html', {'kursus': kursus, 'modul_list': modul_list})

# ✅ Tambah Halaman
@login_required
def tambah_page(request, modul_id):
    modul = get_object_or_404(Modul, id=modul_id)

    if request.method == "POST":
        judul = request.POST.get("judul")
        konten = request.POST.get("konten")
        file = request.FILES.get("file")

        page = Page.objects.create(modul=modul, judul=judul, konten=konten, file=file)
        return redirect("detail_modul", modul_id=modul.id)

    return render(request, "kursus/tambah_page.html", {"modul": modul})

@login_required
def edit_page(request, page_id):
    page = get_object_or_404(Page, id=page_id)
    modul = page.modul

    if request.user.role != 'admin' and request.user != modul.kursus.instruktur:
        return redirect('detail_kursus', kursus_id=modul.kursus.id)

    if request.method == "POST":
        page.judul = request.POST['judul']
        page.konten = request.POST['konten']
        if 'file' in request.FILES:
            page.file = request.FILES['file']
        page.save()
        return redirect('detail_kursus', kursus_id=modul.kursus.id)

    return render(request, 'kursus/edit_page.html', {'page': page})

@login_required
def hapus_page(request, page_id):
    page = get_object_or_404(Page, id=page_id)
    modul = page.modul

    if request.user.role != 'admin' and request.user != modul.kursus.instruktur:
        return redirect('detail_kursus', kursus_id=modul.kursus.id)

    page.delete()
    return redirect('detail_kursus', kursus_id=modul.kursus.id)

# ✅ Kursus Management
def kursus_list(request):
    query = request.GET.get('q', '')
    kursus = Kursus.objects.all()
    if query:
        kursus = kursus.filter(judul__icontains=query)

    return render(request, 'kursus/kursus_list.html', {'kursus': kursus, 'query': query})

@login_required
def tambah_kursus(request):
    if request.method == "POST":
        judul = request.POST.get("judul")
        deskripsi = request.POST.get("deskripsi")
        harga = request.POST.get("harga")
        status = request.POST.get("status")
        thumbnail = request.FILES.get("thumbnail")

        kursus = Kursus(
            judul=judul,
            deskripsi=deskripsi,
            harga=harga,
            status=status,
            instruktur=request.user,
            thumbnail=thumbnail
        )
        kursus.save()
        return redirect("kursus_list")

    return render(request, "kursus/tambah_kursus.html")

@login_required
def edit_kursus(request, kursus_id):
    kursus = get_object_or_404(Kursus, id=kursus_id)

    if request.user.role != 'admin' and request.user != kursus.instruktur:
        return redirect("kursus_list")

    if request.method == "POST":
        kursus.judul = request.POST.get("judul")
        kursus.deskripsi = request.POST.get("deskripsi")
        kursus.harga = request.POST.get("harga")
        kursus.status = request.POST.get("status")

        if "thumbnail" in request.FILES:
            if kursus.thumbnail:
                default_storage.delete(kursus.thumbnail.path)
            kursus.thumbnail = request.FILES["thumbnail"]

        kursus.save()
        return redirect("kursus_list")

    return render(request, "kursus/edit_kursus.html", {"kursus": kursus})

@login_required
@role_required(allowed_roles=['admin'])
def hapus_kursus(request, kursus_id):
    kursus = get_object_or_404(Kursus, id=kursus_id)

    if request.method == "POST":
        if kursus.thumbnail:
            default_storage.delete(kursus.thumbnail.path)
        kursus.delete()
        return redirect("kursus_list")

    return render(request, "kursus/hapus_kursus.html", {"kursus": kursus})

# ✅ Dashboard Role-Based
@login_required
@role_required(allowed_roles=['admin'])
def admin_dashboard(request):
    if not request.user.is_staff:
        raise PermissionDenied

    users = User.objects.all()
    return render(request, 'dashboard/admin.html', {'users': users})

@login_required
@role_required(allowed_roles=['instruktur'])
def instruktur_dashboard(request):
    return render(request, 'dashboard/instruktur.html')

@login_required
@role_required(allowed_roles=['siswa'])
def siswa_dashboard(request):
    return render(request, 'dashboard/siswa.html')

# ✅ Autentikasi Pengguna
def register(request):
    if request.method == "POST":
        username = request.POST.get("username")
        email = request.POST.get("email")
        password = request.POST.get("password")
        confirm_password = request.POST.get("confirm_password")

        if password != confirm_password:
            messages.error(request, "Password tidak cocok!")
            return redirect("register")

        if User.objects.filter(username=username).exists():
            messages.error(request, "Username sudah digunakan!")
            return redirect("register")

        if User.objects.filter(email=email).exists():
            messages.error(request, "Email sudah terdaftar!")
            return redirect("register")

        # Buat user baru dengan role default "siswa"
        user = User.objects.create_user(username=username, email=email, password=password)
        user.role = "siswa"
        user.save()

        messages.success(request, "Registrasi berhasil! Silakan login.")
        return redirect("login")

    return render(request, "auth/register.html")

def login_user(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            messages.success(request, "Login berhasil!")
            return redirect("home")
        else:
            messages.error(request, "Username atau password salah!")
            return redirect("login")

    return render(request, "auth/login.html")

@login_required
def logout_user(request):
    logout(request)
    messages.success(request, "Logout berhasil!")
    return redirect("login")

def home_view(request):
    return render(request, 'home.html')
