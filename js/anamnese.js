document.addEventListener("DOMContentLoaded", function() {
    console.log("Anamnese script carregado!");

    // Preços dos tipos de atendimento
    const precosAtendimento = {
        'consulta_clinica': 60.00,
        'consulta_domiciliar': 80.00,
        'retorno': 0.00,
        'emergencia': 80.00,
        'guia_prever': 30.00
    };

    // Função para formatar valores como moeda (R$ 0,00)
    const formatarMoeda = (valor) => {
        return 'R$ ' + valor.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
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

    // Atualiza valores do cartão de crédito (FUNÇÃO CORRIGIDA)
    const atualizarValorCartao = (total) => {
        const valorFinalInput = document.getElementById('valorFinal');
        // Remove formatação e converte para número
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
        if (tipoAtendimento && precosAtendimento[tipoAtendimento] !== undefined) {
            const valorAtendimento = precosAtendimento[tipoAtendimento];
            if (valorAtendimento > 0) {
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
        
        // Mapeia os valores antigos para os novos quando necessário
        if (formData.tipoAtendimento === 'consulta_particular') {
            formData.tipoAtendimento = 'consulta_clinica';
        }
        
        const novaAnamnese = {
            id: Date.now().toString(),
            dataCriacao: new Date().toISOString(),
            ...formData,
            status: 'pendente'
        };
        
        anamneses.push(novaAnamnese);
        localStorage.setItem('anamneses', JSON.stringify(anamneses));
        
        return novaAnamnese;
    };

    // Inicializa eventos
    const init = () => {
        carregarTutores();
        
        // Mostra valor do atendimento quando selecionado
        document.getElementById('tipoAtendimento').addEventListener('change', function() {
            const container = document.getElementById('valorAtendimentoContainer');
            const valorSpan = document.getElementById('valorAtendimento');
            
            if (this.value && precosAtendimento[this.value] !== undefined) {
                const valor = precosAtendimento[this.value];
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
        
        // Configura eventos de exames (agora são checkboxes)
        document.querySelectorAll('input[name="exames"]').forEach(checkbox => {
            checkbox.addEventListener('change', atualizarResumoFinanceiro);
        });
        
        // Event listener para o campo Valor Final (CORRIGIDO)
        document.getElementById('valorFinal').addEventListener('input', function(e) {
            // Permite apenas números e vírgula
            let value = this.value.replace(/[^\d,]/g, '');
            
            // Garante que há no máximo 2 dígitos após a vírgula
            if (value.includes(',')) {
                const parts = value.split(',');
                value = parts[0] + ',' + parts[1].slice(0, 2);
            }
            
            this.value = 'R$ ' + value;
            
            // Atualiza os juros
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
            
            // Validação básica
            if (!document.getElementById('tutor').value || 
                !document.getElementById('pet').value || 
                !document.getElementById('dataAtendimento').value || 
                !document.getElementById('queixaPrincipal').value) {
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
                // Sistema Digestório
                digestorio: Array.from(document.querySelectorAll('input[name="digestorio"]:checked')).map(cb => cb.value),
                outrosDigestorio: document.getElementById('outrosDigestorio').value,
                // Sistema Cardiorespiratório
                cardio: Array.from(document.querySelectorAll('input[name="cardio"]:checked')).map(cb => cb.value),
                outrosCardio: document.getElementById('outrosCardio').value,
                // Exame Físico
                mucosa: document.getElementById('mucosa').value,
                cavidadeOral: document.getElementById('cavidadeOral').value,
                temperatura: document.getElementById('temperatura').value,
                hidratacao: document.getElementById('hidratacao').value,
                // Financeiro
                exames: examesSelecionados,
                tipoAtendimento: document.getElementById('tipoAtendimento').value,
                valorAtendimento: precosAtendimento[document.getElementById('tipoAtendimento').value] || 0,
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
                // Adiciona observações se necessário
                observacoes: ""
            };
            
            const anamneseSalva = salvarAnamnese(formData);
            console.log('Anamnese salva:', anamneseSalva);
            
            alert('Anamnese salva com sucesso!');
            this.reset();
            document.getElementById('info-pet').style.display = 'none';
        });
    };

    init();
});