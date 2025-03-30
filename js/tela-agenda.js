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

});
