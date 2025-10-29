# CDU 16. Manter Categoria (Persistente)

- **Ator principal**: Usuário
- **Atores secundários**: Não tem
- **Resumo**: O usuário pode criar categorias, remover e atualizar para separar em grupos os seus gastos.
- **Pré-condição**: O usuário deve estar autenticado.
- **Pós-Condição**: ...

## Fluxo Principal
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1 - O usuário cria uma nova categoria. | |  
| | 2 - O sistema valida se não exite outra categoria com o mesmo nome. | 
| | 3 - Após a validação uma nova categoria é criada. | 

## Fluxo Alternativo I - Editar
| Ações do ator | Ações do sistema |
| :-----------------: |:-----------------: | 
| 1.1 - O usuário tenta editar uma categoria existente. | |  
| | 1.2 - O sistema valida o novo nome da categoria. |
| | 1.3 - A categoria é atualizada. |

## Fluxo Alternativo II - Remover
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 2.1 - O usuário inicia a exlusão de uma categoria. | |  
| | 2.2 - O sistema verifica se a categoria esta vazia. |  
| | 2.2 - Caso não esteja o sistema remove em cascata os dados daquela categoria. |  

> Obs. as seções a seguir apenas serão utilizadas na segunda unidade do PDSWeb (segundo orientações do gerente do projeto).

## Diagrama de Interação (Sequência ou Comunicação)

> Substituir pela imagem correspondente...

## Diagrama de Classes de Projeto

> Substituir pela imagem contendo as classes (modelo, visão e templates) que implementam o respectivo CDU...