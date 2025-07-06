document.addEventListener("DOMContentLoaded", function() {
    // Redirecionamentos
    const botaoAgenda = document.getElementById("botao-agenda");
    if (botaoAgenda) {
        botaoAgenda.addEventListener("click", function() {
            window.location.href = "tela-agenda.html";
        });
    }

    const botaoCadastrados = document.getElementById("botao-cadastrados");
    if (botaoCadastrados) {
        botaoCadastrados.addEventListener("click", function() {
            window.location.href = "tela-cadastrados.html";
        });
    }

    const botaoNovoAtendimento = document.getElementById("botao-novo-atendimento");
    if (botaoNovoAtendimento) {
        botaoNovoAtendimento.addEventListener("click", function() {
            window.location.href = "tela-anamnese.html";
        });
    }

    const botaoNovoCadastro = document.getElementById("botao-novoCadastro");
    if (botaoNovoCadastro) {
        botaoNovoCadastro.addEventListener("click", function() {
            window.location.href = "tela-novo-cadastro.html";
        });
    }

    const botaoRegistroAnual = document.getElementById("botao-registroAnual");
    if (botaoRegistroAnual) {
        botaoRegistroAnual.addEventListener("click", function() {
            window.location.href = "tela-pos-login.html"; // Ou a página específica para registro anual
        });
    }

    // NOVO BOTÃO - Redirecionamento para "Plano"
    const botaoPlano = document.getElementById("botao-plano");
    if (botaoPlano) {
        botaoPlano.addEventListener("click", function() {
            window.location.href = "tela-plano-saúde.html";
        });
    }

    // Carrega os pets para vacinação
    carregarPetsParaVacinar();

    // Filtros
    const buscaInput = document.getElementById("busca-pet");
    const filtroStatus = document.getElementById("filtro-status");

    buscaInput.addEventListener("input", filtrarPets);
    filtroStatus.addEventListener("change", filtrarPets);
});

function carregarPetsParaVacinar() {
    const pets = JSON.parse(localStorage.getItem('pets')) || [];
    const tutores = JSON.parse(localStorage.getItem('tutores')) || [];
    
    // Verifica se há histórico de vacinação
    const petsComVacina = pets.filter(pet => 
        pet.historico && pet.historico.length > 0 && 
        pet.historico.some(item => item.vacina)
    );
    
    if (petsComVacina.length === 0) {
        document.getElementById("lista-pets").innerHTML = `
            <div class="sem-registros">
                <i class="fas fa-info-circle" style="font-size: 24px; margin-bottom: 10px;"></i>
                <p>Nenhum pet com registro de vacina encontrado.</p>
            </div>
        `;
        return;
    }
    
    // Processa cada pet para determinar status da vacina
    const hoje = new Date();
    const petsProcessados = petsComVacina.map(pet => {
        const tutor = tutores.find(t => t.id === pet.tutorId) || {};
        const ultimaVacina = pet.historico
            .filter(item => item.vacina)
            .sort((a, b) => new Date(b.data) - new Date(a.data))[0];
        
        const dataUltimaVacina = new Date(ultimaVacina.data);
        const dataProximaVacina = new Date(dataUltimaVacina);
        dataProximaVacina.setFullYear(dataProximaVacina.getFullYear() + 1);
        
        // Calcula dias para próxima vacina
        const diasParaVacina = Math.floor((dataProximaVacina - hoje) / (1000 * 60 * 60 * 24));
        
        let status = "ok";
        if (hoje > dataProximaVacina) {
            status = "vencido";
        } else if (diasParaVacina <= 30) {
            status = "proximo";
        }
        
        return {
            ...pet,
            tutor,
            ultimaVacina: ultimaVacina,
            dataUltimaVacina,
            dataProximaVacina,
            status,
            diasParaVacina
        };
    });
    
    localStorage.setItem('petsProcessados', JSON.stringify(petsProcessados));
    renderizarPets(petsProcessados);
}

function renderizarPets(pets) {
    const listaPets = document.getElementById("lista-pets");
    listaPets.innerHTML = '';
    
    pets.forEach(pet => {
        const card = document.createElement("div");
        card.className = "card-pet";
        
        // Ícone por espécie
        const iconeEspecie = pet.especie === "Gato" ? "fa-cat" : "fa-dog";
        
        // Formata data
        const formatarData = (data) => 
            data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
        
        card.innerHTML = `
            <span class="status ${pet.status}">
                ${pet.status === "vencido" ? "Vencido" : 
                  pet.status === "proximo" ? "Próximo" : "Em dia"}
            </span>
            
            <h3><i class="fas ${iconeEspecie}"></i> ${pet.nome}</h3>
            <p><strong>Dono:</strong> ${pet.tutor.nome || 'Não informado'}</p>
            <p><strong>Espécie:</strong> ${pet.especie} (${pet.raca || 'SRD'})</p>
            <p><strong>Contato:</strong> ${pet.tutor.telefone || 'Não informado'}</p>
            
            <div class="info-vacina">
                <p><strong>Última vacina:</strong> ${formatarData(pet.dataUltimaVacina)}</p>
                <p><strong>Próxima dose:</strong> ${formatarData(pet.dataProximaVacina)}</p>
                <p><strong>Status:</strong> ${
                    pet.status === "vencido" ? "Vencida há " + Math.abs(pet.diasParaVacina) + " dias" :
                    pet.status === "proximo" ? "Vence em " + pet.diasParaVacina + " dias" :
                    "Em dia"
                }</p>
            </div>
            
            <button class="botao-whatsapp" 
                    data-telefone="${pet.tutor.telefone}" 
                    data-nome="${pet.nome}" 
                    data-dono="${pet.tutor.nome}">
                <i class="fab fa-whatsapp"></i> Enviar lembrete
            </button>
        `;
        
        listaPets.appendChild(card);
    });
    
    // Adiciona eventos aos botões do WhatsApp
    document.querySelectorAll('.botao-whatsapp').forEach(botao => {
        botao.addEventListener('click', enviarMensagemWhatsApp);
    });
}

function enviarMensagemWhatsApp(event) {
    const botao = event.currentTarget;
    const telefone = botao.getAttribute('data-telefone').replace(/\D/g, '');
    const nomePet = botao.getAttribute('data-nome');
    const nomeDono = botao.getAttribute('data-dono');
    
    if (!telefone) {
        alert("Número de telefone não disponível para este tutor.");
        return;
    }
    
    const mensagem = `Olá ${nomeDono}! 😊\n\nEste é um lembrete do *Centro Veterinário Integrativo Jhonatan Silvestre*:\n\n` +
                    `O(A) ${nomePet} está na época de renovar a vacina anual. ` +
                    `Por favor, entre em contato para agendarmos a aplicação.\n\n` +
                    `Atenciosamente,\nEquipe Veterinária`;
    
    window.open(`https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`, '_blank');
    
    // Opcional: Registrar o envio no histórico
    registrarEnvioLembrete(nomePet, nomeDono);
}

function registrarEnvioLembrete(nomePet, nomeDono) {
    const historicoLembretes = JSON.parse(localStorage.getItem('historicoLembretes')) || [];
    
    historicoLembretes.push({
        pet: nomePet,
        tutor: nomeDono,
        data: new Date().toISOString()
    });
    
    localStorage.setItem('historicoLembretes', JSON.stringify(historicoLembretes));
}

function filtrarPets() {
    const termo = document.getElementById("busca-pet").value.toLowerCase();
    const status = document.getElementById("filtro-status").value;
    
    const petsProcessados = JSON.parse(localStorage.getItem('petsProcessados')) || [];
    
    const petsFiltrados = petsProcessados.filter(pet => {
        // Filtro por busca
        const matchBusca = pet.nome.toLowerCase().includes(termo) || 
                         (pet.tutor.nome && pet.tutor.nome.toLowerCase().includes(termo));
        
        // Filtro por status
        const matchStatus = status === "todos" || 
                           (status === "vencidos" && pet.status === "vencido") ||
                           (status === "proximos" && pet.status === "proximo");
        
        return matchBusca && matchStatus;
    });
    
    renderizarPets(petsFiltrados);
}