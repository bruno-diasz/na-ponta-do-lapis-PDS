from django.db import models
from usuario.models import Pessoa
# Create your models here.
class Familia(models.Model):
    nome = models.CharField(max_length=100, blank=False, null=False)

    @property
    def membros(self):
        return MembroFamilia.objects.filter(familia=self).exclude(pessoa__nome='AdminFamilia')
    @property
    def chefe(self):
        return MembroFamilia.objects.filter(familia=self, pessoa__nome='AdminFamilia')
    def __str__(self):
        return f"{self.nome}"
class MembroFamilia(models.Model):
    pessoa = models.ForeignKey(Pessoa, on_delete=models.CASCADE, related_name='usuario_familia', blank=False, null=False)
    familia = models.ForeignKey(Familia, on_delete=models.CASCADE, related_name='familia', blank=False, null=False)
    def __str__(self):
        return f"{self.pessoa.nome} - {'Chefe' if self.pessoa.papel == 'AdminFamilia' else 'Membro'} da Família {self.familia.nome}"