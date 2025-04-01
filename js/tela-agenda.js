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

    // Adicionar consultas na tabela
    document.getElementById("formAtendimento").addEventListener("submit", function (event) {
        event.preventDefault();
        const data = document.getElementById("inputData").value;
        const hora = document.getElementById("inputHora").value;
        const tutor = document.getElementById("inputTutor").value;
        const pet = document.getElementById("inputPet").value;
        const tipo = document.getElementById("inputTipo").value;
        
        const tabela = document.getElementById("tabelaConsultas");
        const novaLinha = tabela.insertRow();
        novaLinha.innerHTML = `<td>${data}</td><td>${hora}</td><td>${tutor}</td><td>${pet}</td><td>${tipo}</td><td><button style="background: none; border: none; cursor: pointer; padding: 5px;" class='remover'><img src="assets/lixeira.png" alt="Excluir" width="28"></button></td>`;
        
        closeModal();
    });

    // Adicionar exames na tabela
    document.getElementById("formExame").addEventListener("submit", function (event) {
        event.preventDefault();
        const data = document.getElementById("inputDataExame").value;
        const hora = document.getElementById("inputHoraExame").value;
        const tutor = document.getElementById("inputTutorExame").value;
        const pet = document.getElementById("inputPetExame").value;
        const exame = document.getElementById("inputTipoExame").value;
        
        const tabela = document.getElementById("tabelaExames");
        const novaLinha = tabela.insertRow();
        novaLinha.innerHTML = `<td>${data}</td><td>${hora}</td><td>${tutor}</td><td>${pet}</td><td>${exame}</td><td><button style="background: none; border: none; cursor: pointer; padding: 5px;" class='remover'><img src="assets/lixeira.png" alt="Excluir" width="28"></button></td>`;
        
        closeModal();
    });

    // Remover itens da tabela
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("remover")) {
            event.target.closest("tr").remove();
        }
    });
});