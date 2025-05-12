document.addEventListener('DOMContentLoaded', function() {
    // Adicionando o redirecionamento do botão Voltar
    const botaoVoltar = document.getElementById('botao-voltar');
    if (botaoVoltar) {
        botaoVoltar.addEventListener('click', function() {
            window.location.href = 'tela-pos-login.html';
        });
    }

    // Elementos do DOM
    const inputPesquisa = document.getElementById('inputPesquisa');
    const botaoBuscar = document.getElementById('botaoBuscar');
    const tabelaCorpo = document.getElementById('tabelaCorpo');
    
    // Dados de exemplo (substitua por chamadas reais ao seu backend)
    let tutores = [
        { id: 1, nome: "Ana Silva", telefone: "(11) 98765-4321", pets: 2 },
        { id: 2, nome: "Ana Paula Oliveira", telefone: "(21) 99876-5432", pets: 1 },
        { id: 3, nome: "Carlos Alberto", telefone: "(31) 98765-1234", pets: 3 },
        { id: 4, nome: "Joana Pereira", telefone: "(41) 98765-5678", pets: 1 },
        { id: 5, nome: "Ana Beatriz Souza", telefone: "(51) 98765-8765", pets: 2 }
    ];

    // Função para renderizar a tabela com os tutores
    function renderizarTabela(dados) {
        tabelaCorpo.innerHTML = '';
        
        if (dados.length === 0) {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td colspan="5" class="sem-resultados">Nenhum tutor encontrado</td>`;
            tabelaCorpo.appendChild(tr);
            return;
        }
        
        dados.forEach(tutor => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>#${tutor.id}</td>
                <td>${tutor.nome}</td>
                <td>${tutor.telefone}</td>
                <td><span class="pets">${tutor.pets}</span></td>
                <td class="acoes">
                    <button class="btn-icon add" onclick="adicionarPet(${tutor.id})"><i class="fas fa-plus"></i></button>
                    <button class="btn-icon edit" onclick="editarTutor(${tutor.id})"><i class="fas fa-edit"></i></button>
                    <button class="btn-icon delete" onclick="excluirTutor(${tutor.id})"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tabelaCorpo.appendChild(tr);
        });
    }

    // Função para buscar tutores
    function buscarTutores() {
        const termo = inputPesquisa.value.trim().toLowerCase();
        
        if (termo === '') {
            renderizarTabela([]);
            return;
        }
        
        const resultados = tutores.filter(tutor => 
            tutor.nome.toLowerCase().includes(termo)
        );
        
        renderizarTabela(resultados);
    }

    // Event listeners
    botaoBuscar.addEventListener('click', buscarTutores);
    inputPesquisa.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            buscarTutores();
        }
    });

    // Elementos do modal
    const modalPet = document.getElementById('modalPet');
    const btnCancelarPet = document.getElementById('cancelarPet');
    const formPet = document.getElementById('formPet');
    const spanClose = document.querySelector('.close');

    // Função para abrir o modal de adicionar pet (substitui a anterior)
    window.adicionarPet = function(idTutor) {
        document.getElementById('tutorId').value = idTutor;
        modalPet.style.display = 'block';
        formPet.reset(); // Limpa o formulário ao abrir
    };

    // Fechar o modal
    function fecharModalPet() {
        modalPet.style.display = 'none';
    }

    // Event listeners para fechar o modal
    spanClose.onclick = fecharModalPet;
    btnCancelarPet.onclick = fecharModalPet;
    window.onclick = function(event) {
        if (event.target === modalPet) {
            fecharModalPet();
        }
        if (event.target === document.getElementById('modalEditarTutor')) {
            fecharModalEditar();
        }
    };

    // Processar o formulário quando enviado
    formPet.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obter os valores do formulário
        const tutorId = document.getElementById('tutorId').value;
        const nomePet = document.getElementById('nomePet').value;
        const idade = document.getElementById('idade').value;
        const idadeTipo = document.getElementById('idadeTipo').value;
        const sexo = document.getElementById('sexo').value;
        
        // Simular chamada para o backend
        console.log('Dados do novo pet:', {
            tutorId,
            nomePet,
            idade: `${idade} ${idadeTipo}`,
            sexo,
        });

        // Simular cadastro bem-sucedido
        const tutorIndex = tutores.findIndex(t => t.id == tutorId);
        if (tutorIndex !== -1) {
            tutores[tutorIndex].pets += 1;
            buscarTutores(); // Atualiza a tabela
        }
        
        fecharModalPet();
        alert(`Pet ${nomePet} cadastrado com sucesso!`);
    });

    // Funções de ação (serão chamadas quando os botões forem clicados)
    window.adicionarPet = function(idTutor) {
        // Obter o tutor pelo ID
        const tutor = tutores.find(t => t.id === idTutor);
        
        // Preencher o ID do tutor no formulário
        document.getElementById('tutorId').value = idTutor;
        
        // Opcional: Mostrar o nome do tutor no título do modal
        document.querySelector('#modalPet h2').textContent = `Adicionar Pet para ${tutor.nome}`;
        
        // Abrir o modal
        document.getElementById('modalPet').style.display = 'block';
        
        // Limpar o formulário
        document.getElementById('formPet').reset();
    };

    window.editarTutor = function(idTutor) {
        const tutor = tutores.find(t => t.id === idTutor);
        
        // Preencher formulário com os dados do tutor
        document.getElementById('tutorIdEditar').value = tutor.id;
        document.getElementById('nomeTutor').value = tutor.nome || '';
        document.getElementById('cpfTutor').value = tutor.cpf || '';
        document.getElementById('rgTutor').value = tutor.rg || '';
        document.getElementById('telefoneTutor').value = tutor.telefone || '';
        document.getElementById('cepTutor').value = tutor.cep || '';
        document.getElementById('enderecoTutor').value = tutor.endereco || '';
        document.getElementById('bairroTutor').value = tutor.bairro || '';
        document.getElementById('cidadeTutor').value = tutor.cidade || '';
        document.getElementById('comoConheceu').value = tutor.comoConheceu || '';
        
        // Mostrar campo de indicação se necessário
        if (tutor.comoConheceu === 'indicacao') {
            document.getElementById('containerIndicacao').style.display = 'block';
            document.getElementById('nomeIndicacao').value = tutor.nomeIndicacao || '';
        } else {
            document.getElementById('containerIndicacao').style.display = 'none';
        }
        
        // Abrir o modal
        document.getElementById('modalEditarTutor').style.display = 'block';
    };

    window.excluirTutor = function(idTutor) {
        if (confirm('Tem certeza que deseja excluir este tutor?')) {
            tutores = tutores.filter(t => t.id !== idTutor);
            buscarTutores(); // Atualiza a tabela
            alert('Tutor excluído com sucesso!');
        }
    };

    // Função para mostrar/ocultar campo de indicação
    window.mostrarCampoIndicacao = function() {
        const comoConheceu = document.getElementById('comoConheceu').value;
        const containerIndicacao = document.getElementById('containerIndicacao');
        containerIndicacao.style.display = comoConheceu === 'indicacao' ? 'block' : 'none';
    };

    // Função para fechar o modal de edição
    window.fecharModalEditar = function() {
        document.getElementById('modalEditarTutor').style.display = 'none';
    };

    // Processar o formulário de edição
    document.getElementById('formEditarTutor').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const tutorId = document.getElementById('tutorIdEditar').value;
        const dadosAtualizados = {
            nome: document.getElementById('nomeTutor').value,
            cpf: document.getElementById('cpfTutor').value,
            rg: document.getElementById('rgTutor').value,
            telefone: document.getElementById('telefoneTutor').value,
            cep: document.getElementById('cepTutor').value,
            endereco: document.getElementById('enderecoTutor').value,
            bairro: document.getElementById('bairroTutor').value,
            cidade: document.getElementById('cidadeTutor').value,
            comoConheceu: document.getElementById('comoConheceu').value,
            nomeIndicacao: document.getElementById('comoConheceu').value === 'indicacao' 
                          ? document.getElementById('nomeIndicacao').value 
                          : ''
        };
        
        // Atualizar os dados do tutor
        const tutorIndex = tutores.findIndex(t => t.id == tutorId);
        if (tutorIndex !== -1) {
            tutores[tutorIndex] = { ...tutores[tutorIndex], ...dadosAtualizados };
            buscarTutores();
        }
        
        fecharModalEditar();
        alert('Dados do tutor atualizados com sucesso!');
    });

    // Renderiza a tabela vazia inicialmente
    renderizarTabela([]);
});