document.addEventListener("DOMContentLoaded", function() {
    // Verifica se já existem dados no localStorage
    if (!localStorage.getItem('tutores') || 
        !localStorage.getItem('pets') || 
        !localStorage.getItem('anamneses') ||
        !localStorage.getItem('planos')) {
        
        console.log("Criando dados fictícios no localStorage...");
        
        // =============================================
        // 1. DADOS FICTÍCIOS DE PLANOS DE SAÚDE (NOVO)
        // =============================================
        const planos = [
            {
                id: "plano_1",
                nome: "Básico 2.0",
                descricao: "Consultas básicas e vacinas simples",
                valorMensal: 89.90,
                beneficios: ["4 consultas/ano", "Vacinação básica", "Desconto em exames"],
                cobertura: ["Consultas rotineiras", "Vacinação anual", "Desconto 20% em exames"]
            },
            {
                id: "plano_2",
                nome: "Intermediário 4.0",
                descricao: "Cobertura ampliada para cuidados essenciais",
                valorMensal: 129.90,
                beneficios: ["6 consultas/ano", "Vacinação completa", "1 exame laboratorial/ano"],
                cobertura: ["Consultas ilimitadas", "Vacinação completa", "1 exame anual incluído"]
            },
            {
                id: "plano_3",
                nome: "Premiun 6.0",
                descricao: "Cobertura completa para pets exigentes",
                valorMensal: 189.90,
                beneficios: ["Consultas ilimitadas", "Vacinação premium", "2 exames laboratoriais/ano", "Desconto em internações"],
                cobertura: ["Consultas 24h", "Procedimentos cirúrgicos", "2 exames anuais", "Internação com desconto"]
            },
            {
                id: "plano_4",
                nome: "Super Premiun 8.0",
                descricao: "Cobertura total com benefícios exclusivos",
                valorMensal: 259.90,
                beneficios: ["Consultas ilimitadas", "Procedimentos cirúrgicos", "Exames ilimitados", "Internações cobertas", "Telemedicina"],
                cobertura: ["Cobertura total", "Cirurgias inclusas", "Exames ilimitados", "Internação 100% coberta"]
            },
            {
                id: "plano_5",
                nome: "Silvestres 5.0",
                descricao: "Plano especial para animais silvestres",
                valorMensal: 159.90,
                beneficios: ["4 consultas/ano", "Exames específicos", "Desconto em medicamentos"],
                cobertura: ["Consultas especializadas", "Exames específicos", "Desconto em medicamentos"]
            }
        ];

        // =============================================
        // 2. DADOS FICTÍCIOS DE TUTORES (ATUALIZADO)
        // =============================================
        const tutores = [
            {
                id: "tutor_1",
                nome: "Ana Carolina Mendes",
                telefone: "(11) 98765-4321",
                email: "ana.mendes@email.com",
                endereco: "Rua das Acácias, 100 - São Paulo/SP",
                dataCadastro: "2023-01-10T09:15:00",
                planoId: "plano_2",  // Plano Intermediário 4.0
                statusPlano: "ativo",
                dataVencimentoPlano: "2024-12-31"
            },
            {
                id: "tutor_2",
                nome: "Marcos Ribeiro",
                telefone: "(11) 91234-5678",
                email: "marcos.ribeiro@email.com",
                endereco: "Av. Brasil, 2000 - São Paulo/SP",
                dataCadastro: "2023-02-15T14:30:00",
                planoId: "plano_3",  // Plano Premiun 6.0
                statusPlano: "ativo",
                dataVencimentoPlano: "2024-11-30"
            },
            {
                id: "tutor_3",
                nome: "Juliana Almeida",
                telefone: "(11) 99876-5432",
                email: "ju.almeida@email.com",
                endereco: "Rua dos Pinheiros, 300 - São Paulo/SP",
                dataCadastro: "2023-03-20T11:00:00",
                planoId: "plano_1",  // Plano Básico 2.0
                statusPlano: "ativo",
                dataVencimentoPlano: "2024-10-15"
            },
            {
                id: "tutor_4",
                nome: "Carlos Eduardo",
                telefone: "(11) 94567-8901",
                email: "carlos.edu@email.com",
                endereco: "Rua das Flores, 45 - São Paulo/SP",
                dataCadastro: "2023-04-05T16:20:00",
                planoId: "plano_5",  // Plano Silvestres 5.0
                statusPlano: "ativo",
                dataVencimentoPlano: "2024-09-20"
            }
        ];

        // =============================================
        // 3. DADOS FICTÍCIOS DE PETS (ATUALIZADO)
        // =============================================
        const pets = [
            // Pets da Ana (tutor_1) - Plano Intermediário 4.0
            {
                id: "pet_1",
                tutorId: "tutor_1",
                nome: "Bobby",
                especie: "Cão",
                raca: "Golden Retriever",
                idade: "4 anos",
                peso: 32.0,
                sexo: "Macho",
                ambiente: "Casa com quintal",
                pelagem: "Dourado",
                dataNascimento: "2019-05-15",
                dataCadastro: "2023-01-10T09:30:00",
                planoId: "plano_2", // Herda do tutor mas pode ter plano específico
                historico: [
                    {
                        data: "2023-01-15T00:00:00",
                        tipo: "consulta_plano",
                        vacina: "V10",
                        vermifugo: "Drontal Plus",
                        peso: 30.5,
                        observacoes: "Pet saudável"
                    },
                    {
                        data: "2023-04-20T00:00:00",
                        tipo: "consulta_plano",
                        vacina: "Raiva",
                        vermifugo: "Vermivet",
                        peso: 31.8,
                        observacoes: "Peso dentro do esperado"
                    }
                ]
            },
            {
                id: "pet_2",
                tutorId: "tutor_1",
                nome: "Luna",
                especie: "Gato",
                raca: "Siamês",
                idade: "2 anos",
                peso: 4.0,
                sexo: "Fêmea",
                ambiente: "Apartamento",
                pelagem: "Creme com pontos escuros",
                dataNascimento: "2021-07-10",
                dataCadastro: "2023-01-10T10:00:00",
                planoId: "plano_3", // Plano diferente do tutor (Premiun 6.0)
                historico: [
                    {
                        data: "2023-02-10T00:00:00",
                        tipo: "consulta_plano",
                        vacina: "V4",
                        vermifugo: "Drontal",
                        peso: 3.8,
                        observacoes: "Castração marcada"
                    }
                ]
            },
            
            // Pets do Marcos (tutor_2) - Plano Premiun 6.0
            {
                id: "pet_3",
                tutorId: "tutor_2",
                nome: "Thor",
                especie: "Cão",
                raca: "Bulldog Francês",
                idade: "3 anos",
                peso: 12.5,
                sexo: "Macho",
                ambiente: "Apartamento",
                pelagem: "Tigrado",
                dataNascimento: "2020-03-25",
                dataCadastro: "2023-02-15T15:00:00",
                planoId: "plano_3", // Mesmo plano do tutor
                historico: [
                    {
                        data: "2023-03-01T00:00:00",
                        tipo: "consulta_plano",
                        vacina: "V8",
                        vermifugo: "Endogard",
                        peso: 12.0,
                        observacoes: "Problema respiratório monitorar"
                    },
                    {
                        data: "2023-06-15T00:00:00",
                        tipo: "procedimento_plano",
                        procedimento: "Limpeza dentária",
                        observacoes: "Realizada com sucesso"
                    }
                ]
            },
            
            // Pets da Juliana (tutor_3) - Plano Básico 2.0
            {
                id: "pet_4",
                tutorId: "tutor_3",
                nome: "Mel",
                especie: "Gato",
                raca: "SRD",
                idade: "5 meses",
                peso: 2.1,
                sexo: "Fêmea",
                ambiente: "Apartamento",
                pelagem: "Listrada",
                dataNascimento: "2022-10-15",
                dataCadastro: "2023-03-20T11:30:00",
                planoId: "plano_1", // Mesmo plano do tutor
                historico: [
                    {
                        data: "2023-04-05T00:00:00",
                        tipo: "consulta_particular",
                        vacina: "V3",
                        observacoes: "Primeira consulta - saudável"
                    }
                ]
            },
            
            // Pets do Carlos (tutor_4) - Plano Silvestres 5.0
            {
                id: "pet_5",
                tutorId: "tutor_4",
                nome: "Zeca",
                especie: "Papagaio",
                raca: "Verdadeiro",
                idade: "8 anos",
                peso: 0.4,
                sexo: "Macho",
                ambiente: "Gaiola grande",
                pelagem: "Verde e amarelo",
                dataNascimento: "2015-11-20",
                dataCadastro: "2023-04-05T17:00:00",
                planoId: "plano_5", // Plano Silvestres
                historico: [
                    {
                        data: "2023-05-10T00:00:00",
                        tipo: "consulta_plano",
                        observacoes: "Check-up anual - saudável"
                    }
                ]
            }
        ];

        // =============================================
        // 4. DADOS FICTÍCIOS DE ANAMNESES (ATUALIZADO)
        // =============================================
        const anamneses = [
            {
                id: "anamnese_1",
                dataCriacao: "2023-06-15T10:30:00",
                dataAtendimento: "2023-06-15",
                tutorId: "tutor_1",
                petId: "pet_1",
                queixaPrincipal: "O cão está vomitando desde ontem à noite",
                digestorio: ["vomito", "apetite"],
                outrosDigestorio: "",
                cardio: [],
                outrosCardio: "",
                mucosa: "normal",
                cavidadeOral: "normal",
                temperatura: "alterada",
                hidratacao: "alterada",
                exames: ["raio_x", "ultrassom"],
                tipoAtendimento: "consulta_plano",
                formaPagamento: "plano_saude",
                status: "concluido",
                observacoes: "Prescrito antiemético e dieta leve por 48h"
            },
            {
                id: "anamnese_2",
                dataCriacao: "2023-07-20T14:15:00",
                dataAtendimento: "2023-07-20",
                tutorId: "tutor_2",
                petId: "pet_3",
                queixaPrincipal: "O cão está com tosse há três dias",
                digestorio: [],
                outrosDigestorio: "",
                cardio: ["tosse"],
                outrosCardio: "",
                mucosa: "normal",
                cavidadeOral: "normal",
                temperatura: "normal",
                hidratacao: "normal",
                exames: [],
                tipoAtendimento: "consulta_plano",
                formaPagamento: "plano_saude",
                status: "concluido",
                observacoes: "Prescrito xarope para tosse"
            },
            {
                id: "anamnese_3",
                dataCriacao: "2023-08-10T11:20:00",
                dataAtendimento: "2023-08-10",
                tutorId: "tutor_3",
                petId: "pet_4",
                queixaPrincipal: "Consulta de rotina para filhote",
                digestorio: [],
                outrosDigestorio: "",
                cardio: [],
                outrosCardio: "",
                mucosa: "normal",
                cavidadeOral: "normal",
                temperatura: "normal",
                hidratacao: "normal",
                exames: [],
                tipoAtendimento: "consulta_particular",
                formaPagamento: "credito",
                status: "concluido",
                observacoes: "Vacinação atualizada e orientações para filhote"
            },
            {
                id: "anamnese_4",
                dataCriacao: "2023-09-05T09:45:00",
                dataAtendimento: "2023-09-05",
                tutorId: "tutor_4",
                petId: "pet_5",
                queixaPrincipal: "Ave está com penas opacas",
                digestorio: [],
                outrosDigestorio: "",
                cardio: [],
                outrosCardio: "",
                mucosa: "normal",
                cavidadeOral: "normal",
                temperatura: "normal",
                hidratacao: "normal",
                exames: ["exame_sangue"],
                tipoAtendimento: "consulta_plano",
                formaPagamento: "plano_saude",
                status: "concluido",
                observacoes: "Suplementação vitamínica prescrita"
            }
        ];

        // =============================================
        // 5. SALVA TODOS OS DADOS NO LOCALSTORAGE
        // =============================================
        localStorage.setItem('tutores', JSON.stringify(tutores));
        localStorage.setItem('pets', JSON.stringify(pets));
        localStorage.setItem('anamneses', JSON.stringify(anamneses));
        localStorage.setItem('planos', JSON.stringify(planos));
        
        console.log("Dados fictícios criados com sucesso!");
        console.log("Tutores:", tutores);
        console.log("Pets:", pets);
        console.log("Anamneses:", anamneses);
        console.log("Planos:", planos);
    } else {
        console.log("Dados já existem no localStorage.");
    }
});