document.addEventListener('DOMContentLoaded', function() {
    // 1. Obter ID do tutor da URL
    const urlParams = new URLSearchParams(window.location.search);
    const tutorId = urlParams.get('id');
    
    if (!tutorId) {
        alert('Tutor não especificado!');
        window.location.href = 'cadastrados.html';
        return;
    }
    
    // 2. Elementos do DOM
    const botaoVoltar = document.getElementById('botao-voltar');
    const nomeTutor = document.getElementById('nome-tutor');
    const telefoneTutor = document.getElementById('telefone-tutor');
    const emailTutor = document.getElementById('email-tutor');
    const enderecoTutor = document.getElementById('endereco-tutor');
    const cpfTutor = document.getElementById('cpf-tutor');
    const dataCadastroTutor = document.getElementById('data-cadastro-tutor');
    const statusPlanoTutor = document.getElementById('status-plano-tutor');
    const btnEditarTutor = document.getElementById('editar-tutor');
    const listaPets = document.getElementById('lista-pets');
    
    // Elementos do modal de pet
    const modalPet = document.getElementById('modalPet');
    const formPet = document.getElementById('formPet');
    const btnExcluirPet = document.getElementById('excluirPet');
    const closePetModal = document.querySelector('#modalPet .close');
    
    // Elementos do modal de tutor
    const modalTutor = document.getElementById('modalTutor');
    const formEditarTutor = document.getElementById('formEditarTutor');
    const closeTutorModal = document.getElementById('closeTutorModal');
    const cancelarEdicaoTutor = document.getElementById('cancelarEdicaoTutor');
    
    // 3. Carregar dados do tutor
    function carregarTutor() {
        const tutores = JSON.parse(localStorage.getItem('tutores')) || [];
        return tutores.find(t => t.id === tutorId);
    }
    
    // 4. Carregar pets do tutor
    function carregarPets() {
        const pets = JSON.parse(localStorage.getItem('pets')) || [];
        return pets.filter(p => p.tutorId === tutorId);
    }
    
    // 5. Exibir dados do tutor
    function exibirDadosTutor() {
        const tutor = carregarTutor();
        if (!tutor) {
            alert('Tutor não encontrado!');
            window.location.href = 'cadastrados.html';
            return;
        }
        
        nomeTutor.textContent = tutor.nome;
        telefoneTutor.textContent = tutor.telefone || 'Não informado';
        emailTutor.textContent = tutor.email || 'Não informado';
        cpfTutor.textContent = tutor.cpf || 'Não informado';
        dataCadastroTutor.textContent = formatarData(tutor.dataCadastro) || 'Não informada';
        enderecoTutor.textContent = `${tutor.endereco || ''} ${tutor.bairro ? ' - ' + tutor.bairro : ''} ${tutor.cidade ? ' - ' + tutor.cidade : ''}`.trim() || 'Não informado';
        
        // Verificar se o tutor tem pets com plano
        const pets = carregarPets();
        const temPlano = pets.some(pet => pet.aderiuPlano);
        
        if (temPlano) {
            statusPlanoTutor.textContent = 'Possui pet(s) com plano ativo';
            statusPlanoTutor.className = 'plano-ativo';
            document.querySelector('#plano-tutor-info i').className = 'fas fa-heartbeat';
        } else {
            statusPlanoTutor.textContent = 'Nenhum pet com plano ativo';
            statusPlanoTutor.className = 'plano-inativo';
            document.querySelector('#plano-tutor-info i').className = 'fas fa-heart';
        }
    }
    
    // 6. Exibir pets do tutor
    function exibirPets() {
        const pets = carregarPets();
        listaPets.innerHTML = '';
        
        if (pets.length === 0) {
            listaPets.innerHTML = '<p class="sem-pets">Nenhum pet cadastrado para este tutor.</p>';
            return;
        }
        
        pets.forEach(pet => {
            const card = document.createElement('div');
            card.className = 'card-pet';
            card.innerHTML = `
                <h3><i class="fas fa-paw"></i> ${pet.nome}</h3>
                <div class="info-pet">
                    <p><strong>Espécie:</strong> ${pet.especie}</p>
                    <p><strong>Raça:</strong> ${pet.raca || 'Não informada'}</p>
                    <p><strong>Idade:</strong> ${pet.idade}</p>
                    <p><strong>Sexo:</strong> ${pet.sexo}</p>
                    <p><strong>Castrado:</strong> ${pet.castrado}</p>
                    <p><strong>Doença pré-existente:</strong> ${pet.doencaExistente}</p>
                </div>
                ${pet.aderiuPlano ? `
                <div class="plano-info">
                    <p><strong>Plano:</strong> ${pet.planoPet}</p>
                    <p><strong>Adesão:</strong> ${formatarData(pet.dataAderiuPlano)}</p>
                </div>
                ` : ''}
                <div class="card-buttons">
                    <button class="card-button btn-atendimentos" data-pet-id="${pet.id}">
                        <i class="fas fa-clipboard-list"></i> Atendimentos
                    </button>
                    ${pet.aderiuPlano ? `
                    <button class="card-button btn-saldo-plano" data-pet-id="${pet.id}">
                        <i class="fas fa-coins"></i> Saldo do Plano
                    </button>
                    ` : ''}
                </div>
            `;
            
            card.addEventListener('click', (e) => {
                // Impede que o modal abra quando clicar nos botões
                if (!e.target.closest('.card-button')) {
                    abrirModalPet(pet);
                }
            });
            
            listaPets.appendChild(card);
        });
        
        // Adicione eventos para os novos botões
        document.querySelectorAll('.btn-atendimentos').forEach(btn => {
            btn.addEventListener('click', function() {
                const petId = this.getAttribute('data-pet-id');
                window.location.href = `Atendimentos-anteriores.html?petId=${petId}`;
            });
        });
        
        document.querySelectorAll('.btn-saldo-plano').forEach(btn => {
            btn.addEventListener('click', function() {
                const petId = this.getAttribute('data-pet-id');
                exibirResumoPlano(petId);
            });
        });
    }
    
    // 7. Exibir resumo do plano do pet - CORRIGIDA
    function exibirResumoPlano(petId) {
        const pets = JSON.parse(localStorage.getItem('pets')) || [];
        const pet = pets.find(p => p.id === petId);
        const planosServicos = JSON.parse(localStorage.getItem('planosServicos')) || {};
        const anamneses = JSON.parse(localStorage.getItem('anamneses')) || [];
        
        if (!pet || !pet.aderiuPlano || !pet.planoPet) {
            mostrarFeedback('Este pet não possui um plano ativo', 'erro');
            return;
        }
        
        // Verificar se temos dados de planos
        if (!planosServicos || !planosServicos.planos) {
            mostrarFeedback('Dados de planos não encontrados', 'erro');
            return;
        }
        
        // Encontrar o plano específico do pet
        const plano = planosServicos.planos.find(p => p.nome === pet.planoPet);
        
        if (!plano) {
            mostrarFeedback('Plano do pet não encontrado', 'erro');
            return;
        }
        
        // Filtrar atendimentos deste pet que usaram o plano
        const atendimentosPlano = anamneses.filter(a => 
            a.petId === petId && a.tipoAtendimento === 'consulta_plano');
        
        // Contar serviços utilizados por categoria
        const servicosUtilizados = {
            consultas: atendimentosPlano.length,
            vacinas: 0,
            procedimentos: 0,
            exames: 0,
            cirurgias: 0
        };
        
        const resumoPlano = document.getElementById('resumo-plano');
        resumoPlano.innerHTML = `
            <h3><i class="fas fa-file-invoice-dollar"></i> Saldo do Plano - ${pet.nome}</h3>
            <div class="info-plano">
                <p><strong>Plano:</strong> ${plano.nome}</p>
                <p><strong>Descrição:</strong> ${plano.descricao}</p>
                <p><strong>Data de adesão:</strong> ${formatarData(pet.dataAderiuPlano)}</p>
                <p><strong>Consultas realizadas:</strong> ${servicosUtilizados.consultas} de ${plano.consultas.inclusas}</p>
            </div>
            
            <div class="dashboard-servicos">
                <!-- Consultas -->
                <div class="dashboard-categoria">
                    <h4><i class="fas fa-stethoscope"></i> Consultas</h4>
                    <div class="barra-progresso">
                        <div class="progresso" style="width: ${Math.min(100, (servicosUtilizados.consultas / plano.consultas.inclusas) * 100)}%"></div>
                    </div>
                    <p class="saldo">${plano.consultas.inclusas - servicosUtilizados.consultas} restantes de ${plano.consultas.inclusas}</p>
                </div>
                
                <!-- Vacinas -->
                ${plano.vacinas && plano.vacinas.length > 0 ? `
                <div class="dashboard-categoria">
                    <h4><i class="fas fa-syringe"></i> Vacinas</h4>
                    <div class="lista-servicos">
                        ${plano.vacinas.map(vacina => `
                            <div class="servico-item">
                                <span class="servico-nome">${vacina.nome}</span>
                                <span class="servico-status disponivel">Disponível</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
                
                <!-- Procedimentos -->
                ${plano.procedimentosInclusos && plano.procedimentosInclusos.length > 0 ? `
                <div class="dashboard-categoria">
                    <h4><i class="fas fa-procedures"></i> Procedimentos</h4>
                    <div class="lista-servicos">
                        ${plano.procedimentosInclusos.map(proc => `
                            <div class="servico-item">
                                <span class="servico-nome">${proc.nome}</span>
                                ${proc.limite ? `
                                    <span class="servico-status disponivel">${proc.limite} disponíveis</span>
                                ` : `
                                    <span class="servico-status disponivel">Ilimitado</span>
                                `}
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
                
                <!-- Exames -->
                ${plano.examesInclusos && plano.examesInclusos.length > 0 ? `
                <div class="dashboard-categoria">
                    <h4><i class="fas fa-microscope"></i> Exames</h4>
                    <div class="lista-servicos">
                        ${plano.examesInclusos.map(exame => `
                            <div class="servico-item">
                                <span class="servico-nome">${exame.nome}</span>
                                ${exame.limite ? `
                                    <span class="servico-status disponivel">${exame.limite} disponíveis</span>
                                ` : `
                                    <span class="servico-status disponivel">Ilimitado</span>
                                `}
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
                
                <!-- Exames de Imagem -->
                ${plano.examesImagemInclusos && plano.examesImagemInclusos.length > 0 ? `
                <div class="dashboard-categoria">
                    <h4><i class="fas fa-x-ray"></i> Exames de Imagem</h4>
                    <div class="lista-servicos">
                        ${plano.examesImagemInclusos.map(exame => `
                            <div class="servico-item">
                                <span class="servico-nome">${exame.nome}</span>
                                ${exame.limite ? `
                                    <span class="servico-status disponivel">${exame.limite} disponíveis</span>
                                ` : `
                                    <span class="servico-status disponivel">Ilimitado</span>
                                `}
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
                
                <!-- Cirurgias -->
                ${plano.cirurgiasInclusas && plano.cirurgiasInclusas.length > 0 ? `
                <div class="dashboard-categoria">
                    <h4><i class="fas fa-scalpel"></i> Cirurgias</h4>
                    <div class="lista-servicos">
                        ${plano.cirurgiasInclusas.map(cirurgia => `
                            <div class="servico-item">
                                <span class="servico-nome">${cirurgia.nome}</span>
                                ${cirurgia.limite ? `
                                    <span class="servico-status disponivel">${cirurgia.limite} disponíveis</span>
                                ` : `
                                    <span class="servico-status disponivel">Ilimitado</span>
                                `}
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
            </div>
            
            <div class="observacoes-plano">
                <h4><i class="fas fa-info-circle"></i> Observações</h4>
                <p>${plano.consultas.observacoes || 'Nenhuma observação adicional.'}</p>
                ${plano.observacoes ? `<p>${plano.observacoes}</p>` : ''}
            </div>
        `;
        
        resumoPlano.style.display = 'block';
        resumoPlano.scrollIntoView({ behavior: 'smooth' });
    }
    
    // 8. Abrir modal para edição do pet
    function abrirModalPet(pet) {
        document.getElementById('titulo-modal-pet').textContent = `Editar ${pet.nome}`;
        document.getElementById('petId').value = pet.id;
        document.getElementById('nomePet').value = pet.nome;
        
        // Separar idade e tipo
        const idadeParts = pet.idade.split(' ');
        document.getElementById('idade').value = idadeParts[0];
        document.getElementById('idadeTipo').value = idadeParts[1];
        
        document.getElementById('sexo').value = pet.sexo;
        document.getElementById('castrado').value = pet.castrado;
        document.getElementById('especie').value = pet.especie;
        document.getElementById('raca').value = pet.raca;
        document.getElementById('pelagem').value = pet.pelagem || '';
        document.getElementById('cor').value = pet.cor || '';
        document.getElementById('doencaExistente').value = pet.doencaExistente;
        document.getElementById('aderiuPlano').checked = pet.aderiuPlano || false;
        document.getElementById('observacao').value = pet.observacao || '';
        
        // Mostrar/ocultar seção de plano
        const planoContainer = document.getElementById('planoPetContainer');
        planoContainer.style.display = pet.aderiuPlano ? 'block' : 'none';
        
        if (pet.aderiuPlano) {
            document.getElementById('planoPet').value = pet.planoPet || '';
            document.getElementById('dataAderiuPlano').value = pet.dataAderiuPlano || '';
        }
        
        modalPet.style.display = 'block';
    }
    
    // 9. Função para abrir modal de edição do tutor
    function abrirModalEditarTutor() {
        const tutor = carregarTutor();
        if (!tutor) return;
        
        // Preencher formulário com dados do tutor
        document.getElementById('tutorIdEditar').value = tutor.id;
        document.getElementById('nomeTutorEditar').value = tutor.nome || '';
        document.getElementById('cpfTutorEditar').value = tutor.cpf || '';
        document.getElementById('rgTutorEditar').value = tutor.rg || '';
        document.getElementById('telefoneTutorEditar').value = tutor.telefone || '';
        document.getElementById('emailTutorEditar').value = tutor.email || '';
        document.getElementById('dataCadastroTutorEditar').value = formatarData(tutor.dataCadastro);
        document.getElementById('cepTutorEditar').value = tutor.cep || '';
        document.getElementById('enderecoTutorEditar').value = tutor.endereco || '';
        document.getElementById('bairroTutorEditar').value = tutor.bairro || '';
        document.getElementById('cidadeTutorEditar').value = tutor.cidade || '';
        document.getElementById('comoConheceuEditar').value = tutor.comoConheceu || '';
        document.getElementById('nomeIndicacaoEditar').value = tutor.nomeIndicacao || '';
        document.getElementById('adesaoPlanoEditar').value = tutor.aderiuPlano ? 'sim' : 'nao';
        
        // Mostrar campo de indicação se necessário
        if (tutor.comoConheceu === 'indicacao') {
            document.getElementById('containerIndicacaoEditar').style.display = 'block';
        } else {
            document.getElementById('containerIndicacaoEditar').style.display = 'none';
        }
        
        modalTutor.style.display = 'block';
    }
    
    // 10. Função para mostrar/ocultar campo de indicação no modal de edição
    window.mostrarCampoIndicacaoEditar = function() {
        const comoConheceu = document.getElementById('comoConheceuEditar').value;
        document.getElementById('containerIndicacaoEditar').style.display = 
            comoConheceu === 'indicacao' ? 'block' : 'none';
    };
    
    // 11. Função para formatar data
    function formatarData(dataString) {
        if (!dataString) return 'N/A';
        
        try {
            const data = new Date(dataString);
            if (isNaN(data.getTime())) {
                return 'N/A';
            }
            
            const dia = data.getDate().toString().padStart(2, '0');
            const mes = (data.getMonth() + 1).toString().padStart(2, '0');
            const ano = data.getFullYear();
            return `${dia}/${mes}/${ano}`;
        } catch (e) {
            console.error('Erro ao formatar data:', e);
            return 'N/A';
        }
    }
    
    // 12. Configurar eventos
    botaoVoltar.addEventListener('click', () => {
        window.location.href = 'cadastrados.html';
    });
    
    // Evento do botão editar tutor
    btnEditarTutor.addEventListener('click', abrirModalEditarTutor);
    
    // Eventos do modal de pet
    closePetModal.addEventListener('click', () => {
        modalPet.style.display = 'none';
    });
    
    // Evento para checkbox de plano do pet
    document.getElementById('aderiuPlano').addEventListener('change', function() {
        const planoContainer = document.getElementById('planoPetContainer');
        planoContainer.style.display = this.checked ? 'block' : 'none';
        
        // Tornar campos obrigatórios ou não
        document.getElementById('planoPet').required = this.checked;
        document.getElementById('dataAderiuPlano').required = this.checked;
        
        // Preencher data atual se marcado
        if (this.checked) {
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('dataAderiuPlano').value = today;
        }
    });
    
    formPet.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const petId = document.getElementById('petId').value;
        const pets = JSON.parse(localStorage.getItem('pets')) || [];
        const petIndex = pets.findIndex(p => p.id === petId);
        
        if (petIndex !== -1) {
            const aderiuPlano = document.getElementById('aderiuPlano').checked;
            
            // Atualizar os dados do pet
            pets[petIndex] = {
                ...pets[petIndex],
                nome: document.getElementById('nomePet').value,
                idade: `${document.getElementById('idade').value} ${document.getElementById('idadeTipo').value}`,
                sexo: document.getElementById('sexo').value,
                castrado: document.getElementById('castrado').value,
                especie: document.getElementById('especie').value,
                raca: document.getElementById('raca').value,
                pelagem: document.getElementById('pelagem').value,
                cor: document.getElementById('cor').value,
                doencaExistente: document.getElementById('doencaExistente').value,
                observacao: document.getElementById('observacao').value,
                aderiuPlano: aderiuPlano,
                planoPet: aderiuPlano ? document.getElementById('planoPet').value : null,
                dataAderiuPlano: aderiuPlano ? document.getElementById('dataAderiuPlano').value : null
            };
            
            localStorage.setItem('pets', JSON.stringify(pets));
            exibirPets();
            modalPet.style.display = 'none';
            mostrarFeedback('Dados do pet atualizados com sucesso!', 'sucesso');
        }
    });
    
    btnExcluirPet.addEventListener('click', function() {
        if (confirm(`Tem certeza que deseja excluir este pet? Esta ação não pode ser desfeita.`)) {
            const petId = document.getElementById('petId').value;
            let pets = JSON.parse(localStorage.getItem('pets')) || [];
            pets = pets.filter(p => p.id !== petId);
            
            localStorage.setItem('pets', JSON.stringify(pets));
            exibirPets();
            modalPet.style.display = 'none';
            mostrarFeedback('Pet excluído com sucesso!', 'sucesso');
        }
    });
    
    // Eventos do modal de edição do tutor
    closeTutorModal.addEventListener('click', () => {
        modalTutor.style.display = 'none';
    });
    
    cancelarEdicaoTutor.addEventListener('click', () => {
        modalTutor.style.display = 'none';
    });
    
    formEditarTutor.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar campos obrigatórios
        const camposObrigatorios = ['nomeTutorEditar', 'cpfTutorEditar', 'telefoneTutorEditar', 'enderecoTutorEditar'];
        let valido = true;
        
        camposObrigatorios.forEach(id => {
            const campo = document.getElementById(id);
            if (!campo.value.trim()) {
                campo.style.borderColor = 'var(--cor-erro)';
                valido = false;
            } else {
                campo.style.borderColor = '';
            }
        });
        
        if (!valido) {
            mostrarFeedback('Preencha todos os campos obrigatórios!', 'erro');
            return;
        }
        
        const tutorId = document.getElementById('tutorIdEditar').value;
        let tutores = JSON.parse(localStorage.getItem('tutores')) || [];
        const tutorIndex = tutores.findIndex(t => t.id === tutorId);
        
        if (tutorIndex !== -1) {
            // Atualizar os dados do tutor
            tutores[tutorIndex] = {
                ...tutores[tutorIndex],
                nome: document.getElementById('nomeTutorEditar').value,
                cpf: document.getElementById('cpfTutorEditar').value,
                rg: document.getElementById('rgTutorEditar').value,
                telefone: document.getElementById('telefoneTutorEditar').value,
                email: document.getElementById('emailTutorEditar').value,
                cep: document.getElementById('cepTutorEditar').value,
                endereco: document.getElementById('enderecoTutorEditar').value,
                bairro: document.getElementById('bairroTutorEditar').value,
                cidade: document.getElementById('cidadeTutorEditar').value,
                comoConheceu: document.getElementById('comoConheceuEditar').value,
                nomeIndicacao: document.getElementById('comoConheceuEditar').value === 'indicacao' 
                    ? document.getElementById('nomeIndicacaoEditar').value 
                    : '',
                aderiuPlano: document.getElementById('adesaoPlanoEditar').value === 'sim',
                dataCadastro: tutores[tutorIndex].dataCadastro // Mantém a data original
            };
            
            localStorage.setItem('tutores', JSON.stringify(tutores));
            exibirDadosTutor();
            modalTutor.style.display = 'none';
            mostrarFeedback('Dados do tutor atualizados com sucesso!', 'sucesso');
        }
    });
    
    // Fechar modais ao clicar fora
    window.onclick = function(event) {
        if (event.target === modalPet) {
            modalPet.style.display = 'none';
        }
        if (event.target === modalTutor) {
            modalTutor.style.display = 'none';
        }
    };
    
    // Fechar modais com ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            modalPet.style.display = 'none';
            modalTutor.style.display = 'none';
        }
    });
    
    // 13. Função para mostrar feedback visual
    function mostrarFeedback(mensagem, tipo) {
        const feedback = document.createElement('div');
        feedback.textContent = mensagem;
        feedback.style.position = 'fixed';
        feedback.style.bottom = '20px';
        feedback.style.right = '20px';
        feedback.style.backgroundColor = tipo === 'sucesso' ? 'var(--cor-sucesso)' : 'var(--cor-erro)';
        feedback.style.color = 'white';
        feedback.style.padding = '12px 24px';
        feedback.style.borderRadius = '5px';
        feedback.style.zIndex = '1000';
        feedback.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        feedback.style.animation = 'fadeIn 0.3s ease-in-out';
        document.body.appendChild(feedback);

        setTimeout(() => {
            feedback.style.animation = 'fadeOut 0.5s ease-in-out';
            setTimeout(() => feedback.remove(), 500);
        }, 3000);
    }

    // 14. Inicializar a página
    exibirDadosTutor();
    exibirPets();
    
    // Adicionar estilos de animação dinamicamente
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(20px); }
        }
    `;
    document.head.appendChild(style);
});