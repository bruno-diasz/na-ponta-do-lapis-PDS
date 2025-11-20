from django.db import models
from usuario.models import Usuario

# Create your models here.

class ContaFinanceira(models.Model):
    TIPOS_CONTA = (('CREDITO', 'Crédito'), ('CREDITO/DEBITO', 'Crédito/Débito'), ('DEBITO', 'Débito'))
    nome = models.CharField(max_length=100, blank=False, null=False, verbose_name='Nome da Conta')
    saldo = models.FloatField(default=0, blank=False, null=False, verbose_name='Saldo da Conta')
    tipo = models.CharField(max_length=14, choices=TIPOS_CONTA, default='CREDITO', blank=False, null=False, verbose_name='Tipo da Conta')
    id_usuario = models.ForeignKey(Usuario, max_length=254, on_delete=models.CASCADE, blank=False, null=False, related_name="contas_financeiras", verbose_name="Usuário da Conta")

    def __str__(self):
        return f"{self.nome} - {self.saldo} - {self.tipo}"