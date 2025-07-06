document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const formNovoTutor = document.getElementById('formNovoTutor');
    const formPet = document.getElementById('formPet');
    const iniciarAtendimentoBtn = document.getElementById('iniciarAtendimentoBtn');
    const adicionarPetBtn = document.getElementById('adicionarPetBtn');
    const modalPet = document.getElementById('modalPet');
    const btnCancelarPet = document.getElementById('cancelarPet');
    const spanClose = document.querySelector('.close');
    const comoConheceu = document.getElementById('comoConheceu');
    const containerIndicacao = document.getElementById('containerIndicacao');
    
    // Variáveis de estado
    let tutorCadastrado = false;
    let petCadastrado = false;
    let tutorIdAtual = '';

    // 1. Configuração do botão Voltar
    const botaoVoltar = document.querySelector('.barra-lateral .botao-lateral');
    if (botaoVoltar) {
        botaoVoltar.addEventListener('click', function() {
            window.location.href = 'tela-pos-login.html';
        });
    }

    // 2. Mostrar campo de indicação
    comoConheceu.addEventListener('change', function() {
        containerIndicacao.style.display = this.value === 'indicacao' ? 'block' : 'none';
    });

    // 3. Configuração do modal de pet
    adicionarPetBtn.addEventListener('click', function() {
        if (!tutorCadastrado) {
            alert('Por favor, cadastre o tutor primeiro!');
            return;
        }
        modalPet.style.display = 'block';
    });

    spanClose.addEventListener('click', fecharModalPet);
    btnCancelarPet.addEventListener('click', fecharModalPet);
    
    window.onclick = function(event) {
        if (event.target === modalPet) {
            fecharModalPet();
        }
    };

    // 4. Botão cancelar do formulário principal
    document.querySelector('.btn-cancelar').addEventListener('click', function() {
        if (confirm('Deseja cancelar o cadastro? Todos os dados serão perdidos.')) {
            window.location.href = 'tela-pos-login.html';
        }
    });

    // 5. Máscaras para os campos
    aplicarMascaras();

    // 6. Submit do formulário de tutor
    formNovoTutor.addEventListener('submit', function(e) {
        e.preventDefault();
        
        tutorIdAtual = 'tutor_' + Date.now();
        
        const tutorData = {
            id: tutorIdAtual,
            nome: document.getElementById('nomeTutor').value,
            cpf: document.getElementById('cpfTutor').value,
            rg: document.getElementById('rgTutor').value,
            telefone: document.getElementById('telefoneTutor').value,
            email: document.getElementById('emailTutor').value,
            endereco: document.getElementById('enderecoTutor').value,
            bairro: document.getElementById('bairroTutor').value,
            cidade: document.getElementById('cidadeTutor').value,
            cep: document.getElementById('cepTutor').value,
            comoConheceu: document.getElementById('comoConheceu').value,
            nomeIndicacao: document.getElementById('comoConheceu').value === 'indicacao' 
                          ? document.getElementById('nomeIndicacao').value 
                          : '',
            adesaoPlano: document.getElementById('adesaoPlano').value,
            dataCadastro: new Date().toISOString(),
            planoId: "",
            statusPlano: "inativo",
            dataVencimentoPlano: ""
        };

        salvarTutor(tutorData);
        tutorCadastrado = true;
        verificarBotoes();
        alert('Tutor cadastrado com sucesso!');
        formNovoTutor.reset();
    });

    // 7. Submit do formulário de pet
    formPet.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const petData = {
            id: 'pet_' + Date.now(),
            tutorId: tutorIdAtual,
            nome: document.getElementById('nomePet').value,
            idade: document.getElementById('idade').value + ' ' + document.getElementById('idadeTipo').value,
            sexo: document.getElementById('sexo').value,
            castrado: document.getElementById('castrado').value,
            especie: document.getElementById('especie').value,
            raca: document.getElementById('raca').value,
            pelagem: document.getElementById('pelagem').value,
            cor: document.getElementById('cor').value,
            doencaExistente: document.getElementById('doencaExistente').value,
            observacao: document.getElementById('observacao').value,
            dataCadastro: new Date().toISOString(),
            historico: []
        };

        salvarPet(petData);
        petCadastrado = true;
        verificarBotoes();
        modalPet.style.display = 'none';
        alert('Pet cadastrado com sucesso!');
        formPet.reset();
    });

    // 8. Botão iniciar atendimento
    iniciarAtendimentoBtn.addEventListener('click', function() {
        localStorage.setItem('currentTutorId', tutorIdAtual);
        window.location.href = 'tela-anamnese.html';
    });

    // Funções auxiliares
    function fecharModalPet() {
        modalPet.style.display = 'none';
    }

    function verificarBotoes() {
        iniciarAtendimentoBtn.disabled = !(tutorCadastrado && petCadastrado);
    }

    function salvarTutor(tutorData) {
        const tutores = JSON.parse(localStorage.getItem('tutores')) || [];
        tutores.push(tutorData);
        localStorage.setItem('tutores', JSON.stringify(tutores));
    }

    function salvarPet(petData) {
        const pets = JSON.parse(localStorage.getItem('pets')) || [];
        pets.push(petData);
        localStorage.setItem('pets', JSON.stringify(pets));
    }

    function aplicarMascaras() {
        // CPF
        document.getElementById('cpfTutor').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = value;
        });
        
        // Telefone
        document.getElementById('telefoneTutor').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
            value = value.replace(/(\d)(\d{4})$/, '$1-$2');
            e.target.value = value;
        });
        
        // CEP
        document.getElementById('cepTutor').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/^(\d{5})(\d)/, '$1-$2');
            e.target.value = value;
        });
    }
});