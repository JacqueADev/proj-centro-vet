document.addEventListener('DOMContentLoaded', function() {
    // Elementos do formulário
    const formNovoTutor = document.getElementById('formNovoTutor');
    const formPet = document.getElementById('formPet');
    const iniciarAtendimentoBtn = document.getElementById('iniciarAtendimentoBtn');
    let tutorCadastrado = false;
    let petCadastrado = false;
    let tutorIdAtual = ''; // Para vincular o pet ao tutor

    // Mostrar campo de indicação quando selecionado
    const comoConheceu = document.getElementById('comoConheceu');
    const containerIndicacao = document.getElementById('containerIndicacao');
    
    comoConheceu.addEventListener('change', function() {
        if (this.value === 'indicacao') {
            containerIndicacao.style.display = 'block';
        } else {
            containerIndicacao.style.display = 'none';
        }
    });
    
    // Modal para adicionar pet
    const modalPet = document.getElementById('modalPet');
    const btnAdicionarPet = document.getElementById('adicionarPetBtn');
    const spanClose = document.getElementsByClassName('close')[0];
    const btnCancelarPet = document.getElementById('cancelarPet');
    
    btnAdicionarPet.onclick = function() {
        if (!tutorCadastrado) {
            alert('Por favor, cadastre o tutor primeiro!');
            return;
        }
        modalPet.style.display = 'block';
    }
    
    spanClose.onclick = function() {
        modalPet.style.display = 'none';
    }
    
    btnCancelarPet.onclick = function() {
        modalPet.style.display = 'none';
    }
    
    window.onclick = function(event) {
        if (event.target == modalPet) {
            modalPet.style.display = 'none';
        }
    }
    
    // Máscaras para os campos
    const cpfTutor = document.getElementById('cpfTutor');
    const telefoneTutor = document.getElementById('telefoneTutor');
    const cepTutor = document.getElementById('cepTutor');
    
    cpfTutor.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = value;
    });
    
    telefoneTutor.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        value = value.replace(/(\d)(\d{4})$/, '$1-$2');
        e.target.value = value;
    });
    
    cepTutor.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/^(\d{5})(\d)/, '$1-$2');
        e.target.value = value;
    });
    
    // Botão cancelar do formulário principal
    document.querySelector('.cancelar').addEventListener('click', function() {
        if (confirm('Deseja cancelar o cadastro? Todos os dados serão perdidos.')) {
            window.location.href = 'tela-pos-login.html';
        }
    });

    // Evento de submit para o formulário de tutor
    formNovoTutor.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Gerar ID único para o tutor
        tutorIdAtual = 'tutor_' + Date.now();
        
        // Obter dados do formulário
        const tutorData = {
            id: tutorIdAtual,
            nome: document.getElementById('nomeTutor').value,
            cpf: document.getElementById('cpfTutor').value,
            rg: document.getElementById('rgTutor').value,
            telefone: document.getElementById('telefoneTutor').value,
            endereco: document.getElementById('enderecoTutor').value,
            bairro: document.getElementById('bairroTutor').value,
            cidade: document.getElementById('cidadeTutor').value,
            cep: document.getElementById('cepTutor').value,
            comoConheceu: document.getElementById('comoConheceu').value,
            nomeIndicacao: document.getElementById('comoConheceu').value === 'indicacao' 
                          ? document.getElementById('nomeIndicacao').value 
                          : '',
            dataCadastro: new Date().toISOString()
        };

        // Salvar no localStorage
        salvarTutor(tutorData);
        
        tutorCadastrado = true;
        verificarBotoes();
        alert('Tutor cadastrado com sucesso!');
    });

    // Evento de submit para o formulário de pet
    formPet.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Gerar ID único para o pet
        const petId = 'pet_' + Date.now();
        
        // Obter dados do formulário
        const petData = {
            id: petId,
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

        // Salvar no localStorage
        salvarPet(petData);
        
        petCadastrado = true;
        verificarBotoes();
        modalPet.style.display = 'none';
        alert('Pet cadastrado com sucesso!');
        
        // Limpar formulário do pet
        formPet.reset();
    });

    // Função para verificar se pode habilitar o botão de atendimento
    function verificarBotoes() {
        if (tutorCadastrado && petCadastrado) {
            iniciarAtendimentoBtn.disabled = false;
        }
    }

    // Evento para o botão de iniciar atendimento
    iniciarAtendimentoBtn.addEventListener('click', function() {
        // Salvar o tutorId e petId atuais para usar na anamnese
        localStorage.setItem('currentTutorId', tutorIdAtual);
        // Aqui você pode adicionar lógica para pegar o último pet cadastrado
        window.location.href = 'tela-anamnese.html';
    });

    // Funções para salvar dados no localStorage
    function salvarTutor(tutorData) {
        let tutores = JSON.parse(localStorage.getItem('tutores')) || [];
        tutores.push(tutorData);
        localStorage.setItem('tutores', JSON.stringify(tutores));
    }

    function salvarPet(petData) {
        let pets = JSON.parse(localStorage.getItem('pets')) || [];
        pets.push(petData);
        localStorage.setItem('pets', JSON.stringify(pets));
    }
});