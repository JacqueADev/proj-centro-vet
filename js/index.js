document.addEventListener("DOMContentLoaded", function () {

    // LOGIN
    document.getElementById('botao-login').addEventListener('click', function (event) {
        event.preventDefault();

        // Captura inputs
        const usuario = document.getElementById('input-usuario').value;
        const senha = document.getElementById('input-senha').value;

        // Simula de login
        const usuariosValidos = [
            { usuario: 'admin', senha: 'admin123' }
        ];

        // Verifica dados
        const usuarioValido = usuariosValidos.find(user => user.usuario === usuario && user.senha === senha);

        if (usuarioValido) {
            // Redireciona após login bem-sucedido
            window.location.href = "tela-pos-login.html";
        } else {
            // Exibe mensagem de erro
            alert("Usuário ou senha incorretos. Tente novamente.");
        }
    });



});

