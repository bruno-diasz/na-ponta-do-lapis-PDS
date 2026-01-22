from pyexpat.errors import messages

from contas.models import ContaFinanceira
from transacoes.models import Transacao
from .models import Familia
from usuario.models import Usuario
from django.contrib import messages
from django.db.models import Sum

class FamiliaServices:
    @staticmethod
    def adicionarfamilia(nome):
        familia = Familia(
            nome = nome
        )
        familia.save()
        return familia
    
    @staticmethod
    def adicionarmembro(email, familia):
        user = Usuario.objects.get(email=email)
        if user.id_familia:
            messages.error("Usuário já pertence a uma família.")
        if user:
            user.id_familia = familia
            user.save()
    
    @staticmethod
    def tornar_adminFamilia(user, familia):
        user.tornar_adminFamilia()
        user.id_familia = familia
        user.save()
    
    @staticmethod
    def tirarmembro(email, familia):
        user = Usuario.objects.get(email=email)
        if user and user.id_familia == familia:
            user.id_familia = None
            user.papel = Usuario.Papel.USUARIO
            user.save()
    @staticmethod
    def receita_familia(familia_id):
        # Soma todas as receitas realizadas das contas do usuário
        resultado = (
            Transacao.objects
            .filter(
                conta_financeira__usuario_id_familia=familia_id,
                tipo=Transacao.TipoTransacao.RECEITA,
                estado=Transacao.EstadoTransacao.REALIZADA,
            )
            .aggregate(total=Sum("valor"))
        )

        return resultado.get("total") or 0

    @staticmethod
    def despesa_familia(familia_id):
        resultado = (
            Transacao.objects
            .filter(
                conta_financeira__usuario__id_familia=familia_id,
                tipo=Transacao.TipoTransacao.DESPESA,
                estado=Transacao.EstadoTransacao.REALIZADA,
            )
            .aggregate(total=Sum("valor"))
        )

        return resultado.get("total") or 0

    @staticmethod
    def total(familia_id):
        receita = FamiliaServices.receita_familia(familia_id)
        despesa = FamiliaServices.despesa_familia(familia_id)
        return receita + despesa
