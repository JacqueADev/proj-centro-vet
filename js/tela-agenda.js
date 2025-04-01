document.addEventListener("DOMContentLoaded", function () {
    console.log("Agenda script carregado!");

    // Dados de exemplo (substitua por chamadas reais ao seu backend)
    let consultas = [];
    let exames = [];

    // Funções globais para manipulação de modais
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

        // Botões para fechar modal (X)
        document.querySelectorAll('.close').forEach(btn => {
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

    // Formata data para exibição (dd/mm/aaaa)
    function formatarData(dataISO) {
        const [ano, mes, dia] = dataISO.split('-');
        return `${dia}/${mes}/${ano}`;
    }

    // Formata hora para exibição (HH:MM)
    function formatarHora(horaISO) {
        return horaISO.substring(0, 5);
    }

    // Validação do formulário de consulta
    function validarConsulta(formData) {
        if (!formData.data || !formData.hora || !formData.tutor || !formData.pet || !formData.tipo) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return false;
        }
        return true;
    }

    // Adiciona nova consulta
    function adicionarConsulta(consulta) {
        consultas.push(consulta);
        atualizarTabelaConsultas();
    }

    // Adiciona novo exame
    function adicionarExame(exame) {
        exames.push(exame);
        atualizarTabelaExames();
    }

    // Atualiza tabela de consultas
    function atualizarTabelaConsultas() {
        const tabela = document.getElementById("tabelaConsultas");
        tabela.innerHTML = '';
        
        consultas.forEach(consulta => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${formatarData(consulta.data)}</td>
                <td>${formatarHora(consulta.hora)}</td>
                <td>${consulta.tutor}</td>
                <td>${consulta.pet}</td>
                <td>${consulta.tipo}</td>
                <td><button class="remover"><i class="fas fa-trash-alt"></i></button></td>
            `;
            tabela.appendChild(row);
        });
    }

    // Atualiza tabela de exames
    function atualizarTabelaExames() {
        const tabela = document.getElementById("tabelaExames");
        tabela.innerHTML = '';
        
        exames.forEach(exame => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${formatarData(exame.data)}</td>
                <td>${formatarHora(exame.hora)}</td>
                <td>${exame.tutor}</td>
                <td>${exame.pet}</td>
                <td>${exame.tipo}</td>
                <td><button class="remover"><i class="fas fa-trash-alt"></i></button></td>
            `;
            tabela.appendChild(row);
        });
    }

    // Inicializa os eventos
    function init() {
        setupModalEvents();
        
        // Formulário de consulta
        document.getElementById("formAtendimento").addEventListener("submit", function (e) {
            e.preventDefault();
            
            const formData = {
                data: document.getElementById("inputData").value,
                hora: document.getElementById("inputHora").value,
                tutor: document.getElementById("inputTutor").value.trim(),
                pet: document.getElementById("inputPet").value.trim(),
                tipo: document.getElementById("inputTipo").value
            };
            
            if (validarConsulta(formData)) {
                adicionarConsulta(formData);
                this.reset();
                closeModal();
            }
        });

        // Formulário de exame
        document.getElementById("formExame").addEventListener("submit", function (e) {
            e.preventDefault();
            
            const formData = {
                data: document.getElementById("inputDataExame").value,
                hora: document.getElementById("inputHoraExame").value,
                tutor: document.getElementById("inputTutorExame").value.trim(),
                pet: document.getElementById("inputPetExame").value.trim(),
                tipo: document.getElementById("inputTipoExame").value
            };
            
            if (validarConsulta(formData)) { // Reutiliza a mesma validação
                adicionarExame(formData);
                this.reset();
                closeModal();
            }
        });

        // Botão Voltar
        const botaoVoltar = document.querySelector(".botao-lateral");
        if (botaoVoltar) {
            botaoVoltar.addEventListener("click", function () {
                window.location.href = "tela-pos-login.html";
            });
        }

        // Remover itens das tabelas
        document.addEventListener("click", function (e) {
            if (e.target.closest('.remover')) {
                const row = e.target.closest('tr');
                const tableId = row.closest('tbody').id;
                
                if (tableId === 'tabelaConsultas') {
                    const index = Array.from(row.parentNode.children).indexOf(row);
                    consultas.splice(index, 1);
                    atualizarTabelaConsultas();
                } else if (tableId === 'tabelaExames') {
                    const index = Array.from(row.parentNode.children).indexOf(row);
                    exames.splice(index, 1);
                    atualizarTabelaExames();
                }
            }
        });
    }

    // Inicia a aplicação
    init();
});