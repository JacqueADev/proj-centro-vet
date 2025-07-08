document.addEventListener('DOMContentLoaded', function() {
    // 1. Obter ID do tutor da URL
    const urlParams = new URLSearchParams(window.location.search);
    const tutorId = urlParams.get('id');
    
    // 2. Elementos do DOM
    const botaoVoltar = document.getElementById('botao-voltar');
    const nomeTutor = document.getElementById('nome-tutor');
    const telefoneTutor = document.getElementById('telefone-tutor');
    const emailTutor = document.getElementById('email-tutor');
    const enderecoTutor = document.getElementById('endereco-tutor');
    const btnEditarTutor = document.getElementById('editar-tutor');
    const listaPets = document.getElementById('lista-pets');
    const modalPet = document.getElementById('modalPet');
    const formPet = document.getElementById('formPet');
    const btnExcluirPet = document.getElementById('excluirPet');
    
    // 3. Carregar dados do tutor
    function carregarTutor() {
        const tutores = JSON.parse(localStorage.getItem('tutores')) || [];
        return tutores.find(t => t.id === tutorId);
    }
    
    // 4. Carregar pets do tutor
    function carregarPets() {
        const pets = JSON.parse(localStorage.getItem('pets')) || [];
        return pets.filter(p => p.tutorId === tutorId);
    }
    
    // 5. Exibir dados do tutor
    function exibirDadosTutor() {
        const tutor = carregarTutor();
        if (!tutor) {
            alert('Tutor não encontrado!');
            window.location.href = 'cadastrados.html';
            return;
        }
        
        nomeTutor.textContent = tutor.nome;
        telefoneTutor.textContent = tutor.telefone || 'Não informado';
        emailTutor.textContent = tutor.email || 'Não informado';
        enderecoTutor.textContent = `${tutor.endereco || ''} ${tutor.bairro ? ' - ' + tutor.bairro : ''} ${tutor.cidade ? ' - ' + tutor.cidade : ''}`.trim() || 'Não informado';
    }
    
    // 6. Exibir pets do tutor
    function exibirPets() {
        const pets = carregarPets();
        listaPets.innerHTML = '';
        
        if (pets.length === 0) {
            listaPets.innerHTML = '<p class="sem-pets">Nenhum pet cadastrado para este tutor.</p>';
            return;
        }
        
        pets.forEach(pet => {
            const card = document.createElement('div');
            card.className = 'card-pet';
            card.innerHTML = `
                <h3><i class="fas fa-paw"></i> ${pet.nome}</h3>
                <div class="info-pet">
                    <p><strong>Espécie:</strong> ${pet.especie}</p>
                    <p><strong>Raça:</strong> ${pet.raca || 'Não informada'}</p>
                    <p><strong>Idade:</strong> ${pet.idade}</p>
                    <p><strong>Sexo:</strong> ${pet.sexo}</p>
                </div>
                ${pet.aderiuPlano ? `
                <div class="plano-info">
                    <p><strong>Plano:</strong> ${pet.planoPet}</p>
                    <p><strong>Adesão:</strong> ${formatarData(pet.dataAderiuPlano)}</p>
                </div>
                ` : ''}
            `;
            
            card.addEventListener('click', () => abrirModalPet(pet));
            listaPets.appendChild(card);
        });
    }
    
    // 7. Abrir modal para edição do pet
    function abrirModalPet(pet) {
        document.getElementById('titulo-modal-pet').textContent = `Editar ${pet.nome}`;
        document.getElementById('petId').value = pet.id;
        document.getElementById('nomePet').value = pet.nome;
        // Preencher todos os outros campos do formulário...
        
        modalPet.style.display = 'block';
    }
    
    // 8. Função para formatar data
    function formatarData(dataString) {
        if (!dataString) return 'N/A';
        const data = new Date(dataString);
        return data.toLocaleDateString('pt-BR');
    }
    
    // 9. Configurar eventos
    botaoVoltar.addEventListener('click', () => {
        window.location.href = 'cadastrados.html';
    });
    
    btnEditarTutor.addEventListener('click', () => {
        window.location.href = `editar-tutor.html?id=${tutorId}`;
    });
    
    formPet.addEventListener('submit', function(e) {
        e.preventDefault();
        const petId = document.getElementById('petId').value;
        const pets = JSON.parse(localStorage.getItem('pets')) || [];
        const petIndex = pets.findIndex(p => p.id === petId);
        
        if (petIndex !== -1) {
            // Atualizar os dados do pet
            pets[petIndex] = {
                ...pets[petIndex],
                nome: document.getElementById('nomePet').value,
                // Atualizar todos os outros campos...
            };
            
            localStorage.setItem('pets', JSON.stringify(pets));
            exibirPets();
            modalPet.style.display = 'none';
            alert('Dados do pet atualizados com sucesso!');
        }
    });
    
    btnExcluirPet.addEventListener('click', function() {
        if (confirm(`Tem certeza que deseja excluir este pet? Esta ação não pode ser desfeita.`)) {
            const petId = document.getElementById('petId').value;
            let pets = JSON.parse(localStorage.getItem('pets')) || [];
            pets = pets.filter(p => p.id !== petId);
            
            localStorage.setItem('pets', JSON.stringify(pets));
            exibirPets();
            modalPet.style.display = 'none';
            alert('Pet excluído com sucesso!');
        }
    });
    
    document.querySelector('.close').addEventListener('click', () => {
        modalPet.style.display = 'none';
    });
    
    window.onclick = function(event) {
        if (event.target === modalPet) {
            modalPet.style.display = 'none';
        }
    };
    
    // 10. Inicializar a página
    exibirDadosTutor();
    exibirPets();
});