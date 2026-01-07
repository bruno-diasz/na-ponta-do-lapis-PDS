from django.urls import path
from grupo_familiar import views

app_name = 'familia'

urlpatterns = [
    path('', views.familia, name='familia'),
    path('criar', views.criarfamilia, name='criarFamilia'),
    path('adicionar/<int:id_familia>', views.adicionarmembro, name='adicionarMembro'),
    path('remover/<str:email>', views.tirarmembro, name='tirarMembro'),
]