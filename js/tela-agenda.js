document.addEventListener("DOMContentLoaded", function () {
    console.log("Agenda script carregado!");

    // Torna as funções disponíveis globalmente
    window.openModal = function (id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.add('open');
            modal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('modal-open');
        }
    };

    window.closeModal = function () {
        document.querySelectorAll('.jw-modal.open').forEach(modal => {
            modal.classList.remove('open');
            modal.setAttribute('aria-hidden', 'true');
        });
        document.body.classList.remove('modal-open');
    };

    // Configura todos os eventos de modal
    function setupModalEvents() {
        // Botões para abrir modal
        document.querySelectorAll('.abrir-modal').forEach(btn => {
            btn.addEventListener('click', function () {
                const modalId = this.getAttribute('data-modal-target');
                openModal(modalId);
            });
        });

        // Botões para fechar modal
        document.querySelectorAll('.fechar-modal').forEach(btn => {
            btn.addEventListener('click', closeModal);
        });

        // Fechar ao clicar no fundo
        document.querySelectorAll('.jw-modal').forEach(modal => {
            modal.addEventListener('click', function (e) {
                if (e.target === this) closeModal();
            });
        });

        // Fechar com ESC
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeModal();
        });
    }

    // Inicializa os eventos
    setupModalEvents();

    // Botão Voltar
    const botaoVoltar = document.querySelector(".botao-lateral");
    if (botaoVoltar) {
        botaoVoltar.addEventListener("click", function () {
            window.location.href = "tela-pos-login.html";
        });
    }
});