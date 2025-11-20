# CDU 01. Login

- **Ator principal**: Usuario

- **Atores secundários**: 

- **Resumo**:  O caso de uso Login permite que um usuário já cadastrado acesse o sistema utilizando suas credenciais. O processo começa quando o usuário informa seu e-mail e senha na tela de login. O sistema verifica se os dados correspondem a um usuário existente e se a conta está ativa. Se as informações estiverem corretas, o sistema concede acesso e cria uma sessão para o usuário. Caso contrário, o acesso é negado e uma mensagem de erro é exibida solicitando a correção dos dados.

- **Pré-condição**: Usuário não deve esta autenticado

- **Pós-Condição**: Usuário é autenticado no sistema.

## Fluxo Principal
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1 - Usuario com acesso a internet informa suas credenciais (email e senha) | |  
| | 2 - Sistema valida informações, autentica usuario e redireciona para pagina inicial | 

## Fluxo Alternativo I - Credenciais invalidas ou inexistentes
| Ações do ator | Ações do sistema |
| :-----------------: |:-----------------: | 
| 1.1 - Usuario informa email ou senha incorreto | |  
| | 1.2 - Sistema retorna um feedback informando que a email, senha ou usuario não esta cadastrado |

## Fluxo Alternativo II - Sem acesso a internet
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1.3 - Usuario tenta fazer login | |  
| | 1.4 - Sistema informa que o usuario esta sema acesso a internet |  

> Obs. as seções a seguir apenas serão utilizadas na segunda unidade do PDSWeb (segundo orientações do gerente do projeto).

## Diagrama de Interação (Sequência ou Comunicação)

> Substituir pela imagem correspondente...

## Diagrama de Classes de Projeto

> Substituir pela imagem contendo as classes (modelo, visão e templates) que implementam o respectivo CDU...
