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
    const tutor = tutores.find(t => t.id === pet.tutorId);

    if (!pet) {
        document.getElementById('lista-atendimentos').innerHTML = '<p>Nenhum atendimento anterior encontrado.</p>';
        return;
    }

    // Exibe informações do pet
    document.getElementById('pet-info-header').innerHTML = `
        <h2>${pet.nome} - ${pet.especie} (${pet.raca})</h2>
        <p><strong>Tutor:</strong> ${tutor.nome}</p>
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

    // Cria a lista de atendimentos
    atendimentos.forEach(atendimento => {
        const atendimentoDiv = document.createElement('div');
        atendimentoDiv.className = 'atendimento-item';
        atendimentoDiv.innerHTML = `
            <h3>Atendimento em ${formatarData(atendimento.dataAtendimento)}</h3>
            <p><strong>Queixa principal:</strong> ${atendimento.queixaPrincipal}</p>
            <p><strong>Diagnóstico/Tratamento:</strong> ${atendimento.observacoes || 'Não registrado'}</p>
            <div class="detalhes-atendimento">
                <h4>Detalhes:</h4>
                <p><strong>Sistema Digestório:</strong> ${atendimento.digestorio?.join(', ') || 'Nenhum'}</p>
                <p><strong>Sistema Cardiorespiratório:</strong> ${atendimento.cardio?.join(', ') || 'Nenhum'}</p>
                <p><strong>Exames realizados:</strong> ${atendimento.exames?.join(', ') || 'Nenhum'}</p>
            </div>
            <hr>
        `;
        listaAtendimentos.appendChild(atendimentoDiv);
    });

    function formatarData(dataISO) {
        if (!dataISO) return '';
        const [ano, mes, dia] = dataISO.split('-');
        return `${dia}/${mes}/${ano}`;
    }
});