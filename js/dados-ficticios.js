document.addEventListener("DOMContentLoaded", function() {
    if (!localStorage.getItem('tutores') || 
        !localStorage.getItem('pets') || 
        !localStorage.getItem('anamneses')) {
        
        console.log("Carregando dados fictícios completos...");

        /* ========== TUTORES ========== */
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
                dataCadastro: "2023-01-15T10:00:00"
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
                dataCadastro: "2023-02-20T14:30:00"
            },
            {
                id: "tutor_3",
                nome: "Carla Mendes",
                cpf: "333.444.555-66",
                rg: "44.555.666-7",
                telefone: "(31) 97777-3333",
                email: "carla.mendes@email.com",
                endereco: "Rua da Paz, 300",
                bairro: "Savassi",
                cidade: "Belo Horizonte",
                cep: "30110-000",
                comoConheceu: "outros",
                nomeIndicacao: "",
                dataCadastro: "2023-03-10T09:15:00"
            },
            {
                id: "tutor_4",
                nome: "Daniel Souza",
                cpf: "444.555.666-77",
                rg: "55.666.777-8",
                telefone: "(41) 96666-4444",
                email: "daniel.souza@email.com",
                endereco: "Av. Paraná, 400",
                bairro: "Batel",
                cidade: "Curitiba",
                cep: "80240-000",
                comoConheceu: "indicacao",
                nomeIndicacao: "Fernanda Lima",
                dataCadastro: "2023-04-05T16:45:00"
            }
        ];

        /* ========== PETS ========== */
        const pets = [
            // Pets da Ana Silva
            {
                id: "pet_1",
                tutorId: "tutor_1",
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
                historico: []
            },
            {
                id: "pet_2",
                tutorId: "tutor_1",
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
                historico: []
            },
            
            // Pets do Bruno Oliveira
            {
                id: "pet_3",
                tutorId: "tutor_2",
                nome: "Thor",
                especie: "Cachorro",
                raca: "Bulldog Francês",
                idade: "4 anos",
                peso: 12.0,
                sexo: "Macho",
                castrado: "Não",
                pelagem: "Curta",
                cor: "Branco e preto",
                doencaExistente: "Sim",
                observacao: "Problemas respiratórios",
                dataCadastro: "2023-02-20T15:00:00",
                historico: []
            },
            
            // Pets da Carla Mendes
            {
                id: "pet_4",
                tutorId: "tutor_3",
                nome: "Mel",
                especie: "Gato",
                raca: "Persa",
                idade: "5 anos",
                peso: 5.8,
                sexo: "Fêmea",
                castrado: "Sim",
                pelagem: "Longa",
                cor: "Cinza",
                doencaExistente: "Não",
                observacao: "Necessita escovação diária",
                dataCadastro: "2023-03-10T09:30:00",
                historico: []
            },
            {
                id: "pet_5",
                tutorId: "tutor_3",
                nome: "Bob",
                especie: "Cachorro",
                raca: "Poodle",
                idade: "7 anos",
                peso: 6.5,
                sexo: "Macho",
                castrado: "Sim",
                pelagem: "Encaracolada",
                cor: "Branco",
                doencaExistente: "Sim",
                observacao: "Problemas dentários",
                dataCadastro: "2023-03-12T10:15:00",
                historico: []
            },
            
            // Pets do Daniel Souza
            {
                id: "pet_6",
                tutorId: "tutor_4",
                nome: "Nina",
                especie: "Cachorro",
                raca: "Vira-lata",
                idade: "1 ano",
                peso: 8.0,
                sexo: "Fêmea",
                castrado: "Não",
                pelagem: "Curta",
                cor: "Caramelo",
                doencaExistente: "Não",
                observacao: "Adotada em abrigo",
                dataCadastro: "2023-04-05T17:00:00",
                historico: []
            }
        ];

        /* ========== ANAMNESES ========== */
        const anamneses = [
            // Atendimentos do Rex (pet_1)
            {
                id: "anamnese_1",
                tutorId: "tutor_1",
                petId: "pet_1",
                dataAtendimento: "2023-05-10",
                queixaPrincipal: "Consulta de rotina",
                diagnostico: "Saudável",
                tratamento: "Vacina V10",
                observacoes: "Peso estável",
                tipoAtendimento: "consulta_particular", // Alterado de consulta_plano para particular
                status: "concluido"
            },
            {
                id: "anamnese_2",
                tutorId: "tutor_1",
                petId: "pet_1",
                dataAtendimento: "2023-08-15",
                queixaPrincipal: "Coceira excessiva",
                diagnostico: "Dermatite alérgica",
                tratamento: "Antihistamínico",
                observacoes: "Trocar shampoo",
                tipoAtendimento: "consulta_particular", // Alterado de consulta_plano para particular
                status: "concluido"
            },
            
            // Atendimento do Thor (pet_3)
            {
                id: "anamnese_3",
                tutorId: "tutor_2",
                petId: "pet_3",
                dataAtendimento: "2023-06-20",
                queixaPrincipal: "Dificuldade respiratória",
                diagnostico: "Síndrome braquicefálica",
                tratamento: "Cirurgia indicada",
                observacoes: "Monitorar crises",
                tipoAtendimento: "consulta_particular",
                status: "pendente"
            },
            
            // Atendimento da Mel (pet_4)
            {
                id: "anamnese_4",
                tutorId: "tutor_3",
                petId: "pet_4",
                dataAtendimento: "2023-07-05",
                queixaPrincipal: "Queda de pelo",
                diagnostico: "Tricobezoar",
                tratamento: "Laxante felino",
                observacoes: "Escovar diariamente",
                tipoAtendimento: "consulta_particular", // Alterado de consulta_plano para particular
                status: "concluido"
            },
            
            // Atendimento do Bob (pet_5)
            {
                id: "anamnese_5",
                tutorId: "tutor_3",
                petId: "pet_5",
                dataAtendimento: "2023-09-10",
                queixaPrincipal: "Mau hálito",
                diagnostico: "Doença periodontal",
                tratamento: "Limpeza dentária",
                observacoes: "Agendar procedimento",
                tipoAtendimento: "consulta_particular", // Alterado de consulta_plano para particular
                status: "pendente"
            }
        ];

        // Salvando todos os dados no localStorage
        localStorage.setItem('tutores', JSON.stringify(tutores));
        localStorage.setItem('pets', JSON.stringify(pets));
        localStorage.setItem('anamneses', JSON.stringify(anamneses));

        console.log("Base de dados fictícia carregada com sucesso!");
        console.log(`Tutores: ${tutores.length} | Pets: ${pets.length} | Anamneses: ${anamneses.length}`);
    }
});