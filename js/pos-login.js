document.addEventListener("DOMContentLoaded", function() {
    console.log("Pós-login script carregado!");

    const botaoAgenda = document.getElementById("botao-agenda");
    if (!botaoAgenda) return; // Sai do script se o botão não existir

    botaoAgenda.addEventListener("click", function() {
        console.log("Redirecionando para a agenda...");
        window.location.href = "tela-agenda.html";
    });

    // Redirecionamento para Cadastrados
    const botaoCadastrados = document.getElementById("botao-cadastrados");
    if (botaoCadastrados) {
        botaoCadastrados.addEventListener("click", function() {
            console.log("Redirecionando para cadastrados...");
            window.location.href = "tela-cadastrados.html";
        });
    }

    // Redirecionamento para Novo Atendimento (Anamnese)
    const botaoNovoAtendimento = document.getElementById("botao-novo-atendimento");
    if (botaoNovoAtendimento) {
        botaoNovoAtendimento.addEventListener("click", function() {
            console.log("Redirecionando para anamnese...");
            window.location.href = "tela-anamnese.html";
        });
    }
});