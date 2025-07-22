document.addEventListener("DOMContentLoaded", function() {
    // Verifica se já existem dados reais (não sobrescreve se já existirem)
    const tutoresExistentes = JSON.parse(localStorage.getItem('tutores')) || [];
    const petsExistentes = JSON.parse(localStorage.getItem('pets')) || [];
    const anamnesesExistentes = JSON.parse(localStorage.getItem('anamneses')) || [];

    if (tutoresExistentes.length === 0 && petsExistentes.length === 0 && anamnesesExistentes.length === 0) {
        console.log("Carregando dados fictícios iniciais...");

        /* ========== TUTORES FICTÍCIOS (APENAS SE NÃO HOUVER DADOS) ========== */
        const tutores = [
            {
                id: "tutor_1",
                nome: "Ana Silva",
                cpf: "111.222.333-44",
                rg: "22.333.444-5",
                telefone: "(11) 99999-1111",
                email: "ana.silva@email.com",
                endereco: "Rua das Flores, 100",
                bairro: "Centro",
                cidade: "São Paulo",
                cep: "01001-000",
                comoConheceu: "indicacao",
                nomeIndicacao: "Carlos Santos",
                dataCadastro: "2023-01-15T10:00:00",
                adesaoPlano: "nao",
                planoId: "",
                statusPlano: "inativo",
                dataVencimentoPlano: ""
            },
            {
                id: "tutor_2",
                nome: "Bruno Oliveira",
                cpf: "222.333.444-55",
                rg: "33.444.555-6",
                telefone: "(21) 98888-2222",
                email: "bruno.oliveira@email.com",
                endereco: "Av. Brasil, 200",
                bairro: "Copacabana",
                cidade: "Rio de Janeiro",
                cep: "22010-000",
                comoConheceu: "rede-social",
                nomeIndicacao: "",
                dataCadastro: "2023-02-20T14:30:00",
                adesaoPlano: "nao",
                planoId: "",
                statusPlano: "inativo",
                dataVencimentoPlano: ""
            }
        ];

        /* ========== PETS FICTÍCIOS (APENAS SE NÃO HOUVER DADOS) ========== */
        const pets = [
            {
                id: "pet_1",
                tutorId: "tutor_1",
                planoId: "plano_basico_2",
                nome: "Rex",
                especie: "Cachorro",
                raca: "Labrador",
                idade: "3 anos",
                peso: 28.5,
                sexo: "Macho",
                castrado: "Sim",
                pelagem: "Curta",
                cor: "Preto",
                doencaExistente: "Não",
                observacao: "Alergia a picada de pulga",
                dataCadastro: "2023-01-15T10:30:00",
                aderiuPlano: true,
                planoPet: "Plano Básico",
                dataAderiuPlano: "2023-01-15",
                historico: []
            },
            {
                id: "pet_2",
                tutorId: "tutor_1",
                planoId: "plano_basico_2",
                nome: "Luna",
                especie: "Gato",
                raca: "Siamês",
                idade: "2 anos",
                peso: 4.2,
                sexo: "Fêmea",
                castrado: "Sim",
                pelagem: "Curta",
                cor: "Marrom e branco",
                doencaExistente: "Não",
                observacao: "",
                dataCadastro: "2023-01-20T11:00:00",
                aderiuPlano: false,
                planoPet: null,
                dataAderiuPlano: null,
                historico: []
            }
        ];

        /* ========== ANAMNESES FICTÍCIAS (APENAS SE NÃO HOUVER DADOS) ========== */
        const anamneses = [
            {
                id: "anamnese_1",
                tutorId: "tutor_1",
                petId: "pet_1",
                dataAtendimento: "2023-05-10",
                queixaPrincipal: "Consulta de rotina",
                diagnostico: "Saudável",
                tratamento: "Vacina V10",
                observacoes: "Peso estável",
                tipoAtendimento: "consulta_plano",
                status: "concluido"
            }
        ];

        // Salvando apenas se não existirem dados
        if (tutoresExistentes.length === 0) {
            localStorage.setItem('tutores', JSON.stringify(tutores));
        }
        if (petsExistentes.length === 0) {
            localStorage.setItem('pets', JSON.stringify(pets));
        }
        if (anamnesesExistentes.length === 0) {
            localStorage.setItem('anamneses', JSON.stringify(anamneses));
        }

        console.log("Base de dados fictícia carregada apenas se não houver dados existentes!");
    } else {
        console.log("Dados existentes encontrados, mantendo dados reais.");
    }
});