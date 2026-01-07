from pyexpat.errors import messages
from .models import Familia
from usuario.models import Usuario

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
