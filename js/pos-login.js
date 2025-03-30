document.addEventListener("DOMContentLoaded", function() {
    console.log("Pós-login script carregado!");

    const botaoAgenda = document.getElementById("botao-agenda");
    if (!botaoAgenda) return; // Sai do script se o botão não existir

    botaoAgenda.addEventListener("click", function() {
        console.log("Redirecionando para a agenda...");
        window.location.href = "tela-agenda.html";
    });
});
