// Modal Manager para operações CRUD de contas
class ModalManager {
    constructor() {
        this.currentModal = null;
    }

    // ==================== MODAL ADICIONAR CONTA ====================

    // Abrir modal de adicionar conta
    openAddAccountModal() {
        // Se existir o toggle do DaisyUI, use-o; caso contrário, fallback para método antigo
        const toggle = document.getElementById('addAccountModalToggle');
        const modal = document.getElementById('addAccountModal');
        if (toggle) {
            toggle.checked = true;
            this.currentModal = document.querySelector('.modal-box');
            this.resetFormAdd();
            return;
        }

        if (modal) {
            modal.style.display = 'flex';
            this.currentModal = modal;
            this.resetFormAdd();
        }
    }

    // Fechar modal de adicionar conta
    closeAddAccountModal() {
        const toggle = document.getElementById('addAccountModalToggle');
        const modal = document.getElementById('addAccountModal');
        if (toggle) {
            toggle.checked = false;
            this.currentModal = null;
            this.resetFormAdd();
            return;
        }

        if (modal) {
            modal.style.display = 'none';
            this.currentModal = null;
            this.resetFormAdd();
        }
    }

    // Resetar formulário de adicionar
    resetFormAdd() {
        const form = document.getElementById('addAccountForm');
        if (form) {
            form.reset();
            // Remover classe de seleção do tipo de conta
            document.querySelectorAll('.account-type-btn').forEach(btn => {
                btn.classList.remove('!bg-red-500', '!border-red-500', '!text-white');
                btn.classList.add('border-2', 'border-gray-300', 'text-gray-800');
            });
            document.getElementById('selectedAccountType').value = '';
        }
    }

    // ==================== MODAL EDITAR CONTA ====================

    // Abrir modal de editar conta
    openEditAccountModal() {
        // Se existir o toggle do DaisyUI, use-o; caso contrário, fallback para método antigo
        const toggle = document.getElementById('editAccountModalToggle');
        const modal = document.getElementById('editAccountModal');
        if (toggle) {
            toggle.checked = true;
            this.currentModal = document.querySelector('.modal-box');
            // Seleciona o tipo de conta atual (CRÉDITO por padrão)
            this.selectEditAccountType(document.querySelector('.edit-account-type-btn[data-type="CREDITO"]'), 'CREDITO');
            return;
        }

        if (modal) {
            modal.style.display = 'flex';
            this.currentModal = modal;
            // Seleciona o tipo de conta atual (CRÉDITO por padrão)
            this.selectEditAccountType(document.querySelector('.edit-account-type-btn[data-type="CREDITO"]'), 'CREDITO');
        }
    }

    // Fechar modal de editar conta
    closeEditAccountModal() {
        const toggle = document.getElementById('editAccountModalToggle');
        const modal = document.getElementById('editAccountModal');
        if (toggle) {
            toggle.checked = false;
            this.currentModal = null;
            return;
        }

        if (modal) {
            modal.style.display = 'none';
            this.currentModal = null;
        }
    }

    // ==================== MODAL EXCLUIR CONTA ====================

    // Abrir modal de excluir conta
    openDeleteAccountModal() {
        // Se existir o toggle do DaisyUI, use-o; caso contrário, fallback para método antigo
        const toggle = document.getElementById('deleteAccountModalToggle');
        const modal = document.getElementById('deleteAccountModal');
        if (toggle) {
            toggle.checked = true;
            this.currentModal = document.querySelector('.modal-box');
            return;
        }

        if (modal) {
            modal.style.display = 'flex';
            this.currentModal = modal;
        }
    }

    // Fechar modal de excluir conta
    closeDeleteAccountModal() {
        const toggle = document.getElementById('deleteAccountModalToggle');
        const modal = document.getElementById('deleteAccountModal');
        if (toggle) {
            toggle.checked = false;
            this.currentModal = null;
            return;
        }

        if (modal) {
            modal.style.display = 'none';
            this.currentModal = null;
        }
    }

    // ==================== SELEÇÃO DE TIPO ====================

    // Selecionar tipo de conta (Adicionar)
    selectAccountType(button, type) {
        // Remove seleção anterior
        document.querySelectorAll('.account-type-btn').forEach(btn => {
            btn.classList.remove('!bg-red-500', '!border-red-500', '!text-white');
            btn.classList.add('border-2', 'border-gray-300', 'text-gray-800');
        });

        // Adiciona seleção ao botão clicado
        button.classList.remove('border-2', 'border-gray-300', 'text-gray-800');
        button.classList.add('!bg-red-500', '!border-red-500', '!text-white');

        // Armazena o tipo selecionado
        document.getElementById('selectedAccountType').value = type;
    }

    // Selecionar tipo de conta (Editar)
    selectEditAccountType(button, type) {
        // Remove seleção anterior
        document.querySelectorAll('.edit-account-type-btn').forEach(btn => {
            // Restaurar estilos originais baseado no data-type
            const btnType = btn.getAttribute('data-type');
            if (btnType === 'CREDITO') {
                btn.classList.remove('border-4', 'border-black');
                btn.classList.add('border-2', 'border-gray-300');
            } else if (btnType === 'DEBITO') {
                btn.classList.remove('border-4', 'border-black');
            } else if (btnType === 'CREDITO_DEBITO') {
                btn.classList.remove('border-4', 'border-black');
            }
        });

        // Adiciona seleção ao botão clicado
        button.classList.add('border-4', 'border-black');

        // Armazena o tipo selecionado
        document.getElementById('selectedEditAccountType').value = type;
    }

    // ==================== ENVIO DE FORMULÁRIOS ====================

    // Enviar formulário de adicionar conta
    async submitAddAccountForm(event) {
        event.preventDefault();

        const accountName = document.getElementById('accountName').value;
        const accountBalance = document.getElementById('accountBalance').value;
        const selectedType = document.getElementById('selectedAccountType').value;

        // Validações básicas
        if (!accountName || !accountBalance || !selectedType) {
            alert('Por favor, preencha todos os campos');
            return;
        }

        try {
            // Aqui será feita a requisição assíncrona quando o backend estiver pronto
            const response = await this.makeAsyncRequest('/api/contas/add/', {
                nome: accountName,
                saldo: parseFloat(accountBalance),
                tipo: selectedType
            });

            console.log('Conta adicionada:', response);
            this.closeAddAccountModal();
            // Aqui será feito o refresh da página ou atualização dos cartões
            // location.reload();
        } catch (error) {
            console.error('Erro ao adicionar conta:', error);
            alert('Erro ao adicionar conta. Tente novamente.');
        }
    }

    // Enviar formulário de editar conta
    async submitEditAccountForm(event) {
        event.preventDefault();

        const accountName = document.getElementById('editAccountName').value;
        const accountBalance = document.getElementById('editAccountBalance').value;
        const selectedType = document.getElementById('selectedEditAccountType').value;

        // Validações básicas
        if (!accountName || !accountBalance || !selectedType) {
            alert('Por favor, preencha todos os campos');
            return;
        }

        try {
            // Aqui será feita a requisição assíncrona quando o backend estiver pronto
            const response = await this.makeAsyncRequest('/api/contas/edit/', {
                nome: accountName,
                saldo: parseFloat(accountBalance),
                tipo: selectedType
            });

            console.log('Conta editada:', response);
            this.closeEditAccountModal();
            // Aqui será feito o refresh da página ou atualização dos cartões
            // location.reload();
        } catch (error) {
            console.error('Erro ao editar conta:', error);
            alert('Erro ao editar conta. Tente novamente.');
        }
    }

    // Confirmar exclusão de conta
    async confirmDeleteAccount() {
        try {
            // Aqui será feita a requisição assíncrona quando o backend estiver pronto
            const response = await this.makeAsyncRequest('/api/contas/delete/', {
                // Dados necessários para identificar qual conta deletar
            });

            console.log('Conta deletada:', response);
            this.closeDeleteAccountModal();
            // Aqui será feito o refresh da página ou atualização dos cartões
            // location.reload();
        } catch (error) {
            console.error('Erro ao deletar conta:', error);
            alert('Erro ao deletar conta. Tente novamente.');
        }
    }

    // ==================== MODAL VISUALIZAR CONTA ====================
    // ==================== MODAL VISUALIZAR CONTA ====================

    // Abrir modal de visualizar conta
    openViewAccountModal() {
        // Se existir o toggle do DaisyUI, use-o; caso contrário, fallback para método antigo
        const toggle = document.getElementById('viewAccountModalToggle');
        const modal = document.getElementById('viewAccountModal');
        if (toggle) {
            toggle.checked = true;
            this.currentModal = document.querySelector('.modal-box');
            return;
        }

        if (modal) {
            modal.style.display = 'flex';
            this.currentModal = modal;
        }
    }

    // Fechar modal de visualizar conta
    closeViewAccountModal() {
        const toggle = document.getElementById('viewAccountModalToggle');
        const modal = document.getElementById('viewAccountModal');
        if (toggle) {
            toggle.checked = false;
            this.currentModal = null;
            return;
        }

        if (modal) {
            modal.style.display = 'none';
            this.currentModal = null;
        }
    }

    // ==================== REQUISIÇÕES HTTP ====================

    // Fazer requisição assíncrona genérica
    async makeAsyncRequest(url, data) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': this.getCookie('csrftoken')
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            throw error;
        }
    }

    // Obter CSRF token
    getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
}

// Inicializar manager quando o documento carregar
let modalManager;
document.addEventListener('DOMContentLoaded', function () {
    modalManager = new ModalManager();

    // ==================== MODAL ADICIONAR ====================

    // Adicionar event listener ao botão de adicionar conta
    const addAccountBtn = document.querySelector('.addAccountBtn');
    if (addAccountBtn) {
        addAccountBtn.addEventListener('click', function (e) {
            e.preventDefault();
            modalManager.openAddAccountModal();
        });
    }

    // Fechar modal ao clicar fora dele (Adicionar) - DaisyUI backdrop
    const addAccountToggle = document.getElementById('addAccountModalToggle');
    if (addAccountToggle) {
        // Encontra o modal associado a este toggle
        const addModalBackdrop = addAccountToggle.nextElementSibling;
        if (addModalBackdrop) {
            addModalBackdrop.addEventListener('click', function (e) {
                // Se clicou no backdrop (a área escura fora do modal-box)
                if (e.target === this) {
                    modalManager.closeAddAccountModal();
                }
            });
        }
    }

    // Formulário submit (Adicionar)
    const addForm = document.getElementById('addAccountForm');
    if (addForm) {
        addForm.addEventListener('submit', (e) => modalManager.submitAddAccountForm(e));
    }

    // Botões de tipo de conta (Adicionar)
    document.querySelectorAll('.account-type-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const type = this.getAttribute('data-type');
            modalManager.selectAccountType(this, type);
        });
    });

    // Listener para o X e botão Cancelar (usar o toggle diretamente via DaisyUI)
    // O X e Cancelar já são labels que apontam para o toggle, não precisa de JS adicional
    // Mas adicionamos listener para resetar o formulário quando o modal fecha
    const toggleCheckbox = document.getElementById('addAccountModalToggle');
    if (toggleCheckbox) {
        toggleCheckbox.addEventListener('change', function () {
            if (!this.checked) {
                // Quando o modal fecha, reseta o formulário
                modalManager.resetFormAdd();
            }
        });
    }

    // ==================== MODAL EDITAR ====================

    // Adicionar event listener ao botão de editar conta
    const editAccountBtn = document.querySelector('.editAccountBtn');
    if (editAccountBtn) {
        editAccountBtn.addEventListener('click', function (e) {
            e.preventDefault();
            modalManager.openEditAccountModal();
        });
    }

    // Fechar modal ao clicar fora dele (Editar) - DaisyUI backdrop
    const editAccountToggle = document.getElementById('editAccountModalToggle');
    if (editAccountToggle) {
        // Encontra o modal associado a este toggle
        const editModalBackdrop = editAccountToggle.nextElementSibling;
        if (editModalBackdrop) {
            editModalBackdrop.addEventListener('click', function (e) {
                // Se clicou no backdrop (a área escura fora do modal-box)
                if (e.target === this) {
                    modalManager.closeEditAccountModal();
                }
            });
        }
    }

    // Formulário submit (Editar)
    const editForm = document.getElementById('editAccountForm');
    if (editForm) {
        editForm.addEventListener('submit', (e) => modalManager.submitEditAccountForm(e));
    }

    // Botões de tipo de conta (Editar)
    document.querySelectorAll('.edit-account-type-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const type = this.getAttribute('data-type');
            modalManager.selectEditAccountType(this, type);
        });
    });

    // Listener para o X e botão Cancelar do modal de editar (usar o toggle diretamente via DaisyUI)
    const editToggleCheckbox = document.getElementById('editAccountModalToggle');
    if (editToggleCheckbox) {
        editToggleCheckbox.addEventListener('change', function () {
            if (!this.checked) {
                // Quando o modal fecha, reseta o estado de seleção de tipo
                document.querySelectorAll('.edit-account-type-btn').forEach(btn => {
                    btn.classList.remove('!bg-red-500', '!border-red-500', '!text-white', 'border-4');
                });
            }
        });
    }

    // ==================== MODAL EXCLUIR ====================

    // Adicionar event listener ao botão de excluir conta
    const deleteAccountBtn = document.querySelector('.deleteAccountBtn');
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', function (e) {
            e.preventDefault();
            modalManager.openDeleteAccountModal();
        });
    }

    // Fechar modal ao clicar fora dele (Excluir) - DaisyUI backdrop
    const deleteAccountToggle = document.getElementById('deleteAccountModalToggle');
    if (deleteAccountToggle) {
        // Encontra o modal associado a este toggle
        const deleteModalBackdrop = deleteAccountToggle.nextElementSibling;
        if (deleteModalBackdrop) {
            deleteModalBackdrop.addEventListener('click', function (e) {
                // Se clicou no backdrop (a área escura fora do modal-box)
                if (e.target === this) {
                    modalManager.closeDeleteAccountModal();
                }
            });
        }
    }

    // Listener para o X e botão Cancelar do modal de excluir (usar o toggle diretamente via DaisyUI)
    const deleteToggleCheckbox = document.getElementById('deleteAccountModalToggle');
    if (deleteToggleCheckbox) {
        deleteToggleCheckbox.addEventListener('change', function () {
            if (!this.checked) {
                // Quando o modal fecha, reseta o estado
                // (neste caso não há formulário, então não precisa fazer nada especial)
            }
        });
    }

    // Botão confirmar exclusão
    const confirmDeleteBtn = document.getElementById('confirmDeleteAccountBtn');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', () => modalManager.confirmDeleteAccount());
    }

    // ==================== MODAL VISUALIZAR ====================

    // Adicionar event listener ao botão de visualizar conta
    const viewAccountBtn = document.querySelector('.viewAccountBtn');
    if (viewAccountBtn) {
        viewAccountBtn.addEventListener('click', function (e) {
            e.preventDefault();
            modalManager.openViewAccountModal();
        });
    }

    // Fechar modal ao clicar fora dele (Visualizar) - DaisyUI backdrop
    const viewAccountToggle = document.getElementById('viewAccountModalToggle');
    if (viewAccountToggle) {
        // Encontra o modal associado a este toggle
        const viewModalBackdrop = viewAccountToggle.nextElementSibling;
        if (viewModalBackdrop) {
            viewModalBackdrop.addEventListener('click', function (e) {
                // Se clicou no backdrop (a área escura fora do modal-box)
                if (e.target === this) {
                    modalManager.closeViewAccountModal();
                }
            });
        }
    }

    // Listener para o X e botão Fechar do modal de visualizar (usar o toggle diretamente via DaisyUI)
    const viewToggleCheckbox = document.getElementById('viewAccountModalToggle');
    if (viewToggleCheckbox) {
        viewToggleCheckbox.addEventListener('change', function () {
            if (!this.checked) {
                // Quando o modal fecha, reseta o estado
                // (neste caso é apenas leitura, então não precisa fazer nada especial)
            }
        });
    }
});
