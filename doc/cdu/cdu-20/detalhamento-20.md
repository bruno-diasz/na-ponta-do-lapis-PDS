# CDU 20. Atualizar Perfil

- **Ator principal**: Usuário

- **Atores secundários**: n/a
- **Resumo**: O usuário acessa a área de configurações para alterar informações do seu perfil como foto e email.
- **Pré-condição**: O usuário deve estar devidamente autenticado.
- **Pós-Condição**: Suas informações são atualizadas e  alteradas no sistema.

## Fluxo Principal

| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: |
| 1 - O usuário acessa as Configurações. | |
| 2 - O usuário seleciona a opção Editar Perfil. | |
| 3 - O usuário altera as informações desejadas (foto, email). | |
| 4 - O usuário confirma a atualização clicando em Salvar. | |
| | 5 - O sistema valida os dados informados. |
| | 6 - O sistema atualiza o perfil no banco de dados. |
| | 7 - O sistema exibe mensagem de sucesso ao usuário. |

## Fluxo Alternativo I - Dados inválidos

| Ações do ator | Ações do sistema |
| :-----------------: |:-----------------: |
| 4.1 O usuário tenta salvar informações inválidas (ex.: email já existente, formato errado, arquivo de imagem inválido). | |
| | 4.2 O sistema exibe mensagem de erro informando os campos inválidos. |
| 4.3 O usuário corrige as informações. | |
| 4.4 Retorna ao passo 4 do Fluxo Principal. | |

## Fluxo Alternativo II - ...

| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: |
| 2.1 - ... | |
| | 2.2 - ... |

> Obs. as seções a seguir apenas serão utilizadas na segunda unidade do PDSWeb (segundo orientações do gerente do projeto).

## Diagrama de Interação (Sequência ou Comunicação)

> Substituir pela imagem correspondente...

## Diagrama de Classes de Projeto

> Substituir pela imagem contendo as classes (modelo, visão e templates) que implementam o respectivo CDU...
