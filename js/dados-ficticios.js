// script-dados-ficticios.js
document.addEventListener("DOMContentLoaded", function() {
    // Verifica se já existem dados no localStorage
    if (!localStorage.getItem('tutores') || 
        !localStorage.getItem('pets') || 
        !localStorage.getItem('anamneses')) {
        
        console.log("Criando dados fictícios no localStorage...");
        
        // Dados fictícios de tutores
        const tutores = [
            {
                id: "tutor_1",
                nome: "Ana Carolina Mendes",
                telefone: "(11) 98765-4321",
                email: "ana.mendes@email.com",
                endereco: "Rua das Acácias, 100 - São Paulo/SP",
                dataCadastro: "2023-01-10T09:15:00"
            },
            {
                id: "tutor_2",
                nome: "Marcos Ribeiro",
                telefone: "(11) 91234-5678",
                email: "marcos.ribeiro@email.com",
                endereco: "Av. Brasil, 2000 - São Paulo/SP",
                dataCadastro: "2023-02-15T14:30:00"
            },
            {
                id: "tutor_3",
                nome: "Juliana Almeida",
                telefone: "(11) 99876-5432",
                email: "ju.almeida@email.com",
                endereco: "Rua dos Pinheiros, 300 - São Paulo/SP",
                dataCadastro: "2023-03-20T11:00:00"
            }
        ];

        // Dados fictícios de pets (vinculados aos tutores acima)
        const pets = [
            // Pets da Ana (tutor_1)
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
                historico: [
                    {
                        data: "2023-01-15T00:00:00",
                        vacina: "V10",
                        vermifugo: "Drontal Plus",
                        peso: 30.5,
                        observacoes: "Pet saudável"
                    },
                    {
                        data: "2023-04-20T00:00:00",
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
                historico: [
                    {
                        data: "2023-02-10T00:00:00",
                        vacina: "V4",
                        vermifugo: "Drontal",
                        peso: 3.8,
                        observacoes: "Castração marcada"
                    }
                ]
            },
            
            // Pets do Marcos (tutor_2)
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
                historico: [
                    {
                        data: "2023-03-01T00:00:00",
                        vacina: "V8",
                        vermifugo: "Endogard",
                        peso: 12.0,
                        observacoes: "Problema respiratório monitorar"
                    }
                ]
            },
            
            // Pets da Juliana (tutor_3)
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
                historico: []
            }
        ];

        // Dados fictícios de anamneses
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
                tipoAtendimento: "consulta_particular",
                formaPagamento: "credito",
                outroPagamento: "",
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
                tipoAtendimento: "consulta_particular",
                formaPagamento: "debito",
                outroPagamento: "",
                status: "concluido",
                observacoes: "Prescrito xarope para tosse"
            }
        ];

        // Salva os dados no localStorage
        localStorage.setItem('tutores', JSON.stringify(tutores));
        localStorage.setItem('pets', JSON.stringify(pets));
        localStorage.setItem('anamneses', JSON.stringify(anamneses));
        
        console.log("Dados fictícios criados com sucesso!");
        console.log("Tutores:", tutores);
        console.log("Pets:", pets);
        console.log("Anamneses:", anamneses);
    } else {
        console.log("Dados já existem no localStorage.");
    }
});