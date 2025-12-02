from django.shortcuts import render
from django.test import TestCase
from django.http import HttpResponse


# Create your tests here.

def login(request):
    return render(request, "login.html")

def cadastro(request):
    if request.method == "GET":
        return render(request, "cadastro.html")
    else:
        email = request.POST.get("email")
        nome = request.POST.get("nome")
        senha = request.POST.get("senha")
        confirma_senha = request.POST.get("confirma_senha")
        print(email, nome, senha, confirma_senha)
        return HttpResponse("Dados recebidos com sucesso!")
