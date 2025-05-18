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
            alert('Erro ao carregar a lista de planos');
        }
    }
    
    // =============================================
    // 3. FUNÇÃO PARA BUSCAR TUTORES POR PLANO
    // =============================================
    
    function buscarTutoresPorPlano(planoId) {
        try {
            // Mostra loading
            corpoTabelaTutores.innerHTML = '<tr><td colspan="5" class="loading-message"><div class="loading"></div> Carregando...</td></tr>';
            listaTutores.style.display = 'block';
            
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
    // 5. FUNÇÃO PARA OBTER LIMITES DO PLANO
    // =============================================
    
    function obterLimitesPlano(planoId) {
        const limites = {
            consultas: 4,
            retornos: 2,
            drenagem: 1,
            abdominocentese: 1,
            curativos: 5,
            uso_sala: 2,
            hemogramas: 2,
            reiki: 4,
            cristal: 4,
            acupuntura: 4,
            florais: 4
        };

        // Ajusta os limites conforme o tipo de plano
        switch(planoId) {
            case 'plano_1': // Básico
                limites.consultas = 2;
                limites.retornos = 2;
                limites.drenagem = 0;
                limites.abdominocentese = 0;
                limites.hemogramas = 0;
                break;
            case 'plano_2': // Intermediário
                limites.consultas = 4;
                limites.retornos = 3;
                limites.hemogramas = 1;
                break;
            case 'plano_3': // Premium
                limites.consultas = 6;
                limites.retornos = 4;
                limites.hemogramas = 2;
                break;
            case 'plano_4': // Super Premium
                limites.consultas = 999; // Ilimitado
                limites.retornos = 999;
                limites.hemogramas = 999;
                break;
            case 'plano_5': // Silvestres
                limites.consultas = 3;
                limites.retornos = 2;
                break;
        }

        return limites;
    }

    // =============================================
    // 6. FUNÇÃO PARA PREENCHER TABELAS ADICIONAIS
    // =============================================
    
    function preencherTabelasAdicionais(tutorId, planoId) {
        try {
            const tutor = tutores.find(t => t.id === tutorId);
            const plano = planos.find(p => p.id === planoId);
            const petsNoPlano = pets.filter(pet => pet.tutorId === tutorId && (pet.planoId === planoId || tutor.planoId === planoId));
            const anoAtual = new Date().getFullYear();
            const limites = obterLimitesPlano(planoId);

            // Preenche informações do plano
            const infoPlanoContainer = document.querySelector('.info-plano-container');
            infoPlanoContainer.innerHTML = `
                <h3><i class="fas fa-info-circle"></i> Detalhes do Plano ${plano.nome}</h3>
                <p>${plano.descricao}</p>
                <div class="detalhes-plano">
                    <p><strong><i class="fas fa-tag"></i> Valor:</strong> R$ ${plano.valorMensal.toFixed(2)}/mês</p>
                    <p><strong><i class="fas fa-calendar-alt"></i> Status:</strong> 
                        <span class="status-plano status-${tutor.statusPlano || 'ativo'}">
                            ${tutor.statusPlano || 'ativo'}
                        </span>
                    </p>
                    <p><strong><i class="fas fa-calendar-times"></i> Vencimento:</strong> 
                        ${tutor.dataVencimentoPlano ? new Date(tutor.dataVencimentoPlano).toLocaleDateString('pt-BR') : 'Não informado'}
                    </p>
                </div>
            `;

            // Tabela de consultas disponíveis
            const tabelaConsultas = document.getElementById('tabela-consultas');
            tabelaConsultas.innerHTML = petsNoPlano.map(pet => {
                const consultasPet = anamneses.filter(a => a.petId === pet.id && a.tipoAtendimento.includes('consulta'));
                const consultasAno = consultasPet.filter(c => new Date(c.dataAtendimento).getFullYear() === anoAtual);
                const retornosAno = consultasAno.filter(c => c.queixaPrincipal && c.queixaPrincipal.includes('retorno'));
                
                const saldoConsultas = limites.consultas - consultasAno.length;
                const saldoRetornos = limites.retornos - retornosAno.length;

                return `
                    <tr>
                        <td>${pet.nome}</td>
                        <td>${anoAtual}</td>
                        <td>${limites.consultas}</td>
                        <td>${consultasAno.length}</td>
                        <td>${limites.retornos}</td>
                        <td>${retornosAno.length}</td>
                        <td class="${saldoConsultas < 1 ? 'texto-alerta' : ''}">
                            ${saldoConsultas} consulta(s), ${saldoRetornos} retorno(s)
                        </td>
                    </tr>
                `;
            }).join('');

            // Tabela de vacinas
            const tabelaVacinas = document.getElementById('tabela-vacinas');
            tabelaVacinas.innerHTML = petsNoPlano.map(pet => {
                const historicoPet = pet.historico || [];
                const vacinas = {
                    v10: historicoPet.some(h => h.vacina && h.vacina.includes('V10')),
                    antirabica: historicoPet.some(h => h.vacina && h.vacina.includes('Raiva')),
                    v8: historicoPet.some(h => h.vacina && h.vacina.includes('V8')),
                    microchip: historicoPet.some(h => h.procedimento && h.procedimento.includes('Microchip')),
                    vermifugo: historicoPet.some(h => h.vermifugo)
                };

                return `
                    <tr>
                        <td>${pet.nome}</td>
                        <td>${vacinas.v10 ? '<i class="fas fa-check"></i>' : '<i class="fas fa-times"></i>'}</td>
                        <td>${vacinas.antirabica ? '<i class="fas fa-check"></i>' : '<i class="fas fa-times"></i>'}</td>
                        <td>${vacinas.v8 ? '<i class="fas fa-check"></i>' : '<i class="fas fa-times"></i>'}</td>
                        <td>${vacinas.microchip ? '<i class="fas fa-check"></i>' : '<i class="fas fa-times"></i>'}</td>
                        <td>${vacinas.vermifugo ? '<i class="fas fa-check"></i>' : '<i class="fas fa-times"></i>'}</td>
                    </tr>
                `;
            }).join('');

            // Tabela de tratamentos integrativos
            const tabelaTratamentos = document.getElementById('tabela-tratamentos');
            tabelaTratamentos.innerHTML = petsNoPlano.map(pet => {
                const historicoAno = anamneses.filter(a => 
                    a.petId === pet.id && 
                    new Date(a.dataAtendimento).getFullYear() === anoAtual
                );
                
                const tratamentos = {
                    reiki: historicoAno.filter(h => h.observacoes && h.observacoes.includes('Reiki')).length,
                    cristal: historicoAno.filter(h => h.observacoes && h.observacoes.includes('Cristal')).length,
                    acupuntura: historicoAno.filter(h => h.observacoes && h.observacoes.includes('Acupuntura')).length,
                    florais: historicoAno.filter(h => h.observacoes && h.observacoes.includes('Florais')).length
                };

                return `
                    <tr>
                        <td>${pet.nome}</td>
                        <td>${tratamentos.reiki}/${limites.reiki}</td>
                        <td>${tratamentos.cristal}/${limites.cristal}</td>
                        <td>${tratamentos.acupuntura}/${limites.acupuntura}</td>
                        <td>${tratamentos.florais}/${limites.florais}</td>
                    </tr>
                `;
            }).join('');

            // Tabela de procedimentos especiais
            const tabelaProcedimentosEspeciais = document.getElementById('tabela-procedimentos-especiais');
            tabelaProcedimentosEspeciais.innerHTML = petsNoPlano.map(pet => {
                const historicoAno = anamneses.filter(a => 
                    a.petId === pet.id && 
                    new Date(a.dataAtendimento).getFullYear() === anoAtual
                );
                
                const procedimentos = {
                    drenagem: historicoAno.filter(h => h.procedimento && h.procedimento.includes('Drenagem')).length,
                    abdominocentese: historicoAno.filter(h => h.procedimento && h.procedimento.includes('Abdominocentese')).length,
                    curativos: historicoAno.filter(h => h.procedimento && h.procedimento.includes('Curativo')).length,
                    usoSala: historicoAno.filter(h => h.procedimento && h.procedimento.includes('Sala')).length,
                    hemogramas: historicoAno.filter(h => h.exames && h.exames.includes('Hemograma')).length
                };

                return `
                    <tr>
                        <td>${pet.nome}</td>
                        <td>${procedimentos.drenagem}/${limites.drenagem}</td>
                        <td>${procedimentos.abdominocentese}/${limites.abdominocentese}</td>
                        <td>${procedimentos.curativos}/${limites.curativos}</td>
                        <td>${procedimentos.usoSala}/${limites.uso_sala}</td>
                        <td>${procedimentos.hemogramas}/${limites.hemogramas}</td>
                    </tr>
                `;
            }).join('');

        } catch (error) {
            console.error('Erro ao preencher tabelas adicionais:', error);
            alert('Ocorreu um erro ao carregar os detalhes adicionais');
        }
    }

    // =============================================
    // 7. FUNÇÃO PARA ABRIR DETALHES DO TUTOR (MODAL)
    // =============================================
    
    window.abrirDetalhesTutor = function(tutorId, planoId) {
        try {
            const tutor = tutores.find(t => t.id === tutorId);
            const plano = planos.find(p => p.id === planoId);
            
            if (!tutor || !plano) {
                console.error('Tutor ou plano não encontrado');
                alert('Tutor ou plano não encontrado');
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
            
            // Preenche a tabela de procedimentos históricos
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
            
            // Preenche todas as tabelas adicionais
            preencherTabelasAdicionais(tutorId, planoId);
            
            // Exibe o modal
            modal.style.display = 'block';

        } catch (error) {
            console.error('Erro ao abrir detalhes do tutor:', error);
            alert('Ocorreu um erro ao carregar os detalhes do tutor');
        }
    };
    
    // =============================================
    // 8. CONFIGURAÇÃO DE EVENTOS
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
    // 9. FUNCIONALIDADES EXISTENTES (VACINAÇÃO)
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