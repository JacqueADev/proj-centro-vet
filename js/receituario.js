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
    function adicionarMedicamento() {
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
                    <select id="tipo-uso-${contadorMedicamentos}" class="tipo-uso-select" onchange="atualizarFormularioMedicamento('${medicamentoId}')">
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
            </div>
        `;
        
        container.insertAdjacentHTML('beforeend', medicamentoHTML);
        atualizarFormularioMedicamento(medicamentoId);
        contadorMedicamentos++;
    }
    
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
        
        // Aqui você pode implementar a lógica para salvar na ficha de anamnese
        console.log('Receituário a ser salvo:', receituario);
        alert('Receituário salvo com sucesso na ficha de anamnese!');
        
        // Fechar a janela após salvar (opcional)
        window.close();
    });
});

// Função para atualizar o formulário do medicamento com base no tipo de uso
function atualizarFormularioMedicamento(medicamentoId) {
    const id = medicamentoId.split('-')[1];
    const tipoUso = document.getElementById(`tipo-uso-${id}`).value;
    const instrucoesDiv = document.getElementById(`instrucoes-${medicamentoId}`);
    
    let fraseAdministracao = '';
    switch(tipoUso) {
        case 'oral':
            fraseAdministracao = 'Fornecer de forma oral';
            break;
        case 'topico':
            fraseAdministracao = 'Aplicar de forma tópica';
            break;
        case 'injetavel':
            fraseAdministracao = 'Fornecer de forma injetável';
            break;
    }
    
    instrucoesDiv.innerHTML = `
        <div class="form-row">
            <span>${fraseAdministracao}</span>
            <input type="number" id="dosagem-${id}" min="1" placeholder="Quantidade" style="width: 80px;">
            <select id="unidade-dosagem-${id}">
                ${tipoUso === 'oral' ? '<option value="comprimido">comprimido(s)</option>' : ''}
                <option value="ml">ml</option>
                <option value="gotas">gotas</option>
                ${tipoUso === 'topico' ? '<option value="aplicacoes">aplicação(ões)</option>' : ''}
            </select>
            <span>x</span>
            <input type="number" id="frequencia-${id}" min="1" max="4" placeholder="1" style="width: 50px;">
            <span>vezes ao dia, durante</span>
            <input type="number" id="periodo-${id}" min="1" placeholder="Número" style="width: 60px;">
            <select id="unidade-periodo-${id}">
                <option value="dias">dia(s)</option>
                <option value="semanas">semana(s)</option>
                <option value="meses">mês(es)</option>
            </select>
            <select id="tipo-administracao-${id}">
                <option value="consecutivos">consecutivos</option>
                <option value="intercalados">intercalados</option>
            </select>
        </div>
    `;
}

// Função para remover um medicamento
function removerMedicamento(medicamentoId) {
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