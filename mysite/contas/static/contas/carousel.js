// Gerenciador de Carousel de Contas
class CarouselManager {
    constructor() {
        this.currentIndex = 0;
        this.contas = [];
        this.layoutMode = null; // 'uma_conta', 'duas_contas', 'tres_ou_mais'
        this.initCarousel();
    }

    initCarousel() {
        // Extrair dados das contas a partir dos data-attributes dos botões
        this.extractAccountsData();

        // Detectar modo de layout baseado no número de contas
        const numContas = this.contas.length;
        if (numContas === 1) {
            this.layoutMode = 'uma_conta';
        } else if (numContas === 2) {
            this.layoutMode = 'duas_contas';
        } else if (numContas >= 3) {
            this.layoutMode = 'tres_ou_mais';
        }

        // Setup event listeners para navegação do carousel
        if (this.layoutMode === 'tres_ou_mais') {
            this.setupCarouselNavigation();
        }

        // Setup event listeners para botões CRUD
        this.setupCrudButtons();
    }

    extractAccountsData() {
        // Extrair dados de todos os inputs com valores das contas
        const cards = document.querySelectorAll('.card');
        this.contas = [];

        cards.forEach((card, index) => {
            const inputs = card.querySelectorAll('input[readonly]');
            if (inputs.length >= 3) {
                const nome = inputs[0].value;
                const tipo = inputs[1].value;
                const saldo = inputs[2].value;

                // Só adicionar se tiver dados (evitar cards vazios)
                if (nome && tipo && saldo) {
                    const conta = {
                        index: index,
                        nome: nome,
                        tipo: tipo,
                        saldo: saldo
                    };
                    this.contas.push(conta);
                }
            }
        });
    }

    setupCarouselNavigation() {
        // Procurar pelos botões de navegação do carousel
        const buttons = document.querySelectorAll('button.btn-circle');

        if (buttons.length >= 2) {
            // Primeiro botão é esquerda, segundo é direita
            buttons[0].addEventListener('click', () => this.rotateLeft());
            buttons[1].addEventListener('click', () => this.rotateRight());
        }
    }

    rotateLeft() {
        if (this.contas.length < 3) return;

        this.currentIndex = (this.currentIndex - 1 + this.contas.length) % this.contas.length;
        this.updateCarouselDisplay();
        this.updateCrudButtonsData();
    }

    rotateRight() {
        if (this.contas.length < 3) return;

        this.currentIndex = (this.currentIndex + 1) % this.contas.length;
        this.updateCarouselDisplay();
        this.updateCrudButtonsData();
    }

    updateCarouselDisplay() {
        const cards = document.querySelectorAll('.card');
        if (cards.length < 3) return;

        // Calcular índices para esquerda, centro e direita
        const leftIndex = (this.currentIndex - 1 + this.contas.length) % this.contas.length;
        const centerIndex = this.currentIndex;
        const rightIndex = (this.currentIndex + 1) % this.contas.length;

        // Atualizar card da esquerda
        if (cards[0]) {
            this.updateCardDisplay(cards[0], this.contas[leftIndex]);
        }

        // Atualizar card do centro
        if (cards[1]) {
            this.updateCardDisplay(cards[1], this.contas[centerIndex]);
        }

        // Atualizar card da direita
        if (cards[2]) {
            this.updateCardDisplay(cards[2], this.contas[rightIndex]);
        }
    }

    updateCardDisplay(cardElement, contaData) {
        const inputs = cardElement.querySelectorAll('input[readonly]');
        if (inputs.length >= 3) {
            inputs[0].value = contaData.nome;
            inputs[1].value = contaData.tipo;
            inputs[2].value = contaData.saldo;
        }
    }

    setupCrudButtons() {
        // Setup para botão Visualizar
        const viewBtn = document.querySelector('.viewAccountBtn');
        if (viewBtn) {
            viewBtn.addEventListener('click', (e) => {
                if (viewBtn.hasAttribute('disabled')) {
                    e.preventDefault();
                    return;
                }
                e.preventDefault();
                const contaId = this.getCurrentAccountId();
                if (contaId) {
                    window.location.href = `/contas/visualizar/${contaId}/`;
                }
            });
        }

        // Setup para botão Editar
        const editBtn = document.querySelector('.editAccountBtn');
        if (editBtn) {
            editBtn.addEventListener('click', (e) => {
                if (editBtn.hasAttribute('disabled')) {
                    e.preventDefault();
                    return;
                }
                e.preventDefault();
                const contaId = this.getCurrentAccountId();
                if (contaId) {
                    window.location.href = `/contas/editar/${contaId}/`;
                }
            });
        }

        // Setup para botão Excluir
        const deleteBtn = document.querySelector('.deleteAccountBtn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', (e) => {
                if (deleteBtn.hasAttribute('disabled')) {
                    e.preventDefault();
                    return;
                }
                e.preventDefault();
                const contaId = this.getCurrentAccountId();
                if (contaId && modalManager) {
                    // Armazenar o ID da conta para usar no modal
                    window.currentAccountIdToDelete = contaId;
                    modalManager.openDeleteAccountModal();
                }
            });
        }

        // Setup para botão Adicionar
        const addBtn = document.querySelector('.addAccountBtn');
        if (addBtn) {
            addBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (modalManager) {
                    modalManager.openAddAccountModal();
                }
            });
        }
    }

    updateCrudButtonsData() {
        const contaId = this.getCurrentAccountId();
        if (contaId) {
            const viewBtn = document.querySelector('.viewAccountBtn');
            const editBtn = document.querySelector('.editAccountBtn');
            const deleteBtn = document.querySelector('.deleteAccountBtn');

            if (viewBtn) viewBtn.dataset.contaId = contaId;
            if (editBtn) editBtn.dataset.contaId = contaId;
            if (deleteBtn) deleteBtn.dataset.contaId = contaId;
        }
    }

    getCurrentAccountId() {
        // Os IDs estão nos data-conta-id dos botões
        const viewBtn = document.querySelector('.viewAccountBtn');
        if (viewBtn && viewBtn.dataset.contaId) {
            return viewBtn.dataset.contaId;
        }
        return null;
    }
}

// Inicializar carousel quando o documento carregar
let carouselManager;
document.addEventListener('DOMContentLoaded', function () {
    carouselManager = new CarouselManager();
});
