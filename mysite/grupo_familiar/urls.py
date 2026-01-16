from django.urls import path
from grupo_familiar import views

app_name = 'familia'

urlpatterns = [
    path('', views.FamiliaView.as_view(), name='familia'),
    path('criar', views.CriarFamiliaView.as_view(), name='criarFamilia'),
    path('adicionar/<int:id_familia>', views.AdicionarMembroView.as_view(), name='adicionarMembro'),
    path('remover/<str:email>', views.TirarMembroView.as_view(), name='tirarMembro'),
]