document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // 1. INICIALIZAÇÃO E CARREGAMENTO DE DADOS
    // =============================================
    
    // Carrega todos os dados do localStorage
    const tutores = JSON.parse(localStorage.getItem('tutores')) || [];
    const pets = JSON.parse(localStorage.getItem('pets')) || [];
    const anamneses = JSON.parse(localStorage.getItem('anamneses')) || [];
    const planos = JSON.parse(localStorage.getItem('planos')) || [];
    
    // Elementos da DOM
    const filtroPlano = document.getElementById('filtro-plano');
    const listaTutores = document.getElementById('lista-tutores');
    const corpoTabelaTutores = document.getElementById('corpo-tabela-tutores');
    const botaoBuscar = document.getElementById('botao-buscar');
    
    // Verificação de segurança dos elementos DOM
    if (!filtroPlano || !listaTutores || !corpoTabelaTutores || !botaoBuscar) {
        console.error('Elementos essenciais não encontrados no DOM');
        return;
    }

    // =============================================
    // 2. FUNÇÃO PARA CARREGAR PLANOS NO SELECT
    // =============================================
    
    function carregarPlanos() {
        try {
            // Limpa opções existentes (exceto a primeira)
            filtroPlano.innerHTML = '<option value="">Selecione um plano</option>';
            
            // Adiciona os planos ao dropdown
            planos.forEach(plano => {
                const option = document.createElement('option');
                option.value = plano.id;
                option.textContent = `${plano.nome} (R$ ${plano.valorMensal.toFixed(2)})`;
                filtroPlano.appendChild(option);
            });
        } catch (error) {
            console.error('Erro ao carregar planos:', error);
        }
    }
    
    // =============================================
    // 3. FUNÇÃO PARA BUSCAR TUTORES POR PLANO
    // =============================================
    
    function buscarTutoresPorPlano(planoId) {
        try {
            // Mostra loading
            corpoTabelaTutores.innerHTML = '<tr><td colspan="5" class="loading-message"><div class="loading"></div> Carregando...</td></tr>';
            
            // Simula um delay para demonstração (remover em produção)
            setTimeout(() => {
                // Encontra o plano selecionado
                const planoSelecionado = planos.find(p => p.id === planoId);
                
                if (!planoSelecionado) {
                    console.error('Plano não encontrado:', planoId);
                    corpoTabelaTutores.innerHTML = '<tr><td colspan="5" class="sem-dados">Plano não encontrado</td></tr>';
                    return;
                }
                
                // Filtra tutores com este plano OU pets com este plano
                const tutoresFiltrados = tutores.filter(tutor => {
                    return tutor.planoId === planoId || 
                           pets.some(pet => pet.tutorId === tutor.id && pet.planoId === planoId);
                });
                
                // Limpa a tabela antes de preencher
                corpoTabelaTutores.innerHTML = '';
                
                if (tutoresFiltrados.length > 0) {
                    tutoresFiltrados.forEach(tutor => {
                        // Conta pets deste tutor no plano
                        const petsNoPlano = pets.filter(pet => 
                            pet.tutorId === tutor.id && 
                            (pet.planoId === planoId || tutor.planoId === planoId)
                        );
                        
                        // Formata data de vencimento
                        const dataVencimento = tutor.dataVencimentoPlano 
                            ? new Date(tutor.dataVencimentoPlano).toLocaleDateString('pt-BR') 
                            : 'Não informado';
                        
                        // Cria linha da tabela
                        const linha = document.createElement('tr');
                        linha.innerHTML = `
                            <td>${tutor.id.split('_')[1]}</td>
                            <td>
                                <span class="link-tutor" data-tutor-id="${tutor.id}" data-plano-id="${planoId}">
                                    ${tutor.nome}
                                </span>
                            </td>
                            <td>${tutor.telefone}</td>
                            <td>${petsNoPlano.length}</td>
                            <td>
                                <button class="botao-acao botao-visualizar" data-tutor-id="${tutor.id}" data-plano-id="${planoId}">
                                    <i class="fas fa-eye"></i> Ver
                                </button>
                            </td>
                        `;
                        corpoTabelaTutores.appendChild(linha);
                    });
                    
                    // Atualiza o título da página
                    document.querySelector('.container-principal h1').textContent = 
                        `Controle do Plano: ${planoSelecionado.nome}`;
                    
                    // Adiciona eventos aos links/botões após criação
                    adicionarEventosTutores();
                } else {
                    corpoTabelaTutores.innerHTML = '<tr><td colspan="5" class="sem-dados">Nenhum tutor encontrado para este plano</td></tr>';
                }
                
                // Mostra a tabela
                listaTutores.style.display = 'block';
            }, 500); // Delay simulado - remover em produção
        } catch (error) {
            console.error('Erro ao buscar tutores:', error);
            corpoTabelaTutores.innerHTML = '<tr><td colspan="5" class="erro">Erro ao carregar dados</td></tr>';
        }
    }
    
    // =============================================
    // 4. FUNÇÃO PARA ADICIONAR EVENTOS AOS TUTORES
    // =============================================
    
    function adicionarEventosTutores() {
        document.querySelectorAll('.link-tutor, .botao-visualizar').forEach(elemento => {
            elemento.addEventListener('click', function() {
                const tutorId = this.getAttribute('data-tutor-id');
                const planoId = this.getAttribute('data-plano-id');
                abrirDetalhesTutor(tutorId, planoId);
            });
        });
    }
    
    // =============================================
    // 5. FUNÇÃO PARA ABRIR DETALHES DO TUTOR (MODAL)
    // =============================================
    
    window.abrirDetalhesTutor = function(tutorId, planoId) {
        try {
            const tutor = tutores.find(t => t.id === tutorId);
            const plano = planos.find(p => p.id === planoId);
            
            if (!tutor || !plano) {
                console.error('Tutor ou plano não encontrado');
                return;
            }
            
            const modal = document.getElementById('modal-tutor');
            
            // Preenche informações básicas do tutor
            document.getElementById('nome-tutor-modal').textContent = tutor.nome;
            document.getElementById('contato-tutor-modal').innerHTML = `
                <i class="fas fa-phone"></i> ${tutor.telefone}<br>
                <i class="fas fa-envelope"></i> ${tutor.email || 'Não informado'}<br>
                <i class="fas fa-map-marker-alt"></i> ${tutor.endereco || 'Não informado'}
            `;
            document.getElementById('titulo-modal').textContent = `Detalhes do Tutor - Plano ${plano.nome}`;
            
            // Lista os pets no plano
            const listaPets = document.getElementById('lista-pets-plano');
            listaPets.innerHTML = '';
            
            const petsNoPlano = pets.filter(pet => 
                pet.tutorId === tutorId && 
                (pet.planoId === planoId || tutor.planoId === planoId)
            );
            
            if (petsNoPlano.length > 0) {
                petsNoPlano.forEach(pet => {
                    const item = document.createElement('li');
                    item.innerHTML = `
                        <div class="pet-info">
                            <strong>${pet.nome}</strong>
                            <span class="pet-details">
                                ${pet.raca || 'SRD'} | ${pet.especie} | ${pet.idade}
                            </span>
                        </div>
                        <div class="pet-extra">
                            <span class="pet-peso">${pet.peso} kg</span>
                            <span class="pet-sexo ${pet.sexo.toLowerCase()}">${pet.sexo}</span>
                        </div>
                    `;
                    listaPets.appendChild(item);
                });
            } else {
                listaPets.innerHTML = '<li class="sem-dados"><i class="fas fa-paw"></i> Nenhum pet encontrado neste plano</li>';
            }
            
            // Preenche a tabela de procedimentos
            const corpoProcedimentos = document.getElementById('corpo-tabela-procedimentos');
            corpoProcedimentos.innerHTML = '';
            
            // Filtra anamneses para pets deste tutor no plano selecionado
            const petIdsNoPlano = petsNoPlano.map(pet => pet.id);
            const procedimentos = anamneses.filter(a => petIdsNoPlano.includes(a.petId));
            
            if (procedimentos.length > 0) {
                procedimentos.sort((a, b) => new Date(b.dataAtendimento) - new Date(a.dataAtendimento));
                
                procedimentos.forEach(proc => {
                    const pet = pets.find(p => p.id === proc.petId);
                    const linha = document.createElement('tr');
                    
                    // Determina o tipo e status
                    let tipo = proc.tipoAtendimento === 'consulta_plano' 
                        ? `<i class="fas fa-check-circle"></i> Coberto` 
                        : `<i class="fas fa-money-bill-wave"></i> Particular`;
                    
                    let status = proc.status === 'concluido' 
                        ? `<span class="status-plano status-ativo"><i class="fas fa-check"></i> Concluído</span>`
                        : `<span class="status-plano status-pendente"><i class="fas fa-clock"></i> Pendente</span>`;
                    
                    linha.innerHTML = `
                        <td>${pet?.nome || 'Pet não encontrado'}</td>
                        <td>${new Date(proc.dataAtendimento).toLocaleDateString('pt-BR')}</td>
                        <td>${proc.queixaPrincipal || 'Consulta de rotina'}</td>
                        <td class="${proc.tipoAtendimento === 'consulta_plano' ? 'td-coberto' : 'td-particular'}">
                            ${tipo}
                        </td>
                        <td>${status}</td>
                    `;
                    corpoProcedimentos.appendChild(linha);
                });
            } else {
                corpoProcedimentos.innerHTML = `
                    <tr>
                        <td colspan="5" class="sem-dados">
                            <i class="fas fa-info-circle"></i> Nenhum procedimento registrado
                        </td>
                    </tr>
                `;
            }
            
            // Adiciona informações sobre o plano
            const infoPlanoExistente = modal.querySelector('.info-plano');
            if (infoPlanoExistente) {
                infoPlanoExistente.remove();
            }
            
            const infoPlano = document.createElement('div');
            infoPlano.className = 'info-plano';
            infoPlano.innerHTML = `
                <h3><i class="fas fa-heart"></i> Benefícios do Plano ${plano.nome}</h3>
                <ul>
                    ${plano.beneficios.map(b => `<li><i class="fas fa-check"></i> ${b}</li>`).join('')}
                </ul>
                <div class="detalhes-plano">
                    <p><strong><i class="fas fa-tag"></i> Valor mensal:</strong> R$ ${plano.valorMensal.toFixed(2).replace('.', ',')}</p>
                    <p><strong><i class="fas fa-calendar-check"></i> Status:</strong> 
                        <span class="status-plano status-${tutor.statusPlano || 'ativo'}">
                            ${tutor.statusPlano || 'ativo'}
                        </span>
                    </p>
                    <p><strong><i class="fas fa-calendar-times"></i> Vencimento:</strong> 
                        ${tutor.dataVencimentoPlano ? new Date(tutor.dataVencimentoPlano).toLocaleDateString('pt-BR') : 'Não informado'}
                    </p>
                </div>
            `;
            
            // Insere antes da tabela de procedimentos
            const historicoSection = document.querySelector('.historico-procedimentos');
            historicoSection.insertBefore(infoPlano, historicoSection.firstChild);
            
            // Exibe o modal
            modal.style.display = 'block';
        } catch (error) {
            console.error('Erro ao abrir detalhes do tutor:', error);
            alert('Ocorreu um erro ao carregar os detalhes do tutor');
        }
    };
    
    // =============================================
    // 6. CONFIGURAÇÃO DE EVENTOS
    // =============================================
    
    // Evento de busca
    botaoBuscar.addEventListener('click', function() {
        const planoId = filtroPlano.value;
        if (planoId) {
            buscarTutoresPorPlano(planoId);
        } else {
            alert('Por favor, selecione um plano de saúde');
        }
    });
    
    // Fechar modal
    document.querySelector('.fechar-modal').addEventListener('click', function() {
        document.getElementById('modal-tutor').style.display = 'none';
    });
    
    // Fechar modal ao clicar fora
    window.addEventListener('click', function(event) {
        if (event.target === document.getElementById('modal-tutor')) {
            document.getElementById('modal-tutor').style.display = 'none';
        }
    });
    
    // Carrega os planos ao iniciar
    carregarPlanos();
    
    // =============================================
    // 7. FUNCIONALIDADES EXISTENTES (VACINAÇÃO)
    // =============================================
    
    // Função para verificar status de vacinação (mantida da versão anterior)
    function verificarStatusVacina(dataVacina) {
        try {
            const hoje = new Date();
            const dataVencimento = new Date(dataVacina);
            dataVencimento.setFullYear(dataVencimento.getFullYear() + 1);
            
            const umMesAntes = new Date(dataVencimento);
            umMesAntes.setMonth(umMesAntes.getMonth() - 1);
            
            if (hoje > dataVencimento) {
                return { status: 'vencido', classe: 'vencido' };
            } else if (hoje > umMesAntes) {
                return { status: 'proximo', classe: 'proximo' };
            } else {
                return { status: 'ok', classe: 'ok' };
            }
        } catch (error) {
            console.error('Erro ao verificar status da vacina:', error);
            return { status: 'erro', classe: 'erro' };
        }
    }
    
    console.log('Sistema de planos de saúde inicializado com sucesso!');
});