document.addEventListener("DOMContentLoaded", function() {
    console.log("Anamnese script carregado!");

    // Variável para armazenar anexos temporários antes do envio
    let anexosTemporarios = [];

    // Função para formatar valores como moeda (R$ 0,00)
    const formatarMoeda = (valor) => {
        return 'R$ ' + valor.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
    };

    // Função para obter preço de serviço avulso
    const obterPrecoServico = (servicoId) => {
        const planosServicos = JSON.parse(localStorage.getItem('planosServicos')) || { servicosAvulsos: { atendimentos: [] } };
        const servico = planosServicos.servicosAvulsos.atendimentos.find(s => s.id === servicoId);
        return servico?.valor || 0;
    };

    // Função para verificar se o pet tem plano de saúde
    const verificarPlanoPet = (petId) => {
        const pets = JSON.parse(localStorage.getItem('pets')) || [];
        const pet = pets.find(p => p.id === petId);
        return pet?.planoId || null;
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

    // Função para mostrar informações do plano
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
        
        // Preenche informações básicas do plano
        document.getElementById('plano-nome').textContent = plano.nome;
        document.getElementById('consultas-inclusas').textContent = plano.consultas.inclusas;
        document.getElementById('consultas-utilizadas').textContent = historicoUso.consultasUtilizadas;
        document.getElementById('consultas-restantes').textContent = plano.consultas.inclusas - historicoUso.consultasUtilizadas;
        
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
        const consultasItem = document.createElement('li');
        consultasItem.innerHTML = `
            <span>${plano.consultas.inclusas} Consultas anuais</span>
            <span class="beneficio-limite">(${historicoUso.consultasUtilizadas} utilizadas)</span>
        `;
        listaBeneficios.appendChild(consultasItem);
        
        // Adiciona vacinas
        if (plano.vacinas && plano.vacinas.length > 0) {
            const vacinasItem = document.createElement('li');
            vacinasItem.innerHTML = `
                <span>Vacinas inclusas (${plano.vacinas.length} tipos)</span>
                <span class="beneficio-limite">(sem carência)</span>
            `;
            listaBeneficios.appendChild(vacinasItem);
        }
        
        // Adiciona exames
        if (plano.examesInclusos && plano.examesInclusos.length > 0) {
            plano.examesInclusos.forEach(exame => {
                const usado = historicoUso.examesUtilizados[exame.nome] || 0;
                const exameItem = document.createElement('li');
                exameItem.innerHTML = `
                    <span>${exame.nome}</span>
                    <span class="beneficio-limite">${usado}/${exame.limite || 'ilimitado'}</span>
                `;
                listaBeneficios.appendChild(exameItem);
            });
        }
        
        // Adiciona procedimentos
        if (plano.procedimentosInclusos && plano.procedimentosInclusos.length > 0) {
            const procedimentosItem = document.createElement('li');
            procedimentosItem.innerHTML = `
                <span>Procedimentos inclusos (${plano.procedimentosInclusos.length} tipos)</span>
            `;
            listaBeneficios.appendChild(procedimentosItem);
        }
    };

    // Carrega tutores do localStorage
    const carregarTutores = () => {
        const tutores = JSON.parse(localStorage.getItem('tutores')) || [];
        const tutorSelect = document.getElementById('tutor');
        
        tutorSelect.innerHTML = '<option value="">Selecione um tutor</option>';
        
        tutores.forEach(tutor => {
            const option = document.createElement('option');
            option.value = tutor.id;
            option.textContent = `${tutor.nome}`;
            tutorSelect.appendChild(option);
        });
    };

    // Carrega pets de um tutor específico
    const carregarPets = (tutorId) => {
        const pets = JSON.parse(localStorage.getItem('pets')) || [];
        const petSelect = document.getElementById('pet');
        
        petSelect.innerHTML = '<option value="">Selecione um pet</option>';
        petSelect.disabled = !tutorId;
        
        if (tutorId) {
            const petsDoTutor = pets.filter(pet => pet.tutorId == tutorId);
            
            petsDoTutor.forEach(pet => {
                const option = document.createElement('option');
                option.value = pet.id;
                option.textContent = pet.nome;
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
            
            // Carrega os serviços do localStorage
            const planosServicos = JSON.parse(localStorage.getItem('planosServicos'));
            
            // Verifica se a estrutura de dados existe e está correta
            if (!planosServicos) {
                throw new Error('Dados de planos e serviços não encontrados no localStorage');
            }

            // Carrega apenas serviços avulsos que NÃO são "Plano de saúde"
            const servicosAvulsos = (planosServicos.servicosAvulsos?.atendimentos || [])
                .filter(servico => servico.nome !== 'Plano de saúde');
            
            // Adiciona serviços avulsos ao select
            servicosAvulsos.forEach(servico => {
                const option = document.createElement('option');
                option.value = servico.id;
                option.textContent = `${servico.nome} (${formatarMoeda(servico.valor)})`;
                select.appendChild(option);
            });
            
            // Adiciona a opção de plano de saúde SEPARADAMENTE (só se existirem planos)
            if (planosServicos.planos && planosServicos.planos.length > 0) {
                const optionPlano = document.createElement('option');
                optionPlano.value = 'consulta_plano';
                optionPlano.textContent = 'Plano de saúde';
                select.appendChild(optionPlano);
            }
            
            erroDiv.style.display = 'none';
        } catch (error) {
            console.error('Erro ao carregar serviços:', error);
            erroDiv.style.display = 'block';
            
            // Opção de fallback caso os dados não estejam disponíveis
            const optionParticular = document.createElement('option');
            optionParticular.value = 'consulta_particular';
            optionParticular.textContent = 'Consulta Particular';
            select.appendChild(optionParticular);
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
        const examesSelecionados = Array.from(document.querySelectorAll('input[name="exames"]:checked'));
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
    };

    init();
});