from django.shortcuts import render
from .services import FamiliaServices
from django.contrib import messages
from .models import Familia
from usuario import models
from usuario.models import Usuario
from django.contrib.auth.decorators import login_required, user_passes_test

# Create your views here.
def is_familiadmin(user):
    return user.papel == Usuario.Papel.ADMIN_FAMILIA

@login_required
def familia(request):
    user = request.user
    if user.id_familia:
        familia_obj = user.id_familia
        nome = familia_obj.nome
        membros = familia_obj.membros
        chefe = Usuario.objects.filter(id_familia=familia_obj, papel=Usuario.Papel.ADMIN_FAMILIA).first()
        return render(request, 'familia/familia_inicio.html', {'familia': True, 'nome': nome, 'membros': membros, 'chefe': chefe, 'user': user})
    return render(request, 'familia/familia_inicio.html', {'familia': False, 'user': user})


@login_required
def criarfamilia(request):
    if request.method == 'POST':
        nome = request.POST.get('nome')
        print(f"Nome: {nome}")
        if nome:
            try:
                familia = FamiliaServices.adicionarfamilia(nome)
                print(f"Familia criada: {familia}")
                FamiliaServices.tornar_adminFamilia(request.user, familia)
                print(f"User papel: {request.user.papel}, id_familia: {request.user.id_familia}")
                messages.success(request, "Família criada com sucesso!")
                user = request.user
                nome = familia.nome
                membros = familia.membros
                chefe = Usuario.objects.filter(id_familia=familia, papel=Usuario.Papel.ADMIN_FAMILIA).first()
                return render(request, 'familia/familia_inicio.html', {'familia': True, 'nome': nome, 'membros': membros, 'chefe': chefe, 'user': user})
            except Exception as e:
                messages.error(request, f"Erro ao criar família: {str(e)}")
        else:
            messages.error(request, "Nome da família é obrigatório.")
    user = request.user
    familia = Familia.objects.get(id=id_familia)
    nome = familia.nome
    membros = familia.membros
    chefe = Usuario.objects.filter(id_familia=familia, papel=Usuario.Papel.ADMIN_FAMILIA).first()
    return render(request, 'familia/familia_inicio.html', {'familia': True, 'nome': nome, 'membros': membros, 'chefe': chefe, 'user': user})

@login_required
@user_passes_test(is_familiadmin)
def adicionarmembro(request, id_familia):
    if request.method == 'POST':
        email = request.POST.get('email')
        if email:
            try:
                familia = Familia.objects.get(id=id_familia)
                FamiliaServices.adicionarmembro(email, familia)
                messages.success(request, "Membro adicionado com sucesso!")
                user = request.user
                nome = familia.nome
                membros = familia.membros
                chefe = Usuario.objects.filter(id_familia=familia, papel=Usuario.Papel.ADMIN_FAMILIA).first()
                return render(request, 'familia/familia_inicio.html', {'familia': True, 'nome': nome, 'membros': membros, 'chefe': chefe, 'user': user})
            except Exception as e:
                messages.error(request, f"Erro ao adicionar membro: {str(e)}")
        else:
            messages.error(request, "Email é obrigatório para adicionar um membro.")
    user = request.user
    familia = Familia.objects.get(id=id_familia)
    nome = familia.nome
    membros = familia.membros
    chefe = Usuario.objects.filter(id_familia=familia, papel=Usuario.Papel.ADMIN_FAMILIA).first()
    return render(request, 'familia/familia_inicio.html', {'familia': True, 'nome': nome, 'membros': membros, 'chefe': chefe, 'user': user})