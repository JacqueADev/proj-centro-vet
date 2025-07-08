document.addEventListener('DOMContentLoaded', function() {
    // 1. Configuração inicial
    const botaoVoltar = document.getElementById('botao-voltar');
    const inputPesquisa = document.getElementById('inputPesquisa');
    const botaoBuscar = document.getElementById('botaoBuscar');
    const tabelaCorpo = document.getElementById('tabelaCorpo');
    const aderiuPlanoCheckbox = document.getElementById('aderiuPlano');
    const planoPetContainer = document.getElementById('planoPetContainer');
    const modalPet = document.getElementById('modalPet');
    const btnCancelarPet = document.getElementById('cancelarPet');
    const formPet = document.getElementById('formPet');
    const spanClose = document.querySelector('.close');
    const comoConheceu = document.getElementById('comoConheceu');
    const containerIndicacao = document.getElementById('containerIndicacao');
    const aderiuPlanoTutorCheckbox = document.getElementById('aderiuPlanoTutor');
    const planoTutorContainer = document.getElementById('planoTutorContainer');

    // Contador para IDs menores
    let tutorIdCounter = JSON.parse(localStorage.getItem('tutorIdCounter')) || 1;

    // 2. Configuração do botão Voltar
    if (botaoVoltar) {
        botaoVoltar.addEventListener('click', function() {
            window.location.href = 'tela-pos-login.html';
        });
    }

    // 3. Função para gerar ID menor para tutores
    function gerarTutorId() {
        const novoId = tutorIdCounter++;
        localStorage.setItem('tutorIdCounter', JSON.stringify(tutorIdCounter));
        return `tut_${novoId}`;
    }

    // 4. Função para carregar tutores do localStorage
    function carregarTutores() {
        return JSON.parse(localStorage.getItem('tutores')) || [];
    }

    // 5. Função para contar pets por tutor
    function contarPetsPorTutor(tutorId) {
        const pets = JSON.parse(localStorage.getItem('pets')) || [];
        return pets.filter(pet => pet.tutorId === tutorId).length;
    }

    // 6. Função para verificar se o tutor tem pets no plano
    function verificarPetsNoPlano(tutorId) {
        const pets = JSON.parse(localStorage.getItem('pets')) || [];
        return pets.some(pet => 
            pet.tutorId === tutorId && pet.aderiuPlano === true
        );
    }

    // 7. Função para formatar data
    function formatarData(data) {
        if (!data) return 'N/A';
        
        if (typeof data === 'string') {
            data = new Date(data);
        }
        
        if (!(data instanceof Date) || isNaN(data)) {
            data = new Date();
        }
        
        const dia = data.getDate().toString().padStart(2, '0');
        const mes = (data.getMonth() + 1).toString().padStart(2, '0');
        const ano = data.getFullYear();
        
        return `${dia}/${mes}/${ano}`;
    }

    // 8. Função para formatar dados dos tutores para exibição
    function formatarTutoresParaExibicao(tutores) {
        return tutores.map(tutor => {
            const temPetsNoPlano = verificarPetsNoPlano(tutor.id);
            const idNumerico = tutor.id.split('_')[1];
            
            return {
                id: idNumerico,
                nome: tutor.nome,
                telefone: tutor.telefone,
                dataCadastro: tutor.dataCadastro || new Date().toISOString(),
                pets: contarPetsPorTutor(tutor.id),
                temPetsNoPlano: temPetsNoPlano,
                dadosCompletos: tutor
            };
        });
    }

    // 9. Função para renderizar a tabela (COM NOVO EVENTO DE CLIQUE NA LINHA)
    function renderizarTabela(tutoresFormatados) {
        tabelaCorpo.innerHTML = '';
        
        if (tutoresFormatados.length === 0) {
            tabelaCorpo.innerHTML = `
                <tr>
                    <td colspan="7" class="sem-resultados">
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
                <td>${formatarData(tutor.dataCadastro)}</td>
                <td><span class="pets">${tutor.pets}</span></td>
                <td>
                    ${tutor.temPetsNoPlano ? 
                        '<i class="fas fa-check-circle" style="color: var(--cor-sucesso);" tooltip="Possui pets no plano"></i>' : 
                        '<i class="fas fa-times-circle" style="color: var(--cor-erro);" tooltip="Não possui pets no plano"></i>'}
                </td>
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
            
            // NOVO: Evento de clique na linha (exceto nos botões de ação)
            tr.addEventListener('click', function(e) {
                if (!e.target.closest('.acoes')) {
                    window.location.href = `detales-tutores.html?id=${tutor.dadosCompletos.id}`;
                }
            });
            
            tabelaCorpo.appendChild(tr);
        });
    }

    // 10. Função para buscar tutores
    function buscarTutores(termo = '') {
        const tutores = carregarTutores();
        const tutoresComData = tutores.map(tutor => {
            if (!tutor.dataCadastro) {
                tutor.dataCadastro = new Date().toISOString();
            }
            return tutor;
        });
        
        if (tutoresComData.length !== tutores.length) {
            localStorage.setItem('tutores', JSON.stringify(tutoresComData));
        }
        
        const tutoresFormatados = formatarTutoresParaExibicao(tutoresComData);
        
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

    // 11. Configuração dos eventos de pesquisa
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

    // 12. Configuração do checkbox de plano do pet
    aderiuPlanoCheckbox.addEventListener('change', function() {
        planoPetContainer.style.display = this.checked ? 'block' : 'none';
        document.getElementById('planoPet').required = this.checked;
        document.getElementById('dataAderiuPlano').required = this.checked;
        
        if (this.checked) {
            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0];
            document.getElementById('dataAderiuPlano').value = formattedDate;
        }
    });

    // Configuração do checkbox de plano do tutor
    aderiuPlanoTutorCheckbox.addEventListener('change', function() {
        planoTutorContainer.style.display = this.checked ? 'block' : 'none';
        document.getElementById('planoTutor').required = this.checked;
        document.getElementById('dataAderiuPlanoTutor').required = this.checked;
        
        if (this.checked) {
            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0];
            document.getElementById('dataAderiuPlanoTutor').value = formattedDate;
        }
    });

    // 13. Funções para manipulação do modal de pet
    window.adicionarPet = function(idTutor) {
        const tutor = carregarTutores().find(t => t.id === idTutor);
        
        if (tutor) {
            document.getElementById('tutorId').value = idTutor;
            document.querySelector('#modalPet h2').textContent = `Adicionar Pet para ${tutor.nome}`;
            modalPet.style.display = 'block';
            formPet.reset();
            modalPet.querySelector('.modal-content').scrollTop = 0;
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

    // 14. Processamento do formulário de pet
    formPet.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const tutorId = document.getElementById('tutorId').value;
        const aderiuPlano = aderiuPlanoCheckbox.checked;
        
        const petData = {
            id: `pet_${Date.now()}`,
            tutorId: tutorId,
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
            aderiuPlano: aderiuPlano,
            planoPet: aderiuPlano ? document.getElementById('planoPet').value : null,
            dataAderiuPlano: aderiuPlano ? document.getElementById('dataAderiuPlano').value : null,
            historico: []
        };

        const pets = JSON.parse(localStorage.getItem('pets')) || [];
        pets.push(petData);
        localStorage.setItem('pets', JSON.stringify(pets));
        
        buscarTutores(inputPesquisa.value);
        fecharModalPet();
        alert(`Pet ${petData.nome} cadastrado com sucesso!`);
    });

    // 15. Funções para edição de tutor
    window.editarTutor = function(idTutor) {
        const tutor = carregarTutores().find(t => t.id === idTutor);
        
        if (!tutor) return;
        
        document.getElementById('tutorIdEditar').value = tutor.id;
        document.getElementById('nomeTutor').value = tutor.nome || '';
        document.getElementById('cpfTutor').value = tutor.cpf || '';
        document.getElementById('rgTutor').value = tutor.rg || '';
        document.getElementById('telefoneTutor').value = tutor.telefone || '';
        document.getElementById('emailTutor').value = tutor.email || '';
        document.getElementById('cepTutor').value = tutor.cep || '';
        document.getElementById('enderecoTutor').value = tutor.endereco || '';
        document.getElementById('bairroTutor').value = tutor.bairro || '';
        document.getElementById('cidadeTutor').value = tutor.cidade || '';
        document.getElementById('comoConheceu').value = tutor.comoConheceu || '';
        
        // Novos campos do plano
        const aderiuPlano = tutor.aderiuPlano || false;
        document.getElementById('aderiuPlanoTutor').checked = aderiuPlano;
        planoTutorContainer.style.display = aderiuPlano ? 'block' : 'none';
        
        if (aderiuPlano) {
            document.getElementById('planoTutor').value = tutor.planoTutor || '';
            document.getElementById('dataAderiuPlanoTutor').value = tutor.dataAderiuPlano || '';
        }
        
        if (tutor.comoConheceu === 'indicacao') {
            document.getElementById('containerIndicacao').style.display = 'block';
            document.getElementById('nomeIndicacao').value = tutor.nomeIndicacao || '';
        } else {
            document.getElementById('containerIndicacao').style.display = 'none';
        }
        
        document.getElementById('modalEditarTutor').style.display = 'block';
        document.querySelector('#modalEditarTutor .modal-content').scrollTop = 0;
    };

    window.excluirTutor = function(idTutor) {
        if (confirm('Tem certeza que deseja excluir este tutor e todos os seus pets?')) {
            let tutores = carregarTutores();
            tutores = tutores.filter(t => t.id !== idTutor);
            localStorage.setItem('tutores', JSON.stringify(tutores));
            
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

    // 16. Processamento do formulário de edição
    document.getElementById('formEditarTutor').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const tutorId = document.getElementById('tutorIdEditar').value;
        const aderiuPlano = document.getElementById('aderiuPlanoTutor').checked;
        
        const dadosAtualizados = {
            nome: document.getElementById('nomeTutor').value,
            cpf: document.getElementById('cpfTutor').value,
            rg: document.getElementById('rgTutor').value,
            telefone: document.getElementById('telefoneTutor').value,
            email: document.getElementById('emailTutor').value,
            cep: document.getElementById('cepTutor').value,
            endereco: document.getElementById('enderecoTutor').value,
            bairro: document.getElementById('bairroTutor').value,
            cidade: document.getElementById('cidadeTutor').value,
            comoConheceu: document.getElementById('comoConheceu').value,
            nomeIndicacao: document.getElementById('comoConheceu').value === 'indicacao' 
                          ? document.getElementById('nomeIndicacao').value 
                          : '',
            aderiuPlano: aderiuPlano,
            planoTutor: aderiuPlano ? document.getElementById('planoTutor').value : null,
            dataAderiuPlano: aderiuPlano ? document.getElementById('dataAderiuPlanoTutor').value : null
        };
        
        let tutores = carregarTutores();
        const tutorIndex = tutores.findIndex(t => t.id === tutorId);
        
        if (tutorIndex !== -1) {
            dadosAtualizados.dataCadastro = tutores[tutorIndex].dataCadastro || new Date().toISOString();
            tutores[tutorIndex] = { ...tutores[tutorIndex], ...dadosAtualizados };
            localStorage.setItem('tutores', JSON.stringify(tutores));
            buscarTutores(inputPesquisa.value);
        }
        
        fecharModalEditar();
        alert('Dados do tutor atualizados com sucesso!');
    });

    // 17. Carrega todos os tutores ao iniciar
    buscarTutores();
});