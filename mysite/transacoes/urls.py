from django.urls import path
from transacoes.views  import transacoes_index, adicionar_transacao_view, filtrar_transacao_categoria

urlpatterns = [
    path("", transacoes_index, name="transacoes_index" ),
    path('adicionar_transacao/', adicionar_transacao_view, name='adicionar_transacao'),
    path('categoria/<str:categoria>/', filtrar_transacao_categoria, name='filtrar_categoria')

]
