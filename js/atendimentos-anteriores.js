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
    const anexos = JSON.parse(localStorage.getItem('anexos')) || [];

    // Encontra o pet e seu tutor
    const pet = pets.find(p => p.id === petId);
    const tutor = tutores.find(t => t.id === pet?.tutorId);

    if (!pet) {
        document.getElementById('atendimento-container').innerHTML = '<p>Nenhum atendimento anterior encontrado.</p>';
        return;
    }

    // Exibe informações do pet
    document.getElementById('pet-info-header').innerHTML = `
        <h2>${pet.nome} - ${pet.especie || 'Não informado'} (${pet.raca || 'Não informado'})</h2>
        <p><strong>Tutor:</strong> ${tutor?.nome || 'Não encontrado'}</p>
        <hr>
    `;

    // Filtra as anamneses deste pet e ordena por data (mais recente primeiro)
    const atendimentos = anamneses.filter(a => a.petId === petId)
                                 .sort((a, b) => new Date(b.dataAtendimento) - new Date(a.dataAtendimento));

    let atendimentoAtual = 0;

    // Função para exibir o atendimento atual
    function exibirAtendimento(index) {
        const container = document.getElementById('atendimento-container');
        
        if (atendimentos.length === 0) {
            container.innerHTML = '<p>Nenhum atendimento anterior registrado para este pet.</p>';
            return;
        }

        if (index < 0) index = 0;
        if (index >= atendimentos.length) index = atendimentos.length - 1;
        
        atendimentoAtual = index;
        const atendimento = atendimentos[atendimentoAtual];
        
        // Formata os exames para mostrar nome e valor
        const examesFormatados = atendimento.exames?.map(exame => 
            `${exame.nome} (${formatarMoeda(exame.valor)})`).join(', ') || 'Nenhum';
        
        container.innerHTML = `
            <div class="atendimento-item">
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
                    ${atendimento.temAnexos ? '<p><strong>Anexos:</strong> Este atendimento possui arquivos anexados</p>' : ''}
                </div>
            </div>
        `;
        
        // Atualiza o contador
        document.getElementById('contador-atendimentos').textContent = 
            `${atendimentoAtual + 1}/${atendimentos.length}`;
        
        // Atualiza os botões de navegação
        document.getElementById('btn-anterior').disabled = atendimentoAtual === 0;
        document.getElementById('btn-proximo').disabled = atendimentoAtual === atendimentos.length - 1;
        
        // Carrega os anexos para este atendimento
        carregarAnexos(atendimento.id);
    }

    // Função para carregar anexos
    function carregarAnexos(atendimentoId) {
        const listaAnexos = document.getElementById('lista-anexos');
        listaAnexos.innerHTML = '';
        
        const anexosDoAtendimento = anexos.filter(a => a.atendimentoId === atendimentoId);
        
        if (anexosDoAtendimento.length === 0) {
            listaAnexos.innerHTML = '<p>Nenhum anexo encontrado para este atendimento.</p>';
            return;
        }
        
        anexosDoAtendimento.forEach(anexo => {
            const anexoItem = document.createElement('div');
            anexoItem.className = 'anexo-item';
            
            if (anexo.tipo.startsWith('image/')) {
                anexoItem.innerHTML = `
                    <img src="${anexo.conteudo}" alt="${anexo.nome}">
                    <span class="anexo-nome">${anexo.nome}</span>
                    <div class="anexo-acoes">
                        <button class="btn-anexo" onclick="visualizarAnexo('${anexo.id}')">
                            <i class="fas fa-eye"></i> Visualizar
                        </button>
                        <button class="btn-anexo" onclick="downloadAnexo('${anexo.id}')">
                            <i class="fas fa-download"></i> Baixar
                        </button>
                        <button class="btn-anexo btn-remover" onclick="removerAnexo('${anexo.id}')">
                            <i class="fas fa-trash"></i> Remover
                        </button>
                    </div>
                `;
            } else {
                anexoItem.innerHTML = `
                    <div class="anexo-icon">
                        <i class="fas fa-file-pdf" style="font-size: 48px; color: #e74c3c;"></i>
                    </div>
                    <span class="anexo-nome">${anexo.nome}</span>
                    <div class="anexo-acoes">
                        <button class="btn-anexo" onclick="visualizarAnexo('${anexo.id}')">
                            <i class="fas fa-eye"></i> Visualizar
                        </button>
                        <button class="btn-anexo" onclick="downloadAnexo('${anexo.id}')">
                            <i class="fas fa-download"></i> Baixar
                        </button>
                        <button class="btn-anexo btn-remover" onclick="removerAnexo('${anexo.id}')">
                            <i class="fas fa-trash"></i> Remover
                        </button>
                    </div>
                `;
            }
            
            listaAnexos.appendChild(anexoItem);
        });
    }

    // Função para visualizar anexos
    window.visualizarAnexo = function(anexoId) {
        const anexo = anexos.find(a => a.id === anexoId);
        if (!anexo) return;

        if (anexo.tipo.startsWith('image/')) {
            // Para imagens: abre em nova aba
            const novaAba = window.open('', '_blank');
            novaAba.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>${anexo.nome}</title>
                    <style>
                        body { margin: 0; padding: 20px; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f5f5f5; }
                        img { max-width: 90%; max-height: 90vh; box-shadow: 0 0 10px rgba(0,0,0,0.2); }
                    </style>
                </head>
                <body>
                    <img src="${anexo.conteudo}" alt="${anexo.nome}">
                </body>
                </html>
            `);
        } else {
            // Para PDF: usa embed
            const novaAba = window.open('', '_blank');
            novaAba.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>${anexo.nome}</title>
                    <style>
                        body { margin: 0; padding: 0; }
                        embed { width: 100%; height: 100vh; }
                    </style>
                </head>
                <body>
                    <embed src="${anexo.conteudo}" type="application/pdf" width="100%" height="100%">
                </body>
                </html>
            `);
        }
    };

    // Função para baixar anexos
    window.downloadAnexo = function(anexoId) {
        const anexo = anexos.find(a => a.id === anexoId);
        if (!anexo) return;

        // Extrai o tipo MIME e extensão do arquivo
        const mimeType = anexo.tipo;
        const extension = mimeType.split('/')[1] || (mimeType === 'application/pdf' ? 'pdf' : 'bin');
        
        // Converte o Base64 para Blob
        const byteCharacters = atob(anexo.conteudo.split(',')[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], {type: mimeType});
        
        // Cria o link de download
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = anexo.nome.endsWith(`.${extension}`) ? anexo.nome : `${anexo.nome}.${extension}`;
        
        // Dispara o download
        document.body.appendChild(link);
        link.click();
        
        // Limpeza
        setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }, 100);
    };

    // Função para remover anexos
    window.removerAnexo = function(anexoId) {
        if (confirm('Tem certeza que deseja remover este anexo?')) {
            const index = anexos.findIndex(a => a.id === anexoId);
            if (index !== -1) {
                anexos.splice(index, 1);
                localStorage.setItem('anexos', JSON.stringify(anexos));
                carregarAnexos(atendimentos[atendimentoAtual].id);
            }
        }
    };

    // Função para upload de anexos
    document.getElementById('upload-anexo').addEventListener('change', function(e) {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        
        const atendimentoId = atendimentos[atendimentoAtual].id;
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            
            // Verifica se é PDF ou imagem
            if (!file.type.match('application/pdf') && !file.type.match('image.*')) {
                alert('Por favor, selecione apenas arquivos PDF ou imagens (JPG, PNG).');
                continue;
            }
            
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const novoAnexo = {
                    id: Date.now().toString() + i,
                    atendimentoId: atendimentoId,
                    nome: file.name,
                    tipo: file.type,
                    conteudo: e.target.result,
                    dataUpload: new Date().toISOString()
                };
                
                // Adiciona ao localStorage
                anexos.push(novoAnexo);
                localStorage.setItem('anexos', JSON.stringify(anexos));
                
                // Recarrega a lista de anexos
                carregarAnexos(atendimentoId);
            };
            
            reader.readAsDataURL(file);
        }
        
        // Limpa o input para permitir novos uploads
        e.target.value = '';
    });

    // Navegação entre atendimentos
    document.getElementById('btn-anterior').addEventListener('click', function() {
        if (atendimentoAtual > 0) {
            exibirAtendimento(atendimentoAtual - 1);
        }
    });

    document.getElementById('btn-proximo').addEventListener('click', function() {
        if (atendimentoAtual < atendimentos.length - 1) {
            exibirAtendimento(atendimentoAtual + 1);
        }
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

    // Inicia exibindo o primeiro atendimento
    exibirAtendimento(0);
});