document.addEventListener("DOMContentLoaded", function() {
    console.log("Anamnese script carregado!");

    // Carrega tutores do localStorage
    const carregarTutores = () => {
        const tutores = JSON.parse(localStorage.getItem('tutores')) || [];
        const tutorSelect = document.getElementById('tutor');
        
        tutorSelect.innerHTML = '<option value="">Selecione um tutor</option>';
        
        tutores.forEach(tutor => {
            const option = document.createElement('option');
            option.value = tutor.id;
            option.textContent = `${tutor.nome} (${tutor.telefone})`;
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
        totalElement.textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
        listaExames.appendChild(totalElement);
    };

    // Mostra/oculta campo de pagamento personalizado
    const togglePagamentoCustom = () => {
        const formaPagamento = document.getElementById('formaPagamento');
        const container = document.getElementById('outroPagamentoContainer');
        
        container.style.display = formaPagamento.value === 'outro' ? 'block' : 'none';
    };

    // Salva a anamnese no localStorage
    const salvarAnamnese = (formData) => {
        const anamneses = JSON.parse(localStorage.getItem('anamneses')) || [];
        
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
        
        // Configura eventos de exames
        document.getElementById('exames').addEventListener('change', atualizarListaExames);
        
        // Configura pagamento personalizado
        document.getElementById('formaPagamento').addEventListener('change', togglePagamentoCustom);
        
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
        
        // Botão de buscar tutor (opcional)
        document.getElementById('buscar-tutor').addEventListener('click', function() {
            alert('Funcionalidade de busca avançada pode ser implementada aqui');
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
                exames: Array.from(document.getElementById('exames').selectedOptions).map(opt => opt.value),
                tipoAtendimento: document.getElementById('tipoAtendimento').value,
                formaPagamento: document.getElementById('formaPagamento').value,
                outroPagamento: document.getElementById('outroPagamento').value
            };
            
            const anamneseSalva = salvarAnamnese(formData);
            console.log('Anamnese salva:', anamneseSalva);
            
            alert('Anamnese salva com sucesso!');
            this.reset();
            document.getElementById('info-pet').style.display = 'none';
            
            // Opcional: redirecionar ou limpar formulário
            // window.location.href = 'tela-pos-login.html';
        });
    };

    init();
});