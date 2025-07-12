document.addEventListener('DOMContentLoaded', function() {
    // 1. Configuração inicial
    const botaoVoltar = document.getElementById('botao-voltar');
    const inputPesquisa = document.getElementById('inputPesquisa');
    const botaoBuscar = document.getElementById('botaoBuscar');
    const tabelaCorpo = document.getElementById('tabelaCorpo');

    // 2. Inicialização dos selects de plano (mantido para outras funcionalidades)
    function inicializarSelectPlanos() {
        // Esta função pode ser mantida caso seja usada em outras partes do sistema
    }

    // 3. Carrega os planos disponíveis nos selects (mantido para outras funcionalidades)
    function carregarOpcoesPlanos() {
        // Esta função pode ser mantida caso seja usada em outras partes do sistema
    }

    // 4. Configuração do botão Voltar
    if (botaoVoltar) {
        botaoVoltar.addEventListener('click', function() {
            window.location.href = 'tela-pos-login.html';
        });
    }

    // 5. Função para carregar tutores do localStorage
    function carregarTutores() {
        const tutores = JSON.parse(localStorage.getItem('tutores')) || [];
        return tutores.sort((a, b) => {
            const dateA = new Date(a.dataCadastro || 0);
            const dateB = new Date(b.dataCadastro || 0);
            return dateB - dateA; // Mais recentes primeiro
        });
    }

    // 6. Função para contar pets por tutor
    function contarPetsPorTutor(tutorId) {
        const pets = JSON.parse(localStorage.getItem('pets')) || [];
        return pets.filter(pet => pet.tutorId === tutorId).length;
    }

    // 7. Função para verificar se o tutor tem pets no plano
    function verificarPetsNoPlano(tutorId) {
        const pets = JSON.parse(localStorage.getItem('pets')) || [];
        
        return pets.some(pet => 
            pet.tutorId === tutorId && 
            pet.aderiuPlano === true && 
            pet.planoPet && 
            pet.planoPet !== ""
        );
    }

    // 8. Função para formatar data
    function formatarData(data) {
        if (!data) return 'N/A';
        
        try {
            if (typeof data === 'string' && data.includes('T')) {
                data = new Date(data);
            }
            
            if (data instanceof Date && !isNaN(data)) {
                const dia = data.getDate().toString().padStart(2, '0');
                const mes = (data.getMonth() + 1).toString().padStart(2, '0');
                const ano = data.getFullYear();
                return `${dia}/${mes}/${ano}`;
            }
            
            if (typeof data === 'string' && data.match(/^\d{4}-\d{2}-\d{2}$/)) {
                const [ano, mes, dia] = data.split('-');
                return `${dia}/${mes}/${ano}`;
            }
        } catch (e) {
            console.error('Erro ao formatar data:', e);
        }
        
        return 'N/A';
    }

    // 9. Função para formatar dados dos tutores para exibição
    function formatarTutoresParaExibicao(tutores) {
        return tutores.map(tutor => {
            const temPetsNoPlano = verificarPetsNoPlano(tutor.id);
            const idNumerico = tutor.id.split('_')[1];
            
            return {
                id: idNumerico,
                nome: tutor.nome,
                telefone: tutor.telefone,
                dataCadastro: tutor.dataCadastro || new Date().toISOString(),
                pets: contarPetsPorTutor(tutor.id),
                temPetsNoPlano: temPetsNoPlano,
                dadosCompletos: tutor
            };
        });
    }

    // 10. Função para renderizar a tabela (ATUALIZADA - apenas botão de exclusão)
    function renderizarTabela(tutoresFormatados) {
        tabelaCorpo.innerHTML = '';
        
        if (tutoresFormatados.length === 0) {
            tabelaCorpo.innerHTML = `
                <tr>
                    <td colspan="7" class="sem-resultados">
                        Nenhum tutor encontrado
                    </td>
                </tr>
            `;
            return;
        }
        
        tutoresFormatados.forEach(tutor => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>#${tutor.id}</td>
                <td>${tutor.nome}</td>
                <td>${tutor.telefone}</td>
                <td>${formatarData(tutor.dataCadastro)}</td>
                <td><span class="pets">${tutor.pets}</span></td>
                <td>
                    ${tutor.temPetsNoPlano ? 
                        '<i class="fas fa-check-circle" style="color: var(--cor-sucesso);" tooltip="Possui pets no plano"></i>' : 
                        '<i class="fas fa-times-circle" style="color: var(--cor-erro);" tooltip="Não possui pets no plano"></i>'}
                </td>
                <td class="acoes">
                    <button class="btn-icon delete" onclick="excluirTutor('${tutor.dadosCompletos.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            
            tr.addEventListener('click', function(e) {
                if (!e.target.closest('.acoes')) {
                    window.location.href = `detales-tutores.html?id=${tutor.dadosCompletos.id}`;
                }
            });
            
            tabelaCorpo.appendChild(tr);
        });
    }

    // 11. Função para buscar tutores
    function buscarTutores(termo = '') {
        const tutores = carregarTutores();
        const tutoresComData = tutores.map(tutor => {
            if (!tutor.dataCadastro) {
                tutor.dataCadastro = new Date().toISOString();
            }
            return tutor;
        });
        
        if (tutoresComData.length !== tutores.length) {
            localStorage.setItem('tutores', JSON.stringify(tutoresComData));
        }
        
        const tutoresFormatados = formatarTutoresParaExibicao(tutoresComData);
        
        termo = termo.trim().toLowerCase();
        
        if (termo === '') {
            renderizarTabela(tutoresFormatados);
            return;
        }
        
        const resultados = tutoresFormatados.filter(tutor => 
            tutor.nome.toLowerCase().includes(termo)
        );
        
        renderizarTabela(resultados);
    }

    // 12. Configuração dos eventos de pesquisa
    botaoBuscar.addEventListener('click', function() {
        buscarTutores(inputPesquisa.value);
    });
    
    inputPesquisa.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            buscarTutores(inputPesquisa.value);
        }
    });

    inputPesquisa.addEventListener('input', function() {
        if (this.value === '') {
            buscarTutores();
        }
    });

    // 13. Função para excluir tutor (MANTIDA)
    window.excluirTutor = function(idTutor) {
        if (confirm('Tem certeza que deseja excluir este tutor e todos os seus pets?')) {
            let tutores = carregarTutores();
            tutores = tutores.filter(t => t.id !== idTutor);
            localStorage.setItem('tutores', JSON.stringify(tutores));
            
            let pets = JSON.parse(localStorage.getItem('pets')) || [];
            pets = pets.filter(pet => pet.tutorId !== idTutor);
            localStorage.setItem('pets', JSON.stringify(pets));
            
            buscarTutores(inputPesquisa.value);
            mostrarFeedback('Tutor excluído com sucesso!', 'sucesso');
        }
    };

    // 14. Função para mostrar feedback visual (MANTIDA)
    function mostrarFeedback(mensagem, tipo) {
        const feedback = document.createElement('div');
        feedback.textContent = mensagem;
        feedback.style.position = 'fixed';
        feedback.style.bottom = '20px';
        feedback.style.right = '20px';
        feedback.style.backgroundColor = tipo === 'sucesso' ? 'var(--cor-sucesso)' : 'var(--cor-erro)';
        feedback.style.color = 'white';
        feedback.style.padding = '10px 20px';
        feedback.style.borderRadius = '5px';
        feedback.style.zIndex = '1000';
        feedback.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        document.body.appendChild(feedback);

        setTimeout(() => {
            feedback.style.opacity = '0';
            feedback.style.transition = 'opacity 0.5s';
            setTimeout(() => feedback.remove(), 500);
        }, 3000);
    }

    // 15. Inicialização dos componentes (SIMPLIFICADA)
    buscarTutores();
});