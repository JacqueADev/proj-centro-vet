document.addEventListener('DOMContentLoaded', function() {
    // 1. Configuração inicial
    const botaoVoltar = document.getElementById('botao-voltar');
    const inputPesquisa = document.getElementById('inputPesquisa');
    const botaoBuscar = document.getElementById('botaoBuscar');
    const tabelaCorpo = document.getElementById('tabelaCorpo');

    // 2. Configuração do botão Voltar
    if (botaoVoltar) {
        botaoVoltar.addEventListener('click', function() {
            window.location.href = 'tela-pos-login.html';
        });
    }

    // 3. Função para carregar tutores do localStorage
    function carregarTutores() {
        return JSON.parse(localStorage.getItem('tutores')) || [];
    }

    // 4. Função para contar pets por tutor
    function contarPetsPorTutor(tutorId) {
        const pets = JSON.parse(localStorage.getItem('pets')) || [];
        return pets.filter(pet => pet.tutorId === tutorId).length;
    }

    // 5. Função para formatar dados dos tutores para exibição
    function formatarTutoresParaExibicao(tutores) {
        return tutores.map(tutor => {
            return {
                id: tutor.id.split('_')[1], // Extrai apenas o número do ID
                nome: tutor.nome,
                telefone: tutor.telefone,
                pets: contarPetsPorTutor(tutor.id),
                dadosCompletos: tutor // Mantém os dados completos para uso posterior
            };
        });
    }

    // 6. Função para renderizar a tabela
    function renderizarTabela(tutoresFormatados) {
        tabelaCorpo.innerHTML = '';
        
        if (tutoresFormatados.length === 0) {
            tabelaCorpo.innerHTML = `
                <tr>
                    <td colspan="5" class="sem-resultados">
                        Nenhum tutor encontrado
                    </td>
                </tr>
            `;
            return;
        }
        
        tutoresFormatados.forEach(tutor => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>#${tutor.id}</td>
                <td>${tutor.nome}</td>
                <td>${tutor.telefone}</td>
                <td><span class="pets">${tutor.pets}</span></td>
                <td class="acoes">
                    <button class="btn-icon add" onclick="adicionarPet('${tutor.dadosCompletos.id}')">
                        <i class="fas fa-plus"></i>
                    </button>
                    <button class="btn-icon edit" onclick="editarTutor('${tutor.dadosCompletos.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon delete" onclick="excluirTutor('${tutor.dadosCompletos.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tabelaCorpo.appendChild(tr);
        });
    }

    // 7. Função para buscar tutores (com filtro opcional)
    function buscarTutores(termo = '') {
        const tutores = carregarTutores();
        const tutoresFormatados = formatarTutoresParaExibicao(tutores);
        
        termo = termo.trim().toLowerCase();
        
        if (termo === '') {
            renderizarTabela(tutoresFormatados);
            return;
        }
        
        const resultados = tutoresFormatados.filter(tutor => 
            tutor.nome.toLowerCase().includes(termo)
        );
        
        renderizarTabela(resultados);
    }

    // 8. Configuração dos eventos de pesquisa
    botaoBuscar.addEventListener('click', function() {
        buscarTutores(inputPesquisa.value);
    });
    
    inputPesquisa.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            buscarTutores(inputPesquisa.value);
        }
    });

    inputPesquisa.addEventListener('input', function() {
        if (this.value === '') {
            buscarTutores();
        }
    });

    // 9. Configuração do modal de adicionar pet
    const modalPet = document.getElementById('modalPet');
    const btnCancelarPet = document.getElementById('cancelarPet');
    const formPet = document.getElementById('formPet');
    const spanClose = document.querySelector('.close');

    window.adicionarPet = function(idTutor) {
        const tutor = carregarTutores().find(t => t.id === idTutor);
        
        if (tutor) {
            document.getElementById('tutorId').value = idTutor;
            document.querySelector('#modalPet h2').textContent = `Adicionar Pet para ${tutor.nome}`;
            modalPet.style.display = 'block';
            formPet.reset();
        }
    };

    function fecharModalPet() {
        modalPet.style.display = 'none';
    }

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

    // 10. Processamento do formulário de pet
    formPet.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const tutorId = document.getElementById('tutorId').value;
        const nomePet = document.getElementById('nomePet').value;
        const idade = document.getElementById('idade').value;
        const idadeTipo = document.getElementById('idadeTipo').value;
        const sexo = document.getElementById('sexo').value;
        
        // Simular cadastro no localStorage
        const pets = JSON.parse(localStorage.getItem('pets')) || [];
        const novoPet = {
            id: `pet_${Date.now()}`,
            tutorId: tutorId,
            nome: nomePet,
            especie: document.getElementById('especie').value,
            raca: document.getElementById('raca').value,
            idade: `${idade} ${idadeTipo}`,
            peso: 0, // Será atualizado na primeira consulta
            sexo: sexo,
            castrado: document.getElementById('castrado').value,
            pelagem: document.getElementById('pelagem').value,
            cor: document.getElementById('cor').value,
            doencaExistente: document.getElementById('doencaExistente').value,
            observacao: document.getElementById('observacao').value,
            dataCadastro: new Date().toISOString(),
            historico: []
        };
        
        pets.push(novoPet);
        localStorage.setItem('pets', JSON.stringify(pets));
        
        buscarTutores(inputPesquisa.value);
        fecharModalPet();
        alert(`Pet ${nomePet} cadastrado com sucesso!`);
    });

    // 11. Funções para edição de tutor
    window.editarTutor = function(idTutor) {
        const tutor = carregarTutores().find(t => t.id === idTutor);
        
        if (!tutor) return;
        
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
        
        if (tutor.comoConheceu === 'indicacao') {
            document.getElementById('containerIndicacao').style.display = 'block';
            document.getElementById('nomeIndicacao').value = tutor.nomeIndicacao || '';
        } else {
            document.getElementById('containerIndicacao').style.display = 'none';
        }
        
        document.getElementById('modalEditarTutor').style.display = 'block';
    };

    window.excluirTutor = function(idTutor) {
        if (confirm('Tem certeza que deseja excluir este tutor e todos os seus pets?')) {
            // Remove o tutor
            let tutores = carregarTutores();
            tutores = tutores.filter(t => t.id !== idTutor);
            localStorage.setItem('tutores', JSON.stringify(tutores));
            
            // Remove os pets associados
            let pets = JSON.parse(localStorage.getItem('pets')) || [];
            pets = pets.filter(pet => pet.tutorId !== idTutor);
            localStorage.setItem('pets', JSON.stringify(pets));
            
            buscarTutores(inputPesquisa.value);
            alert('Tutor excluído com sucesso!');
        }
    };

    window.mostrarCampoIndicacao = function() {
        const comoConheceu = document.getElementById('comoConheceu').value;
        const containerIndicacao = document.getElementById('containerIndicacao');
        containerIndicacao.style.display = comoConheceu === 'indicacao' ? 'block' : 'none';
    };

    window.fecharModalEditar = function() {
        document.getElementById('modalEditarTutor').style.display = 'none';
    };

    // 12. Processamento do formulário de edição
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
        
        let tutores = carregarTutores();
        const tutorIndex = tutores.findIndex(t => t.id === tutorId);
        
        if (tutorIndex !== -1) {
            tutores[tutorIndex] = { ...tutores[tutorIndex], ...dadosAtualizados };
            localStorage.setItem('tutores', JSON.stringify(tutores));
            buscarTutores(inputPesquisa.value);
        }
        
        fecharModalEditar();
        alert('Dados do tutor atualizados com sucesso!');
    });

    // 13. Carrega todos os tutores ao iniciar
    buscarTutores();
});