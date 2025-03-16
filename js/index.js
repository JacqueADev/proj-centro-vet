document.getElementById('botao-login').addEventListener('click', function(event) {
    event.preventDefault();

    // campos de entrada
    const usuario = document.getElementById('input-usuario').value;
    const senha = document.getElementById('input-senha').value;

    // simulação de login
    const usuariosValidos = [
        { usuario: 'admin', senha: 'admin123' }
    ];

    // Verificar os dados
    const usuarioValido = usuariosValidos.find(user => user.usuario === usuario && user.senha === senha);

    if (usuarioValido) {
        // login deu certo, redireciona 
        window.location.href = "tela-pos-login.html";
    } else {
        // login deu errado dá mensagem de erro
        alert("Usuário ou senha incorretos. Tente novamente.");
    }
});
