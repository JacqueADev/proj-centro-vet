// DEBUG: Verifica os dados no localStorage
console.log('Dados carregados do localStorage:', JSON.parse(localStorage.getItem('planosServicos')));
console.log('Dados completos carregados:', JSON.parse(localStorage.getItem('planosServicos')));

document.addEventListener("DOMContentLoaded", function() {
    console.log("Anamnese script carregado!");

    // Acessa os dados globais dos arquivos importados
    const servicosAvulsosGlobal = window.servicosAvulsos || { atendimentos: [] };
    const tiposDePlanos = window.tiposDePlanos || [];


    // Variável para armazenar anexos temporários antes do envio
    let anexosTemporarios = [];

    // Função para formatar valores como moeda (R$ 0,00)
    const formatarMoeda = (valor) => {
        return 'R$ ' + valor.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
    };

    // Função para obter preço de serviço avulso
const obterPrecoServico = (servicoId) => {
    try {
        const dados = window.planosServicos || JSON.parse(localStorage.getItem('planosServicos'));
        if (dados && dados.servicosAvulsos && dados.servicosAvulsos.atendimentos) {
            const servico = dados.servicosAvulsos.atendimentos.find(s => s.id === servicoId);
            return servico ? servico.valor : 0;
        }
    } catch (e) {
        console.error('Erro ao obter preço:', e);
    }
    return 0;
};

// Função para carregar exames avulsos organizados por categoria
const carregarExamesAvulsos = () => {
    const container = document.getElementById('container-exames-avulsos');
    
    if (!container) {
        console.error('Erro: Elemento #container-exames-avulsos não encontrado');
        return;
    }

    container.innerHTML = '<div class="loading-exames"><i class="fas fa-spinner fa-spin"></i> Carregando exames...</div>';

    try {
        const dados = window.planosServicos || JSON.parse(localStorage.getItem('planosServicos')) || { servicosAvulsos: { exames: [] } };

        console.log('Dados completos carregados:', dados); // Debug

        // CORREÇÃO PRINCIPAL: Acessa exames diretamente em servicosAvulsos.exames
        if (!dados.servicosAvulsos?.exames || !Array.isArray(dados.servicosAvulsos.exames)) {
            throw new Error('Estrutura de exames inválida - servicosAvulsos.exames não encontrado ou não é array');
        }

        const exames = dados.servicosAvulsos.exames;

        console.log('Total de exames encontrados:', exames.length); // Debug

        if (exames.length === 0) {
            container.innerHTML = '<div class="no-exams"><i class="fas fa-info-circle"></i> Nenhum exame cadastrado no sistema</div>';
            return;
        }

        // Agrupa exames por categoria (usando a propriedade categoria ou padrão)
        const examesPorCategoria = exames.reduce((acc, exame) => {
            const categoria = exame.categoria || 'outros_exames';
            if (!acc[categoria]) {
                acc[categoria] = [];
            }
            acc[categoria].push(exame);
            return acc;
        }, {});

        console.log('Exames agrupados por categoria:', examesPorCategoria); // Debug

        container.innerHTML = '';

        // Renderiza as categorias e exames
        Object.entries(examesPorCategoria).forEach(([categoria, exames]) => {
            const categoriaDiv = document.createElement('div');
            categoriaDiv.className = 'exame-categoria';
            
            const tituloCategoria = document.createElement('h4');
            tituloCategoria.innerHTML = `
                <i class="fas fa-folder-open"></i>
                ${categoria.replace('exame_', '').replace(/_/g, ' ').toUpperCase()}
            `;
            categoriaDiv.appendChild(tituloCategoria);
            
            const examesLista = document.createElement('div');
            examesLista.className = 'exames-checkbox';
            
            exames.forEach(exame => {
                const exameId = `exame_${exame.id}`;
                const label = document.createElement('label');
                label.className = 'exame-item';
                
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.name = 'examesAvulsos';
                checkbox.value = exame.id;
                checkbox.id = exameId;
                checkbox.dataset.valor = exame.valor || 0;
                checkbox.addEventListener('change', atualizarResumoFinanceiro);
                
                const exameDesc = document.createElement('span');
                exameDesc.className = 'exame-descricao';
                const valorFormatado = exame.valor === 0 ? 'Grátis' : formatarMoeda(exame.valor);
                exameDesc.innerHTML = `
                    <strong>${exame.nome}</strong>
                    <span class="exame-valor">${valorFormatado}</span>
                    ${exame.descricao ? `<small>${exame.descricao}</small>` : ''}
                `;
                
                label.appendChild(checkbox);
                label.appendChild(exameDesc);
                examesLista.appendChild(label);
            });
            
            categoriaDiv.appendChild(examesLista);
            container.appendChild(categoriaDiv);
        });

    } catch (error) {
        console.error('Erro ao carregar exames:', error);
        container.innerHTML = `
            <div class="error-loading-exames">
                <i class="fas fa-exclamation-triangle"></i>
                <h4>Erro ao carregar exames</h4>
                <p>${error.message}</p>
                <button onclick="carregarExamesAvulsos()" class="btn-reload">
                    <i class="fas fa-sync-alt"></i> Tentar novamente
                </button>
            </div>
        `;
    }
};
    // Função para verificar se o pet tem plano de saúde (atualizada)
  const verificarPlanoPet = (petId) => {
    const pets = JSON.parse(localStorage.getItem('pets')) || [];
    const pet = pets.find(p => p.id === petId);
    
    // Verifica primeiro pelo planoId (mais recente) e depois pelo planoPet (mais antigo)
    if (pet) {
        if (pet.planoId) {
            return pet.planoId;
        } else if (pet.planoPet) {
            // Se não tiver planoId mas tiver planoPet, tenta encontrar o ID correspondente
            const planosServicos = JSON.parse(localStorage.getItem('planosServicos')) || { planos: [] };
            const plano = planosServicos.planos.find(p => p.nome === pet.planoPet);
            return plano ? plano.id : null;
        }
    }
    return null;
};

    // Função para obter os detalhes do plano
    const obterDetalhesPlano = (planoId) => {
        const planosServicos = JSON.parse(localStorage.getItem('planosServicos')) || { planos: [] };
        return planosServicos.planos.find(plano => plano.id === planoId) || null;
    };

    // Função para obter o histórico de uso do plano pelo pet
    const obterHistoricoUsoPlano = (petId) => {
        const anamneses = JSON.parse(localStorage.getItem('anamneses')) || [];
        const historicoPet = anamneses.filter(a => a.petId === petId && a.tipoAtendimento === 'consulta_plano');
        
        // Calcular exames utilizados
        const examesUtilizados = {};
        historicoPet.forEach(anamnese => {
            if (anamnese.exames) {
                anamnese.exames.forEach(exame => {
                    examesUtilizados[exame.nome] = (examesUtilizados[exame.nome] || 0) + 1;
                });
            }
        });
        
        return {
            consultasUtilizadas: historicoPet.length,
            examesUtilizados: examesUtilizados,
            ultimaConsulta: historicoPet.length > 0 ? 
                historicoPet[historicoPet.length - 1].dataAtendimento : null
        };
    };


 // Função para mostrar informações do plano (atualizada com todos os serviços detalhados)
const mostrarInformacoesPlano = (petId) => {
    const planoContainer = document.getElementById('plano-info');
    const semPlanoDiv = planoContainer.querySelector('.sem-plano');
    const comPlanoDiv = planoContainer.querySelector('.com-plano');
    
    const planoId = verificarPlanoPet(petId);
    
    if (!planoId) {
        semPlanoDiv.style.display = 'block';
        comPlanoDiv.style.display = 'none';
        return;
    }
    
    semPlanoDiv.style.display = 'none';
    comPlanoDiv.style.display = 'block';
    
    const plano = obterDetalhesPlano(planoId);
    const historicoUso = obterHistoricoUsoPlano(petId);
    
    if (!plano) {
        semPlanoDiv.style.display = 'block';
        comPlanoDiv.style.display = 'none';
        return;
    }
    
    // Função auxiliar para verificar se um serviço está esgotado
    const isServicoEsgotado = (servico, usado = 0) => {
        return servico.limite !== null && usado >= servico.limite;
    };

    // Preenche informações básicas do plano
    document.getElementById('plano-nome').textContent = plano.nome;
    document.getElementById('consultas-inclusas').textContent = plano.consultas.inclusas;
    document.getElementById('consultas-utilizadas').textContent = historicoUso.consultasUtilizadas;
    
    const consultasRestantes = plano.consultas.inclusas - historicoUso.consultasUtilizadas;
    document.getElementById('consultas-restantes').textContent = consultasRestantes;
    
    // Calcula próxima consulta disponível
    if (historicoUso.ultimaConsulta) {
        const ultimaData = new Date(historicoUso.ultimaConsulta);
        ultimaData.setDate(ultimaData.getDate() + plano.consultas.intervaloMinimo);
        document.getElementById('proxima-consulta').textContent = ultimaData.toLocaleDateString();
    } else {
        document.getElementById('proxima-consulta').textContent = "Imediatamente";
    }
    
    // Preenche benefícios do plano
    const listaBeneficios = document.getElementById('lista-beneficios');
    listaBeneficios.innerHTML = '';
    
    // Adiciona consultas
    const consultasEsgotadas = historicoUso.consultasUtilizadas >= plano.consultas.inclusas;
    const consultasItem = document.createElement('li');
    consultasItem.innerHTML = `
        <span class="${consultasEsgotadas ? 'beneficio-esgotado' : ''}">
            ${plano.consultas.inclusas} Consultas anuais
        </span>
        <span class="beneficio-limite ${consultasEsgotadas ? 'esgotado' : ''}">
            (${historicoUso.consultasUtilizadas} utilizadas)
            ${consultasEsgotadas ? ' - ESGOTADO' : ''}
        </span>
    `;
    listaBeneficios.appendChild(consultasItem);
    
    // Adiciona tipos de consulta disponíveis
    if (plano.consultas.tipos && plano.consultas.tipos.length > 0) {
        const tiposConsultaItem = document.createElement('li');
        tiposConsultaItem.className = 'subitem';
        tiposConsultaItem.innerHTML = '<strong>Tipos de Consulta:</strong>';
        
        const tiposLista = document.createElement('ul');
        tiposLista.className = 'sublista';
        
        plano.consultas.tipos.forEach(tipo => {
            const tipoItem = document.createElement('li');
            tipoItem.innerHTML = `
                <span>${tipo.nome}</span>
                <span class="beneficio-limite">
                    ${tipo.carencia ? `(Carencia: ${tipo.carencia} dias)` : '(Sem carência)'}
                </span>
            `;
            tiposLista.appendChild(tipoItem);
        });
        
        tiposConsultaItem.appendChild(tiposLista);
        listaBeneficios.appendChild(tiposConsultaItem);
    }
    
    // Adiciona vacinas detalhadas
    if (plano.vacinas && plano.vacinas.length > 0) {
        const vacinasHeader = document.createElement('li');
        vacinasHeader.innerHTML = '<strong>Vacinas Inclusas:</strong>';
        listaBeneficios.appendChild(vacinasHeader);
        
        const vacinasLista = document.createElement('ul');
        vacinasLista.className = 'sublista';
        
        plano.vacinas.forEach(vacina => {
            const vacinaItem = document.createElement('li');
            vacinaItem.innerHTML = `
                <span>${vacina.nome}</span>
                <span class="beneficio-limite">
                    ${vacina.carencia ? `(Carencia: ${vacina.carencia} dias)` : '(Sem carência)'}
                </span>
            `;
            vacinasLista.appendChild(vacinaItem);
        });
        
        listaBeneficios.appendChild(vacinasLista);
    }
    
    // Adiciona exames detalhados
    if (plano.examesInclusos && plano.examesInclusos.length > 0) {
        const examesHeader = document.createElement('li');
        examesHeader.innerHTML = '<strong>Exames Inclusos:</strong>';
        listaBeneficios.appendChild(examesHeader);
        
        const examesLista = document.createElement('ul');
        examesLista.className = 'sublista';
        
        plano.examesInclusos.forEach(exame => {
            const usado = historicoUso.examesUtilizados[exame.nome] || 0;
            const esgotado = isServicoEsgotado(exame, usado);
            
            const exameItem = document.createElement('li');
            exameItem.innerHTML = `
                <span class="${esgotado ? 'beneficio-esgotado' : ''}">${exame.nome}</span>
                <span class="beneficio-limite ${esgotado ? 'esgotado' : ''}">
                    ${usado}/${exame.limite || 'ilimitado'} 
                    ${exame.carencia ? `(Carencia: ${exame.carencia} dias)` : ''}
                    ${esgotado ? ' - ESGOTADO' : ''}
                </span>
            `;
            examesLista.appendChild(exameItem);
        });
        
        listaBeneficios.appendChild(examesLista);
    }
    
    // Adiciona exames de imagem detalhados
    if (plano.examesImagemInclusos && plano.examesImagemInclusos.length > 0) {
        const examesImgHeader = document.createElement('li');
        examesImgHeader.innerHTML = '<strong>Exames de Imagem Inclusos:</strong>';
        listaBeneficios.appendChild(examesImgHeader);
        
        const examesImgLista = document.createElement('ul');
        examesImgLista.className = 'sublista';
        
        plano.examesImagemInclusos.forEach(exame => {
            const esgotado = isServicoEsgotado(exame);
            
            const exameItem = document.createElement('li');
            exameItem.innerHTML = `
                <span class="${esgotado ? 'beneficio-esgotado' : ''}">${exame.nome}</span>
                <span class="beneficio-limite ${esgotado ? 'esgotado' : ''}">
                    ${exame.limite ? `Limite: ${exame.limite}` : 'Ilimitado'} 
                    ${exame.carencia ? `(Carencia: ${exame.carencia} dias)` : ''}
                    ${esgotado ? ' - ESGOTADO' : ''}
                </span>
            `;
            examesImgLista.appendChild(exameItem);
        });
        
        listaBeneficios.appendChild(examesImgLista);
    }
    
    // Adiciona procedimentos detalhados
    if (plano.procedimentosInclusos && plano.procedimentosInclusos.length > 0) {
        const procedimentosHeader = document.createElement('li');
        procedimentosHeader.innerHTML = '<strong>Procedimentos Inclusos:</strong>';
        listaBeneficios.appendChild(procedimentosHeader);
        
        const procedimentosLista = document.createElement('ul');
        procedimentosLista.className = 'sublista';
        
        plano.procedimentosInclusos.forEach(proc => {
            const esgotado = isServicoEsgotado(proc);
            
            const procItem = document.createElement('li');
            procItem.innerHTML = `
                <span class="${esgotado ? 'beneficio-esgotado' : ''}">${proc.nome}</span>
                <span class="beneficio-limite ${esgotado ? 'esgotado' : ''}">
                    ${proc.limite ? `Limite: ${proc.limite}` : 'Ilimitado'} 
                    ${proc.carencia ? `(Carencia: ${proc.carencia} dias)` : ''}
                    ${esgotado ? ' - ESGOTADO' : ''}
                </span>
            `;
            procedimentosLista.appendChild(procItem);
        });
        
        listaBeneficios.appendChild(procedimentosLista);
    }
    
    // Adiciona anestesias detalhadas
    if (plano.anestesiasInclusas && plano.anestesiasInclusas.length > 0) {
        const anestesiasHeader = document.createElement('li');
        anestesiasHeader.innerHTML = '<strong>Anestesias Inclusas:</strong>';
        listaBeneficios.appendChild(anestesiasHeader);
        
        const anestesiasLista = document.createElement('ul');
        anestesiasLista.className = 'sublista';
        
        plano.anestesiasInclusas.forEach(anestesia => {
            const esgotado = isServicoEsgotado(anestesia);
            
            const anestesiaItem = document.createElement('li');
            anestesiaItem.innerHTML = `
                <span class="${esgotado ? 'beneficio-esgotado' : ''}">${anestesia.nome}</span>
                <span class="beneficio-limite ${esgotado ? 'esgotado' : ''}">
                    ${anestesia.limite ? `Limite: ${anestesia.limite}` : 'Ilimitado'} 
                    ${anestesia.carencia ? `(Carencia: ${anestesia.carencia} dias)` : ''}
                    ${esgotado ? ' - ESGOTADO' : ''}
                </span>
            `;
            anestesiasLista.appendChild(anestesiaItem);
        });
        
        listaBeneficios.appendChild(anestesiasLista);
    }
    
    // Adiciona cirurgias detalhadas
    if (plano.cirurgiasInclusas && plano.cirurgiasInclusas.length > 0) {
        const cirurgiasHeader = document.createElement('li');
        cirurgiasHeader.innerHTML = '<strong>Cirurgias Inclusas:</strong>';
        listaBeneficios.appendChild(cirurgiasHeader);
        
        const cirurgiasLista = document.createElement('ul');
        cirurgiasLista.className = 'sublista';
        
        // Agrupa cirurgias por categoria
        const cirurgiasPorCategoria = {};
        plano.cirurgiasInclusas.forEach(cirurgia => {
            const categoria = cirurgia.nome.split(' ')[0] === 'Taxa' ? 'Taxas' : 
                            cirurgia.nome.includes('Porte') ? 'Por Porte' : 'Outras';
            
            if (!cirurgiasPorCategoria[categoria]) {
                cirurgiasPorCategoria[categoria] = [];
            }
            cirurgiasPorCategoria[categoria].push(cirurgia);
        });
        
        // Adiciona cirurgias agrupadas
        Object.entries(cirurgiasPorCategoria).forEach(([categoria, cirurgias]) => {
            const categoriaItem = document.createElement('li');
            categoriaItem.innerHTML = `<em>${categoria}:</em>`;
            
            const categoriaLista = document.createElement('ul');
            categoriaLista.className = 'sublista';
            
            cirurgias.forEach(cirurgia => {
                const esgotado = isServicoEsgotado(cirurgia);
                
                const cirurgiaItem = document.createElement('li');
                cirurgiaItem.innerHTML = `
                    <span class="${esgotado ? 'beneficio-esgotado' : ''}">${cirurgia.nome}</span>
                    <span class="beneficio-limite ${esgotado ? 'esgotado' : ''}">
                        ${cirurgia.limite ? `Limite: ${cirurgia.limite}` : 'Ilimitado'} 
                        ${cirurgia.carencia ? `(Carencia: ${cirurgia.carencia} dias)` : ''}
                        ${esgotado ? ' - ESGOTADO' : ''}
                    </span>
                `;
                categoriaLista.appendChild(cirurgiaItem);
            });
            
            categoriaItem.appendChild(categoriaLista);
            cirurgiasLista.appendChild(categoriaItem);
        });
        
        listaBeneficios.appendChild(cirurgiasLista);
    }
    
    // Adiciona internações detalhadas
    if (plano.internacoesInclusas && plano.internacoesInclusas.length > 0) {
        const internacoesHeader = document.createElement('li');
        internacoesHeader.innerHTML = '<strong>Internações Inclusas:</strong>';
        listaBeneficios.appendChild(internacoesHeader);
        
        const internacoesLista = document.createElement('ul');
        internacoesLista.className = 'sublista';
        
        plano.internacoesInclusas.forEach(internacao => {
            const esgotado = isServicoEsgotado(internacao);
            
            const internacaoItem = document.createElement('li');
            internacaoItem.innerHTML = `
                <span class="${esgotado ? 'beneficio-esgotado' : ''}">${internacao.nome}</span>
                <span class="beneficio-limite ${esgotado ? 'esgotado' : ''}">
                    ${internacao.limite ? `Limite: ${internacao.limite} diárias` : 'Ilimitado'} 
                    ${internacao.carencia ? `(Carencia: ${internacao.carencia} dias)` : ''}
                    ${esgotado ? ' - ESGOTADO' : ''}
                </span>
            `;
            internacoesLista.appendChild(internacaoItem);
        });
        
        listaBeneficios.appendChild(internacoesLista);
    }
};

    // Carrega tutores do localStorage (atualizada)
    const carregarTutores = () => {
        const tutores = JSON.parse(localStorage.getItem('tutores')) || [];
        const tutorSelect = document.getElementById('tutor');
        
        tutorSelect.innerHTML = '<option value="">Selecione um tutor</option>';
        
        tutores.forEach(tutor => {
            const option = document.createElement('option');
            option.value = tutor.id;
            option.textContent = `${tutor.nome}${tutor.cpf ? ' - ' + tutor.cpf : ''}`;
            tutorSelect.appendChild(option);
        });
    };

    // Carrega pets de um tutor específico (atualizada)
    const carregarPets = (tutorId) => {
        const pets = JSON.parse(localStorage.getItem('pets')) || [];
        const petSelect = document.getElementById('pet');
        
        petSelect.innerHTML = '<option value="">Selecione um pet</option>';
        petSelect.disabled = !tutorId;
        
        if (tutorId) {
            const petsDoTutor = pets.filter(pet => pet.tutorId === tutorId);
            
            petsDoTutor.forEach(pet => {
                const option = document.createElement('option');
                option.value = pet.id;
                option.textContent = `${pet.nome} (${pet.especie})`;
                option.dataset.info = JSON.stringify(pet);
                petSelect.appendChild(option);
            });
            
            if (petsDoTutor.length === 0) {
                const option = document.createElement('option');
                option.value = '';
                option.textContent = 'Nenhum pet cadastrado para este tutor';
                petSelect.appendChild(option);
            }
        }
        
        document.getElementById('buscar-dados').disabled = true;
        document.getElementById('info-pet').style.display = 'none';
    };

    // Carrega tipos de atendimento disponíveis (COM A CORREÇÃO PARA O PLANO DE SAÚDE)
const carregarTiposAtendimento = () => {
    const select = document.getElementById('tipoAtendimento');
    const erroDiv = document.getElementById('erro-carregamento-servicos');
    
    try {
        // Limpa o select
        select.innerHTML = '<option value="">Selecione o tipo de atendimento</option>';
        
        // 1. Tenta acessar os dados de TRÊS maneiras diferentes
        const dados = window.planosServicos || 
                     JSON.parse(localStorage.getItem('planosServicos')) || 
                     { servicosAvulsos: { atendimentos: [] }, planos: [] };
        
        // 2. Verifica se a estrutura de dados está correta
        if (!dados.servicosAvulsos || !Array.isArray(dados.servicosAvulsos.atendimentos)) {
            throw new Error('Estrutura de dados inválida');
        }
        
        console.log('Serviços carregados:', dados.servicosAvulsos.atendimentos);
        
        // 3. Adiciona cada serviço ao select
        dados.servicosAvulsos.atendimentos.forEach(servico => {
            const option = document.createElement('option');
            option.value = servico.id;
            const valorFormatado = servico.valor === 0 ? 'Grátis' : formatarMoeda(servico.valor);
            option.textContent = `${servico.nome} (${valorFormatado})`;
            option.dataset.valor = servico.valor;
            select.appendChild(option);
        });
        
        // 4. Adiciona opção de plano de saúde se existirem planos
        if (dados.planos && dados.planos.length > 0) {
            const optionPlano = document.createElement('option');
            optionPlano.value = 'consulta_plano';
            optionPlano.textContent = 'Plano de saúde (Grátis)';
            optionPlano.dataset.valor = 0;
            select.appendChild(optionPlano);
        }
        
        erroDiv.style.display = 'none';
    } catch (error) {
        console.error('Erro ao carregar serviços:', error);
        erroDiv.style.display = 'block';
        erroDiv.innerHTML = `
            <strong>Erro ao carregar serviços:</strong> ${error.message}<br>
            <button onclick="window.location.reload(true)" class="btn-recarregar">
                <i class="fas fa-sync-alt"></i> Recarregar Página
            </button>
        `;
    }
};

    // Mostra os dados completos do pet
    const mostrarDadosPet = (petData) => {
        const infoSection = document.getElementById('info-pet');
        
        // Preenche informações básicas
        document.getElementById('pet-especie').textContent = petData.especie || 'Não informado';
        document.getElementById('pet-raca').textContent = petData.raca || 'Não informado';
        document.getElementById('pet-idade').textContent = petData.idade || 'Não informado';
        document.getElementById('pet-peso').textContent = petData.peso ? `${petData.peso} kg` : 'Não informado';
        document.getElementById('pet-sexo').textContent = petData.sexo || 'Não informado';
        document.getElementById('pet-ambiente').textContent = petData.ambiente || 'Não informado';
        
        // Preenche histórico de saúde
        const historicoBody = document.getElementById('historico-body');
        historicoBody.innerHTML = '';
        
        if (petData.historico && petData.historico.length > 0) {
            petData.historico.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${formatarData(item.data)}</td>
                    <td>${item.vacina || '-'}</td>
                    <td>${item.vermifugo || '-'}</td>
                    <td>${item.peso || '-'}</td>
                `;
                historicoBody.appendChild(row);
            });
        } else {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="4">Nenhum registro de saúde encontrado</td>';
            historicoBody.appendChild(row);
        }
        
        // Configura o link de atendimentos anteriores
        const linkAtendimentos = document.getElementById('link-atendimentos-anteriores');
        if (linkAtendimentos) {
            linkAtendimentos.href = `atendimentos-anteriores.html?petId=${petData.id}`;
        }
        
        // Mostra informações do plano de saúde
        mostrarInformacoesPlano(petData.id);
        
        infoSection.style.display = 'block';
    };

    // Formata data para exibição
    const formatarData = (dataISO) => {
        if (!dataISO) return '-';
        const [ano, mes, dia] = dataISO.split('T')[0].split('-');
        return `${dia}/${mes}/${ano}`;
    };

    // Atualiza lista de exames selecionados
    const atualizarListaExames = () => {
        const examesSelect = document.getElementById('exames');
        const listaExames = document.getElementById('listaExames');
        const selectedOptions = Array.from(examesSelect.selectedOptions);
        
        listaExames.innerHTML = '';
        
        if (selectedOptions.length === 0) {
            listaExames.innerHTML = '<p>Nenhum exame selecionado</p>';
            return;
        }
        
        const ul = document.createElement('ul');
        let total = 0;
        
        selectedOptions.forEach(option => {
            const li = document.createElement('li');
            const valor = parseFloat(option.textContent.match(/\d+,\d+/)[0].replace(',', '.'));
            
            li.textContent = `${option.textContent}`;
            ul.appendChild(li);
            total += valor;
        });
        
        listaExames.appendChild(ul);
        
        const totalElement = document.createElement('div');
        totalElement.style.fontWeight = 'bold';
        totalElement.style.marginTop = '10px';
        totalElement.textContent = `Total: ${formatarMoeda(total)}`;
        listaExames.appendChild(totalElement);
    };

    // Mostra/oculta campo de pagamento personalizado
    const togglePagamentoCustom = () => {
        const formaPagamento = document.getElementById('formaPagamento');
        const container = document.getElementById('outroPagamentoContainer');
        
        container.style.display = formaPagamento.value === 'outro' ? 'block' : 'none';
    };

    // Atualiza valores do cartão de crédito
    const atualizarValorCartao = (total) => {
        const valorFinalInput = document.getElementById('valorFinal');
        const valorFinal = valorFinalInput.value ? 
            parseFloat(valorFinalInput.value.replace(/[^\d,]/g, '').replace(',', '.')) : 
            0;
        
        document.getElementById('valorTotal').value = formatarMoeda(total);
        
        if (valorFinal > 0 && !isNaN(valorFinal)) {
            const juros = valorFinal - total;
            document.getElementById('juros').value = formatarMoeda(juros);
        } else {
            document.getElementById('juros').value = '';
        }
    };

    // Calcula e atualiza o resumo financeiro
const atualizarResumoFinanceiro = () => {
    const tipoAtendimento = document.getElementById('tipoAtendimento').value;
    const examesSelecionados = Array.from(document.querySelectorAll('input[name="examesAvulsos"]:checked')); // Alterado para examesAvulsos
    const listaServicos = document.getElementById('listaServicos');
    const totalGeral = document.getElementById('totalGeral');
    
    listaServicos.innerHTML = '';
    let total = 0;
    
    // Adiciona atendimento ao resumo
    if (tipoAtendimento) {
        const valorAtendimento = tipoAtendimento === 'consulta_plano' ? 0 : obterPrecoServico(tipoAtendimento);
        if (valorAtendimento > 0 || tipoAtendimento === 'consulta_plano') {
            const item = document.createElement('div');
            item.textContent = `${document.getElementById('tipoAtendimento').selectedOptions[0].text}: ${formatarMoeda(valorAtendimento)}`;
            listaServicos.appendChild(item);
            total += valorAtendimento;
        }
    }
    
    // Adiciona exames ao resumo
    examesSelecionados.forEach(exame => {
        const valorExame = parseFloat(exame.dataset.valor);
        const item = document.createElement('div');
        item.textContent = `${exame.parentElement.textContent.trim()}`;
        listaServicos.appendChild(item);
        total += valorExame;
    });
    
    // Atualiza total geral
    totalGeral.textContent = formatarMoeda(total);
    
    // Atualiza campos de cartão de crédito se necessário
    if (document.getElementById('formaPagamento').value === 'credito') {
        atualizarValorCartao(total);
    }
    
    return total;
};

    // Salva a anamnese no localStorage
    const salvarAnamnese = (formData) => {
        const anamneses = JSON.parse(localStorage.getItem('anamneses')) || [];
        const anexos = JSON.parse(localStorage.getItem('anexos')) || [];
        
        const novaAnamnese = {
            id: 'anamnese_' + Date.now().toString(),
            dataCriacao: new Date().toISOString(),
            ...formData,
            status: 'pendente'
        };
        
        anamneses.push(novaAnamnese);
        localStorage.setItem('anamneses', JSON.stringify(anamneses));
        
        // Salva os anexos associados a esta anamnese
        if (anexosTemporarios.length > 0) {
            anexosTemporarios.forEach(anexo => {
                anexos.push({
                    id: 'anexo_' + Date.now().toString() + Math.random().toString(36).substr(2, 9),
                    atendimentoId: novaAnamnese.id,
                    nome: anexo.nome,
                    tipo: anexo.tipo,
                    conteudo: anexo.conteudo,
                    dataUpload: new Date().toISOString()
                });
            });
            
            localStorage.setItem('anexos', JSON.stringify(anexos));
            anexosTemporarios = []; // Limpa os anexos temporários
        }
        
        return novaAnamnese;
    };

    // Função para visualizar anexo
    window.visualizarAnexo = function(conteudo, tipo) {
        if (tipo.startsWith('image/')) {
            const novaAba = window.open('', '_blank');
            novaAba.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Visualizar Imagem</title>
                    <style>
                        body { margin: 0; padding: 20px; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f5f5f5; }
                        img { max-width: 90%; max-height: 90vh; box-shadow: 0 0 10px rgba(0,0,0,0.2); }
                    </style>
                </head>
                <body>
                    <img src="${conteudo}" alt="Imagem anexada">
                </body>
                </html>
            `);
        } else {
            const novaAba = window.open('', '_blank');
            novaAba.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Visualizar PDF</title>
                    <style>
                        body { margin: 0; padding: 0; }
                        embed { width: 100%; height: 100vh; }
                    </style>
                </head>
                <body>
                    <embed src="${conteudo}" type="application/pdf" width="100%" height="100%">
                </body>
                </html>
            `);
        }
    };

    // Função para remover anexo temporário
    window.removerAnexoTemporario = function(index) {
        if (confirm('Tem certeza que deseja remover este anexo?')) {
            anexosTemporarios.splice(index, 1);
            atualizarListaAnexosPreview();
        }
    };

    // Atualiza a visualização dos anexos
    function atualizarListaAnexosPreview() {
        const listaAnexos = document.getElementById('lista-anexos-preview');
        listaAnexos.innerHTML = '';
        
        if (anexosTemporarios.length === 0) {
            listaAnexos.innerHTML = '<p class="sem-anexos">Nenhum anexo adicionado ainda</p>';
            return;
        }
        
        anexosTemporarios.forEach((anexo, index) => {
            const anexoDiv = document.createElement('div');
            anexoDiv.className = 'anexo-preview';
            
            if (anexo.tipo.startsWith('image/')) {
                anexoDiv.innerHTML = `
                    <img src="${anexo.conteudo}" alt="${anexo.nome}">
                    <span class="anexo-nome">${anexo.nome}</span>
                    <button class="remove-anexo" onclick="removerAnexoTemporario(${index})">
                        <i class="fas fa-times"></i>
                    </button>
                `;
            } else {
                anexoDiv.innerHTML = `
                    <div class="anexo-icon">
                        <i class="fas fa-file-pdf"></i>
                    </div>
                    <span class="anexo-nome">${anexo.nome}</span>
                    <button class="remove-anexo" onclick="removerAnexoTemporario(${index})">
                        <i class="fas fa-times"></i>
                    </button>
                `;
            }
            
            anexoDiv.addEventListener('click', (e) => {
                if (!e.target.classList.contains('remove-anexo')) {
                    visualizarAnexo(anexo.conteudo, anexo.tipo);
                }
            });
            
            listaAnexos.appendChild(anexoDiv);
        });
    }

    // Configura o upload de arquivos
    function configurarUploadAnexos() {
        const inputUpload = document.getElementById('upload-anexo-anamnese');
        
        inputUpload.addEventListener('change', function(e) {
            const files = e.target.files;
            if (!files || files.length === 0) return;
            
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                
                if (file.size > 5 * 1024 * 1024) {
                    alert(`O arquivo "${file.name}" excede o tamanho máximo de 5MB e não será carregado.`);
                    continue;
                }
                
                if (!file.type.match('application/pdf') && !file.type.match('image.*')) {
                    alert(`O arquivo "${file.name}" não é um PDF ou imagem e não será carregado.`);
                    continue;
                }
                
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    anexosTemporarios.push({
                        nome: file.name,
                        tipo: file.type,
                        conteudo: e.target.result,
                        tamanho: file.size
                    });
                    
                    atualizarListaAnexosPreview();
                };
                
                reader.readAsDataURL(file);
            }
            
            e.target.value = '';
        });
    }

    // Inicializa eventos
    const init = () => {
        carregarTutores();
        carregarTiposAtendimento();
        carregarExamesAvulsos();
        configurarUploadAnexos();
        atualizarListaAnexosPreview();
        
        // Botão Voltar
        document.getElementById('botao-voltar')?.addEventListener('click', function() {
            window.location.href = 'tela-pos-login.html';
        });
        
        // Mostra valor do atendimento quando selecionado
        document.getElementById('tipoAtendimento').addEventListener('change', function() {
            const container = document.getElementById('valorAtendimentoContainer');
            const valorSpan = document.getElementById('valorAtendimento');
            
            if (this.value) {
                const valor = this.value === 'consulta_plano' ? 0 : obterPrecoServico(this.value);
                valorSpan.textContent = `Valor: ${formatarMoeda(valor)}`;
                container.style.display = 'block';
            } else {
                container.style.display = 'none';
            }
            
            atualizarResumoFinanceiro();
        });
        
        // Mostra/oculta campos de cartão de crédito
        document.getElementById('formaPagamento').addEventListener('change', function() {
            const container = document.getElementById('cartaoCreditoContainer');
            container.style.display = this.value === 'credito' ? 'block' : 'none';
            atualizarResumoFinanceiro();
        });
        
        // Configura eventos de exames
        document.querySelectorAll('input[name="exames"]').forEach(checkbox => {
            checkbox.addEventListener('change', atualizarResumoFinanceiro);
        });
        
        // Event listener para o campo Valor Final
        document.getElementById('valorFinal').addEventListener('input', function(e) {
            let value = this.value.replace(/[^\d,]/g, '');
            
            if (value.includes(',')) {
                const parts = value.split(',');
                value = parts[0] + ',' + parts[1].slice(0, 2);
            }
            
            this.value = 'R$ ' + value;
            
            const total = parseFloat(
                document.getElementById('totalGeral').textContent
                    .replace(/[^\d,]/g, '')
                    .replace(',', '.')
            );
            
            if (!isNaN(total)) {
                atualizarValorCartao(total);
            }
        });
        
        // Quando seleciona um tutor
        document.getElementById('tutor').addEventListener('change', function() {
            carregarPets(this.value);
        });
        
        // Quando seleciona um pet
        document.getElementById('pet').addEventListener('change', function() {
            const btnBuscar = document.getElementById('buscar-dados');
            btnBuscar.disabled = !this.value || this.value === '';
        });
        
        // Botão de buscar dados completos
        document.getElementById('buscar-dados').addEventListener('click', function() {
            const petSelect = document.getElementById('pet');
            const selectedOption = petSelect.options[petSelect.selectedIndex];
            
            if (selectedOption.dataset.info) {
                const petData = JSON.parse(selectedOption.dataset.info);
                mostrarDadosPet(petData);
                mostrarInformacoesPlano(petData.id);
            }
        });
        
        // Submit do formulário
        document.getElementById('formAnamnese').addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!document.getElementById('tutor').value || 
                !document.getElementById('pet').value || 
                !document.getElementById('dataAtendimento').value || 
                !document.getElementById('queixaPrincipal').value ||
                !document.getElementById('condutaClinica').value) {
                alert('Por favor, preencha todos os campos obrigatórios!');
                return;
            }
            
            const examesSelecionados = Array.from(document.querySelectorAll('input[name="exames"]:checked')).map(cb => {
                return {
                    nome: cb.parentElement.textContent.trim(),
                    valor: parseFloat(cb.dataset.valor)
                };
            });
            
            const formData = {
                dataAtendimento: document.getElementById('dataAtendimento').value,
                tutorId: document.getElementById('tutor').value,
                petId: document.getElementById('pet').value,
                queixaPrincipal: document.getElementById('queixaPrincipal').value,
                temperatura: document.getElementById('temperatura').value,
                nomeMedicacao: document.getElementById('nomeMedicacao').value,
                
                // Sistemas da Anamnese
                digestorio: Array.from(document.querySelectorAll('input[name="digestorio"]:checked')).map(cb => cb.value),
                outrosDigestorio: document.getElementById('outrosDigestorio').value,
                
                neurologico: Array.from(document.querySelectorAll('input[name="neurologico"]:checked')).map(cb => cb.value),
                outrosNeurologico: document.getElementById('outrosNeurologico').value,
                
                locomotor: Array.from(document.querySelectorAll('input[name="locomotor"]:checked')).map(cb => cb.value),
                outrosLocomotor: document.getElementById('outrosLocomotor').value,
                
                pele: Array.from(document.querySelectorAll('input[name="pele"]:checked')).map(cb => cb.value),
                outrosPele: document.getElementById('outrosPele').value,
                
                olhos: Array.from(document.querySelectorAll('input[name="olhos"]:checked')).map(cb => cb.value),
                outrosOlhos: document.getElementById('outrosOlhos').value,
                
                ouvido: Array.from(document.querySelectorAll('input[name="ouvido"]:checked')).map(cb => cb.value),
                outrosOuvido: document.getElementById('outrosOuvido').value,
                
                cardio: Array.from(document.querySelectorAll('input[name="cardio"]:checked')).map(cb => cb.value),
                outrosCardio: document.getElementById('outrosCardio').value,
                
                // Exame Físico completo
                mucosa: document.getElementById('mucosa').value,
                pelagem: document.getElementById('pelagem').value,
                linfonodos: document.getElementById('linfonodos').value,
                cavidadeOral: document.getElementById('cavidadeOral').value,
                hidratacao: document.getElementById('hidratacao').value,
                alimentacao: document.getElementById('alimentacao').value,
                condutoAuditivo: document.getElementById('condutoAuditivo').value,
                oftalmo: document.getElementById('oftalmo').value,
                cavidadeNasal: document.getElementById('cavidadeNasal').value,
                
                // Conduta Clínica
                condutaClinica: document.getElementById('condutaClinica').value,
                
                // Financeiro
                exames: examesSelecionados,
                tipoAtendimento: document.getElementById('tipoAtendimento').value,
                valorAtendimento: document.getElementById('tipoAtendimento').value === 'consulta_plano' ? 
                    0 : obterPrecoServico(document.getElementById('tipoAtendimento').value) || 0,
                formaPagamento: document.getElementById('formaPagamento').value,
                parcelas: document.getElementById('formaPagamento').value === 'credito' ? 
                         parseInt(document.getElementById('parcelas').value) : 1,
                valorTotal: parseFloat(
                    document.getElementById('totalGeral').textContent
                        .replace(/[^\d,]/g, '')
                        .replace(',', '.')
                ),
                valorFinal: document.getElementById('formaPagamento').value === 'credito' ? 
                           parseFloat(
                               document.getElementById('valorFinal').value
                                   .replace(/[^\d,]/g, '')
                                   .replace(',', '.')
                           ) : 0,
                juros: document.getElementById('formaPagamento').value === 'credito' ? 
                       parseFloat(
                           document.getElementById('juros').value
                               .replace(/[^\d,]/g, '')
                               .replace(',', '.')
                       ) : 0,
                observacoes: "",
                temAnexos: anexosTemporarios.length > 0
            };

            
            
            const anamneseSalva = salvarAnamnese(formData);
            console.log('Anamnese salva:', anamneseSalva);
            
            alert('Anamnese salva com sucesso!');
            this.reset();
            document.getElementById('info-pet').style.display = 'none';
            anexosTemporarios = [];
            atualizarListaAnexosPreview();
        });

        // Adicionar botão de gerar receituário
const btnReceituario = document.createElement('button');
btnReceituario.className = 'btn-primario';
btnReceituario.innerHTML = '<i class="fas fa-file-prescription"></i> Gerar Receituário';
btnReceituario.style.marginTop = '10px';
btnReceituario.addEventListener('click', function() {
    const tutorId = document.getElementById('tutor').value;
    const petId = document.getElementById('pet').value;
    const anamneseId = document.getElementById('formAnamnese').dataset.id; // Novo: ID da anamnese
    
    if (!tutorId || !petId) {
        alert('Por favor, selecione um tutor e um pet antes de gerar o receituário.');
        return;
    }
    
    // Abre o receituário e configura o salvamento automático
    const receituarioWindow = window.open(`receituario.html?tutorId=${tutorId}&petId=${petId}`, '_blank');
    
    // Quando a janela do receituário fecha, salva como anexo
    receituarioWindow.onbeforeunload = function() {
        // Verifica se o receituário foi gerado (definido no receituario.html)
        if (receituarioWindow.receituarioGerado && anamneseId) {
            const anexos = JSON.parse(localStorage.getItem('anexos')) || [];
            
            anexos.push({
                id: 'receituario_' + Date.now(),
                atendimentoId: anamneseId,
                nome: `Receituário_${pet.nome}_${new Date().toLocaleDateString()}.pdf`,
                tipo: 'application/pdf',
                conteudo: receituarioWindow.receituarioPDF, // Base64 do PDF
                dataUpload: new Date().toISOString(),
                isReceituario: true // Marca como receituário
            });
            
            localStorage.setItem('anexos', JSON.stringify(anexos));
            alert('Receituário salvo como anexo do atendimento!');
        }
    };
});

    // Adicionar o botão após a seção de anexos
    const secaoAnexos = document.querySelector('.secao-anamnese:last-of-type');
    if (secaoAnexos) {
        secaoAnexos.insertAdjacentElement('afterend', btnReceituario);
    }
    };

    init();
});