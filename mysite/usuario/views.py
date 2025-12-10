from django.shortcuts import render, redirect
from django.test import TestCase
from django.http import HttpResponse
from django.contrib.auth import get_user_model, authenticate, login as auth_login, logout as auth_logout
from django.contrib import messages
from django.db import IntegrityError


# Create your tests here.

Usuario = get_user_model()

def login_usuario(request):
    if request.method == "POST":
        email = request.POST.get("email")
        senha = request.POST.get("senha")
        print(f"DEBUG LOGIN: Email={email}, Senha=***")

        try:
            # Procurar o usuário pelo email
            usuario = Usuario.objects.get(email=email)
            print(f"DEBUG LOGIN: Usuário encontrado: {usuario}")
            
            # Verificar a senha
            if usuario.check_password(senha):
                print(f"DEBUG LOGIN: Senha correta! Fazendo login...")
                # Autenticar e fazer login
                auth_login(request, usuario)
                print(f"DEBUG LOGIN: Usuário logado com sucesso!")
                print(f"DEBUG LOGIN: request.user.is_authenticated = {request.user.is_authenticated}")
                return redirect("transacoes_index")
            else:
                print(f"DEBUG LOGIN: Senha incorreta!")
                messages.error(request, "Email ou senha inválidos.")
                return render(request, "login.html")
        except Usuario.DoesNotExist:
            print(f"DEBUG LOGIN: Usuário não encontrado: {email}")
            messages.error(request, "Email ou senha inválidos.")
            return render(request, "login.html")
    
    return render(request, "login.html")

def cadastro_usuario(request):
    if request.method == "GET":
        return render(request, "cadastro.html")
    else:
        email = request.POST.get("email")
        nome = request.POST.get("nome")
        senha = request.POST.get("senha")
        confirma_senha = request.POST.get("confirma_senha")
        print(email, nome, senha, confirma_senha)

        if senha != confirma_senha:
            messages.error(request, "As senhas não coincidem.")
            return render(request, "cadastro.html")
        
        try:
            usuario = Usuario.objects.create_user(email=email, nome_completo=nome, password=senha)
            messages.success(request, "Usuário cadastrado com sucesso.")
            return redirect("usuario:login")
        except IntegrityError:
            messages.error(request, "Email já cadastrado.")    
            return render(request, "cadastro.html")

def logout_usuario(request):
    auth_logout(request)
    return redirect("usuario:login")


