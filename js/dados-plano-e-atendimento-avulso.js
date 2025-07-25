document.addEventListener("DOMContentLoaded", function() {
    if (!localStorage.getItem('planosServicos')) {
        console.log("Carregando dados completos de planos e serviços...");

        const planosServicos = {
            // ========== SERVIÇOS AVULSOS ==========
            servicosAvulsos: {
                atendimentos: [
                    {
                        id: "serv_atend_1",
                        nome: "Consulta em Horário Comercial (08:00 às 18:00)",
                        valor: 80.00,
                        categoria: "Consulta"
                    },
                    {
                        id: "serv_atend_2",
                        nome: "Consulta fora de Horário Comercial (18:00 às 22:00)",
                        valor: 170.00,
                        categoria: "Consulta"
                    },
                    {
                        id: "serv_atend_3",
                        nome: "Consulta fora de Horário Comercial (22:00 às 08:00)",
                        valor: 190.00,
                        categoria: "Consulta"
                    },
                    {
                        id: "serv_atend_4",
                        nome: "Consulta especialidades em geral",
                        valor: 270.00,
                        categoria: "Consulta Especializada"
                    },
                    {
                        id: "serv_atend_5",
                        nome: "Consulta neurologia",
                        valor: 300.00,
                        categoria: "Consulta Especializada"
                    },
                    {
                        id: "serv_atend_6",
                        nome: "Consulta endocrinologista",
                        valor: 400.00,
                        categoria: "Consulta Especializada"
                    },
                    {
                        id: "serv_atend_7",
                        nome: "Retorno",
                        valor: 0.00,
                        categoria: "Consulta",
                        observacao: "Grátis para clientes com plano"
                    },
                    {
                        id: "serv_atend_8",
                        nome: "Emergência",
                        valor: 190.00,
                        categoria: "Emergência"
                    },
                    {
                        id: "serv_atend_9",
                        nome: "Guia Prever (50% do valor)",
                        valor: 40.00,
                        categoria: "Documentação"
                    }
                ],

                exames: [
                    // Exames de Imagem
                    {
                        id: "serv_exame_1",
                        nome: "Radiografia (projeções)",
                        valor: 250.00,
                        categoria: "Exame de Imagem"
                    },
                    {
                        id: "serv_exame_2",
                        nome: "Radiografia 3 projeções (crânio ou pulmão ou TPLO)",
                        valor: 270.00,
                        categoria: "Exame de Imagem"
                    },
                    {
                        id: "serv_exame_3",
                        nome: "Projeção adicional",
                        valor: 50.00,
                        categoria: "Exame de Imagem"
                    },
                    {
                        id: "serv_exame_4",
                        nome: "Radiografia fora de horário comercial",
                        valor: 500.00,
                        categoria: "Exame de Imagem"
                    },
                    {
                        id: "serv_exame_5",
                        nome: "Ultrassom - Abdômen, olho ou cervical",
                        valor: 180.00,
                        categoria: "Exame de Imagem"
                    },
                    {
                        id: "serv_exame_6",
                        nome: "Ultrassom - Fora de horário comercial",
                        valor: 360.00,
                        categoria: "Exame de Imagem"
                    },
                    {
                        id: "serv_exame_7",
                        nome: "Ecocardiograma",
                        valor: 280.00,
                        categoria: "Exame de Imagem"
                    },
                    {
                        id: "serv_exame_8",
                        nome: "Eletrocardiograma",
                        valor: 280.00,
                        categoria: "Exame de Imagem"
                    },
                    {
                        id: "serv_exame_9",
                        nome: "Ecocardiograma fora de horário comercial",
                        valor: 560.00,
                        categoria: "Exame de Imagem"
                    },
                    {
                        id: "serv_exame_10",
                        nome: "Eletrocardiograma fora de horário comercial",
                        valor: 560.00,
                        categoria: "Exame de Imagem"
                    },
                    
                    // Exames Laboratoriais
                    {
                        id: "serv_exame_13",
                        nome: "Perfil Bioquímica - TGP (ALT), Bilirrubina Total e Frações, Colesterol Total, Creatinina, Fosfatase Alcalina, Glicose, Proteína Total e Frações, Uréia",
                        valor: 280.00,
                        categoria: "Exame Laboratorial"
                    },
                    {
                        id: "serv_exame_14",
                        nome: "Perfil Check Up Global - Ácido Úrico, TGP (ALT), TGO (AST), Amilase, Bilirrubina Total e Frações, Cálcio, Colesterol Total, Cloro, CPK, Creatinina, Fosfatase Alcalina, Fósforo, Gama GT, Glicose, LDH, Lipase, Potássio, Proteína Total e Frações, Sódio, Triglicerídeos, Uréia",
                        valor: 290.01,
                        categoria: "Exame Laboratorial"
                    },
                    {
                        id: "serv_exame_15",
                        nome: "Perfil Check Up Global + Hemograma - Hemograma, Ácido Úrico, TGP (ALT), TGO (AST), Amilase, Bilirrubina Total e Frações, Cálcio, Colesterol Total, Cloro, CPK, Creatinina, Fosfatase Alcalina, Fósforo, Gama GT, Glicose, LDH, Lipase, Potássio, Proteína Total e Frações, Sódio, Triglicerídeos, Uréia",
                        valor: 350.01,
                        categoria: "Exame Laboratorial"
                    },
                    {
                        id: "serv_exame_16",
                        nome: "Perfil Eletrolítico - Cálcio, Cloro, Potássio, Sódio",
                        valor: 140.01,
                        categoria: "Exame Laboratorial"
                    },
                    {
                        id: "serv_exame_17",
                        nome: "Perfil Geriátrico - Hemograma Completo, TGP (ALT), Creatinina, Glicose, Uréia, Urina Rotina (Tipo 1), T4 Livre",
                        valor: 300.01,
                        categoria: "Exame Laboratorial"
                    },
                    {
                        id: "serv_exame_18",
                        nome: "Perfil Hepático - TGP (ALT), TGO (AST), Bilirrubina Total e Frações, Fosfatase Alcalina, Gama GT, Proteína Total e Frações",
                        valor: 200.00,
                        categoria: "Exame Laboratorial"
                    },
                    {
                        id: "serv_exame_19",
                        nome: "Perfil Hepático + Renal + Hemograma - Hemograma Completo, TGP (ALT), TGO (AST), Bilirrubina Total e Frações, Creatinina, Fosfatase Alcalina, Gama GT, Proteína Total e Frações, Uréia",
                        valor: 300.00,
                        categoria: "Exame Laboratorial"
                    },
                    {
                        id: "serv_exame_20",
                        nome: "Perfil Hepático + Renal + Pancreático + Hemograma - Hemograma Completo, TGP (ALT), TGO (AST), Amilase, Bilirrubina Total e Frações, Creatinina, Fosfatase Alcalina, Gama GT, Lipase, Proteína Total e Frações, Uréia",
                        valor: 350.00,
                        categoria: "Exame Laboratorial"
                    },
                    {
                        id: "serv_exame_21",
                        nome: "Perfil Hiperadrenocorticismo - Hemograma Completo, Potássio, Sódio, Uréia, Cortisol Basal",
                        valor: 290.01,
                        categoria: "Exame Laboratorial"
                    },
                    {
                        id: "serv_exame_22",
                        nome: "Perfil Hipotireoidismo - Hemograma Completo, Colesterol Total, Fosfatase Alcalina, T4 Livre, T4 Total",
                        valor: 300.01,
                        categoria: "Exame Laboratorial"
                    },
                    {
                        id: "serv_exame_23",
                        nome: "Perfil Obesidade - Hemograma Completo, Colesterol Total, Creatinina, Glicose, Uréia, Cortisol Basal, T4 Livre",
                        valor: 300.01,
                        categoria: "Exame Laboratorial"
                    },
                    {
                        id: "serv_exame_24",
                        nome: "Perfil Renal com Hemograma - Hemograma Completo, Albumina, Cálcio, Cloro, Creatinina, Fósforo, Sódio, Potássio, Uréia, Urina Rotina (Tipo 1), Relação Proteína : Creatinina",
                        valor: 340.01,
                        categoria: "Exame Laboratorial"
                    },
                    {
                        id: "serv_exame_25",
                        nome: "Perfil Renal Precoce - Creatinina, Uréia, SDMA",
                        valor: 270.01,
                        categoria: "Exame Laboratorial"
                    },
                    {
                        id: "serv_exame_26",
                        nome: "Perfil Triagem Mínima 1 - Hemograma Completo, TGP (ALT), Creatinina, Fosfatase Alcalina, Proteína Total e Frações, Uréia",
                        valor: 270.00,
                        categoria: "Exame Laboratorial"
                    },
                    {
                        id: "serv_exame_27",
                        nome: "Perfil Triagem Mínima 2 - Hemograma Completo, TGP (ALT), Creatinina, Fosfatase Alcalina, Glicose, Uréia",
                        valor: 270.00,
                        categoria: "Exame Laboratorial"
                    },
                    {
                        id: "serv_exame_28",
                        nome: "Perfil Triagem Mínima 3 - Hemograma Completo, TGP (ALT), TGO (AST), Creatinina, Fosfatase Alcalina, Glicose, Uréia",
                        valor: 270.00,
                        categoria: "Exame Laboratorial"
                    },
                    {
                        id: "serv_exame_29",
                        nome: "Perfil PCR Diarreia Canina - Adenovírus Canino Tipo 1, Cinomose, Circovírus Canino, Coronavírus Canino, Cryptosporidium sp., Parvovírus Canino, Giardia sp.",
                        valor: 800.00,
                        categoria: "Exame Laboratorial"
                    },
                    {
                        id: "serv_exame_30",
                        nome: "Perfil PCR Doença do Carrapato Básico - Anaplasma sp. PCR, Babesia Canis PCR, Ehrlichia sp. PCR",
                        valor: 390.00,
                        categoria: "Exame Laboratorial"
                    },
                    {
                        id: "serv_exame_31",
                        nome: "Perfil PCR Felinos Básicos - FeLV PCR, FIV PCR, Mycoplasma Haemofelis PCR",
                        valor: 390.00,
                        categoria: "Exame Laboratorial"
                    },
                    {
                        id: "serv_exame_32",
                        nome: "Perfil PCR Hemoparasitas Canino Completo - Anaplasma platys, Babesia Canis, Ehrlichia sp., Hepatozoon sp., Leishmania sp., Mycoplasma Haemocanis",
                        valor: 590.00,
                        categoria: "Exame Laboratorial"
                    },
                    {
                        id: "serv_exame_33",
                        nome: "Perfil Infecções Neurológicas Caninas - Cinomose PCR, Cryptococcus PCR, Neospora Caninum PCR, Toxoplasma Gondii PCR",
                        valor: 600.00,
                        categoria: "Exame Laboratorial"
                    },
                    {
                        id: "serv_exame_34",
                        nome: "Perfil Baby Dog - Hemograma Completo, Cinomose + Parvovírus, Coproparasitológico",
                        valor: 300.00,
                        categoria: "Exame Laboratorial"
                    },
                    {
                        id: "serv_exame_35",
                        nome: "Perfil Baby Cat - Hemograma Completo, FeLV + FIV, Coproparasitológico",
                        valor: 300.00,
                        categoria: "Exame Laboratorial"
                    },
                    {
                        id: "serv_exame_36",
                        nome: "1501 - Cortisol Basal",
                        valor: 200.00,
                        categoria: "Exame Hormonal"
                    },
                    {
                        id: "serv_exame_37",
                        nome: "1502 - Cortisol Supressão Dexametasona (02 Doses)",
                        valor: 300.00,
                        categoria: "Exame Hormonal"
                    },
                    {
                        id: "serv_exame_38",
                        nome: "1503 - Cortisol Supressão Dexametasona (03 Doses)",
                        valor: 490.00,
                        categoria: "Exame Hormonal"
                    },
                    {
                        id: "serv_exame_39",
                        nome: "1504 - Cortisol Estimulação ACTH (02 Doses)",
                        valor: 850.00,
                        categoria: "Exame Hormonal"
                    },
                    {
                        id: "serv_exame_40",
                        nome: "1507 - Estradiol",
                        valor: 250.00,
                        categoria: "Exame Hormonal"
                    },
                    {
                        id: "serv_exame_41",
                        nome: "1508 - Insulina Endógena Canina",
                        valor: 250.00,
                        categoria: "Exame Hormonal"
                    },
                    {
                        id: "serv_exame_42",
                        nome: "1509 - Insulina Endógena Felina",
                        valor: 250.00,
                        categoria: "Exame Hormonal"
                    },
                    {
                        id: "serv_exame_43",
                        nome: "1511 - Progesterona",
                        valor: 150.00,
                        categoria: "Exame Hormonal"
                    },
                    {
                        id: "serv_exame_44",
                        nome: "1512 - T3 Total",
                        valor: 90.00,
                        categoria: "Exame Hormonal"
                    },
                    {
                        id: "serv_exame_45",
                        nome: "1513 - T4 Livre",
                        valor: 90.00,
                        categoria: "Exame Hormonal"
                    },
                    {
                        id: "serv_exame_46",
                        nome: "1514 - T4 Livre Diálise",
                        valor: 90.00,
                        categoria: "Exame Hormonal"
                    },
                    {
                        id: "serv_exame_47",
                        nome: "1515 - T4 Total",
                        valor: 90.00,
                        categoria: "Exame Hormonal"
                    },
                    {
                        id: "serv_exame_48",
                        nome: "1516 - T4 Total Pós Levotiroxina",
                        valor: 90.00,
                        categoria: "Exame Hormonal"
                    },
                    {
                        id: "serv_exame_49",
                        nome: "1517 - Testosterona",
                        valor: 190.00,
                        categoria: "Exame Hormonal"
                    },
                    {
                        id: "serv_exame_50",
                        nome: "1518 - TSH",
                        valor: 150.00,
                        categoria: "Exame Hormonal"
                    },
                    {
                        id: "serv_exame_51",
                        nome: "1314 - Citologia de Ouvido (Individual)",
                        valor: 100.00,
                        categoria: "Exame Microbiológico"
                    },
                    {
                        id: "serv_exame_52",
                        nome: "1301 - Coprocultura com Antibiograma",
                        valor: 150.00,
                        categoria: "Exame Microbiológico"
                    },
                    {
                        id: "serv_exame_53",
                        nome: "1302 - Cultura Aeróbios com Antibiograma",
                        valor: 150.00,
                        categoria: "Exame Microbiológico"
                    },
                    {
                        id: "serv_exame_54",
                        nome: "1304 - Cultura Aeróbios e Anaeróbios com Antibiograma",
                        valor: 300.00,
                        categoria: "Exame Microbiológico"
                    },
                    {
                        id: "serv_exame_55",
                        nome: "1303 - Cultura Anaeróbios com Antibiograma",
                        valor: 300.00,
                        categoria: "Exame Microbiológico"
                    },
                    {
                        id: "serv_exame_56",
                        nome: "1305 - Cultura para Fungos",
                        valor: 150.00,
                        categoria: "Exame Microbiológico"
                    },
                    {
                        id: "serv_exame_57",
                        nome: "1307 - Hemocultura com Antibiograma",
                        valor: 170.00,
                        categoria: "Exame Microbiológico"
                    },
                    {
                        id: "serv_exame_58",
                        nome: "1308 - Oftalmocultura com Antibiograma",
                        valor: 200.00,
                        categoria: "Exame Microbiológico"
                    },
                    {
                        id: "serv_exame_59",
                        nome: "1309 - Otocultura com Antibiograma",
                        valor: 150.00,
                        categoria: "Exame Microbiológico"
                    },
                    {
                        id: "serv_exame_60",
                        nome: "1311 - Pesquisa de Sporothrix Schenckii",
                        valor: 150.00,
                        categoria: "Exame Microbiológico"
                    },
                    {
                        id: "serv_exame_61",
                        nome: "1313 - Raspado Cutâneo (Pesquisa de Sarnas e Fungos)",
                        valor: 150.00,
                        categoria: "Exame Microbiológico"
                    },
                    {
                        id: "serv_exame_62",
                        nome: "1312 - Urocultura com Antibiograma",
                        valor: 150.00,
                        categoria: "Exame Microbiológico"
                    },
                    {
                        id: "serv_exame_63",
                        nome: "Análise de Líquido Cavitário",
                        valor: 150.00,
                        categoria: "Exame de Análise de Líquidos"
                    },
                    {
                        id: "serv_exame_64",
                        nome: "1608 - Análise de Líquido Sinovial",
                        valor: 150.00,
                        categoria: "Exame de Análise de Líquidos"
                    },
                    {
                        id: "serv_exame_65",
                        nome: "1602 - Citologia (Imprint, CLAP, PAAF)",
                        valor: 150.00,
                        categoria: "Exame Citológico"
                    },
                    {
                        id: "serv_exame_66",
                        nome: "1603 - Citologia Vaginal",
                        valor: 150.00,
                        categoria: "Exame Citológico"
                    },
                    {
                        id: "serv_exame_67",
                        nome: "1604 - Histopatológico Coloração Rotina (01 Peça)",
                        valor: 390.00,
                        categoria: "Exame Histopatológico"
                    },
                    {
                        id: "serv_exame_68",
                        nome: "1605 - Histopatológico Coloração Rotina (02 a 03 Peças)",
                        valor: 490.00,
                        categoria: "Exame Histopatológico"
                    },
                    {
                        id: "serv_exame_69",
                        nome: "1610 - Histopatológico Coloração Rotina (04 a 05 Peças)",
                        valor: 590.00,
                        categoria: "Exame Histopatológico"
                    },
                    {
                        id: "serv_exame_70",
                        nome: "1606 - Histopatológico com Margem Cirúrgica",
                        valor: 250.00,
                        categoria: "Exame Histopatológico"
                    },
                    {
                        id: "serv_exame_71",
                        nome: "1612 - Histopatológico de Cadeia Mamária (Nódulos e Linfonodos)",
                        valor: 400.00,
                        categoria: "Exame Histopatológico"
                    },
                    {
                        id: "serv_exame_72",
                        nome: "1613 - Histopatológico Peças Cirúrgicas e Baço",
                        valor: 600.00,
                        categoria: "Exame Histopatológico"
                    },
                    {
                        id: "serv_exame_73",
                        nome: "1607 - Imunoistoquímica para Neoplasias (Painel Geral)",
                        valor: 1000.00,
                        categoria: "Exame Histopatológico"
                    },
                    {
                        id: "serv_exame_74",
                        nome: "1201 - ANA (Anticorpo Anti Nuclear)",
                        valor: 350.00,
                        categoria: "Exame Sorológico"
                    },
                    {
                        id: "serv_exame_75",
                        nome: "1237 - Anaplasma sp. - IgG (TRI)",
                        valor: 200.00,
                        categoria: "Exame Sorológico"
                    },
                    {
                        id: "serv_exame_76",
                        nome: "1202 - Babesiose Canina - IgG (ELISA)",
                        valor: 200.00,
                        categoria: "Exame Sorológico"
                    },
                    {
                        id: "serv_exame_77",
                        nome: "1203 - Brucelose Canina - IgM e IgG (TRI)",
                        valor: 230.00,
                        categoria: "Exame Sorológico"
                    },
                    {
                        id: "serv_exame_78",
                        nome: "1206 - Cinomose - Antígeno (TRI)",
                        valor: 200.00,
                        categoria: "Exame Sorológico"
                    },
                    {
                        id: "serv_exame_79",
                        nome: "1240 - Coronavírus Canino - Antígeno (TRI)",
                        valor: 200.00,
                        categoria: "Exame Sorológico"
                    },
                    {
                        id: "serv_exame_80",
                        nome: "1241 - Coronavírus Felino/PIF - IgG (TRI)",
                        valor: 200.00,
                        categoria: "Exame Sorológico"
                    },
                    {
                        id: "serv_exame_81",
                        nome: "1244 - Ehrlichiose Canina - IgG (TRI)",
                        valor: 200.00,
                        categoria: "Exame Sorológico"
                    },
                    {
                        id: "serv_exame_82",
                        nome: "1210 - Fator Reumatoide Canino",
                        valor: 180.00,
                        categoria: "Exame Sorológico"
                    },
                    {
                        id: "serv_exame_83",
                        nome: "1211 - FIV/FeLV (TRI)",
                        valor: 210.00,
                        categoria: "Exame Sorológico"
                    },
                    {
                        id: "serv_exame_84",
                        nome: "1245 - Giardia Lamblia - Antígeno (TRI)",
                        valor: 150.00,
                        categoria: "Exame Sorológico"
                    },
                    {
                        id: "serv_exame_85",
                        nome: "1247 - Leishmaniose Canina - IgG (ELISA)",
                        valor: 150.00,
                        categoria: "Exame Sorológico"
                    },
                    {
                        id: "serv_exame_86",
                        nome: "1279 - Leishmaniose Canina (ELISA + RIFI Total)",
                        valor: 150.00,
                        categoria: "Exame Sorológico"
                    },
                    {
                        id: "serv_exame_87",
                        nome: "1218 - Leishmaniose Canina - IgG (TRI + ELISA)",
                        valor: 150.00,
                        categoria: "Exame Sorológico"
                    },
                    {
                        id: "serv_exame_88",
                        nome: "1220 - Leptospirose (Diluição Parcial)",
                        valor: 150.00,
                        categoria: "Exame Sorológico"
                    },
                    {
                        id: "serv_exame_89",
                        nome: "1221 - Leptospirose (Diluição Total)",
                        valor: 150.00,
                        categoria: "Exame Sorológico"
                    },
                    {
                        id: "serv_exame_90",
                        nome: "1222 - Neosporose Canina (RIFI)",
                        valor: 150.00,
                        categoria: "Exame Sorológico"
                    },
                    {
                        id: "serv_exame_91",
                        nome: "1223 - Parvovírus Canino - Antígeno (TRI)",
                        valor: 150.00,
                        categoria: "Exame Sorológico"
                    },
                    {
                        id: "serv_exame_92",
                        nome: "1250 - Parvovírus Felino - Antígeno (TRI)",
                        valor: 150.00,
                        categoria: "Exame Sorológico"
                    },
                    {
                        id: "serv_exame_93",
                        nome: "1255 - Teste Alérgico Canino (Alérgenos Alimentares e Ambientais)",
                        valor: 2500.00,
                        categoria: "Exame Alérgico"
                    },
                    {
                        id: "serv_exame_94",
                        nome: "1256 - Teste Alérgico Felino (Alérgenos Alimentares e Ambientais)",
                        valor: 2500.00,
                        categoria: "Exame Alérgico"
                    },
                    {
                        id: "serv_exame_95",
                        nome: "1227 - Teste Alérgico (Malassezia)",
                        valor: 150.00,
                        categoria: "Exame Alérgico"
                    },
                    {
                        id: "serv_exame_96",
                        nome: "1228 - Teste Alérgico (Saliva de Pulga)",
                        valor: 250.00,
                        categoria: "Exame Alérgico"
                    },
                    {
                        id: "serv_exame_97",
                        nome: "1229 - Titulação Anticorpos Raiva (Padrão União Europeia)",
                        valor: 1500.00,
                        categoria: "Exame Sorológico"
                    },
                    {
                        id: "serv_exame_98",
                        nome: "1231 - Toxoplasmose Canina (RIFI)",
                        valor: 150.00,
                        categoria: "Exame Sorológico"
                    },
                    {
                        id: "serv_exame_99",
                        nome: "1258 - Toxoplasmose Felina - IgG e IgM (TRI)",
                        valor: 150.00,
                        categoria: "Exame Sorológico"
                    },
                    {
                        id: "serv_exame_100",
                        nome: "1234 - Tripsinogênio Canino (TLI)",
                        valor: 250.00,
                        categoria: "Exame Sorológico"
                    },
                    {
                        id: "serv_exame_101",
                        nome: "1701 - Anaplasma Platys",
                        valor: 250.00,
                        categoria: "Exame PCR"
                    },
                    {
                        id: "serv_exame_102",
                        nome: "1702 - Babesia Canis",
                        valor: 250.00,
                        categoria: "Exame PCR"
                    },
                    {
                        id: "serv_exame_103",
                        nome: "1709 - Cinomose",
                        valor: 250.00,
                        categoria: "Exame PCR"
                    },
                    {
                        id: "serv_exame_104",
                        nome: "1719 - Circovírus Canino",
                        valor: 250.00,
                        categoria: "Exame PCR"
                    },
                    {
                        id: "serv_exame_105",
                        nome: "1714 - Coronavírus Felino (PIF)",
                        valor: 250.00,
                        categoria: "Exame PCR"
                    },
                    {
                        id: "serv_exame_106",
                        nome: "1721 - Cryptococcus sp.",
                        valor: 250.00,
                        categoria: "Exame PCR"
                    },
                    {
                        id: "serv_exame_107",
                        nome: "1704 - Ehrlichia sp.",
                        valor: 250.00,
                        categoria: "Exame PCR"
                    },
                    {
                        id: "serv_exame_108",
                        nome: "1712 - FeLV (Leucemia Viral Felina)",
                        valor: 250.00,
                        categoria: "Exame PCR"
                    },
                    {
                        id: "serv_exame_109",
                        nome: "1711 - FIV (Imunodeficiência Felina)",
                        valor: 250.00,
                        categoria: "Exame PCR"
                    },
                    {
                        id: "serv_exame_110",
                        nome: "1707 - Giardia sp.",
                        valor: 250.00,
                        categoria: "Exame PCR"
                    },
                    {
                        id: "serv_exame_111",
                        nome: "1723 - Hepatozoon sp.",
                        valor: 250.00,
                        categoria: "Exame PCR"
                    },
                    {
                        id: "serv_exame_112",
                        nome: "1708 - Leishmania sp.",
                        valor: 250.00,
                        categoria: "Exame PCR"
                    },
                    {
                        id: "serv_exame_113",
                        nome: "1705 - Leptospira sp.",
                        valor: 250.00,
                        categoria: "Exame PCR"
                    },
                    {
                        id: "serv_exame_114",
                        nome: "1726 - Mycoplasma Haemocanis",
                        valor: 250.00,
                        categoria: "Exame PCR"
                    },
                    {
                        id: "serv_exame_115",
                        nome: "1713 - Mycoplasma Haemofelis",
                        valor: 250.00,
                        categoria: "Exame PCR"
                    },
                    {
                        id: "serv_exame_116",
                        nome: "1727 - Neospora Caninum",
                        valor: 250.00,
                        categoria: "Exame PCR"
                    },
                    {
                        id: "serv_exame_117",
                        nome: "1720 - Parvovírus Canino",
                        valor: 250.00,
                        categoria: "Exame PCR"
                    },
                    {
                        id: "serv_exame_118",
                        nome: "1728 - Parvovírus Felino (Panleucopenia Felina)",
                        valor: 250.00,
                        categoria: "Exame PCR"
                    },
                    {
                        id: "serv_exame_119",
                        nome: "1706 - Toxoplasma Gondii",
                        valor: 250.00,
                        categoria: "Exame PCR"
                    },
                    {
                        id: "serv_exame_120",
                        nome: "1729 - Sexagem Aviária",
                        valor: 150.00,
                        categoria: "Exame Especializado"
                    },
                    {
                        id: "serv_exame_121",
                        nome: "1117 - Compatibilidade Sanguínea",
                        valor: 150.00,
                        categoria: "Exame Hematológico"
                    },
                    {
                        id: "serv_exame_122",
                        nome: "1102 - Contagem de Plaquetas",
                        valor: 50.00,
                        categoria: "Exame Hematológico"
                    },
                    {
                        id: "serv_exame_123",
                        nome: "1103 - Contagem de Reticulócitos",
                        valor: 50.00,
                        categoria: "Exame Hematológico"
                    },
                    {
                        id: "serv_exame_124",
                        nome: "1101 - Coombs Direto",
                        valor: 600.00,
                        categoria: "Exame Hematológico"
                    },
                    {
                        id: "serv_exame_125",
                        nome: "1112 - Fibrinogênio",
                        valor: 150.00,
                        categoria: "Exame Hematológico"
                    },
                    {
                        id: "serv_exame_126",
                        nome: "1118 - Hemoglobina Glicosilada",
                        valor: 150.00,
                        categoria: "Exame Hematológico"
                    },
                    {
                        id: "serv_exame_127",
                        nome: "1105 - Hemograma Completo (Aves e Répteis)",
                        valor: 150.00,
                        categoria: "Exame Hematológico"
                    },
                    {
                        id: "serv_exame_128",
                        nome: "1104 - Hemograma Completo (Mamíferos)",
                        valor: 100.00,
                        categoria: "Exame Hematológico"
                    },
                    {
                        id: "serv_exame_129",
                        nome: "1106 - Mielograma",
                        valor: 150.00,
                        categoria: "Exame Hematológico"
                    },
                    {
                        id: "serv_exame_130",
                        nome: "1108 - Pesquisa De Hematozoários",
                        valor: 50.00,
                        categoria: "Exame Hematológico"
                    },
                    {
                        id: "serv_exame_131",
                        nome: "1115 - Tempo de Protrombina",
                        valor: 150.00,
                        categoria: "Exame Hematológico"
                    },
                    {
                        id: "serv_exame_132",
                        nome: "1116 - Tempo de Tromboplastina Parcial Ativada",
                        valor: 150.00,
                        categoria: "Exame Hematológico"
                    },
                    {
                        id: "serv_exame_133",
                        nome: "1401 - Análise de Cálculo",
                        valor: 200.00,
                        categoria: "Exame Urinário"
                    },
                    {
                        id: "serv_exame_134",
                        nome: "1402 - Relação Cortisol : Creatinina (3x ao dia)",
                        valor: 250.00,
                        categoria: "Exame Urinário"
                    },
                    {
                        id: "serv_exame_135",
                        nome: "1404 - Relação Proteína : Creatinina",
                        valor: 100.00,
                        categoria: "Exame Urinário"
                    },
                    {
                        id: "serv_exame_136",
                        nome: "1405 - Urina Rotina (Tipo 1)",
                        valor: 100.00,
                        categoria: "Exame Urinário"
                    },
                    {
                        id: "serv_exame_137",
                        nome: "1451 - Parasitológico de Fezes",
                        valor: 100.00,
                        categoria: "Exame Parasitológico"
                    },
                    {
                        id: "serv_exame_138",
                        nome: "1452 - Parasitológico de Fezes (OPG)",
                        valor: 100.00,
                        categoria: "Exame Parasitológico"
                    },
                    {
                        id: "serv_exame_139",
                        nome: "1454 - Parasitológico Seriado (03 Amostras)",
                        valor: 150.00,
                        categoria: "Exame Parasitológico"
                    },
                    {
                        id: "serv_exame_140",
                        nome: "1045 - Ácido Biliares",
                        valor: 300.00,
                        categoria: "Exame Bioquímico"
                    },
                    {
                        id: "serv_exame_141",
                        nome: "1002 - Ácido Úrico",
                        valor: 40.00,
                        categoria: "Exame Bioquímico"
                    },
                    {
                        id: "serv_exame_142",
                        nome: "1003 - Albumina",
                        valor: 40.00,
                        categoria: "Exame Bioquímico"
                    },
                    {
                        id: "serv_exame_143",
                        nome: "1004 - Amilase",
                        valor: 50.00,
                        categoria: "Exame Bioquímico"
                    },
                    {
                        id: "serv_exame_144",
                        nome: "1005 - Bilirrubina Total E Frações",
                        valor: 50.00,
                        categoria: "Exame Bioquímico"
                    },
                    {
                        id: "serv_exame_145",
                        nome: "1007 - Cálcio",
                        valor: 50.00,
                        categoria: "Exame Bioquímico"
                    },
                    {
                        id: "serv_exame_146",
                        nome: "1006 - Cálcio Iônico",
                        valor: 50.00,
                        categoria: "Exame Bioquímico"
                    },
                    {
                        id: "serv_exame_147",
                        nome: "1009 - Cloro",
                        valor: 50.00,
                        categoria: "Exame Bioquímico"
                    },
                    {
                        id: "serv_exame_148",
                        nome: "1010 - Colesterol Total",
                        valor: 50.00,
                        categoria: "Exame Bioquímico"
                    },
                    {
                        id: "serv_exame_149",
                        nome: "1011 - Colesterol Total e Frações",
                        valor: 50.00,
                        categoria: "Exame Bioquímico"
                    },
                    {
                        id: "serv_exame_150",
                        nome: "1008 - CPK - Creatinofosfoquinase",
                        valor: 50.00,
                        categoria: "Exame Bioquímico"
                    },
                    {
                        id: "serv_exame_151",
                        nome: "1012 - Creatinina",
                        valor: 50.00,
                        categoria: "Exame Bioquímico"
                    },
                    {
                        id: "serv_exame_152",
                        nome: "1014 - Fosfatase Alcalina",
                        valor: 50.00,
                        categoria: "Exame Bioquímico"
                    },
                    {
                        id: "serv_exame_153",
                        nome: "1041 - Fosfatase Alcalina e Frações",
                        valor: 450.00,
                        categoria: "Exame Bioquímico"
                    },
                    {
                        id: "serv_exame_154",
                        nome: "1015 - Fósforo",
                        valor: 50.00,
                        categoria: "Exame Bioquímico"
                    },
                    {
                        id: "serv_exame_155",
                        nome: "1016 - Frutosamina",
                        valor: 50.00,
                        categoria: "Exame Bioquímico"
                    },
                    {
                        id: "serv_exame_156",
                        nome: "1017 - Gama GT",
                        valor: 50.00,
                        categoria: "Exame Bioquímico"
                    },
                    {
                        id: "serv_exame_157",
                        nome: "1018 - Glicose",
                        valor: 50.00,
                        categoria: "Exame Bioquímico"
                    },
                    {
                        id: "serv_exame_158",
                        nome: "1020 - LDH - Desidrogenase Lática",
                        valor: 50.00,
                        categoria: "Exame Bioquímico"
                    },
                    {
                        id: "serv_exame_159",
                        nome: "1021 - Lipase",
                        valor: 50.00,
                        categoria: "Exame Bioquímico"
                    },
                    {
                        id: "serv_exame_160",
                        nome: "1022 - Lipase Imunorreativa Canina",
                        valor: 300.00,
                        categoria: "Exame Bioquímico"
                    },
                    {
                        id: "serv_exame_161",
                        nome: "1023 - Lipase Imunorreativa Felina",
                        valor: 400.00,
                        categoria: "Exame Bioquímico"
                    },
                    {
                        id: "serv_exame_162",
                        nome: "1024 - Magnésio",
                        valor: 50.00,
                        categoria: "Exame Bioquímico"
                    },
                    {
                        id: "serv_exame_163",
                        nome: "1025 - Potássio",
                        valor: 50.00,
                        categoria: "Exame Bioquímico"
                    },
                    {
                        id: "serv_exame_164",
                        nome: "1026 - Proteína Total",
                        valor: 50.00,
                        categoria: "Exame Bioquímico"
                    },
                    {
                        id: "serv_exame_165",
                        nome: "1027 - Proteína Total e Frações",
                        valor: 50.00,
                        categoria: "Exame Bioquímico"
                    },
                    {
                        id: "serv_exame_166",
                        nome: "1042 - SDMA",
                        valor: 300.00,
                        categoria: "Exame Bioquímico"
                    },
                    {
                        id: "serv_exame_167",
                        nome: "1028 - Sódio",
                        valor: 50.00,
                        categoria: "Exame Bioquímico"
                    },
                    {
                        id: "serv_exame_168",
                        nome: "1029 - TGO (AST)",
                        valor: 50.00,
                        categoria: "Exame Bioquímico"
                    },
                    {
                        id: "serv_exame_169",
                        nome: "1030 - TGP (ALT)",
                        valor: 50.00,
                        categoria: "Exame Bioquímico"
                    },
                    {
                        id: "serv_exame_170",
                        nome: "1031 - Triglicerídeos",
                        valor: 50.00,
                        categoria: "Exame Bioquímico"
                    },
                    {
                        id: "serv_exame_171",
                        nome: "1032 - Ureia",
                        valor: 50.00,
                        categoria: "Exame Bioquímico"
                    },
                    {
                        id: "serv_exame_172",
                        nome: "1034 - Vitamina B12",
                        valor: 100.00,
                        categoria: "Exame Bioquímico"
                    },
                    {
                        id: "serv_exame_173",
                        nome: "1801 - Análise de Líquor",
                        valor: 220.00,
                        categoria: "Exame Especializado"
                    },
                    {
                        id: "serv_exame_174",
                        nome: "1802 - Dosagem de Fenobarbital",
                        valor: 150.00,
                        categoria: "Exame Toxicológico"
                    },
                    {
                        id: "serv_exame_175",
                        nome: "1811 - Tricograma",
                        valor: 300.00,
                        categoria: "Exame Dermatológico"
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