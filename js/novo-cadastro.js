document.addEventListener('DOMContentLoaded', function() {
    // Verifica e carrega dados fictícios se necessário
    if (!localStorage.getItem('tutores') || !localStorage.getItem('pets')) {
        carregarDadosFicticios();
    }

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
        containerIndicacao.style.display = this.value === 'indicacao' ? 'block' : 'none';
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
    
    spanClose.onclick = btnCancelarPet.onclick = function() {
        modalPet.style.display = 'none';
    }
    
    window.onclick = function(event) {
        if (event.target == modalPet) {
            modalPet.style.display = 'none';
        }
    }
    
    // Máscaras para os campos
    aplicarMascaras();
    
    // Botão cancelar do formulário principal
    document.querySelector('.btn-cancelar').addEventListener('click', function() {
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
        formNovoTutor.reset();
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
        iniciarAtendimentoBtn.disabled = !(tutorCadastrado && petCadastrado);
    }

    // Evento para o botão de iniciar atendimento
    iniciarAtendimentoBtn.addEventListener('click', function() {
        localStorage.setItem('currentTutorId', tutorIdAtual);
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

    // Função para carregar dados fictícios
    function carregarDadosFicticios() {
        console.log("Carregando dados fictícios iniciais...");
        
        // Dados fictícios de tutores
        const tutores = [
            {
                id: "tutor_1",
                nome: "Ana Carolina Mendes",
                telefone: "(11) 98765-4321",
                email: "ana.mendes@email.com",
                endereco: "Rua das Acácias, 100 - São Paulo/SP",
                dataCadastro: "2023-01-10T09:15:00"
            },
            {
                id: "tutor_2",
                nome: "Marcos Ribeiro",
                telefone: "(11) 91234-5678",
                email: "marcos.ribeiro@email.com",
                endereco: "Av. Brasil, 2000 - São Paulo/SP",
                dataCadastro: "2023-02-15T14:30:00"
            },
            {
                id: "tutor_3",
                nome: "Juliana Almeida",
                telefone: "(11) 99876-5432",
                email: "ju.almeida@email.com",
                endereco: "Rua dos Pinheiros, 300 - São Paulo/SP",
                dataCadastro: "2023-03-20T11:00:00"
            }
        ];

        // Dados fictícios de pets
        const pets = [
            {
                id: "pet_1",
                tutorId: "tutor_1",
                nome: "Bobby",
                especie: "Cão",
                raca: "Golden Retriever",
                idade: "4 anos",
                peso: 32.0,
                sexo: "Macho",
                ambiente: "Casa com quintal",
                pelagem: "Dourado",
                dataNascimento: "2019-05-15",
                dataCadastro: "2023-01-10T09:30:00",
                historico: []
            },
            {
                id: "pet_2",
                tutorId: "tutor_1",
                nome: "Luna",
                especie: "Gato",
                raca: "Siamês",
                idade: "2 anos",
                peso: 4.0,
                sexo: "Fêmea",
                ambiente: "Apartamento",
                pelagem: "Creme com pontos escuros",
                dataNascimento: "2021-07-10",
                dataCadastro: "2023-01-10T10:00:00",
                historico: []
            },
            {
                id: "pet_3",
                tutorId: "tutor_2",
                nome: "Thor",
                especie: "Cão",
                raca: "Bulldog Francês",
                idade: "3 anos",
                peso: 12.5,
                sexo: "Macho",
                ambiente: "Apartamento",
                pelagem: "Tigrado",
                dataNascimento: "2020-03-25",
                dataCadastro: "2023-02-15T15:00:00",
                historico: []
            },
            {
                id: "pet_4",
                tutorId: "tutor_3",
                nome: "Mel",
                especie: "Gato",
                raca: "SRD",
                idade: "5 meses",
                peso: 2.1,
                sexo: "Fêmea",
                ambiente: "Apartamento",
                pelagem: "Listrada",
                dataNascimento: "2022-10-15",
                dataCadastro: "2023-03-20T11:30:00",
                historico: []
            }
        ];

        localStorage.setItem('tutores', JSON.stringify(tutores));
        localStorage.setItem('pets', JSON.stringify(pets));
        console.log("Dados fictícios carregados com sucesso!");
    }

    // Função para aplicar máscaras nos campos
    function aplicarMascaras() {
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
    }
});