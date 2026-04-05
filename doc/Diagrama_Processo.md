```mermaid
graph LR

    subgraph Cliente [Navegador do Usuário]
        Acesso[Acessar Sistema Web]
    end

    subgraph Unauth [Usuário Não Autenticado]
        Login{Já tem conta?}
        NovoCadastro[Cadastro - RF01]
        FazerLogin[Login - RF01]
    end

    subgraph AuthUser [Usuário Autenticado]
        Painel[Painel Principal]
        AcoesFin[Finanças: Contas, Categorias e Gastos]
        AcoesPlan[Planejamento: Relatórios e Metas]
        AcoesExt[Preferências: Tema e Família]
        Cotacao[Consultar Cotação - RF10]
        Logout[Sair do Sistema]
    end

    subgraph Admin [Administrador]
        PainelAdmin[Painel Admin]
        AcoesAdmin[Gerenciar Posts e Permissões]
    end

    subgraph Sistema [Backend e Banco de Dados]
        SysCadastro[Processar Cadastro - NF03]
        SysLogin[Validar Credenciais]
        SysBD[Persistir Dados no BD - NF02]
        SysAPI[Consultar API de Câmbio]
    end

    Acesso --> Login
    
    Login -- Não --> NovoCadastro
    NovoCadastro --> SysCadastro
    SysCadastro --> Login
    
    Login -- Sim --> FazerLogin
    FazerLogin --> SysLogin
    SysLogin -- Sucesso --> Painel
    
    Painel -.-> DeterminaPapel{É Admin?}
    DeterminaPapel -- Sim --> PainelAdmin
    DeterminaPapel -- Não --> AcoesFin
    
    Painel --> AcoesFin
    Painel --> AcoesPlan
    Painel --> AcoesExt
    Painel --> Cotacao

    AcoesFin --> SysBD
    AcoesPlan --> SysBD
    AcoesExt --> SysBD
    Cotacao --> SysAPI

    PainelAdmin --> AcoesAdmin
    AcoesAdmin --> SysBD

    Painel --> Logout
    PainelAdmin --> Logout
    Logout --> Login
```
