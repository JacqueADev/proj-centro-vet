document.addEventListener("DOMContentLoaded", function() {
    if (!localStorage.getItem('planosServicos')) {
        console.log("Carregando dados completos de planos e serviços...");

        const planosServicos = {
            // ========== SERVIÇOS AVULSOS ==========
            servicosAvulsos: {
                atendimentos: [
                    {
                        id: "serv_atend_1",
                        nome: "Consulta em clínica (horário comercial)",
                        valor: 80.00,
                        categoria: "Consulta"
                    },
                    {
                        id: "serv_atend_2",
                        nome: "Consulta domiciliar (horário comercial)",
                        valor: 120.00,
                        categoria: "Consulta"
                    },
                    {
                        id: "serv_atend_3",
                        nome: "Retorno",
                        valor: 0.00,
                        categoria: "Consulta"
                    },
                    {
                        id: "serv_atend_4",
                        nome: "Emergência",
                        valor: 160.00,
                        categoria: "Emergência"
                    },
                    {
                        id: "serv_atend_5",
                        nome: "Guia Prever (50% do valor)",
                        valor: 40.00,
                        categoria: "Documentação"
                    }
                    
                ],

                exames: [
                    {
                        id: "serv_exame_1",
                        nome: "Raio X",
                        valor: 120.00,
                        categoria: "Exame de Imagem"
                    },
                    {
                        id: "serv_exame_2",
                        nome: "Ultrassom",
                        valor: 180.00,
                        categoria: "Exame de Imagem"
                    },
                    {
                        id: "serv_exame_3",
                        nome: "Eco Cardiograma",
                        valor: 220.00,
                        categoria: "Exame de Imagem"
                    },
                    {
                        id: "serv_exame_4",
                        nome: "Exame de sangue",
                        valor: 250.00,
                        categoria: "Exame Laboratorial"
                    },
                    {
                        id: "serv_exame_5",
                        nome: "Teste FIV e FELV",
                        valor: 120.00,
                        categoria: "Exame Laboratorial"
                    }
                ]
            },

            // ========== PLANOS DE SAÚDE ==========
            planos: [
                // ===== PLANO BÁSICO 2.0 =====
                {
                    id: "plano_basico_2",
                    nome: "Básico 2.0",
                    descricao: "Plano essencial para cuidados básicos de saúde animal",
                    valorBase: 39.99,
                    descontoProgressivo: [
                        { qtdPets: 1, valor: 39.99 },
                        { qtdPets: 2, valor: 34.99 },
                        { qtdPets: 3, valor: 29.99 },
                        { qtdPets: 4, valor: 24.99 },
                        { qtdPets: 5, valor: 24.99 },
                        { qtdPets: 6, valor: 24.99 }
                    ],
                    consultas: {
                        inclusas: 2,
                        periodicidade: "anual",
                        intervaloMinimo: 30,
                        tipos: [
                            {
                                nome: "Consulta Diurna (08:00 às 18:00)",
                                carencia: 0,
                                limite: null
                            },
                            {
                                nome: "Consulta Noturna (18:00 às 20:00)",
                                carencia: 30,
                                limite: null
                            },
                            {
                                nome: "Consulta Noturna (20:00 às 08:00)",
                                carencia: 30,
                                limite: null
                            },
                            {
                                nome: "Consulta especialidade",
                                carencia: 60,
                                limite: null
                            },
                            {
                                nome: "Consulta no Domingo/Feriado",
                                carencia: 60,
                                limite: null
                            }
                        ],
                        observacoes: "Retorno não é considerado consulta"
                    },
                    vacinas: [
                        {
                            nome: "V10 Importada",
                            carencia: 0
                        },
                        {
                            nome: "Anti-rábica Importada",
                            carencia: 0
                        },
                        {
                            nome: "V8 Importada",
                            carencia: 0
                        }
                    ],
                    procedimentosInclusos: [
                        {
                            nome: "Microchip Internacional",
                            carencia: 0,
                            limite: null
                        },
                        {
                            nome: "Reiki",
                            carencia: 0,
                            limite: null
                        },
                        {
                            nome: "Cristalterapia",
                            carencia: 0,
                            limite: null
                        },
                        {
                            nome: "Drenagem de abscesso (anestesia à parte)",
                            carencia: 90,
                            limite: 1
                        },
                        {
                            nome: "Abdominocentese",
                            carencia: 90,
                            limite: 1
                        },
                        {
                            nome: "Taxa Curativos",
                            carencia: 60,
                            limite: 5
                        },
                        {
                            nome: "Taxa de uso da sala",
                            carencia: 0,
                            limite: 2
                        }
                    ],
                    examesInclusos: [
                        {
                            nome: "Hemograma (com plaquetas)",
                            carencia: 30,
                            limite: 2
                        }
                    ]
                },

                // ===== PLANO INTERMEDIÁRIO 4.0 =====
                {
                    id: "plano_intermediario_4",
                    nome: "Intermediário 4.0",
                    descricao: "Plano com cobertura ampliada para prevenção e cuidados médicos",
                    valorBase: 79.90,
                    descontoProgressivo: [
                        { qtdPets: 1, valor: 79.90 },
                        { qtdPets: 2, valor: 74.90 },
                        { qtdPets: 3, valor: 69.90 },
                        { qtdPets: 4, valor: 64.90 },
                        { qtdPets: 5, valor: 64.90 },
                        { qtdPets: 6, valor: 64.90 }
                    ],
                    consultas: {
                        inclusas: 4,
                        periodicidade: "anual",
                        intervaloMinimo: 30,
                        tipos: [
                            {
                                nome: "Consulta Diurna (08:00 às 18:00)",
                                carencia: 0,
                                limite: null
                            },
                            {
                                nome: "Consulta Noturna (18:00 às 20:00)",
                                carencia: 30,
                                limite: null
                            },
                            {
                                nome: "Consulta Noturna (20:00 às 08:00)",
                                carencia: 30,
                                limite: null
                            },
                            {
                                nome: "Consulta especialidade",
                                carencia: 60,
                                limite: 1
                            },
                            {
                                nome: "Consulta no Domingo/Feriado",
                                carencia: 60,
                                limite: null
                            }
                        ],
                        observacoes: "Retorno não é considerado consulta"
                    },
                    vacinas: [
                        {
                            nome: "V10 Importada",
                            carencia: 0
                        },
                        {
                            nome: "Anti-rábica Importada",
                            carencia: 0
                        },
                        {
                            nome: "V8 Importada",
                            carencia: 0
                        },
                        {
                            nome: "Microchip Internacional",
                            carencia: 0
                        }
                    ],
                    procedimentosInclusos: [
                        {
                            nome: "Drenagem de abscesso (anestesia à parte)",
                            carencia: 90,
                            limite: 1
                        },
                        {
                            nome: "Abdominocentese",
                            carencia: 90,
                            limite: 1
                        },
                        {
                            nome: "Taxa Curativos",
                            carencia: 60,
                            limite: 5
                        },
                        {
                            nome: "Taxa de oxigênio (meia hora)",
                            carencia: 60,
                            limite: 2
                        },
                        {
                            nome: "Taxa de uso da sala",
                            carencia: 0,
                            limite: 2
                        },
                        {
                            nome: "Taxa Ambulatorial (por dia)",
                            carencia: 120,
                            limite: 5,
                            observacao: "Medicamentos à parte"
                        },
                        {
                            nome: "Reiki",
                            carencia: 0,
                            limite: null
                        },
                        {
                            nome: "Cristalterapia",
                            carencia: 0,
                            limite: null
                        }
                    ],
                    examesInclusos: [
                        {
                            nome: "Hemograma (com plaquetas)",
                            carencia: 30,
                            limite: 2
                        },
                        {
                            nome: "Parasitológico completo",
                            carencia: 30,
                            limite: 2
                        },
                        {
                            nome: "ALT (TGP)",
                            carencia: 30,
                            limite: 2
                        },
                        {
                            nome: "Uréia",
                            carencia: 30,
                            limite: 2
                        },
                        {
                            nome: "Creatinina",
                            carencia: 30,
                            limite: 2
                        },
                        {
                            nome: "Raspado de pele p/ investigação Microscópica",
                            carencia: 30,
                            limite: 2
                        },
                        {
                            nome: "Parasitológico Simples",
                            carencia: 30,
                            limite: 2
                        },
                        {
                            nome: "Urinálise",
                            carencia: 30,
                            limite: 2
                        }
                    ],
                    examesImagemInclusos: [
                        {
                            nome: "Raio X Simples (Uma posição principal)",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "Raio X Simples (Três posições principais)",
                            carencia: 210,
                            limite: 1
                        },
                        {
                            nome: "Eletrocardiograma",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "Ultra-sonografia",
                            carencia: 180,
                            limite: 1
                        }
                    ],
                    anestesiasInclusas: [
                        {
                            nome: "Anestesia geral animais até 10 kg (Dissociativa)",
                            carencia: 30,
                            limite: null
                        },
                        {
                            nome: "Anestesia geral animais de 11 kg à 25 kg (Dissociativa)",
                            carencia: 30,
                            limite: null
                        },
                        {
                            nome: "Anestesia geral animais de 26 kg à 40 kg (Dissociativa)",
                            carencia: 30,
                            limite: null
                        },
                        {
                            nome: "Anestesia geral animais acima de 40 kg (Dissociativa)",
                            carencia: 30,
                            limite: null
                        },
                        {
                            nome: "Anestesia local ou sedação",
                            carencia: 30,
                            limite: null
                        },
                        {
                            nome: "Anestesia peridural",
                            carencia: 30,
                            limite: null
                        }
                    ],
                    cirurgiasInclusas: [
                        {
                            nome: "Sutura de pele (Porte P e M)",
                            carencia: 60,
                            limite: 2
                        },
                        {
                            nome: "Sutura de pele (Porte G)",
                            carencia: 60,
                            limite: 2
                        },
                        {
                            nome: "Penso Esparadrapo ou Gessado",
                            carencia: 90,
                            limite: 1
                        },
                        {
                            nome: "Taxa Assistência a Parto Normal",
                            carencia: 240,
                            limite: 1
                        },
                        {
                            nome: "Cesariana Cadela (P ou M)",
                            carencia: 240,
                            limite: 1
                        },
                        {
                            nome: "Cesariana Cadela (G)",
                            carencia: 240,
                            limite: 1
                        },
                        {
                            nome: "O.S.H. Cadela P ou M (Castração até 25 kg)",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "O.S.H. Cadela G (Castração acima de 25 kg)",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "Taxa O.S.H. Cesariana Cadela",
                            carencia: 240,
                            limite: 1
                        },
                        {
                            nome: "Orquiectomia Cão (Castração)",
                            carencia: 180,
                            limite: 1
                        }
                    ]
                },

                // ===== PLANO PREMIUM 6.0 =====
                {
                    id: "plano_premium_6",
                    nome: "Premium 6.0",
                    descricao: "Plano completo com ampla cobertura em consultas, exames e cirurgias",
                    valorBase: 119.90,
                    descontoProgressivo: [
                        { qtdPets: 1, valor: 119.90 },
                        { qtdPets: 2, valor: 109.90 },
                        { qtdPets: 3, valor: 99.90 },
                        { qtdPets: 4, valor: 89.90 },
                        { qtdPets: 5, valor: 89.90 },
                        { qtdPets: 6, valor: 89.90 }
                    ],
                    consultas: {
                        inclusas: 6,
                        periodicidade: "anual",
                        intervaloMinimo: 30,
                        tipos: [
                            {
                                nome: "Consulta Diurna (08:00 às 18:00)",
                                carencia: 0,
                                limite: null
                            },
                            {
                                nome: "Consulta Noturna (18:00 às 22:00)",
                                carencia: 30,
                                limite: null
                            },
                            {
                                nome: "Consulta Noturna (22:00 às 08:00)",
                                carencia: 30,
                                limite: null
                            },
                            {
                                nome: "Consulta especialidade",
                                carencia: 60,
                                limite: 2
                            },
                            {
                                nome: "Consulta no Domingo/Feriado",
                                carencia: 60,
                                limite: null
                            }
                        ],
                        observacoes: "Retorno não é considerado consulta"
                    },
                    vacinas: [
                        {
                            nome: "V10 Importada",
                            carencia: 0
                        },
                        {
                            nome: "Anti-rábica Importada",
                            carencia: 0
                        },
                        {
                            nome: "V8 Importada",
                            carencia: 0
                        },
                        {
                            nome: "Microchip Internacional",
                            carencia: 0
                        }
                    ],
                    procedimentosInclusos: [
                        {
                            nome: "Drenagem de abscesso (anestesia à parte)",
                            carencia: 90,
                            limite: 2
                        },
                        {
                            nome: "Abdominocentese",
                            carencia: 90,
                            limite: 1
                        },
                        {
                            nome: "Taxa de Transfusão (Bolsa de sangue não coberta pelo plano)",
                            carencia: 90,
                            limite: 2
                        },
                        {
                            nome: "Taxa Curativos / Armações",
                            carencia: 60,
                            limite: 5
                        },
                        {
                            nome: "Taxa de oxigênio (meia hora)",
                            carencia: 60,
                            limite: 4
                        },
                        {
                            nome: "Biópsia",
                            carencia: 60,
                            limite: 2
                        },
                        {
                            nome: "2ª Biópsia no mesmo animal",
                            carencia: 60,
                            limite: 2
                        },
                        {
                            nome: "Taxa de uso da sala",
                            carencia: 0,
                            limite: 3
                        },
                        {
                            nome: "Taxa Ambulatorial (por dia)",
                            carencia: 120,
                            limite: 5,
                            observacao: "Medicamentos à parte"
                        },
                        {
                            nome: "Reiki",
                            carencia: 0,
                            limite: null
                        },
                        {
                            nome: "Cristalterapia",
                            carencia: 0,
                            limite: null
                        },
                        {
                            nome: "Radiestesia e Radiônica",
                            carencia: 0,
                            limite: null
                        },
                        {
                            nome: "Cromoterapia",
                            carencia: 0,
                            limite: null
                        }
                    ],
                    examesInclusos: [
                        {
                            nome: "Hemograma (com plaquetas)",
                            carencia: 30,
                            limite: 2
                        },
                        {
                            nome: "Parasitológico completo",
                            carencia: 30,
                            limite: 2
                        },
                        {
                            nome: "ALT (TGP)",
                            carencia: 30,
                            limite: 2
                        },
                        {
                            nome: "AST (TGO)",
                            carencia: 30,
                            limite: 2
                        },
                        {
                            nome: "Bilirrubina total e frações",
                            carencia: 30,
                            limite: 2
                        },
                        {
                            nome: "Uréia",
                            carencia: 30,
                            limite: 2
                        },
                        {
                            nome: "Creatinina",
                            carencia: 30,
                            limite: 2
                        },
                        {
                            nome: "Proteínas Totais",
                            carencia: 30,
                            limite: 2
                        },
                        {
                            nome: "Glicemia",
                            carencia: 30,
                            limite: 2
                        },
                        {
                            nome: "Fósforo",
                            carencia: 30,
                            limite: 2
                        },
                        {
                            nome: "Sódio",
                            carencia: 30,
                            limite: 2
                        },
                        {
                            nome: "Potássio",
                            carencia: 30,
                            limite: 2
                        },
                        {
                            nome: "Raspado de pele p/ investigação Microscópica",
                            carencia: 30,
                            limite: 2
                        },
                        {
                            nome: "Parasitológico Simples",
                            carencia: 30,
                            limite: 2
                        },
                        {
                            nome: "Urinálise",
                            carencia: 30,
                            limite: 2
                        },
                        {
                            nome: "Otológico",
                            carencia: 30,
                            limite: 2
                        },
                        {
                            nome: "Cultura e Antibiograma",
                            carencia: 60,
                            limite: 2,
                            cobertura: "50% após carência"
                        },
                        {
                            nome: "Cálcio urinário",
                            carencia: 30,
                            limite: 2
                        },
                        {
                            nome: "Histopatológico",
                            carencia: 60,
                            limite: 1,
                            cobertura: "50% após carência"
                        },
                        {
                            nome: "Hematócrito",
                            carencia: 30,
                            limite: 2
                        },
                        {
                            nome: "Fibrinogênio",
                            carencia: 30,
                            limite: 2
                        }
                    ],
                    examesImagemInclusos: [
                        {
                            nome: "Raio X Simples (Uma posição principal)",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "Raio X Simples (três projeções com laudo)",
                            carencia: 210,
                            limite: 1
                        },
                        {
                            nome: "Eletrocardiograma",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "Ultra-sonografia",
                            carencia: 180,
                            limite: 2
                        },
                        {
                            nome: "Raio X (Posição adicional)",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "Ecocardiograma",
                            carencia: 240,
                            limite: 1
                        }
                    ],
                    anestesiasInclusas: [
                        {
                            nome: "Anestesia geral animais até 10 kg",
                            carencia: 30,
                            limite: null
                        },
                        {
                            nome: "Anestesia geral animais de 11 kg à 25 kg",
                            carencia: 30,
                            limite: null
                        },
                        {
                            nome: "Anestesia geral animais de 26 kg à 40 kg",
                            carencia: 30,
                            limite: null
                        },
                        {
                            nome: "Anestesia geral animais acima de 40 kg",
                            carencia: 30,
                            limite: null
                        },
                        {
                            nome: "Anestesia local ou sedação",
                            carencia: 30,
                            limite: null
                        },
                        {
                            nome: "Anestesia peridural",
                            carencia: 30,
                            limite: null
                        },
                        {
                            nome: "Anestesia inalatória (Porte 01) animais até 10 kg",
                            carencia: 180,
                            limite: null,
                            cobertura: "50% após carência"
                        },
                        {
                            nome: "Anestesia inalatória (porte 02) animais de 11kg à 25 kg",
                            carencia: 180,
                            limite: null,
                            cobertura: "50% após carência"
                        },
                        {
                            nome: "Anestesia inalatória (porte 03) animais acima de 26 kg",
                            carencia: 180,
                            limite: null,
                            cobertura: "50% após carência"
                        }
                    ],
                    cirurgiasInclusas: [
                        // Cirurgias Corretivas
                        {
                            nome: "Sutura de pele (Porte P e M)",
                            carencia: 60,
                            limite: 2
                        },
                        {
                            nome: "Neoplasia de pele (Porte P)",
                            carencia: 90,
                            limite: 2
                        },
                        {
                            nome: "Oto hematoma",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "Extração de papilomas (qualquer numero)",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "Sutura de pele (Porte G)",
                            carencia: 60,
                            limite: 2
                        },
                        {
                            nome: "Neoplasia de pele (Porte M e G)",
                            carencia: 90,
                            limite: 2
                        },
                        
                        // Cirurgias Ortopédicas
                        {
                            nome: "Penso Esparadrapo ou Gessado",
                            carencia: 90,
                            limite: 1
                        },
                        {
                            nome: "Amputação de Membros (Porte P)",
                            carencia: 240,
                            limite: 1
                        },
                        {
                            nome: "Amputação de Membros (Porte M)",
                            carencia: 240,
                            limite: 1
                        },
                        {
                            nome: "Amputação de Membros (Porte G)",
                            carencia: 240,
                            limite: 1
                        },
                        {
                            nome: "Amputação de unha/dedo",
                            carencia: 240,
                            limite: 1
                        },
                        
                        // Cirurgias Oftalmológicas
                        {
                            nome: "Enucleação Globo Ocular",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "Desobstrução Canal Nasolacrimal",
                            carencia: 90,
                            limite: 2
                        },
                        
                        // Cirurgias Sistema Digestivo
                        {
                            nome: "Excisão Glândula Ad-Anal",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "Redução Prolapso Retal",
                            carencia: 120,
                            limite: 1
                        },
                        {
                            nome: "Hérnia Umbilical",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "Tumores Gengivais",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "Extração de Dentes (qualquer numero)",
                            carencia: 90,
                            limite: 1
                        },
                        {
                            nome: "Remoção de nódulo",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "Nodulectomia (P)",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "Nodulectomia (M)",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "Nodulectomia (G)",
                            carencia: 180,
                            limite: 1
                        },
                        
                        // Cirurgias Sistema Urinário
                        {
                            nome: "Cistotomia",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "Nefrectomia",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "Desobestrução uretral",
                            carencia: 180,
                            limite: 1
                        },
                        
                        // Cirurgias Sistema Genital
                        {
                            nome: "Taxa Assistência a Parto Normal",
                            carencia: 240,
                            limite: 1
                        },
                        {
                            nome: "Cesariana Cadela (P ou M)",
                            carencia: 240,
                            limite: 1
                        },
                        {
                            nome: "Cesariana Cadela (G)",
                            carencia: 240,
                            limite: 1
                        },
                        {
                            nome: "O.S.H. Cadela P ou M (Castração até 25 kg)",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "O.S.H. Cadela G (Castração acima de 25 kg)",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "Taxa O.S.H. Cesariana Cadela",
                            carencia: 240,
                            limite: 1
                        },
                        {
                            nome: "Vasectomia",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "Orquiectomia Cão (Castração)",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "Piometra em Cadela (P ou M)",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "Piometra em Cadela (G)",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "Tumor de Mama",
                            carencia: 180,
                            limite: 1
                        }
                    ],
                    internacoesInclusas: [
                        {
                            nome: "Internação animais até 6 kg (10 diárias)",
                            carencia: 180,
                            limite: 10,
                            cobertura: "50% após carência"
                        },
                        {
                            nome: "Internação animais de 6,1 kg à 10 kg (10 diárias)",
                            carencia: 180,
                            limite: 10,
                            cobertura: "50% após carência"
                        },
                        {
                            nome: "Internação animais de 10,1 kg à 15 kg (10 diárias)",
                            carencia: 180,
                            limite: 10,
                            cobertura: "50% após carência"
                        },
                        {
                            nome: "Internação animais 15,1 kg à 20 kg (10 diárias)",
                            carencia: 180,
                            limite: 10,
                            cobertura: "50% após carência"
                        },
                        {
                            nome: "Internação animais acima de 20kg (10 diárias)",
                            carencia: 180,
                            limite: 10,
                            cobertura: "50% após carência"
                        }
                    ]
                },

                // ===== PLANO SUPER PREMIUM 8.0 =====
                {
                    id: "plano_super_premium_8",
                    nome: "Super Premium 8.0",
                    descricao: "Plano com cobertura máxima incluindo cirurgias complexas e tratamentos especializados",
                    valorBase: 179.90,
                    descontoProgressivo: [
                        { qtdPets: 1, valor: 179.90 },
                        { qtdPets: 2, valor: 159.90 },
                        { qtdPets: 3, valor: 139.90 },
                        { qtdPets: 4, valor: 119.90 },
                        { qtdPets: 5, valor: 119.90 },
                        { qtdPets: 6, valor: 119.90 }
                    ],
                    consultas: {
                        inclusas: 8,
                        periodicidade: "anual",
                        intervaloMinimo: 30,
                        tipos: [
                            {
                                nome: "Consulta Diurna (08:00 às 18:00)",
                                carencia: 0,
                                limite: null
                            },
                            {
                                nome: "Consulta Noturna (18:00 às 20:00)",
                                carencia: 0,
                                limite: null
                            },
                            {
                                nome: "Consulta Noturna (20:00 às 08:00)",
                                carencia: 0,
                                limite: null
                            },
                            {
                                nome: "Consulta especialidade",
                                carencia: 60,
                                limite: 3
                            },
                            {
                                nome: "Consulta no Domingo/Feriado",
                                carencia: 60,
                                limite: null
                            }
                        ],
                        observacoes: "Retorno não é considerado consulta"
                    },
                    vacinas: [
                        {
                            nome: "V10 Importada",
                            carencia: 0
                        },
                        {
                            nome: "Anti-rábica Importada",
                            carencia: 0
                        },
                        {
                            nome: "V8 Importada",
                            carencia: 0
                        },
                        {
                            nome: "Microchip Internacional",
                            carencia: 0
                        }
                    ],
                    procedimentosInclusos: [
                        {
                            nome: "Drenagem de abscesso (anestesia à parte)",
                            carencia: 90,
                            limite: 3
                        },
                        {
                            nome: "Abdominocentese",
                            carencia: 90,
                            limite: 2
                        },
                        {
                            nome: "Traqueotomia Cervical",
                            carencia: 180,
                            limite: 2
                        },
                        {
                            nome: "Laparotomia Exploratória",
                            carencia: 180,
                            limite: 2
                        },
                        {
                            nome: "Taxa de Transfusão (Bolsa de sangue não coberta pelo plano)",
                            carencia: 90,
                            limite: 2
                        },
                        {
                            nome: "Taxa Curativos / Armações",
                            carencia: 60,
                            limite: 8
                        },
                        {
                            nome: "Taxa de oxigênio (meia hora)",
                            carencia: 60,
                            limite: 4
                        },
                        {
                            nome: "Biópsia",
                            carencia: 60,
                            limite: 2
                        },
                        {
                            nome: "2ª Biópsia no mesmo animal",
                            carencia: 60,
                            limite: 2
                        },
                        {
                            nome: "Taxa de uso da sala",
                            carencia: 0,
                            limite: 3
                        },
                        {
                            nome: "Abração de conduto auditivo",
                            carencia: 210,
                            limite: 1
                        },
                        {
                            nome: "Correção de Sindrome Bradcefálica",
                            carencia: 250,
                            limite: 1
                        },
                        {
                            nome: "Sialodenectomia Bilateral",
                            carencia: 180,
                            limite: 2
                        },
                        {
                            nome: "Reiki",
                            carencia: 0,
                            limite: null
                        },
                        {
                            nome: "Cristalterapia",
                            carencia: 0,
                            limite: null
                        },
                        {
                            nome: "Radiestesia e Radiônica",
                            carencia: 0,
                            limite: null
                        },
                        {
                            nome: "Cromoterapia",
                            carencia: 0,
                            limite: null
                        },
                        {
                            nome: "Acompanhamento Energético",
                            carencia: 0,
                            limite: null
                        },
                        {
                            nome: "Ozônioterapia",
                            carencia: 0,
                            limite: null
                        },
                        {
                            nome: "Formulação de Florais de Bach",
                            carencia: 0,
                            limite: null
                        }
                    ],
                    examesInclusos: [
                        {
                            nome: "Hemograma (com plaquetas)",
                            carencia: 30,
                            limite: 3
                        },
                        {
                            nome: "Parasitológico completo",
                            carencia: 30,
                            limite: 3
                        },
                        {
                            nome: "ALT (TGP)",
                            carencia: 30,
                            limite: 3
                        },
                        {
                            nome: "AST (TGO)",
                            carencia: 30,
                            limite: 3
                        },
                        {
                            nome: "Bilirrubina total e frações",
                            carencia: 30,
                            limite: 3
                        },
                        {
                            nome: "Uréia",
                            carencia: 30,
                            limite: 3
                        },
                        {
                            nome: "Creatinina",
                            carencia: 30,
                            limite: 3
                        },
                        {
                            nome: "Colesterol HDL",
                            carencia: 30,
                            limite: 3
                        },
                        {
                            nome: "Triglicérides",
                            carencia: 30,
                            limite: 3
                        },
                        {
                            nome: "Proteínas Totais",
                            carencia: 30,
                            limite: 3
                        },
                        {
                            nome: "Glicemia",
                            carencia: 30,
                            limite: 3
                        },
                        {
                            nome: "Cálcio Total",
                            carencia: 30,
                            limite: 3
                        },
                        {
                            nome: "Fósforo",
                            carencia: 30,
                            limite: 3
                        },
                        {
                            nome: "Sódio",
                            carencia: 30,
                            limite: 3
                        },
                        {
                            nome: "Potássio",
                            carencia: 30,
                            limite: 3
                        },
                        {
                            nome: "ALBUMINA",
                            carencia: 30,
                            limite: 3
                        },
                        {
                            nome: "Raspado de pele p/ investigação Microscópica",
                            carencia: 30,
                            limite: 3
                        },
                        {
                            nome: "Gama GT (Gama Glutamil Transferase)",
                            carencia: 30,
                            limite: 3
                        },
                        {
                            nome: "Parasitológico Simples",
                            carencia: 30,
                            limite: 3
                        },
                        {
                            nome: "Colesterol LDL",
                            carencia: 30,
                            limite: 3
                        },
                        {
                            nome: "Pesquisa de Hemoparasitas",
                            carencia: 30,
                            limite: 3
                        },
                        {
                            nome: "Fosfatase Alcalina",
                            carencia: 30,
                            limite: 3
                        },
                        {
                            nome: "Curva Glicêmica",
                            carencia: 30,
                            limite: 3
                        },
                        {
                            nome: "Citologia Vaginal",
                            carencia: 30,
                            limite: 3
                        },
                        {
                            nome: "UPC",
                            carencia: 30,
                            limite: 3
                        },
                        {
                            nome: "Colesterol Total",
                            carencia: 30,
                            limite: 3
                        },
                        {
                            nome: "Citologia PBA",
                            carencia: 60,
                            limite: 3
                        },
                        {
                            nome: "Urinálise",
                            carencia: 30,
                            limite: 3
                        },
                        {
                            nome: "Otológico",
                            carencia: 30,
                            limite: 3
                        },
                        {
                            nome: "Amilase",
                            carencia: 30,
                            limite: 3
                        },
                        {
                            nome: "Cultura e Antibiograma",
                            carencia: 60,
                            limite: 2
                        },
                        {
                            nome: "Cálcio urinário",
                            carencia: 30,
                            limite: 2
                        },
                        {
                            nome: "Creatinina urinaria",
                            carencia: 30,
                            limite: 2
                        },
                        {
                            nome: "Histopatológico",
                            carencia: 60,
                            limite: 2
                        },
                        {
                            nome: "Hematócrito",
                            carencia: 30,
                            limite: 3
                        },
                        {
                            nome: "Reticulócitos",
                            carencia: 30,
                            limite: 3
                        },
                        {
                            nome: "Fibrinogênio",
                            carencia: 30,
                            limite: 3
                        }
                    ],
                    examesImagemInclusos: [
                        {
                            nome: "Raio X Simples (Uma posição principal)",
                            carencia: 180,
                            limite: 2
                        },
                        {
                            nome: "Raio X Simples (três projeções com laudo)",
                            carencia: 180,
                            limite: 2
                        },
                        {
                            nome: "Eletrocardiograma",
                            carencia: 180,
                            limite: 2
                        },
                        {
                            nome: "Ultra-sonografia",
                            carencia: 180,
                            limite: 3
                        },
                        {
                            nome: "Raio X (Posição adicional com laudo)",
                            carencia: 180,
                            limite: 2
                        },
                        {
                            nome: "Ecocardiograma",
                            carencia: 240,
                            limite: 1
                        }
                    ],
                    anestesiasInclusas: [
                        {
                            nome: "Anestesia geral animais até 10 kg",
                            carencia: 30,
                            limite: null
                        },
                        {
                            nome: "Anestesia geral animais de 11 kg à 25 kg",
                            carencia: 30,
                            limite: null
                        },
                        {
                            nome: "Anestesia geral animais de 26 kg à 40 kg",
                            carencia: 30,
                            limite: null
                        },
                        {
                            nome: "Anestesia geral animais acima de 40 kg",
                            carencia: 30,
                            limite: null
                        },
                        {
                            nome: "Anestesia local ou sedação",
                            carencia: 30,
                            limite: null
                        },
                        {
                            nome: "Anestesia peridural",
                            carencia: 30,
                            limite: null
                        },
                        {
                            nome: "Anestesia inalatória (Porte 01) animais até 10 kg",
                            carencia: 180,
                            limite: null,
                            cobertura: "100% após carência"
                        },
                        {
                            nome: "Anestesia inalatória (porte 02) animais de 11kg à 25 kg",
                            carencia: 180,
                            limite: null,
                            cobertura: "100% após carência"
                        },
                        {
                            nome: "Anestesia inalatória (porte 03) animais acima de 26 kg",
                            carencia: 180,
                            limite: null,
                            cobertura: "100% após carência"
                        }
                    ],
                    cirurgiasInclusas: [
                        // Cirurgias Corretivas
                        {
                            nome: "Sutura de pele (Porte P e M)",
                            carencia: 60,
                            limite: 3
                        },
                        {
                            nome: "Neoplasia de pele (Porte P)",
                            carencia: 90,
                            limite: 3
                        },
                        {
                            nome: "Oto hematoma",
                            carencia: 180,
                            limite: 2
                        },
                        {
                            nome: "Extração de papilomas (qualquer numero)",
                            carencia: 180,
                            limite: 2
                        },
                        {
                            nome: "Sutura de pele (Porte G)",
                            carencia: 60,
                            limite: 3
                        },
                        {
                            nome: "Neoplasia de pele (Porte M e G)",
                            carencia: 90,
                            limite: 3
                        },
                        
                        // Cirurgias Ortopédicas
                        {
                            nome: "Penso Esparadrapo ou Gessado",
                            carencia: 90,
                            limite: 2
                        },
                        {
                            nome: "Amputação de Membros (Porte P)",
                            carencia: 240,
                            limite: 2
                        },
                        {
                            nome: "Amputação de Membros (Porte M)",
                            carencia: 240,
                            limite: 2
                        },
                        {
                            nome: "Amputação de Membros (Porte G)",
                            carencia: 240,
                            limite: 2
                        },
                        {
                            nome: "Amputação de unha/dedo",
                            carencia: 90,
                            limite: 2
                        },
                        {
                            nome: "Placa e pino de Membros (Porte P)",
                            carencia: 250,
                            limite: 2
                        },
                        {
                            nome: "Placa e pino de Membros (Porte M)",
                            carencia: 250,
                            limite: 2
                        },
                        {
                            nome: "Placa e pino de Membros (Porte G)",
                            carencia: 250,
                            limite: 2
                        },
                        
                        // Cirurgias Oftalmológicas
                        {
                            nome: "Enucleação Globo Ocular",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "Flape 3ª Palpebra",
                            carencia: 150,
                            limite: 1
                        },
                        {
                            nome: "Desobstrução Canal Nasolacrimal",
                            carencia: 90,
                            limite: 2
                        },
                        {
                            nome: "Olhos de Cereja",
                            carencia: 180,
                            limite: 1
                        },
                        
                        // Cirurgias Sistema Digestivo
                        {
                            nome: "Esofagotomia Extra-Toráxica",
                            carencia: 240,
                            limite: 1
                        },
                        {
                            nome: "Gastrostomia / Enterostomia",
                            carencia: 240,
                            limite: 1
                        },
                        {
                            nome: "Gastrectomia / Enterectomia",
                            carencia: 240,
                            limite: 1
                        },
                        {
                            nome: "Esplenectomia (Porte P)",
                            carencia: 240,
                            limite: 1
                        },
                        {
                            nome: "Torção Gástrica",
                            carencia: 360,
                            limite: 1
                        },
                        {
                            nome: "Excisão Glândula Ad-Anal",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "Redução Prolapso Retal",
                            carencia: 120,
                            limite: 1
                        },
                        {
                            nome: "Amputação de Reto",
                            carencia: 240,
                            limite: 1
                        },
                        {
                            nome: "Hérnia Umbilical",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "Hérnia Inguinal",
                            carencia: 240,
                            limite: 1
                        },
                        {
                            nome: "Hérnia Perineal",
                            carencia: 240,
                            limite: 1
                        },
                        {
                            nome: "Tumores Gengivais",
                            carencia: 180,
                            limite: 3
                        },
                        {
                            nome: "Extração de Dentes (qualquer numero)",
                            carencia: 90,
                            limite: 2
                        },
                        {
                            nome: "Extração de Tártaro",
                            carencia: 120,
                            limite: 1
                        },
                        {
                            nome: "Esplenectomia (Porte M)",
                            carencia: 240,
                            limite: 1
                        },
                        {
                            nome: "Esplenectomia (Porte G)",
                            carencia: 240,
                            limite: 1
                        },
                        {
                            nome: "Remoção de nódulo",
                            carencia: 180,
                            limite: 2
                        },
                        {
                            nome: "Nodulectomia (P)",
                            carencia: 180,
                            limite: 2
                        },
                        {
                            nome: "Nodulectomia (M)",
                            carencia: 180,
                            limite: 2
                        },
                        {
                            nome: "Nodulectomia (G)",
                            carencia: 180,
                            limite: 2
                        },
                        {
                            nome: "Lobectomia Hepática",
                            carencia: 240,
                            limite: 1
                        },
                        
                        // Cirurgias Sistema Urinário
                        {
                            nome: "Cistotomia",
                            carencia: 180,
                            limite: 2
                        },
                        {
                            nome: "Uretrostomia",
                            carencia: 180,
                            limite: 2
                        },
                        {
                            nome: "Nefrectomia",
                            carencia: 180,
                            limite: 2
                        },
                        {
                            nome: "Desobestrução uretral",
                            carencia: 180,
                            limite: 2
                        },
                        
                        // Cirurgias Sistema Genital
                        {
                            nome: "Taxa Assistência a Parto Normal",
                            carencia: 240,
                            limite: 1
                        },
                        {
                            nome: "Cesariana Cadela (P ou M)",
                            carencia: 240,
                            limite: 1
                        },
                        {
                            nome: "Cesariana Cadela (G)",
                            carencia: 240,
                            limite: 1
                        },
                        {
                            nome: "O.S.H. Cadela P ou M (Castração até 25 kg)",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "O.S.H. Cadela G (Castração acima de 25 kg)",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "Taxa O.S.H. Cesariana Cadela",
                            carencia: 240,
                            limite: 1
                        },
                        {
                            nome: "Orquiectomia Cão (Castração)",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "Piometra em Cadela (P ou M)",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "Piometra em Cadela (G)",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "Tumor de Mama",
                            carencia: 180,
                            limite: 3
                        },
                        {
                            nome: "Penectomia",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "Episiotomia",
                            carencia: 180,
                            limite: 2
                        },
                        {
                            nome: "Cadeia mamaria unilateral (Porte P)",
                            carencia: 240,
                            limite: 2
                        },
                        {
                            nome: "Cadeia mamaria radical",
                            carencia: 240,
                            limite: 1
                        },
                        {
                            nome: "Cadeia mamaria unilateral (Porte M)",
                            carencia: 240,
                            limite: 1
                        },
                        {
                            nome: "Cadeia mamaria unilateral (Porte G)",
                            carencia: 240,
                            limite: 1
                        }
                    ],
                    internacoesInclusas: [
                        {
                            nome: "Internação animais até 6 kg (20 diárias)",
                            carencia: 180,
                            limite: 20
                        },
                        {
                            nome: "Internação animais de 6,1 kg à 10 kg (20 diárias)",
                            carencia: 180,
                            limite: 20
                        },
                        {
                            nome: "Internação animais de 10,1 kg à 15 kg (20 diárias)",
                            carencia: 180,
                            limite: 20
                        },
                        {
                            nome: "Internação animais 15,1 kg à 20 kg (20 diárias)",
                            carencia: 180,
                            limite: 20
                        },
                        {
                            nome: "Internação animais acima de 20kg (20 diárias)",
                            carencia: 180,
                            limite: 20
                        }
                    ]
                },

                // ===== PLANO SILVESTRES 5.0 =====
                {
                    id: "plano_silvestres_5",
                    nome: "Silvestres 5.0",
                    descricao: "Plano especializado para animais silvestres e exóticos",
                    valorBase: 119.99,
                    descontoProgressivo: [
                        { qtdPets: 1, valor: 119.99 },
                        { qtdPets: 2, valor: 109.99 },
                        { qtdPets: 3, valor: 99.99 },
                        { qtdPets: 4, valor: 89.99 },
                        { qtdPets: 5, valor: 89.99 },
                        { qtdPets: 6, valor: 89.99 }
                    ],
                    consultas: {
                        inclusas: 5,
                        periodicidade: "anual",
                        intervaloMinimo: 30,
                        tipos: [
                            {
                                nome: "Consulta Diurna (08:00 às 18:00)",
                                carencia: 0,
                                limite: null
                            },
                            {
                                nome: "Consulta Noturna (18:00 às 22:00)",
                                carencia: 30,
                                limite: 2
                            },
                            {
                                nome: "Consulta Noturna (22:00 às 08:00)",
                                carencia: 30,
                                limite: null
                            },
                            {
                                nome: "Consulta especialidade",
                                carencia: 60,
                                limite: null
                            },
                            {
                                nome: "Consulta no Domingo/Feriado",
                                carencia: 60,
                                limite: null
                            }
                        ],
                        observacoes: "Retorno não é considerado consulta"
                    },
                    procedimentosInclusos: [
                        {
                            nome: "Microchip Internacional",
                            carencia: 0,
                            limite: null,
                            observacao: "Depende da espécie"
                        },
                        {
                            nome: "Drenagem de abscesso (anestesia à parte)",
                            carencia: 90,
                            limite: 2
                        },
                        {
                            nome: "Abdominocentese",
                            carencia: 90,
                            limite: 1
                        },
                        {
                            nome: "Taxa Curativos / Armações",
                            carencia: 60,
                            limite: 5
                        },
                        {
                            nome: "Taxa de oxigênio (meia hora)",
                            carencia: 60,
                            limite: 4
                        },
                        {
                            nome: "Biópsia",
                            carencia: 60,
                            limite: 2
                        },
                        {
                            nome: "2ª Biópsia no mesmo animal",
                            carencia: 60,
                            limite: 2
                        },
                        {
                            nome: "Taxa de uso da sala",
                            carencia: 0,
                            limite: 3
                        },
                        {
                            nome: "Taxa Ambulatorial (por dia)",
                            carencia: 120,
                            limite: 5,
                            observacao: "Medicamentos à parte"
                        },
                        {
                            nome: "Reiki",
                            carencia: 0,
                            limite: null
                        },
                        {
                            nome: "Cristalterapia",
                            carencia: 0,
                            limite: null
                        },
                        {
                            nome: "Radiestesia e Radiônica",
                            carencia: 0,
                            limite: null
                        },
                        {
                            nome: "Cromoterapia",
                            carencia: 0,
                            limite: null
                        }
                    ],
                    examesInclusos: [
                        {
                            nome: "Hemograma (com plaquetas)",
                            carencia: 30,
                            limite: 2
                        },
                        {
                            nome: "Parasitológico completo",
                            carencia: 30,
                            limite: 2
                        },
                        {
                            nome: "ALT (TGP)",
                            carencia: 30,
                            limite: 2
                        },
                        {
                            nome: "AST (TGO)",
                            carencia: 30,
                            limite: 2
                        },
                        {
                            nome: "Bilirrubina total e frações",
                            carencia: 30,
                            limite: 2
                        },
                        {
                            nome: "Uréia",
                            carencia: 30,
                            limite: 2
                        },
                        {
                            nome: "Creatinina",
                            carencia: 30,
                            limite: 2
                        },
                        {
                            nome: "Proteínas Totais",
                            carencia: 30,
                            limite: 2
                        },
                        {
                            nome: "Glicemia",
                            carencia: 30,
                            limite: 2
                        },
                        {
                            nome: "Cultura e Antibiograma",
                            carencia: 60,
                            limite: 2,
                            cobertura: "50% após carência"
                        },
                        {
                            nome: "Histopatológico",
                            carencia: 60,
                            limite: 1,
                            cobertura: "50% após carência"
                        }
                    ],
                    examesImagemInclusos: [
                        {
                            nome: "Raio X Simples (Uma posição principal)",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "Raio X Simples (Três posições principais com laudo)",
                            carencia: 210,
                            limite: 1
                        },
                        {
                            nome: "Ultra-sonografia",
                            carencia: 180,
                            limite: 2
                        },
                        {
                            nome: "Raio X (Posição adicional)",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "Ecocardiograma",
                            carencia: 240,
                            limite: 1
                        }
                    ],
                    anestesiasInclusas: [
                        {
                            nome: "Anestesia inalatória (Porte 01) animais até 3 kg",
                            carencia: 180,
                            limite: null,
                            cobertura: "50% após carência"
                        },
                        {
                            nome: "Anestesia inalatória (porte 02) animais de 3kg à 7 kg",
                            carencia: 180,
                            limite: null,
                            cobertura: "50% após carência"
                        },
                        {
                            nome: "Anestesia inalatória (porte 03) animais acima de 7 kg",
                            carencia: 180,
                            limite: null,
                            cobertura: "50% após carência"
                        }
                    ],
                    cirurgiasInclusas: [
                        // Cirurgias Corretivas
                        {
                            nome: "Sutura de pele (Porte P e M)",
                            carencia: 60,
                            limite: 2
                        },
                        {
                            nome: "Neoplasia de pele (Porte P)",
                            carencia: 90,
                            limite: 2
                        },
                        {
                            nome: "Sutura de pele (Porte G)",
                            carencia: 60,
                            limite: 2
                        },
                        {
                            nome: "Neoplasia de pele (Porte M e G)",
                            carencia: 90,
                            limite: 2
                        },
                        
                        // Cirurgias Ortopédicas
                        {
                            nome: "Penso Esparadrapo ou Gessado",
                            carencia: 90,
                            limite: 1
                        },
                        {
                            nome: "Amputação de Membros (Porte P)",
                            carencia: 240,
                            limite: 1
                        },
                        {
                            nome: "Amputação de Membros (Porte M)",
                            carencia: 240,
                            limite: 1
                        },
                        {
                            nome: "Amputação de Membros (Porte G)",
                            carencia: 240,
                            limite: 1
                        },
                        {
                            nome: "Amputação de unha/dedo",
                            carencia: 240,
                            limite: 1
                        },
                        
                        // Cirurgias Oftalmológicas
                        {
                            nome: "Enucleação Globo Ocular",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "Desobstrução Canal Nasolacrimal",
                            carencia: 90,
                            limite: 2
                        },
                        
                        // Cirurgias Sistema Digestivo
                        {
                            nome: "Excisão Glândula Ad-Anal",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "Redução Prolapso Retal",
                            carencia: 120,
                            limite: 1
                        },
                        {
                            nome: "Tumores Gengivais",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "Extração de Dentes (qualquer numero)",
                            carencia: 90,
                            limite: 1
                        },
                        {
                            nome: "Nodulectomia (P)",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "Nodulectomia (M)",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "Nodulectomia (G)",
                            carencia: 180,
                            limite: 1
                        },
                        
                        // Cirurgias Sistema Urinário
                        {
                            nome: "Cistotomia",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "Nefrectomia",
                            carencia: 180,
                            limite: 1
                        },
                        
                        // Cirurgias Sistema Genital
                        {
                            nome: "Taxa Assistência a Parto Normal",
                            carencia: 240,
                            limite: 1
                        },
                        {
                            nome: "Orquiectomia (Castração)",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "Piometra (P ou M)",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "Piometra (G)",
                            carencia: 180,
                            limite: 1
                        },
                        {
                            nome: "Tumor de Mama",
                            carencia: 180,
                            limite: 1
                        }
                    ],
                    internacoesInclusas: [
                        {
                            nome: "Internação animais até 3 kg (10 diárias)",
                            carencia: 180,
                            limite: 10,
                            cobertura: "50% após carência"
                        },
                        {
                            nome: "Internação animais de 3 kg à 7 kg (10 diárias)",
                            carencia: 180,
                            limite: 10,
                            cobertura: "50% após carência"
                        },
                        {
                            nome: "Internação animais acima de 7 kg à 15 kg (10 diárias)",
                            carencia: 180,
                            limite: 10,
                            cobertura: "50% após carência"
                        }
                    ],
                    observacoes: "Restrições específicas para cada tipo de animal silvestre. Microchipagem depende da espécie."
                }
            ]
        };

        // Salvando no localStorage
        localStorage.setItem('planosServicos', JSON.stringify(planosServicos));
        console.log("Dados completos de planos e serviços carregados com sucesso!");
    }
});