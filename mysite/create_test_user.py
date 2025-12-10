#!/usr/bin/env python
"""
Script para criar um usuário de teste no banco de dados.
Execute com: python create_test_user.py
"""

import os
import django
from django.conf import settings

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mysite.settings')
django.setup()

from usuario.models import Usuario

def criar_usuario_teste():
    """Cria um usuário de teste para fins de desenvolvimento."""
    
    email_usuario = 'teste@example.com'
    senha = 'senha123'
    nome_completo = 'Usuário Teste'
    
    try:
        # Verificar se o usuário já existe
        if Usuario.objects.filter(email=email_usuario).exists():
            print(f"❌ Usuário com email '{email_usuario}' já existe!")
            usuario = Usuario.objects.get(email=email_usuario)
            print(f"   Email: {usuario.email}")
            print(f"   Nome: {usuario.nome_completo}")
            print(f"   Papel: {usuario.get_papel_display()}")
            return
        
        # Criar novo usuário
        usuario = Usuario.objects.create_user(
            email=email_usuario,
            password=senha,
            nome_completo=nome_completo,
            username=email_usuario,
            papel=Usuario.Papel.USUARIO
        )
        
        print("✅ Usuário criado com sucesso!")
        print(f"   Email: {usuario.email}")
        print(f"   Nome: {usuario.nome_completo}")
        print(f"   Senha: {senha}")
        print(f"   Papel: {usuario.get_papel_display()}")
        print("\n💡 Dica: Use essas credenciais para fazer login na aplicação.")
        
    except Exception as e:
        print(f"❌ Erro ao criar usuário: {str(e)}")

def criar_usuario_admin():
    """Cria um usuário administrador para fins de desenvolvimento."""
    
    email_admin = 'admin@example.com'
    senha = 'admin123'
    nome_completo = 'Admin Teste'
    
    try:
        # Verificar se o usuário já existe
        if Usuario.objects.filter(email=email_admin).exists():
            print(f"❌ Usuário com email '{email_admin}' já existe!")
            usuario = Usuario.objects.get(email=email_admin)
            print(f"   Email: {usuario.email}")
            print(f"   Nome: {usuario.nome_completo}")
            print(f"   Papel: {usuario.get_papel_display()}")
            return
        
        # Criar novo usuário admin
        usuario = Usuario.objects.create_superuser(
            email=email_admin,
            password=senha,
            nome_completo=nome_completo,
            username=email_admin
        )
        usuario.papel = Usuario.Papel.ADMIN
        usuario.save()
        
        print("✅ Usuário admin criado com sucesso!")
        print(f"   Email: {usuario.email}")
        print(f"   Nome: {usuario.nome_completo}")
        print(f"   Senha: {senha}")
        print(f"   Papel: {usuario.get_papel_display()}")
        print("\n💡 Dica: Use essas credenciais para acessar o painel de admin em /admin/")
        
    except Exception as e:
        print(f"❌ Erro ao criar usuário admin: {str(e)}")

if __name__ == '__main__':
    print("=" * 60)
    print("CRIANDO USUÁRIOS DE TESTE")
    print("=" * 60)
    print()
    
    print("1. Criando usuário comum...")
    criar_usuario_teste()
    print()
    
    print("2. Criando usuário administrador...")
    criar_usuario_admin()
    print()
    
    print("=" * 60)
    print("Processo finalizado!")
    print("=" * 60)
