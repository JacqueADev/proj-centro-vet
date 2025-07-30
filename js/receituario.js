document.addEventListener("DOMContentLoaded", function() {
    // Obter parâmetros da URL
    const urlParams = new URLSearchParams(window.location.search);
    const tutorId = urlParams.get('tutorId');
    const petId = urlParams.get('petId');
    
    // Carregar dados do tutor e pet
    const tutores = JSON.parse(localStorage.getItem('tutores')) || [];
    const pets = JSON.parse(localStorage.getItem('pets')) || [];
    
    const tutor = tutores.find(t => t.id === tutorId);
    const pet = pets.find(p => p.id === petId);
    
    if (tutor) {
        document.getElementById('tutor-nome').textContent = tutor.nome;
    }
    
    if (pet) {
        document.getElementById('pet-nome').textContent = pet.nome;
    }
    
    // Definir data atual
    const hoje = new Date();
    document.getElementById('data-receita').textContent = hoje.toLocaleDateString('pt-BR');
    
    // Contador de medicamentos
    let contadorMedicamentos = 0;
    
    // Função para adicionar um novo medicamento
    window.adicionarMedicamento = function() {
        const container = document.getElementById('medicamentos-container');
        const medicamentoId = `medicamento-${contadorMedicamentos}`;
        
        const medicamentoHTML = `
            <div class="medicamento-container" id="${medicamentoId}">
                <div class="medicamento-header">
                    <h3>Medicamento ${contadorMedicamentos + 1}</h3>
                    <button class="btn-remover no-print" onclick="removerMedicamento('${medicamentoId}')">
                        <i class="fas fa-times"></i> Remover
                    </button>
                </div>
                
                <div class="tipo-uso">
                    <label for="tipo-uso-${contadorMedicamentos}">Tipo de uso:</label>
                    <select id="tipo-uso-${contadorMedicamentos}" class="tipo-uso-select">
                        <option value="oral">Oral</option>
                        <option value="topico">Tópico</option>
                        <option value="injetavel">Injetável</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <div class="form-row">
                        <input type="text" id="nome-medicamento-${contadorMedicamentos}" placeholder="Nome do medicamento">
                        <select id="tipo-medicamento-${contadorMedicamentos}">
                            <option value="humano">Humano</option>
                            <option value="veterinario">Veterinário</option>
                        </select>
                        <select id="embalagem-medicamento-${contadorMedicamentos}">
                            <option value="fr">FR</option>
                            <option value="cx">CX</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group" id="instrucoes-${medicamentoId}">
                    <!-- As instruções serão atualizadas dinamicamente -->
                </div>
                
                <!-- Elementos para impressão -->
                <div class="medicamento-print no-screen">
                    <span class="medicamento-nome"></span>
                    <span class="medicamento-details"></span>
                </div>
                <div class="instrucoes-uso no-screen"></div>
            </div>
        `;
        
        container.insertAdjacentHTML('beforeend', medicamentoHTML);
        
        // Configurar eventos para o tipo de uso
        document.getElementById(`tipo-uso-${contadorMedicamentos}`).addEventListener('change', function() {
            atualizarFormularioMedicamento(medicamentoId);
        });
        
        // Atualizar o formulário normal
        atualizarFormularioMedicamento(medicamentoId);
        
        // Configurar a versão para impressão
        monitorarCampos(medicamentoId);
        atualizarPrintMedicamento(medicamentoId);
        
        contadorMedicamentos++;
    };

    // Função para atualizar a versão impressa do medicamento
  window.atualizarPrintMedicamento = function(medicamentoId) {
    const id = medicamentoId.split('-')[1];
    const container = document.getElementById(medicamentoId);
    
    // Capturar todos os valores
    const nome = document.getElementById(`nome-medicamento-${id}`)?.value || "[Nome do Medicamento]";
    const tipo = document.getElementById(`tipo-medicamento-${id}`)?.value || "humano";
    const embalagem = document.getElementById(`embalagem-medicamento-${id}`)?.value || "fr";
    const tipoUso = document.getElementById(`tipo-uso-${id}`)?.value || "oral";
    
    const dosagem = document.getElementById(`dosagem-${id}`)?.value;
    const unidadeDosagem = document.getElementById(`unidade-dosagem-${id}`)?.value;
    const frequencia = document.getElementById(`frequencia-${id}`)?.value;
    const periodo = document.getElementById(`periodo-${id}`)?.value;
    const unidadePeriodo = document.getElementById(`unidade-periodo-${id}`)?.value || "dias";
    const tipoAdministracao = document.getElementById(`tipo-administracao-${id}`)?.value || "consecutivos";

    // Elementos para impressão
    const nomeEl = container.querySelector('.medicamento-nome');
    const instrucoesEl = container.querySelector('.instrucoes-uso');
    
    // Atualizar nome do medicamento
    if (nomeEl) {
        nomeEl.textContent = `${parseInt(id) + 1}-) ${nome} (${tipo === 'humano' ? 'Humano' : 'Veterinário'}) ${embalagem.toUpperCase()}`;
    }
    
    // Atualizar instruções com base no tipo de uso
    if (instrucoesEl) {
        let fraseBase = '';
        let textoDosagem = '';
        let textoFrequencia = '';
        let textoPeriodo = '';
        
        // Definir frase base conforme tipo de uso
        switch(tipoUso) {
            case 'oral':
                fraseBase = 'Administrar por via oral';
                break;
            case 'topico':
                fraseBase = 'Aplicar topicamente';
                break;
            case 'injetavel':
                fraseBase = 'Administrar por via injetável';
                break;
            default:
                fraseBase = 'Administrar';
        }
        
        // Montar texto da dosagem
        if (dosagem && unidadeDosagem) {
            textoDosagem = `${dosagem} ${unidadeDosagem.replace('comprimido', 'comprimido(s)')
                                                      .replace('aplicacoes', 'aplicação(ões)')
                                                      .replace('ml', 'mL')
                                                      .replace('gotas', 'gota(s)')}`;
        } else {
            textoDosagem = '[dosagem]';
        }
        
        // Montar texto da frequência
        if (frequencia) {
            textoFrequencia = `${frequencia}x ao dia`;
            
            // Adicionar intervalo se for mais de uma vez ao dia
            if (frequencia > 1) {
                const intervalo = Math.floor(24 / frequencia);
                textoFrequencia += ` (a cada ${intervalo} horas)`;
            }
        } else {
            textoFrequencia = '[frequência]';
        }
        
        // Montar texto do período
        if (periodo && unidadePeriodo) {
            textoPeriodo = `durante ${periodo} ${unidadePeriodo.replace('dias', 'dia(s)')
                                                              .replace('semanas', 'semana(s)')
                                                              .replace('meses', 'mês(es)')}`;
            
            // Adicionar tipo de administração se for relevante
            if (tipoAdministracao === 'intercalados') {
                textoPeriodo += ' em dias intercalados';
            } else {
                textoPeriodo += ' consecutivos';
            }
        } else {
            textoPeriodo = '[período]';
        }
        
        // Montar frase final
        instrucoesEl.innerHTML = `<span class="texto-instrucao">${fraseBase} ${textoDosagem}, ${textoFrequencia}, ${textoPeriodo}.</span>`;
    }
};

    // Monitorar alterações nos campos
    window.monitorarCampos = function(medicamentoId) {
        const id = medicamentoId.split('-')[1];
        const campos = [
            `nome-medicamento-${id}`, `tipo-medicamento-${id}`, `embalagem-medicamento-${id}`,
            `tipo-uso-${id}`, `dosagem-${id}`, `unidade-dosagem-${id}`,
            `frequencia-${id}`, `periodo-${id}`, `unidade-periodo-${id}`, `tipo-administracao-${id}`
        ];
        
        campos.forEach(campoId => {
            const campo = document.getElementById(campoId);
            if (campo) {
                campo.addEventListener('input', () => {
                    atualizarPrintMedicamento(medicamentoId);
                });
                campo.addEventListener('change', () => atualizarPrintMedicamento(medicamentoId));
            }
        });
    };
    
    // Adicionar o primeiro medicamento ao carregar a página
    adicionarMedicamento();
    
    // Botão para adicionar novo medicamento
    document.getElementById('btn-adicionar-medicamento').addEventListener('click', adicionarMedicamento);
    
    // Botão para imprimir
    document.getElementById('btn-imprimir').addEventListener('click', function() {
        window.print();
    });
    
    // Botão para salvar na ficha de anamnese
    document.getElementById('btn-salvar').addEventListener('click', function() {
        const medicamentos = [];
        const containers = document.querySelectorAll('.medicamento-container');
        
        containers.forEach(container => {
            const id = container.id.split('-')[1];
            const tipoUso = document.getElementById(`tipo-uso-${id}`).value;
            
            medicamentos.push({
                tipoUso: tipoUso,
                nome: document.getElementById(`nome-medicamento-${id}`).value,
                tipo: document.getElementById(`tipo-medicamento-${id}`).value,
                embalagem: document.getElementById(`embalagem-medicamento-${id}`).value,
                dosagem: document.getElementById(`dosagem-${id}`)?.value,
                unidadeDosagem: document.getElementById(`unidade-dosagem-${id}`)?.value,
                frequencia: document.getElementById(`frequencia-${id}`)?.value,
                periodo: document.getElementById(`periodo-${id}`)?.value,
                unidadePeriodo: document.getElementById(`unidade-periodo-${id}`)?.value,
                tipoAdministracao: document.getElementById(`tipo-administracao-${id}`)?.value
            });
        });
        
        // Salvar no localStorage (simulação)
        const receituario = {
            tutorId: tutorId,
            petId: petId,
            data: new Date().toISOString(),
            medicamentos: medicamentos
        };
        
        console.log('Receituário a ser salvo:', receituario);
        alert('Receituário salvo com sucesso na ficha de anamnese!');
        window.close();
    });
});

// Função para atualizar o formulário do medicamento com base no tipo de uso
window.atualizarFormularioMedicamento = function(medicamentoId) {
    const id = medicamentoId.split('-')[1];
    const instrucoesDiv = document.getElementById(`instrucoes-${medicamentoId}`);
    
    // Obter os valores atuais antes de recriar o formulário
    const dosagem = document.getElementById(`dosagem-${id}`)?.value;
    const unidadeDosagem = document.getElementById(`unidade-dosagem-${id}`)?.value;
    const frequencia = document.getElementById(`frequencia-${id}`)?.value;
    const periodo = document.getElementById(`periodo-${id}`)?.value;
    const unidadePeriodo = document.getElementById(`unidade-periodo-${id}`)?.value;
    const tipoAdministracao = document.getElementById(`tipo-administracao-${id}`)?.value;
    
    instrucoesDiv.innerHTML = `
        <div class="form-row">
            <input type="number" id="dosagem-${id}" min="1" placeholder="Quantidade" style="width: 80px;" value="${dosagem || ''}">
            <select id="unidade-dosagem-${id}">
                <option value="">Selecione</option>
                <option value="comprimido" ${unidadeDosagem === 'comprimido' ? 'selected' : ''}>comprimido(s)</option>
                <option value="ml" ${unidadeDosagem === 'ml' ? 'selected' : ''}>ml</option>
                <option value="gotas" ${unidadeDosagem === 'gotas' ? 'selected' : ''}>gotas</option>
                <option value="aplicacoes" ${unidadeDosagem === 'aplicacoes' ? 'selected' : ''}>aplicação(ões)</option>
            </select>
            <span class="no-print">x</span>
            <input type="number" id="frequencia-${id}" min="1" max="4" placeholder="1" style="width: 50px;" value="${frequencia || ''}">
            <span class="no-print">vezes ao dia, durante</span>
            <input type="number" id="periodo-${id}" min="1" placeholder="Número" style="width: 60px;" value="${periodo || ''}">
            <select id="unidade-periodo-${id}">
                <option value="dias" ${unidadePeriodo === 'dias' ? 'selected' : ''}>dia(s)</option>
                <option value="semanas" ${unidadePeriodo === 'semanas' ? 'selected' : ''}>semana(s)</option>
                <option value="meses" ${unidadePeriodo === 'meses' ? 'selected' : ''}>mês(es)</option>
            </select>
            <select id="tipo-administracao-${id}">
                <option value="consecutivos" ${tipoAdministracao === 'consecutivos' ? 'selected' : ''}>consecutivos</option>
                <option value="intercalados" ${tipoAdministracao === 'intercalados' ? 'selected' : ''}>intercalados</option>
            </select>
        </div>
    `;
    
    // Reaplicar os event listeners
    monitorarCampos(medicamentoId);
}

// Função para remover um medicamento
window.removerMedicamento = function(medicamentoId) {
    if (document.querySelectorAll('.medicamento-container').length > 1) {
        document.getElementById(medicamentoId).remove();
        
        // Atualizar os números dos medicamentos
        const containers = document.querySelectorAll('.medicamento-container');
        containers.forEach((container, index) => {
            const header = container.querySelector('h3');
            if (header) {
                header.textContent = `Medicamento ${index + 1}`;
            }
        });
    } else {
        alert('Pelo menos um medicamento deve ser adicionado.');
    }
}