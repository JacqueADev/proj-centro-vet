document.addEventListener("DOMContentLoaded", function() {
    console.log("Agenda script carregado!");

    // BOTÃO VOLTAR
    const botaoVoltar = document.querySelector(".botao-lateral");
    if (botaoVoltar) {
        botaoVoltar.addEventListener("click", function() {
            console.log("Voltando para a tela pós-login...");
            window.location.href = "tela-pos-login.html";
        });
    }

    // MODAL
    const modal = document.getElementById("modal");
    const botaoAbrirModal = document.querySelectorAll("#abrirModal");
    const botaoFecharModal = document.querySelector(".fechar");
    const formAtendimento = document.getElementById("formAtendimento");

    // Seleciona as tabelas
    const tabelaConsultas = document.getElementById("tabelaConsultas");
    const tabelaExames = document.getElementById("tabelaExames");

    let tipoAtendimentoAtual = "Consulta"; // Define o tipo padrão ao abrir o modal

    if (modal && botaoAbrirModal.length > 0 && botaoFecharModal) {
        // Abrir modal e definir o tipo de atendimento
        botaoAbrirModal.forEach(botao => {
            botao.addEventListener("click", function(event) {
                modal.style.display = "block";

                // Define se é "Consulta" ou "Exame"
                tipoAtendimentoAtual = event.target.textContent.includes("consulta") ? "Consulta" : "Exame";
            });
        });

        // Fechar modal ao clicar no botão "X"
        botaoFecharModal.addEventListener("click", function() {
            modal.style.display = "none";
        });

        // Fechar modal ao clicar fora dele
        window.addEventListener("click", function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    } else {
        console.warn("Elementos do modal não encontrados. Verifique os IDs no HTML.");
    }

    // Salvar atendimento na tabela correspondente
    if (formAtendimento) {
        formAtendimento.addEventListener("submit", function(event) {
            event.preventDefault(); // Evita recarregar a página

            // Capturar os valores dos inputs
            const data = document.getElementById("inputData").value;
            const hora = document.getElementById("inputHora").value;
            const tutor = document.getElementById("inputTutor").value;
            const pet = document.getElementById("inputPet").value;
            const tipo = document.getElementById("inputTipo").value;

            // Criar nova linha para a tabela
            const novaLinha = document.createElement("tr");
            novaLinha.innerHTML = `
                <td>${data}</td>
                <td>${hora}</td>
                <td>${pet}</td>
                <td>${tipo}</td>
                <td><button class="remover">🗑️</button></td>
            `;

            // Adicionar na tabela correta
            if (tipoAtendimentoAtual === "Consulta") {
                tabelaConsultas.appendChild(novaLinha);
            } else {
                tabelaExames.appendChild(novaLinha);
            }

            // Fechar modal após cadastro
            modal.style.display = "none";
            formAtendimento.reset(); // Limpar os campos do formulário
        });
    }

    // Remover um item da tabela ao clicar no botão 🗑️
    document.addEventListener("click", function(event) {
        if (event.target.classList.contains("remover")) {
            event.target.parentElement.parentElement.remove();
        }
    });
});
