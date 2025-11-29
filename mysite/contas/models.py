from django.db.models import Model, CharField, FloatField, ForeignKey, CASCADE
from django.core.exceptions import ValidationError
from usuario.models import Usuario

# Create your models here.

class ContaFinanceira(Model):
    TIPOS_CONTA = (('CREDITO', 'Crédito'), ('CREDITO/DEBITO', 'Crédito/Débito'), ('DEBITO', 'Débito'))
    nome = CharField(max_length=100, blank=False, null=False, verbose_name='Nome da Conta')
    saldo = FloatField(default=0, blank=False, null=False, verbose_name='Saldo da Conta')
    tipo = CharField(max_length=14, choices=TIPOS_CONTA, default='', blank=False, null=False, verbose_name='Tipo da Conta')
    id_usuario = ForeignKey(Usuario, on_delete=CASCADE, blank=False, null=False, related_name="contas_financeiras", verbose_name='Usuário da Conta')

    class Meta:
        verbose_name = 'Conta Financeira'
        verbose_name_plural = 'Contas Financeiras'

    def clean(self):
        erros = {}

        try:
            super().clean()

        except ValidationError as e:
            erros.update(e.message_dict)

        if len(self.nome) < 3:
            erros['nome'] = 'O nome da conta deve ter pelo menos 3 caracteres.'
        
        if not self.saldo:
            erros['saldo'] = 'O saldo da conta é obrigatório.'
        
        if self.tipo not in self.tipo.choices:
            erros['tipo'] = 'O tipo da conta deve ser Crédito, Crédito e Débito ou Débito'
        
        if not self.tipo:
            erros['tipo'] = 'O tipo da conta é obrigatório.'
        
        if erros:
            raise ValidationError(erros)

    def set_nome(self, novo_nome):
        if (not isinstance(novo_nome, str) or novo_nome == ""):
            raise ValueError("O nome deve ser uma string e não vazio")
        self.nome = novo_nome

    def set_tipo(self, novo_tipo):
        if (not isinstance(novo_tipo, str) or novo_tipo == "" and novo_tipo != 'CREDITO' and novo_tipo != 'CREDITO/DEBITO' and novo_tipo != 'DEBITO'):
            raise ValueError("O tipo da conta deve ser um string não vazia e de um tipo válido")
        self.tipo = novo_tipo

    def set_saldo(self, novo_saldo):
        if (not isinstance(novo_saldo, float)):
            raise ValueError("O saldo deve ser um valor real")
        self.saldo = novo_saldo

    def __str__(self):
        return f"{self.nome} - {self.saldo} - {self.tipo}"