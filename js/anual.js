document.addEventListener("DOMContentLoaded", function() {
    // Redirecionamentos
    const redirecionamentos = {
        "botao-agenda": "tela-agenda.html",
        "botao-cadastrados": "tela-cadastrados.html",
        "botao-novo-atendimento": "tela-anamnese.html",
        "botao-novoCadastro": "tela-novo-cadastro.html",
        "botao-registroAnual": "tela-registro-anual.html"
    };

    Object.keys(redirecionamentos).forEach(id => {
        document.getElementById(id)?.addEventListener("click", () => {
            window.location.href = redirecionamentos[id];
        });
    });

    // Carrega os atendimentos
    carregarAtendimentos();
    
    // Configura filtros
    document.getElementById("filtro-ano")?.addEventListener("change", filtrarAtendimentos);
    document.getElementById("filtro-mes")?.addEventListener("change", filtrarAtendimentos);
    document.getElementById("filtro-tipo")?.addEventListener("change", filtrarAtendimentos);
    document.getElementById("busca-anual")?.addEventListener("input", filtrarAtendimentos);
});

function carregarAtendimentos() {
    const atendimentos = JSON.parse(localStorage.getItem('anamneses')) || [];
    const pets = JSON.parse(localStorage.getItem('pets')) || [];
    const tutores = JSON.parse(localStorage.getItem('tutores')) || [];
    
    if (atendimentos.length === 0) {
        const container = document.getElementById("lista-atendimentos");
        if (container) {
            container.innerHTML = `
                <div class="sem-registros">
                    <i class="fas fa-calendar-times"></i>
                    <p>Nenhum atendimento registrado ainda</p>
                </div>
            `;
        }
        return;
    }
    
    // Processa os atendimentos para incluir informações de pet e tutor
    const atendimentosCompletos = atendimentos.map(atendimento => {
        const pet = pets.find(p => p.id === atendimento.petId) || {};
        const tutor = tutores.find(t => t.id === atendimento.tutorId) || {};
        
        return {
            ...atendimento,
            pet,
            tutor,
            valorTotal: calcularValorTotal(atendimento)
        };
    });
    
    localStorage.setItem('atendimentosProcessados', JSON.stringify(atendimentosCompletos));
    renderizarAtendimentos(atendimentosCompletos);
    atualizarResumo(atendimentosCompletos);
    atualizarDadosLateral(atendimentosCompletos);
}

function calcularValorTotal(atendimento) {
    const precosAtendimento = {
        'consulta_clinica': 60.00,
        'consulta_domiciliar': 80.00,
        'retorno': 0.00,
        'emergencia': 80.00,
        'guia_prever': 30.00,
        'consulta_particular': 60.00
    };
    
    let total = precosAtendimento[atendimento.tipoAtendimento] || 0;
    
    if (atendimento.exames && atendimento.exames.length > 0) {
        total += atendimento.exames.reduce((sum, exame) => sum + (exame.valor || 0), 0);
    }
    
    return total;
}

function renderizarAtendimentos(atendimentos) {
    const container = document.getElementById("lista-atendimentos");
    if (!container) return;
    
    container.innerHTML = '';
    
    if (atendimentos.length === 0) {
        container.innerHTML = `
            <div class="sem-registros">
                <i class="fas fa-search"></i>
                <p>Nenhum atendimento encontrado com os filtros selecionados</p>
            </div>
        `;
        return;
    }
    
    atendimentos.forEach(atendimento => {
        const card = document.createElement("div");
        card.className = `card-atendimento ${atendimento.tipoAtendimento}`;
        
        const dataObj = new Date(atendimento.dataAtendimento);
        const dataFormatada = dataObj.toLocaleDateString('pt-BR');
        
        const tipos = {
            'consulta_clinica': 'Consulta em Clínica',
            'consulta_domiciliar': 'Consulta Domiciliar',
            'retorno': 'Retorno',
            'emergencia': 'Emergência',
            'guia_prever': 'Guia Prever',
            'consulta_particular': 'Consulta em Clínica'
        };
        
        card.innerHTML = `
            <div class="card-header">
                <span class="card-tipo">${tipos[atendimento.tipoAtendimento] || atendimento.tipoAtendimento}</span>
                <span class="card-data">${dataFormatada}</span>
            </div>
            <div class="card-pet">
                <i class="fas ${atendimento.pet.especie === 'Gato' ? 'fa-cat' : 'fa-dog'}"></i>
                ${atendimento.pet.nome || 'Pet não encontrado'}
            </div>
            <div class="card-tutor">${atendimento.tutor.nome || 'Tutor não encontrado'}</div>
            <div class="card-valor">${formatarMoeda(atendimento.valorTotal || 0)}</div>
        `;
        
        container.appendChild(card);
    });
}

function filtrarAtendimentos() {
    const ano = document.getElementById("filtro-ano")?.value;
    const mes = document.getElementById("filtro-mes")?.value;
    const tipo = document.getElementById("filtro-tipo")?.value;
    const busca = document.getElementById("busca-anual")?.value.toLowerCase() || '';
    
    const atendimentos = JSON.parse(localStorage.getItem('atendimentosProcessados')) || [];
    
    const atendimentosFiltrados = atendimentos.filter(atendimento => {
        if (ano && !atendimento.dataAtendimento.includes(ano)) return false;
        
        if (mes) {
            const data = new Date(atendimento.dataAtendimento);
            if ((data.getMonth() + 1) != mes) return false;
        }
        
        if (tipo && atendimento.tipoAtendimento !== tipo) {
            if (!(tipo === 'consulta_clinica' && atendimento.tipoAtendimento === 'consulta_particular')) {
                return false;
            }
        }
        
        if (busca) {
            const matchPet = atendimento.pet.nome && atendimento.pet.nome.toLowerCase().includes(busca);
            const matchTutor = atendimento.tutor.nome && atendimento.tutor.nome.toLowerCase().includes(busca);
            if (!matchPet && !matchTutor) return false;
        }
        
        return true;
    });
    
    renderizarAtendimentos(atendimentosFiltrados);
    atualizarResumo(atendimentosFiltrados);
    atualizarDadosLateral(atendimentosFiltrados);
}

function atualizarResumo(atendimentos) {
    let totalConsultas = 0;
    let totalDomiciliar = 0;
    let totalEmergencias = 0;
    let totalGuias = 0;
    let totalExames = 0;
    
    atendimentos.forEach(atendimento => {
        const valor = atendimento.valorTotal || 0;
        const valorExames = atendimento.exames ? 
            atendimento.exames.reduce((sum, exame) => sum + (exame.valor || 0), 0) : 0;
        
        switch(atendimento.tipoAtendimento) {
            case 'consulta_clinica':
            case 'consulta_particular':
                totalConsultas += valor - valorExames;
                break;
            case 'consulta_domiciliar':
                totalDomiciliar += valor - valorExames;
                break;
            case 'emergencia':
                totalEmergencias += valor - valorExames;
                break;
            case 'guia_prever':
                totalGuias += valor - valorExames;
                break;
        }
        
        totalExames += valorExames;
    });
    
    const totalGeral = totalConsultas + totalDomiciliar + totalEmergencias + totalGuias + totalExames;
    
    if (document.getElementById("total-anual")) {
        document.getElementById("total-anual").textContent = formatarMoeda(totalGeral);
        document.getElementById("total-consultas").textContent = formatarMoeda(totalConsultas);
        document.getElementById("total-domiciliar").textContent = formatarMoeda(totalDomiciliar);
        document.getElementById("total-emergencias").textContent = formatarMoeda(totalEmergencias);
        document.getElementById("total-guias").textContent = formatarMoeda(totalGuias);
        document.getElementById("total-exames").textContent = formatarMoeda(totalExames);
    }
}

function atualizarDadosLateral(atendimentos) {
    // Atualiza filtros aplicados
    const anoSelecionado = document.getElementById("filtro-ano")?.value || "Todos";
    const mesSelecionado = document.getElementById("filtro-mes")?.value || "Todos";
    const tipoSelecionado = document.getElementById("filtro-tipo")?.value || "Todos";
    
    document.getElementById("dado-ano").textContent = anoSelecionado === "Todos" ? "Todos" : anoSelecionado;
    
    if (mesSelecionado === "Todos") {
        document.getElementById("dado-mes").textContent = "Todos";
    } else {
        const meses = [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ];
        document.getElementById("dado-mes").textContent = meses[parseInt(mesSelecionado) - 1];
    }
    
    document.getElementById("dado-tipo").textContent = tipoSelecionado === "Todos" ? "Todos" : 
        document.querySelector(`#filtro-tipo option[value="${tipoSelecionado}"]`).textContent;
    
    // Atualiza estatísticas
    document.getElementById("dado-total-atendimentos").textContent = atendimentos.length;
    
    const petsUnicos = new Set(atendimentos.map(a => a.petId));
    document.getElementById("dado-total-pets").textContent = petsUnicos.size;
    
    const tutoresUnicos = new Set(atendimentos.map(a => a.tutorId));
    document.getElementById("dado-total-tutores").textContent = tutoresUnicos.size;
    
    // Atualiza dados financeiros
    if (atendimentos.length > 0) {
        const valores = atendimentos.map(a => a.valorTotal || 0);
        const maiorValor = Math.max(...valores);
        const menorValor = Math.min(...valores);
        const mediaValor = valores.reduce((a, b) => a + b, 0) / valores.length;
        
        document.getElementById("dado-maior-valor").textContent = formatarMoeda(maiorValor);
        document.getElementById("dado-menor-valor").textContent = formatarMoeda(menorValor);
        document.getElementById("dado-media-valor").textContent = formatarMoeda(mediaValor);
    } else {
        document.getElementById("dado-maior-valor").textContent = "R$ 0,00";
        document.getElementById("dado-menor-valor").textContent = "R$ 0,00";
        document.getElementById("dado-media-valor").textContent = "R$ 0,00";
    }
}

function formatarMoeda(valor) {
    return 'R$ ' + Number(valor).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
}