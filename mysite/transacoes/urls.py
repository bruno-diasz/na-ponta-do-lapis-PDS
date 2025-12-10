from django.urls import path
from transacoes.views  import transacoes_index, adicionar_transacao_view, filtrar_transacao

urlpatterns = [
    path("", transacoes_index, name="transacoes_index" ),
    path('adicionar_transacao/', adicionar_transacao_view, name='adicionar_transacao'),
    path('filtro/', filtrar_transacao, name='filtrar_transacao')

]
