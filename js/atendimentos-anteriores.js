document.addEventListener("DOMContentLoaded", function() {
    // Pega o ID do pet da URL
    const urlParams = new URLSearchParams(window.location.search);
    const petId = urlParams.get('petId');

    if (!petId) {
        alert('Pet não identificado!');
        window.close();
        return;
    }

    // Carrega os dados
    const pets = JSON.parse(localStorage.getItem('pets')) || [];
    const anamneses = JSON.parse(localStorage.getItem('anamneses')) || [];
    const tutores = JSON.parse(localStorage.getItem('tutores')) || [];

    // Encontra o pet e seu tutor
    const pet = pets.find(p => p.id === petId);
    const tutor = tutores.find(t => t.id === pet?.tutorId);

    if (!pet) {
        document.getElementById('lista-atendimentos').innerHTML = '<p>Nenhum atendimento anterior encontrado.</p>';
        return;
    }

    // Exibe informações do pet
    document.getElementById('pet-info-header').innerHTML = `
        <h2>${pet.nome} - ${pet.especie || 'Não informado'} (${pet.raca || 'Não informado'})</h2>
        <p><strong>Tutor:</strong> ${tutor?.nome || 'Não encontrado'}</p>
        <hr>
    `;

    // Filtra as anamneses deste pet
    const atendimentos = anamneses.filter(a => a.petId === petId)
                                 .sort((a, b) => new Date(b.dataAtendimento) - new Date(a.dataAtendimento));

    const listaAtendimentos = document.getElementById('lista-atendimentos');

    if (atendimentos.length === 0) {
        listaAtendimentos.innerHTML = '<p>Nenhum atendimento anterior registrado para este pet.</p>';
        return;
    }

    // Cria a lista de atendimentos com todos os dados
    atendimentos.forEach(atendimento => {
        const atendimentoDiv = document.createElement('div');
        atendimentoDiv.className = 'atendimento-item';
        
        // Formata os exames para mostrar nome e valor
        const examesFormatados = atendimento.exames?.map(exame => 
            `${exame.nome} (${formatarMoeda(exame.valor)})`).join(', ') || 'Nenhum';
        
        atendimentoDiv.innerHTML = `
            <h3>Atendimento em ${formatarData(atendimento.dataAtendimento)}</h3>
            <div class="detalhes-atendimento">
                <h4>Dados Básicos:</h4>
                <p><strong>Queixa principal:</strong> ${atendimento.queixaPrincipal || 'Não registrado'}</p>
                <p><strong>Temperatura:</strong> ${atendimento.temperatura || 'Não registrada'} °C</p>
                <p><strong>Medicação recente:</strong> ${atendimento.nomeMedicacao || 'Nenhuma'}</p>
                
                <h4>Anamnese:</h4>
                <p><strong>Sistema Digestório:</strong> ${formatarLista(atendimento.digestorio)} ${atendimento.outrosDigestorio ? `(Outros: ${atendimento.outrosDigestorio})` : ''}</p>
                <p><strong>Sistema Neurológico:</strong> ${formatarLista(atendimento.neurologico)} ${atendimento.outrosNeurologico ? `(Outros: ${atendimento.outrosNeurologico})` : ''}</p>
                <p><strong>Sistema Locomotor:</strong> ${formatarLista(atendimento.locomotor)} ${atendimento.outrosLocomotor ? `(Outros: ${atendimento.outrosLocomotor})` : ''}</p>
                <p><strong>Pele:</strong> ${formatarLista(atendimento.pele)} ${atendimento.outrosPele ? `(Outros: ${atendimento.outrosPele})` : ''}</p>
                <p><strong>Olhos:</strong> ${formatarLista(atendimento.olhos)} ${atendimento.outrosOlhos ? `(Outros: ${atendimento.outrosOlhos})` : ''}</p>
                <p><strong>Ouvido:</strong> ${formatarLista(atendimento.ouvido)} ${atendimento.outrosOuvido ? `(Outros: ${atendimento.outrosOuvido})` : ''}</p>
                <p><strong>Sistema Cardiorespiratório:</strong> ${formatarLista(atendimento.cardio)} ${atendimento.outrosCardio ? `(Outros: ${atendimento.outrosCardio})` : ''}</p>
                
                <h4>Exame Físico:</h4>
                <p><strong>Mucosa:</strong> ${atendimento.mucosa || 'Não avaliada'}</p>
                <p><strong>Pelagem:</strong> ${atendimento.pelagem || 'Não avaliada'}</p>
                <p><strong>Linfonodos:</strong> ${atendimento.linfonodos || 'Não avaliados'}</p>
                <p><strong>Cavidade Oral:</strong> ${atendimento.cavidadeOral || 'Não avaliada'}</p>
                <p><strong>Hidratação:</strong> ${atendimento.hidratacao || 'Não avaliada'}</p>
                <p><strong>Alimentação:</strong> ${atendimento.alimentacao || 'Não avaliada'}</p>
                <p><strong>Conduto Auditivo:</strong> ${atendimento.condutoAuditivo || 'Não avaliado'}</p>
                <p><strong>Oftalmológico:</strong> ${atendimento.oftalmo || 'Não avaliado'}</p>
                <p><strong>Cavidade Nasal:</strong> ${atendimento.cavidadeNasal || 'Não avaliada'}</p>
                
                <h4>Conduta Clínica:</h4>
                <p>${atendimento.condutaClinica || 'Não registrada'}</p>
                
                <h4>Financeiro:</h4>
                <p><strong>Tipo de Atendimento:</strong> ${formatarTipoAtendimento(atendimento.tipoAtendimento)}</p>
                <p><strong>Exames solicitados:</strong> ${examesFormatados}</p>
                <p><strong>Forma de Pagamento:</strong> ${formatarFormaPagamento(atendimento.formaPagamento)}</p>
                ${atendimento.formaPagamento === 'credito' ? `
                    <p><strong>Parcelas:</strong> ${atendimento.parcelas}x</p>
                    <p><strong>Valor Total:</strong> ${formatarMoeda(atendimento.valorTotal)}</p>
                    <p><strong>Valor Final (maquininha):</strong> ${formatarMoeda(atendimento.valorFinal)}</p>
                    <p><strong>Juros:</strong> ${formatarMoeda(atendimento.juros)}</p>
                ` : ''}
                <p><strong>Valor Total:</strong> ${formatarMoeda(atendimento.valorTotal)}</p>
            </div>
            <hr>
        `;
        listaAtendimentos.appendChild(atendimentoDiv);
    });

    // Funções auxiliares
    function formatarData(dataISO) {
        if (!dataISO) return 'Data não registrada';
        const [ano, mes, dia] = dataISO.split('T')[0].split('-');
        return `${dia}/${mes}/${ano}`;
    }

    function formatarMoeda(valor) {
        if (!valor) return 'R$ 0,00';
        return 'R$ ' + parseFloat(valor).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
    }

    function formatarLista(lista) {
        return lista?.join(', ') || 'Nenhum';
    }

    function formatarTipoAtendimento(tipo) {
        const tipos = {
            'consulta_clinica': 'Consulta em clínica',
            'consulta_domiciliar': 'Consulta domiciliar',
            'retorno': 'Retorno',
            'emergencia': 'Emergência',
            'guia_prever': 'Guia Prever'
        };
        return tipos[tipo] || tipo || 'Não especificado';
    }

    function formatarFormaPagamento(forma) {
        const formas = {
            'credito': 'Cartão de Crédito',
            'debito': 'Cartão de Débito',
            'dinheiro': 'Dinheiro',
            'pix': 'Pix'
        };
        return formas[forma] || forma || 'Não especificada';
    }
});