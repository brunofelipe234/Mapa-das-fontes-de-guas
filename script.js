// --- ELEMENTOS DO DOM ---
const nonequinho = document.getElementById('nonequinho');
const mapa = document.getElementById('mapa');
const camera = document.getElementById('camera');
const telaInicial = document.getElementById('tela-inicial');
const btnIniciar = document.getElementById('btn-iniciar');

// Elementos da Interface
const btnInspecionar = document.getElementById('btn-inspecionar');
const modalInfo = document.getElementById('modal-info');
const btnFecharModal = document.getElementById('fechar-modal');
const modalTitulo = document.getElementById('modal-titulo');
const modalImagem = document.getElementById('modal-imagem');
const modalDescricao = document.getElementById('modal-descricao');

// --- VARIÁVEIS DE ESTADO ---
let jogoAtivo = false;
let posX = 710;
let posY = 1300; 
const velocidade = 8;
const tamanhoPersonagem = 30;
let larguraMapa = mapa.clientWidth;
let alturaMapa = mapa.clientHeight;
const distanciaInteracao = 40;
let elementoAtual = null; // Guarda a bacia ou o açude/lago selecionado

const teclas = {
    w: false,
    a: false,
    s: false,
    d: false
};

// --- DADOS DAS BACIAS HIDROGRÁFICAS ---
const baciasHidrograficas = [
    {
        id: 1,
        x: 3185,
        y: 1928,
        nome: "Bacia do Rio Paraíba",
        imagem: "Rio_Paraíba_em_Itabaiana_(Paraíba).jpg", 
        descricao: "A bacia do rio Paraíba é a segunda maior bacia hidrográfica do estado da Paraíba, com cerca de 20.070 km² (aproximadamente 38% do território estadual), abrangendo 85 municípios e atendendo cerca de 1,8 milhão de habitantes (52% da população do estado), incluindo as duas maiores cidades: João Pessoa e Campina Grande. O rio Paraíba nasce na Serra de Jabitacá, no município de Monteiro (PB), e percorre o estado até desaguar no Oceano Atlântico"
    },
    {
        id: 2,
        x: 1985, 
        y: 1338,
        nome: "Bacia do Rio Piranhas",
        imagem: "09_02_2022_Cerimônia_Alusiva_à_Chegada_das_Águas_do_Rio_São_Francisco_ao_Estado_do_Rio_Grande_do_Norte_(51872825300).jpg", 
        descricao: "A bacia do rio Piranhas (Piancó‑Piranhas‑Açu) é a maior da Região Hidrográfica Atlântico Nordeste Oriental, com cerca de 43.680 km², ocupando 60% da Paraíba e 40% do Rio Grande do Norte, em clima semiárido. O rio nasce na Serra de Piancó (PB) e deságua no Atlântico próximo a Macau (RN), sendo naturalmente intermitente e dependente de grandes reservatórios para abastecimento e irrigação."
    },
    {
        id: 3,
        x: 4445, 
        y: 1237,
        nome: "Bacia do Rio Mamanguape",
        imagem: "Rio-Mamanguape.jpg", 
        descricao: "A bacia do rio Mamanguape está localizada no litoral norte da Paraíba, em região de clima tropical úmido, e é conhecida por seu estuário bem preservado, com extensos manguezais que abrigam o peixe-boi-marinho e sustentam comunidades tradicionais, incluindo a aldeia indígena potiguara. O rio Mamanguape nasce na Serra da Raiz e percorre cerca de 80 km até desaguar no Oceano Atlântico, na Barra de Mamanguape, formando uma paisagem de manguezais, coqueirais, arrecifes e águas tranquilas, com importância ecológica, cultural e econômica para a região."
    },
    {
        id: 4,
        x: 3834, 
        y: 1182,
        nome: "Bacia do Rio Curimataú",
        imagem: "Rio_Curimataú.jpg", 
        descricao: "A bacia do rio Curimataú está localizada no interior da Paraíba, em região de clima semiárido, e abrange parte do estado vizinho do Rio Grande do Norte. O rio Curimataú tem cerca de 126 km de extensão, nasce no Planalto da Borborema (região de Bananeiras e Areia, PB) e percorre o interior paraibano até desaguar no Oceano Atlântico, próximo a Baía da Traição, no litoral norte. Sua bacia é caracterizada por regime intermitente típico do semiárido, com vazões muito variáveis ao longo do ano, e tem importância para abastecimento local, agricultura familiar e pecuária, além de apresentar trechos de ocupação tradicional e práticas de convivência com a seca."
    },
    {
        id: 5,
        x: 4845, 
        y: 2049,
        nome: "Bacia do Rio Gramame",
        imagem: "Acude-Sao-Domingos.jpg", 
        descricao: "A bacia do rio Gramame está localizada no litoral sul da Paraíba, em região de clima tropical úmido, e é uma das mais importantes do estado por abastecer cerca de 70% da população de João Pessoa. O rio Gramame nasce no município de Pedras de Fogo e percorre aproximadamente 110 km, atravessando sete municípios (Pedras de Fogo, São Miguel de Taipu, Cruz do Espírito Santo, Santa Rita, Alhandra, Conde e João Pessoa) até desaguar no Oceano Atlântico, próximo à praia de Jacumã, no município do Conde."
    },
    {
        id: 6,
        x: 4500, 
        y: 1000,
        nome: "Bacia do Rio Camaratuba",
        imagem: "Barra-de-Camaratuba-na-Paraíba-2.jpg", 
        descricao: "A bacia do rio Camaratuba está localizada no litoral norte da Paraíba, em região de clima tropical úmido, e é uma das menores bacias costeiras do estado. O rio Camaratuba nasce no município de Serra da Raiz, no Planalto da Borborema, e percorre cerca de 60 a 70 km em direção ao oceano, desaguando em foz do tipo estuário entre os municípios de Baía da Traição e Mataraca, onde forma manguezais que sustentam a pesca artesanal e comunidades tradicionais, incluindo territórios indígenas potiguaras. Sua bacia é caracterizada por regime relativamente perene no baixo curso, com importância ecológica e socioeconômica local, mas sofre pressões de ocupação irregular, poluição e degradação de matas ciliares."
    },
    {
        id: 7,
        x: 4866, 
        y: 2172,
        nome: "Bacia do Rio Abiaí",
        imagem: "reserva-abiai-estrutura-4.jpg", 
        descricao: "A bacia do rio Abiaí está localizada no litoral sul da Paraíba, em região de clima tropical úmido e totalmente inserida no bioma da Mata Atlântica. O rio Abiaí nasce da confluência dos rios Taperubus e Cupissura, com contribuição do riacho Pitanga, e deságua no Oceano Atlântico próximo ao município de Alhandra, na divisa com Pernambuco. Sua área de drenagem é de aproximadamente 449,5 km², com perímetro de 110,5 km, sendo uma das menores bacias costeiras do estado, mas de grande importância ecológica por abrigar remanescentes de Mata Atlântica e manguezais estuarinos que sustentam a pesca artesanal e comunidades tradicionais."
    },
    {
        id: 8,
        x: 4713, 
        y: 881,
        nome: "Bacia do Rio guaju",
        imagem: "img_9230.jpg", 
        descricao: "A bacia do rio Guaju está localizada no litoral norte da Paraíba, em região de clima tropical úmido, e é uma das menores bacias costeiras do estado. O rio Guaju nasce no município de Capim, percorre cerca de 50 km em direção ao oceano e deságua no Atlântico entre os municípios de Rio Tinto e Lucena, formando um estuário com manguezais que sustentam a pesca artesanal e comunidades tradicionais, incluindo territórios indígenas. Sua bacia é caracterizada por regime relativamente perene no baixo curso, com importância ecológica e socioeconômica local, mas sofre pressões de ocupação irregular, poluição e degradação de matas ciliares."
    },
    {
        id: 9,
        x: 3415, 
        y: 973,
        nome: "Bacia do Rio jacu",
        imagem: "25171046_48698_GD.jpg", 
        descricao: "O rio Jacuípe está localizado no litoral sul da Paraíba, em região de clima tropical úmido e Mata Atlântica. Ele é o principal formador do rio Soé, com o Mangereba como seu afluente mais importante, e sua bacia abrange áreas dos municípios de Santa Rita e Bayeux, com forte presença de canaviais e projetos agrícolas no vale. O rio deságua no estuário do rio Paraíba, próximo a João Pessoa, e sua bacia tem importância para agricultura, abastecimento local e ecossistemas costeiros, mas sofre pressões de ocupação urbana e poluição."
    },
    {
        id: 10,
        x: 4654, 
        y: 1516,
        nome: "Bacia do Rio miriri",
        imagem: "Praia_do_miriri_Rio_Tinto_Paraíba.jpg", 
        descricao: "A bacia do rio Miriri está localizada no litoral norte da Paraíba, em região de clima tropical úmido. O rio Miriri nasce no limite dos municípios de Mari e Sapé, percorre cerca de 50 km em direção ao oceano e deságua no Atlântico entre os municípios de Santa Rita e Rio Tinto, na localidade conhecida como Barra do Miriri, onde forma estuário com manguezais que sustentam a pesca artesanal e comunidades tradicionais. Sua bacia é caracterizada por regime relativamente perene no baixo curso, com importância para abastecimento humano e animal, pequenos projetos de irrigação e atividades pesqueiras, mas sofre pressões de ocupação irregular, poluição e degradação de matas ciliares"
    },
    {
        id: 11,
        x: 3375, 
        y: 772,
        nome: "Bacia do Rio Trairi",
        imagem: "Foz_do_rio_mundau_-_ceara.jpg", 
        descricao: "A bacia do rio Trairi está localizada no agreste e litoral sul da Paraíba, em região de transição entre o semiárido e o clima tropical úmido. O rio Trairi nasce no município de Gurinhém, no Planalto da Borborema, e percorre cerca de 120 km em direção ao oceano, desaguando no Atlântico próximo ao município de Conde, ao sul de João Pessoa. Sua bacia abrange municípios como Gurinhém, Alagoinha, Itabaiana, Fagundes, Lagoa Salgada, Puxinanã, São Sebastião de Lagoa de Roça, entre outros, e tem importância para abastecimento humano e animal, agricultura familiar e pecuária, além de apresentar trechos de ocupação tradicional e práticas de convivência com a seca. O regime do rio é intermitente no alto e médio cursos, tornando‑se mais perene no baixo curso, próximo ao litoral."
    }
];

// --- DADOS DOS AÇUDES E LAGOS (MARCAÇÃO 📍 - SEM DESCRIÇÃO) ---
const acudesELagos = [
    {
        id: 101,
        x: 1410,
        y: 2300,
        nome: "Açude Gloria",
        tipo: "Ressevatorio",
        municipio: "Juru",
        capacidade: "1.349.980 m³",
        imagem: "Captura de tela 2026-08-31 161333.png"
    },
    {
        id: 102,
        x: 1330,
        y: 2300,
        nome: "Açude Timbaúba",
        tipo: "Açude",
        municipio: "Juru",
        capacidade: "15.438.572 m³",
        imagem: "Captura de tela 2026-08-31 161457.png"
    },
    {
        id: 103,
        x: 1220,
        y: 2300,
        nome: "Açude Tavares II",
        tipo: "Reservatorio",
        municipio: "Tavares",
        capacidade: "9.000.000 m³",
        imagem: "Captura de tela 2026-08-31 162427.png"
    },
     {
        id: 104,
        x: 1300,
        y: 2360,
        nome: "Açude Novo II",
        tipo: "Lago",
        municipio: "Tavares",
        capacidade: "Não Informda",
        imagem: "Captura de tela 2026-08-31 163142.png"
    },
    {
        id: 105,
        x: 1100,
        y: 2450,
        nome: "Açude Macapá",
        tipo: "corpo de água",
        municipio: "Princesa isabel",
        capacidade: "Não Informda",
        imagem: "Captura de tela 2026-08-31 164557.png"
    },
     {
        id: 106,
        x: 1100,
        y: 2370,
        nome: "Açude Jatobá II",
        tipo: "Ressevatorio",
        municipio: "Princesa isabel",
        capacidade: "6.487.200 m³",
        imagem: "Captura de tela 2026-08-31 165204.png"
    },
    {
        id: 107,
        x: 880,
        y: 2490,
        nome: "Açude Catolé",
        tipo: "Ressevatorio",
        municipio: "Manaira",
        capacidade: "10.500.000 m³",
        imagem: "Captura de tela 2026-08-31 170422.png"
    },
    {
        id: 108,
        x: 750,
        y: 2400,
        nome: "Açude Posso redondo",
        tipo: "Resevatorio",
        municipio: "Santana de Mangueira",
        capacidade: "8.931.340 m³",
        imagem: "Captura de tela 2026-08-31 171336.png"
    },
     {
        id: 108,
        x: 900,
        y: 2300,
        nome: "Açude Bruscas",
        tipo: "Ressevatorio",
        municipio: "Curral velho",
        capacidade: "38.206.463 m³",
        imagem: "Captura de tela 2026-08-31 172324.png"
    },
     {
        id: 109,
        x: 1100,
        y: 2200,
        nome: "Açude Saco",
        tipo: "Resevatorio",
        municipio: "Novo olinda",
        capacidade: "97.488.089 m³",
        imagem: "Captura de tela 2026-08-31 173225.png"
    },
    {
        id: 110,
        x: 1130,
        y: 2180,
        nome: "Açude Minador",
        tipo: "Resevatorio",
        municipio: "Novo olinda",
        capacidade: "não informado",
        imagem: "Captura de tela 2026-08-31 173649.png"
    },
    {
        id: 111,
        x: 1180,
        y: 2120,
        nome: "Açude Queimadas",
        tipo: "Resevatorio",
        municipio: "Santana dos Garrotes",
        capacidade: "15.625.338 m³",
        imagem: "Captura de tela 2026-08-31 182828.png"
    },
    {
        id: 112,
        x: 1390,
        y: 2000,
        nome: "Jenipapeiro (Buiú)",
        tipo: "Resevatorio",
        municipio: "Olho D'Água",
        capacidade: "70.757.250 m³",
        imagem: "Captura de tela 2026-08-31 183824.png"
    },
    {
        id: 113,
        x: 1200,
        y: 1620,
        nome: "Coremas",
        tipo: "Resevatorio",
        municipio: "Coremas",
        capacidade: "591.646.222 m³",
        imagem: "Captura de tela 2026-08-31 185440.png"
    },
    {
        id: 114,
        x: 1100,
        y: 1620,
        nome: "Mãe dÁgua",
        tipo: "Resevatorio",
        municipio: "Coremas",
        capacidade: "567.999.136 m³",
        imagem: "Captura de tela 2026-08-31 185806.png"
    },
    {
        id: 115,
        x: 1170,
        y: 1730,
        nome: "açude do governo",
        tipo: "Resevatorio",
        municipio: "Piancó",
        capacidade: "Não informado m³",
        imagem: "Captura de tela 2026-08-31 190332.png"
    },
    {
        id: 116,
        x: 900,
        y: 1950,
        nome: "Cachoeira dos Alves",
        tipo: "Resevatorio",
        municipio: "itaporanga",
        capacidade: "10.611.196 m³",
        imagem: "Captura de tela 2026-08-31 191013.png"
    },
     {
        id: 117,
        x: 930,
        y: 2140,
        nome: "Açude Riacho Verde",
        tipo: "Resevatorio",
        municipio: "Boa Ventura",
        capacidade: "1.256.250 m³",
        imagem: "Captura de tela 2026-08-31 193212.png"
    },
    {
        id: 118,
        x: 770,
        y: 2140,
        nome: "Açude Gravatá",
        tipo: "Resevatorio",
        municipio: "Diamante",
        capacidade: "não informado",
        imagem: "Captura de tela 2026-08-31 195243.png"
    },
    {
        id: 118,
        x: 730,
        y: 2070,
        nome: "Açude Vazente",
        tipo: "Resevatorio",
        municipio: "Diamante",
        capacidade: "9.091.200 m³",
        imagem: "Captura de tela 2026-08-31 195636.png"
    },
    {
        id: 119,
        x: 630,
        y: 2100,
        nome: "Açude Piranhas",
        tipo: "Resevatorio",
        municipio: "Ibiria",
        capacidade: "25.696.200 m³",
        imagem: "Captura de tela 2026-08-31 200606.png"
    },
     {
        id: 120,
        x: 463,
        y: 2234,
        nome: "Açude Serra Vermelha",
        tipo: "Resevatorio",
        municipio: "Conceição",
        capacidade: "11.801.173 m³",
        imagem: "Captura de tela 2026-08-31 201356.png"
    },
    {
        id: 121,
        x: 450,
        y: 2350,
        nome: "Açude Santa Inês",
        tipo: "Resevatorio",
        municipio: "Santa Inês",
        capacidade: "26.115.250 m³",
        imagem: "Captura de tela 2026-08-31 202051.png"
    },
    {
        id: 122,
        x: 550,
        y: 1970,
        nome: "Açude Bartolomeu I",
        tipo: "Resevatorio",
        municipio: "Bonito de Santa Fè",
        capacidade: "17.570.556 m³",
        imagem: "Captura de tela 2026-08-31 202837.png"
    },
    {
        id: 123,
        x: 592,
        y: 2024,
        nome: "Açude Video",
        tipo: "Resevatorio",
        municipio: "Conceição",
        capacidade: "17.570.556 m³",
        imagem: "Captura de tela 2026-08-31 203241.png"
    },
    {
        id: 124,
        x: 423,
        y: 2256,
        nome: "Açude Condado",
        tipo: "Resevatorio",
        municipio: "Conceição",
        capacidade: "35.016.000 m³",
        imagem: "Captura de tela 2026-09-01 193548.png"
    },
    {
        id: 125,
        x: 899,
        y: 1801,
        nome: "Açude Conchus",
        tipo: "Resevatorio",
        municipio: "Itaporanga",
        capacidade: "4.200.000,00 m³",
        imagem: "Captura de tela 2026-09-01 194603.png"
    },
    {
        id: 126,
        x: 730,
        y: 1820,
        nome: "Açude Pimenta",
        tipo: "Resevatorio",
        municipio: "São José de Caiana",
        capacidade: "255.744 m³",
        imagem: "Captura de tela 2026-09-01 195441.png"
    },
    {
        id: 127,
        x: 648,
        y: 1792,
        nome: "Açude Cafundó",
        tipo: "Resevatorio",
        municipio: "Serra Grande",
        capacidade: "313.680 m³",
        imagem: "Captura de tela 2026-09-01 200116.png"
    },
    {
        id: 127,
        x: 492,
        y: 1836,
        nome: "Açude",
        tipo: "Resevatorio",
        municipio: "Bonito de Santa Fé",
        capacidade: "não informada",
        imagem: "Captura de tela 2026-09-01 200527.png"
    },
    {
        id: 128,
        x: 1041,
        y: 1806,
        nome: "Açude Estevam",
        tipo: "Resevatorio",
        municipio: "piancó",
        capacidade: "não informada",
        imagem: "Captura de tela 2026-09-01 201039.png"
    },
    {
        id: 129,
        x: 837,
        y: 1647,
        nome: "Açude Frutuoso II",
        tipo: "Resevatorio",
        municipio: "Aguiar",
        capacidade: "3.517.220,00 m³",
        imagem: "Captura de tela 2026-09-01 202139.png"
    },
     {
        id: 130,
        x: 762,
        y: 1589,
        nome: "Açude Lancha",
        tipo: "Resevatorio",
        municipio: "Aguiar",
        capacidade: "5.675.800,00 m³",
        imagem: "Captura de tela 2026-09-01 202310.png"
    },
    {
        id: 131,
        x: 675,
        y: 1544,
        nome: "Açude Bom Jessus",
        tipo: "Resevatorio",
        municipio: "Carrapateira",
        capacidade: "343.800 m³",
        imagem: "Captura de tela 2026-09-01 203004.png"
    },
     {
        id: 132,
        x: 541,
        y: 1542,
        nome: "Açude Engenheiro Avidos",
        tipo: "Resevatorio",
        municipio: "São José de Piranhas",
        capacidade: "293.617.376,00 m³",
        imagem: "Captura de tela 2026-09-01 203933.png"
    },
    {
        id: 133,
        x: 494,
        y: 1627,
        nome: "Açude São José I",
        tipo: "Resevatorio",
        municipio: "São José de Piranhas",
        capacidade: "3.051.125,00 m³",
        imagem: "Captura de tela 2026-09-01 204109.png"
    },
    {
        id: 134,
        x: 400,
        y: 1251,
        nome: "Açude Lagoa do Arroz",
        tipo: "Resevatorio",
        municipio: "Cajazeiras",
        capacidade: "80.388.537,00  m³",
        imagem: "Captura de tela 2026-09-01 205236.png"
    },
    {
        id: 135,
        x: 448,
        y: 1370,
        nome: "Açude Grande de Cajazeiras",
        tipo: "Resevatorio",
        municipio: "Cajazeiras",
        capacidade: "não informado",
        imagem: "Captura de tela 2026-09-01 205517.png"
    },
    {
        id: 136,
        x: 250,
        y: 1401,
        nome: "Açude Cachoeira da Vaca",
        tipo: "Resevatorio",
        municipio: "Cachoeira dos Índios",
        capacidade: "339.156,00 m³",
        imagem: "Captura de tela 2026-09-01 210655.png"
    },
    {
        id: 137,
        x: 340,
        y: 1243,
        nome: "Açude do Escurinho",
        tipo: "Resevatorio",
        municipio: "Bom Jesus",
        capacidade: "não informada",
        imagem: "Captura de tela 2026-09-01 211000.png"
    },
     {
        id: 138,
        x: 585,
        y: 1094,
        nome: "Açude Chupadouro ",
        tipo: "Resevatorio",
        municipio: "São João do Rio do Peixe",
        capacidade: "2.764.100 m³",
        imagem: "Captura de tela 2026-09-01 212028.png"
    },
    {
        id: 139,
        x: 486,
        y: 1061,
        nome: "Açude Pilões",
        tipo: "Resevatorio",
        municipio: "São João do Rio do Peixe",
        capacidade: "7.888.854,00 m³",
        imagem: "Captura de tela 2026-09-01 212345.png"
    },
    {
        id: 140,
        x: 381,
        y: 896,
        nome: "Açude Gamela",
        tipo: "Resevatorio",
        municipio: "Triunfo",
        capacidade: "472.926 m³",
        imagem: "Captura de tela 2026-09-01 213036.png"
    },
    {
        id: 141,
        x: 492,
        y: 661,
        nome: "Açude Posso Dantas",
        tipo: "Resevatorio",
        municipio: "Poço Dantas",
        capacidade: "Não Informado",
        imagem: "Captura de tela 2026-09-01 213410.png"
    },
    {
        id: 142,
        x: 549,
        y: 861,
        nome: "Açude Capivara",
        tipo: "Resevatorio",
        municipio: "Uiraúna",
        capacidade: "37.549.827 m³",
        imagem: "Captura de tela 2026-09-01 214142.png"
    },
     {
        id: 143,
        x: 638,
        y: 822,
        nome: "Açude Arrojado",
        tipo: "Resevatorio",
        municipio: "Uiraúna",
        capacidade: "3.596.180 m³",
        imagem: "Captura de tela 2026-09-01 214246.png"
    },
    {
        id: 144,
        x: 788,
        y: 891,
        nome: "Açude Serra Branca",
        tipo: "Resevatorio",
        municipio: "Vieiropolis",
        capacidade: "não informada",
        imagem: "Captura de tela 2026-09-01 220238.png"
    },
    {
    id: 145,
    x: 737,
    y: 1261,
    nome: "São Gonçalo",
    tipo: "Resevatorio",
    municipio: "Sousa",
    capacidade: "44.600.000 m³",
    imagem: "Captura de tela 2026-09-01 220651.png"
},
{
    id: 146,
    x: 893,
    y: 870,
    nome: "Açude Roça Nova",
    tipo: "Resevatorio",
    municipio: "Lastro",
    capacidade: "Não Informado",
    imagem: "Captura de tela 2026-09-01 221121.png"
},
{
    id: 147,
    x: 893,
    y: 1420,
    nome: "Jenipapeiro",
    tipo: "Resevatorio",
    municipio: "São José da Lagoa Tapada",
    capacidade: "1.948.300 m³",
    imagem: "Captura de tela 2026-09-01 221657.png"
},
{
    id: 148,
    x: 1049,
    y: 1172,
    nome: "Açude jaguarão",
    tipo: "Resevatorio",
    municipio: "Aparecida",
    capacidade: "Não Informada",
    imagem: "Captura de tela 2026-09-01 222152.png"
},
{
    id: 149,
    x: 1040,
    y: 918,
    nome: "Açude Paraíso (Luiz Oliveira)",
    tipo: "Resevatorio",
    municipio: "São Francisco",
    capacidade: "5.340.024 m³",
    imagem: "Captura de tela 2026-09-01 222759.png"
},
{
    id: 150,
    x: 1552,
    y: 2140,
    nome: "Açude Bom Jesus",
    tipo: "Resevatorio",
    municipio: "àgua Branca",
    capacidade: "14.636.457,00 m³",
    imagem: "Captura de tela 2026-09-02 141348.png"
},
{
    id: 151,
    x: 1660,
    y: 1986,
    nome: "Açude Albino",
    tipo: "Resevatorio",
    municipio: "Imaculada",
    capacidade: "1.833.955,00 m³",
    imagem: "Captura de tela 2026-09-02 141750.png"
},
{
    id: 152,
    x: 1919,
    y: 1861,
    nome: "Açude Riacho das Moças",
    tipo: "Resevatorio",
    municipio: "Matureiá",
    capacidade: "6.413.411,00 m³",
    imagem: "Captura de tela 2026-09-02 142441.png"
},
{
    id: 153,
    x: 1961,
    y: 1807,
    nome: "Açude Bastiana",
    tipo: "Resevatorio",
    municipio: "Teixeira",
    capacidade: "1.271.560,00 m³",
    imagem: "Captura de tela 2026-09-02 142849.png"
},
{
    id: 154,
    x: 1981,
    y: 1834,
    nome: "Açude Sabonete",
    tipo: "Resevatorio",
    municipio: "Teixeira",
    capacidade: "1.952.540,00 m³",
    imagem: "Captura de tela 2026-09-02 143423.png"
},
{
    id: 155,
    x: 2056,
    y: 1838,
    nome: "Açude São Francisco II",
    tipo: "Resevatorio",
    municipio: "Teixeira",
    capacidade: "4.920.720 m³",
    imagem: "Captura de tela 2026-09-02 144202.png"
},
{
    id: 156,
    x: 2199,
    y: 1918,
    nome: "Açude Jeremias",
    tipo: "Resevatorio",
    municipio: "Desterro",
    capacidade: "4.658.430 m³",
    imagem: "Captura de tela 2026-09-02 144603.png"
},
{
    id: 157,
    x: 2228,
    y: 1827,
    nome: "Açude Coronel Jueca",
    tipo: "Resevatorio",
    municipio: "Desterro",
    capacidade: "6.126.875,00 m³",
    imagem: "Captura de tela 2026-09-02 145132.png"
},
{
    id: 158,
    x: 1420,
    y: 1584,
    nome: "Açude Emas",
    tipo: "Resevatorio",
    municipio: "Emas",
    capacidade: "2.013.750 m³",
    imagem: "Captura de tela 2026-09-02 145715.png"
},
{
    id: 159,
    x: 1359,
    y: 1434,
    nome: "Açude Parede",
    tipo: "Resevatório",
    municipio: "Cajazeirinhas",
    capacidade: "Não Informado",
    imagem: "Captura de tela 2026-09-02 150025.png"
},
{
    id: 160,
    x: 1349,
    y: 1338,
    nome: "Açude Vázea Redonda",
    tipo: "Resevatório",
    municipio: "Cajazeirinhas",
    capacidade: "Não Informado",
    imagem: "Captura de tela 2026-09-02 151006.png"
},
{
    id: 161,
    x: 1202,
    y: 1157,
    nome: "Açude Grotão",
    tipo: "Resevatório",
    municipio: "Ponbal",
    capacidade: "Não Informado",
    imagem: "Captura de tela 2026-09-02 151543.png"
},
{
    id: 162,
    x: 1237,
    y: 913,
    nome: "Açude Paraíso (Luiz Oliveira)",
    tipo: "Resevatório",
    municipio: "São Francisco",
    capacidade: "Não Informado",
    imagem: "Captura de tela 2026-09-02 152749.png"
},
{
    id: 163,
    x: 1031,
    y: 987,
    nome: "Açude Pai João",
    tipo: "Resevatório",
    municipio: "Lagoa",
    capacidade: "Não Informado",
    imagem: "Captura de tela 2026-09-02 153352.png"
},
{
    id: 164,
    x: 1307,
    y: 806,
    nome: "Açude Carneiro",
    tipo: "Resevatorio",
    municipio: "Jericó",
    capacidade: "31.285.875 m³",
    imagem: "Captura de tela 2026-09-02 153744.png"
},
{
    id: 165,
    x: 1493,
    y: 703,
    nome: "Açude riacho dos cavalos",
    tipo: "Resevatorio",
    municipio: "riacho dos cavalos",
    capacidade: "17.699.000,00 m³",
    imagem: "Captura de tela 2026-09-02 154126.png"
},
{
    id: 166,
    x: 1793,
    y: 713,
    nome: "Açude Escondido",
    tipo: "Resevatorio",
    municipio: "São Bento",
    capacidade: "Naõ Informado",
    imagem: "Captura de tela 2026-09-02 154909.png"
},
{
    id: 167,
    x: 1687,
    y: 579,
    nome: "Açude Santa Rosa",
    tipo: "Resevatorio",
    municipio: "Brejo do cruz",
    capacidade: "2.843.984,00 m³",
    imagem: "Captura de tela 2026-09-02 155536.png"
},
{
    id: 168,
    x: 1655,
    y: 472,
    nome: "Açude Escondido",
    tipo: "Resevatorio",
    municipio: "Belem do Brejo do Cruz",
    capacidade: "16.579.250,00 m³",
    imagem: "Captura de tela 2026-09-02 160237.png"
},
{
    id: 169,
    x: 1799,
    y: 401,
    nome: "Açude Baião",
    tipo: "Resevatorio",
    municipio: "Belem do Brejo do Cruz",
    capacidade: "39.224.628,00 m³",
    imagem: "Captura de tela 2026-09-02 160551.png"
},
{
    id: 170,
    x: 1713,
    y: 357,
    nome: "Açude Direito",
    tipo: "Resevatorio",
    municipio: "Belem do Brejo do Cruz",
    capacidade: "Não Informada",
    imagem: "Captura de tela 2026-09-02 160734.png"
},
{
    id: 171,
    x: 1554,
    y: 1599,
    nome: "Açude Cachoeira dos Cegos",
    tipo: "Resevatorio",
    municipio: "Catingueira",
    capacidade: "71.887.047,00 m³",
    imagem: "Captura de tela 2026-09-02 161318.png"
},
{
    id: 172,
    x: 1603,
    y: 1384,
    nome: "Açude Engenheiro Arcoverde",
    tipo: "Resevatorio",
    municipio: "Condado",
    capacidade: "36.834.375 m³",
    imagem: "Captura de tela 2026-09-02 194954.png"
},
{
    id: 173,
    x: 1662,
    y: 1338,
    nome: "Açude da Pedra",
    tipo: "Resevatorio",
    municipio: "Malta",
    capacidade: "Não Informado",
    imagem: "Captura de tela 2026-09-02 195411.png"
},
{
    id: 174,
    x: 1570,
    y: 986,
    nome: "Açude da Cachoeira",
    tipo: "Resevatorio",
    municipio: "Paulista",
    capacidade: "Não Informado",
    imagem: "Captura de tela 2026-09-02 195912.png"
},
{
    id: 175,
    x: 1904,
    y: 1124,
    nome: "Açude do Bois",
    tipo: "Resevatorio",
    municipio: "São José de Espirinhas",
    capacidade: "Não Informado",
    imagem: "Captura de tela 2026-09-02 200421.png"
},
{
    id: 176,
    x: 1828,
    y: 1727,
    nome: "Açude Capoeira",
    tipo: "Resevatorio",
    municipio: "Mãe d'água",
    capacidade: "53.450.000,00 m³",
    imagem: "Captura de tela 2026-09-02 200924.png"
},
{
    id: 177,
    x: 1840,
    y: 1643,
    nome: "Açude Firmino Gayoso",
    tipo: "Resevatorio",
    municipio: "Santa Teresinha",
    capacidade: "Não Informado",
    imagem: "Captura de tela 2026-09-02 201507.png"
},
{
    id: 178,
    x: 1961,
    y: 1569,
    nome: "Açude Jatobá I",
    tipo: "Resevatorio",
    municipio: "Patos",
    capacidade: "17.516.000 m³",
    imagem: "Captura de tela 2026-09-02 202000.png"
},
{
    id: 179,
    x: 2008,
    y: 1599,
    nome: "Açude Farinha",
    tipo: "Resevatorio",
    municipio: "Patos",
    capacidade: "25.738.500 m³",
    imagem: "Captura de tela 2026-09-02 202204.png"
},
{
    id: 180,
    x: 1797,
    y: 1420,
    nome: "Açude Varzea Alegra",
    tipo: "Resevatorio",
    municipio: "Patos",
    capacidade: "Não Informado",
    imagem: "Captura de tela 2026-09-02 202508.png"
},
{
    id: 181,
    x: 2141,
    y: 1541,
    nome: "Açude da Bola",
    tipo: "Resevatorio",
    municipio: "quixaba",
    capacidade: "Não Informado",
    imagem: "Captura de tela 2026-09-02 202826.png"
},
{
    id: 182,
    x: 2214,
    y: 1419,
    nome: "Açude São Mamede",
    tipo: "Resevatorio",
    municipio: "São Mamede",
    capacidade: "15.791.280 m³",
    imagem: "Captura de tela 2026-09-02 203500.png"
},
{
    id: 183,
    x: 2254,
    y: 1199,
    nome: "Açude Trapiá",
    tipo: "Resevatorio",
    municipio: "Várzea",
    capacidade: "Não Informado",
    imagem: "Captura de tela 2026-09-02 203730.png"
},
{
    id: 184,
    x: 2422,
    y: 1388,
    nome: "Açude Santa Luzia",
    tipo: "Resevatorio",
    municipio: "Santa Luzia",
    capacidade: "11.960.250 m³",
    imagem: "Captura de tela 2026-09-02 204153.png"
},
{
    id: 185,
    x: 2413,
    y: 1833,
    nome: "Açude Taperoá II (Manoel Marcionilo)",
    tipo: "Resevatorio",
    municipio: "Taperoá",
    capacidade: "15.148.900 m³",
    imagem: "Captura de tela 2026-09-02 204904.png"
},
{
    id: 186,
    x: 2509,
    y: 1805,
    nome: "Açude Lagoa do Meio",
    tipo: "Resevatorio",
    municipio: "Taperoá",
    capacidade: "6.647.875 m³",
    imagem: "Captura de tela 2026-09-02 205046.png"
},
{
    id: 187,
    x: 2725,
    y: 1697,
    nome: "Açude Mucutu",
    tipo: "Resevatorio",
    municipio: "Taperoá",
    capacidade: "Não Informado",
    imagem: "Captura de tela 2026-09-02 205451.png"
},
{
    id: 188,
    x: 2583,
    y: 1200,
    nome: "Açude São José IV",
    tipo: "Resevatorio",
    municipio: "São José do Sabugi",
    capacidade: "554.100,00 m³",
    imagem: "Captura de tela 2026-09-04 173016.png"
},
{
    id: 189,
    x: 2435,
    y: 1994,
    nome: "Açude Livramento (Russos)",
    tipo: "Resevatorio",
    municipio: "Livramento",
    capacidade: "2.432.420,00 m³",
    imagem: "Captura de tela 2026-09-04 173742.png"
},
{
    id: 190,
    x: 2399,
    y: 1953,
    nome: "Açude Verde",
    tipo: "Resevatorio",
    municipio: "Livramento",
    capacidade: "Não Informado",
    imagem: "Captura de tela 2026-09-04 173925.png"
},
{
    id: 191,
    x: 2549,
    y: 2030,
    nome: "Açude São José III",
    tipo: "Resevatorio",
    municipio: "São José dos cordeiros",
    capacidade: "956.000,00 m³",
    imagem: "Captura de tela 2026-09-04 174247.png"
},
{
    id: 192,
    x: 2413,
    y: 2356,
    nome: "Açude Sumé",
    tipo: "Resevatorio",
    municipio: "Sumé",
    capacidade: "44.864.100 m³",
    imagem: "Captura de tela 2026-09-04 174625.png"
},
{
    id: 193,
    x: 2147,
    y: 2382,
    nome: "Açude Ouro Velho",
    tipo: "Resevatorio",
    municipio: "Ouro Velho",
    capacidade: "1.675.800 m³",
    imagem: "Captura de tela 2026-09-04 175257.png"
},
{
    id: 194,
    x: 2231,
    y: 2382,
    nome: "Açude São Paulo",
    tipo: "Resevatorio",
    municipio: "Prata",
    capacidade: "8.455.500 m³",
    imagem: "Captura de tela 2026-09-04 175455.png"
},
{
    id: 195,
    x: 2212,
    y: 2456,
    nome: "Açude Prata II",
    tipo: "Resevatorio",
    municipio: "Prata",
    capacidade: "1.308.433 m³",
    imagem: "Captura de tela 2026-09-04 175824.png"
},
{
    id: 196,
    x: 2258,
    y: 2690,
    nome: "Açude São José II",
    tipo: "Resevatorio",
    municipio: "Monteiro",
    capacidade: "1.311.540 m³",
    imagem: "Captura de tela 2026-09-04 180438.png"
},
{
    id: 197,
    x: 2312,
    y: 2713,
    nome: "Açude Poções",
    tipo: "Resevatorio",
    municipio: "Monteiro",
    capacidade: "29.861.562 m³",
    imagem: "Captura de tela 2026-09-04 180656.png"
},
{
    id: 198,
    x: 2007,
    y: 2780,
    nome: "Açude Pocinhos",
    tipo: "Resevatorio",
    municipio: "Monteiro",
    capacidade: "6.789.305,00 m³",
    imagem: "Captura de tela 2026-09-04 181012.png"
},
{
    id: 199,
    x: 2211,
    y: 2749,
    nome: "Açude Serrote",
    tipo: "Resevatorio",
    municipio: "Monteiro",
    capacidade: "5.709.000 m³",
    imagem: "Captura de tela 2026-09-04 181408.png"
},
{
    id: 200,
    x: 2328,
    y: 3011,
    nome: "Açude Santo Antônio",
    tipo: "Resevatorio",
    municipio: "São Sebastião do Umbuzeiro",
    capacidade: "24.424.130 m³",
    imagem: "Captura de tela 2026-09-04 181915.png"
},
{
    id: 201,
    x: 2482,
    y: 2730,
    nome: "Açude Camalaú",
    tipo: "Resevatorio",
    municipio: "Camalaú",
    capacidade: "48.107.240 m³",
    imagem: "Captura de tela 2026-09-04 182211.png"
},
{
    id: 202,
    x: 2698,
    y: 2628,
    nome: "Açude Cordeiro",
    tipo: "Resevatorio",
    municipio: "Congo",
    capacidade: "69.965.945 m³",
    imagem: "Captura de tela 2026-09-04 182424.png"
},
{
    id: 203,
    x: 2691,
    y: 2175,
    nome: "Açude Serra Branca II",
    tipo: "Resevatorio",
    municipio: "Serra Branca",
    capacidade: "14.042.568 m³",
    imagem: "Captura de tela 2026-09-04 183027.png"
},
{
    id: 204,
    x: 2720,
    y: 2147,
    nome: "Açude Serra Branca I",
    tipo: "Resevatorio",
    municipio: "Serra Branca",
    capacidade: "2.117.062 m³",
    imagem: "Captura de tela 2026-09-04 183204.png"
},
{
    id: 205,
    x: 2724,
    y: 1570,
    nome: "Açude da Barra",
    tipo: "Resevatorio",
    municipio: "Assunção",
    capacidade: "Nâo informado",
    imagem: "Captura de tela 2026-09-04 184031.png"
},
{
    id: 206,
    x: 2820,
    y: 1391,
    nome: "Açude Riacho Fundo",
    tipo: "Resevatorio",
    municipio: "Ternório",
    capacidade: "298.616,00 m³",
    imagem: "Captura de tela 2026-09-04 184522.png"
},
{
    id: 207,
    x: 2859,
    y: 2573,
    nome: "Açude Campos",
    tipo: "Resevatorio",
    municipio: "Caraúbas",
    capacidade: "6.594.392 m³",
    imagem: "Captura de tela 2026-09-04 185435.png"
},
{
    id: 208,
    x: 2890,
    y: 2068,
    nome: "Açude Namorado",
    tipo: "Resevatorio",
    municipio: "São João do Cariri",
    capacidade: "2.118.980 m³",
    imagem: "Captura de tela 2026-09-04 185826.png"
},
{
    id: 209,
    x: 2928,
    y: 1827,
    nome: "Açude Gurjão",
    tipo: "Resevatorio",
    municipio: "Gurjão",
    capacidade: "3.786.215,00 m³",
    imagem: "Captura de tela 2026-09-04 190150.png"
},
{
    id: 210,
    x: 3116,
    y: 1562,
    nome: "Açude Soledade",
    tipo: "Resevatorio",
    municipio: "Soledade",
    capacidade: "27.058.000,00 m³",
    imagem: "Captura de tela 2026-09-04 190602.png"
},
{
    id: 211,
    x: 2921,
    y: 1364,
    nome: "Açude Cacinbinha",
    tipo: "Resevatorio",
    municipio: "São Vicente do Seridó",
    capacidade: "2.156.560,00 m³",
    imagem: "Captura de tela 2026-09-04 191006.png"
},
{
    id: 212,
    x: 3120,
    y: 1432,
    nome: "Açude Felismina Queiroz",
    tipo: "Resevatorio",
    municipio: "Cubiti",
    capacidade: "2.060.000,00 m³",
    imagem: "Captura de tela 2026-09-04 191406.png"
},
{
    id: 213,
    x: 3105,
    y: 757,
    nome: "Açude Várzea Grande",
    tipo: "Resevatorio",
    municipio: "Picui",
    capacidade: "21.532.659,00 m³",
    imagem: "Captura de tela 2026-09-04 193136.png"
},
{
    id: 214,
    x: 3368,
    y: 873,
    nome: "Boqueirão do Cais",
    tipo: "Resevatorio",
    municipio: "Cuité",
    capacidade: "12.367.300,00 m³",
    imagem: "Captura de tela 2026-09-04 193503.png"
},
{
    id: 215,
    x: 3482,
    y: 833,
    nome: "Açude Retiro",
    tipo: "Resevatorio",
    municipio: "Cuité",
    capacidade: "40.500.000,00 m³",
    imagem: "Captura de tela 2026-09-04 193829.png"
},
{
    id: 216,
    x: 3289,
    y: 1123,
    nome: "Açude Santa Rita do Cais",
    tipo: "Resevatorio",
    municipio: "Sussêgo",
    capacidade: "Não Informado",
    imagem: "Captura de tela 2026-09-04 194112.png"
},
{
    id: 217,
    x: 3240,
    y: 1449,
    nome: "Açude Olivedos",
    tipo: "Resevatorio",
    municipio: "Olivedos",
    capacidade: "5.875.124,00 m³",
    imagem: "Captura de tela 2026-09-04 195211.png"
    
},
{
    id: 218,
    x: 2990,
    y: 2359,
    nome: "Açude São Domingos",
    tipo: "Resevatorio",
    municipio: "São Domingos do cariri",
    capacidade: "7.760.200,00 m³",
    imagem: "Captura de tela 2026-09-04 195636.png"
},
{
    id: 219,
    x: 3110,
    y: 2520,
    nome: "Açude Bichinho",
    tipo: "Resevatorio",
    municipio: "São Miguel",
    capacidade: "4.574.375,00 m³",
    imagem: "Captura de tela 2026-09-04 200315.png"
},
{
    id: 220,
    x: 3274,
    y: 2236,
    nome: "Açude Epitácio Pessoa",
    tipo: "Resevatorio",
    municipio: "Boqueirão",
    capacidade: "466.525.964,00 m³",
    imagem: "Captura de tela 2026-09-04 200753.png"
},
{
    id: 221,
    x: 3274,
    y: 2236,
    nome: "Açude Epitácio Pessoa",
    tipo: "Resevatorio",
    municipio: "Boqueirão",
    capacidade: "466.525.964,00 m³",
    imagem: "Captura de tela 2026-09-04 200753.png"
},
{
    id: 222,
    x: 3539,
    y: 1359,
    nome: "Açude Algodão",
    tipo: "Resevatorio",
    municipio: "Algodão de jandaíra",
    capacidade: "1.025.425,00 m³",
    imagem: "Captura de tela 2026-09-04 201154.png"
},
{
    id: 223,
    x: 3539,
    y: 1159,
    nome: "Açude Curimataú",
    tipo: "Resevatorio",
    municipio: "Barra de Santa Rosa",
    capacidade: "5.989.250,00 m³",
    imagem: "Captura de tela 2026-09-04 201633.png"
},
{
    id: 224,
    x: 3442,
    y: 1155,
    nome: "Açude Poleiros",
    tipo: "Resevatorio",
    municipio: "Barra de Santa Rosa",
    capacidade: "7.933.700,00 m³",
    imagem: "Captura de tela 2026-09-04 201854.png"
},
{
    id: 225,
    x: 3773,
    y: 1083,
    nome: "Açude Cacimba de Várzea",
    tipo: "Resevatorio",
    municipio: "Casserengue",
    capacidade: "9.264.321,00 m³",
    imagem: "Captura de tela 2026-09-04 202407.png"
},
{
    id: 226,
    x: 3610,
    y: 1543,
    nome: "Açude Covão",
    tipo: "Resevatorio",
    municipio: "Areial",
    capacidade: "672.260,00 m³",
    imagem: "Captura de tela 2026-09-04 202924.png"
},
{
    id: 227,
    x: 3608,
    y: 1630,
    nome: "Açude Emídio",
    tipo: "Resevatorio",
    municipio: "Montadas",
    capacidade: "415.770,00 m³",
    imagem: "Captura de tela 2026-09-04 204753.png"
},
{
    id: 228,
    x: 2583,
    y: 1697,
    nome: "Açude Milhã (Evaldo Gonçalves)",
    tipo: "Resevatorio",
    municipio: "Puxinanã",
    capacidade: "802.684,00 m³",
    imagem: "Captura de tela 2026-09-04 205116.png"
},
{
    id: 229,
    x: 3433,
    y: 1951,
    nome: "Açude Longradouro",
    tipo: "Resevatorio",
    municipio: "Campina Grande",
    capacidade: "Não Informado",
    imagem: "Captura de tela 2026-09-04 205540.png"
},
{
    id: 230,
    x: 3777,
    y: 1909,
    nome: "Açude José Rodrigues",
    tipo: "Resevatorio",
    municipio: "Campina Grande",
    capacidade: "22.332.348,00 m³",
    imagem: "Captura de tela 2026-09-04 210037.png"
},
{
    id: 231,
    x: 3828,
    y: 1993,
    nome: "Açude Gavião",
    tipo: "Resevatorio",
    municipio: "Fagundes",
    capacidade: "1.450.840,00 m³",
    imagem: "Captura de tela 2026-09-04 210357.png"
},
{
    id: 232,
    x: 3580,
    y: 1702,
    nome: "Açude Milhã (Evaldo Gonçalves)",
    tipo: "Resevatorio",
    municipio: "Puxinanã",
    capacidade: "802.684,00 m³",
    imagem: "Captura de tela 2026-09-04 211116.png"
},
{
    id: 233,
    x: 3688,
    y: 1611,
    nome: "Açude Manguape",
    tipo: "Resevatorio",
    municipio: "São Sebastião da Lagoa da Roça",
    capacidade: "655.375,00 m³",
    imagem: "Captura de tela 2026-09-04 211752.png"
},
{
    id: 234,
    x: 3720,
    y: 1628,
    nome: "Açude São Sebastião",
    tipo: "Resevatorio",
    municipio: "São Sebastião da Lagoa da Roça",
    capacidade: "453.075,00 m³",
    imagem: "Captura de tela 2026-09-04 212006.png"
},
{
    id: 235,
    x: 3753,
    y: 870,
    nome: "Açude do Limão",
    tipo: "Resevatorio",
    municipio: "Araruna",
    capacidade: "Não Informado",
    imagem: "Captura de tela 2026-09-05 124555.png"
},
{
    id: 236,
    x: 3928,
    y: 1043,
    nome: "Açude Jandaia",
    tipo: "Resevatorio",
    municipio: "Bananeiras",
    capacidade: "10.032.266,00 m³",
    imagem: "Captura de tela 2026-09-05 125044.png"
},
{
    id: 237,
    x: 3819,
    y: 1282,
    nome: "Açude Arara",
    tipo: "Resevatorio",
    municipio: "Arara",
    capacidade: "Não Informado",
    imagem: "Captura de tela 2026-09-05 125318.png"
},
{
    id: 238,
    x: 3833,
    y: 1461,
    nome: "Açude Vaca Brava",
    tipo: "Resevatorio",
    municipio: "Areia",
    capacidade: "3.783.556,00 m³",
    imagem: "Captura de tela 2026-09-05 130102.png"
},
{
    id: 238,
    x: 3925,
    y: 1391,
    nome: "Açude Saulo Maia",
    tipo: "Resevatorio",
    municipio: "Areia",
    capacidade: "9.833.615,00 m³",
    imagem: "Captura de tela 2026-09-05 125648.png"
},
{
    id: 239,
    x: 3846,
    y: 1563,
    nome: "Açude Nova Camará",
    tipo: "Resevatorio",
    municipio: "Lagoa Nova",
    capacidade: "26.581.614,00 m³",
    imagem: "Captura de tela 2026-09-06 093351.png"
},
{
    id: 240,
    x: 3851,
    y: 1690,
    nome: "Açude Sindô Ribeiro",
    tipo: "Resevatorio",
    municipio: "Massaranduba",
    capacidade: "3.022.715,00 m³",
    imagem: "Captura de tela 2026-09-06 094029.png"
},
{
    id: 241,
    x: 3892,
    y: 1695,
    nome: "Açude Massaranduba",
    tipo: "Resevatorio",
    municipio: "Massaranduba",
    capacidade: "604.390,00 m³",
    imagem: "Captura de tela 2026-09-06 094329.png"
},
{
    id: 242,
    x: 4002,
    y: 2194,
    nome: "Açude Acauã (Argemiro de Figueiredo)",
    tipo: "Resevatorio",
    municipio: "Aroeiras",
    capacidade: "253.142.247,00 m³",
    imagem: "Captura de tela 2026-09-06 094859.png"
},
{
    id: 243,
    x: 4020,
    y: 1902,
    nome: "Açude da Sudema",
    tipo: "Resevatorio",
    municipio: "Ingá",
    capacidade: "Não Informado",
    imagem: "Captura de tela 2026-09-06 095558.png"
},
{
    id: 244,
    x: 3978,
    y: 1781,
    nome: "Açude Chã dos Pereiras",
    tipo: "Resevatorio",
    municipio: "Ingá",
    capacidade: "1.965.600,00 m³",
    imagem: "Captura de tela 2026-09-06 100013.png"
},
{
    id: 245,
    x: 3924,
    y: 1719,
    nome: "Açude Chupadouro II",
    tipo: "Resevatorio",
    municipio: "Serra Redonda",
    capacidade: "634.620,00 m³",
    imagem: "Captura de tela 2026-09-06 100326.png"
},
{
    id: 246,
    x: 4021,
    y: 1701,
    nome: "Açude Brejinho",
    tipo: "Resevatorio",
    municipio: "Juarez Távora",
    capacidade: "789.000,00 m³",
    imagem: "Captura de tela 2026-09-06 100835.png"
},
{
    id: 248,
    x: 3965,
    y: 1499,
    nome: "Açude Pitombeira",
    tipo: "Resevatorio",
    municipio: "Lagoa Grande",
    capacidade: "não Informado",
    imagem: "Captura de tela 2026-09-06 101615.png"
},
{
    id: 249,
    x: 4075,
    y: 1408,
    nome: "Açude Tauá",
    tipo: "Resevatorio",
    municipio: "Alagoinha",
    capacidade: "8.573.500,00 m³",
    imagem: "Captura de tela 2026-09-06 102245.png"
},
{
    id: 250,
    x: 3990,
    y: 1214,
    nome: "Açude Canafístula II",
    tipo: "Resevatorio",
    municipio: "Borborema",
    capacidade: "4.102.626,00 m³",
    imagem: "Captura de tela 2026-09-06 103025.png"
},
{
    id: 251,
    x: 4026,
    y: 1125,
    nome: "Açude Lagoa do Matias",
    tipo: "Resevatorio",
    municipio: "Bananeiras",
    capacidade: "1.239.883,00 m³",
    imagem: "Captura de tela 2026-09-06 103527.png"
},
{
    id: 252,
    x: 4205,
    y: 1075,
    nome: "Açude Duas Estradas",
    tipo: "Resevatorio",
    municipio: "Serra da Raiz",
    capacidade: "410.260,00 m³",
    imagem: "Captura de tela 2026-09-06 104134.png"
},
{
    id: 253,
    x: 4167,
    y: 1119,
    nome: "Açude Suspiro ",
    tipo: "Resevatorio",
    municipio: "Suspiro",
    capacidade: "276.400,00 m³",
    imagem: "Captura de tela 2026-09-06 104429.png"
},
{
    id: 254,
    x: 4176,
    y: 1297,
    nome: "Açude Guarabira ",
    tipo: "Resevatorio",
    municipio: "Guarabira",
    capacidade: "Não Informado",
    imagem: "Captura de tela 2026-09-06 104857.png"
},
{
    id: 255,
    x: 4216,
    y: 1871,
    nome: "Açude Mendonça ",
    tipo: "Resevatorio",
    municipio: "Mogeiro",
    capacidade: "Não Informado",
    imagem: "Captura de tela 2026-09-06 105423.png"
},
{
    id: 256,
    x: 4347,
    y: 1340,
    nome: "Açude Araçagi ",
    tipo: "Resevatorio",
    municipio: "Araçagi",
    capacidade: "63.289.037,00 m³",
    imagem: "Captura de tela 2026-09-06 110000.png"
},
{
    id: 257,
    x: 4599,
    y: 1261,
    nome: "Açude Jangada",
    tipo: "Resevatorio",
    municipio: "Mamanguape",
    capacidade: "470.000,00 m³",
    imagem: "Captura de tela 2026-09-06 111223.png"
},
{
    id: 258,
    x: 4393,
    y: 1582,
    nome: "Açude Olho dÁgua",
    tipo: "Resevatorio",
    municipio: "Mari",
    capacidade: "868.320,00 m³",
    imagem: "Captura de tela 2026-09-06 111755.png"
},
{
    id: 259,
    x: 4487,
    y: 1602,
    nome: "Açude São Salvador",
    tipo: "Resevatorio",
    municipio: "Sapé",
    capacidade: "12.657.520,00 m³",
    imagem: "Captura de tela 2026-09-06 115510.png"
},
{
    id: 260,
    x: 4854,
    y: 1707,
    nome: "Açude Marés",
    tipo: "Resevatorio",
    municipio: "João Pessoa",
    capacidade: "2.136.637,00 m³",
    imagem: "Captura de tela 2026-09-06 115836.png"
},
{
    id: 261,
    x: 4762,
    y: 1890,
    nome: "Açude Mamuaba",
    tipo: "Resevatorio",
    municipio: "Alhandra",
    capacidade: "56.937.000,00 m³",
    imagem: "Captura de tela 2026-09-06 120249.png"
},












    
    

];

// --- RENDERIZAR MARCADORES DAS BACIAS NO MAPA ---
baciasHidrograficas.forEach(bacia => {
    const marcador = document.createElement('div');
    marcador.classList.add('marcador');
    marcador.style.left = bacia.x + 'px';
    marcador.style.top = bacia.y + 'px';
    mapa.appendChild(marcador);
});

// --- RENDERIZAR MARCADORES DOS AÇUDES E LAGOS (📍) ---
acudesELagos.forEach(item => {
    const marcador = document.createElement('div');
    marcador.classList.add('marcador-acude');
    marcador.innerText = '📍';
    marcador.style.left = item.x + 'px';
    marcador.style.top = item.y + 'px';
    mapa.appendChild(marcador);
});

// --- EVENTOS DO TECLADO E JANELA ---
window.addEventListener('resize', function() {
    larguraMapa = mapa.clientWidth;
    alturaMapa = mapa.clientHeight;
});

document.addEventListener('keydown', function(event) {
    const key = event.key.toLowerCase();
    if (teclas.hasOwnProperty(key)) {
        teclas[key] = true;
    }
});

document.addEventListener('keyup', function(event) {
    const key = event.key.toLowerCase();
    if (teclas.hasOwnProperty(key)) {
        teclas[key] = false;
    }
});



btnInspecionar.addEventListener('click', () => {
    if (elementoAtual) {
        modalTitulo.textContent = elementoAtual.nome;
       modalImagem.src = elementoAtual.imagem ? 'imagens/' + elementoAtual.imagem : '';
        // Se for Açude/Lago, exibe apenas Nome, Tipo, Município e Capacidade
        if (elementoAtual.categoria === 'acude') {
            modalDescricao.innerHTML = `
                <p><strong>Tipo:</strong> ${elementoAtual.tipo}</p>
                <p><strong>Município:</strong> ${elementoAtual.municipio}</p>
                <p><strong>Capacidade:</strong> ${elementoAtual.capacidade}</p>
            `;
        } else {
            // Se for Bacia Hidrográfica, exibe a descrição normalmente
            modalDescricao.textContent = elementoAtual.descricao;
        }

        modalInfo.style.display = 'flex'; 
        jogoAtivo = false; 
        btnInspecionar.style.display = 'none'; 
    }
});

btnFecharModal.addEventListener('click', () => {
    modalInfo.style.display = 'none';
    jogoAtivo = true; 
    requestAnimationFrame(gameLoop);
});

// --- LÓGICA PRINCIPAL DO JOGO ---
function atualizarCamera() {
    nonequinho.style.left = posX + 'px';
    nonequinho.style.top = posY + 'px';

    camera.scrollLeft = posX - (camera.clientWidth / 2) + (tamanhoPersonagem / 2);
    camera.scrollTop = posY - (camera.clientHeight / 2) + (tamanhoPersonagem / 2);
}

function verificarProximidade() {
    const centroPersonagemX = posX + (tamanhoPersonagem / 2);
    const centroPersonagemY = posY + (tamanhoPersonagem / 2);

    let pertoDeAlguma = false;

    // Checa proximidade com Bacias
    for (let i = 0; i < baciasHidrograficas.length; i++) {
        const bacia = baciasHidrograficas[i];
        const dx = centroPersonagemX - bacia.x;
        const dy = centroPersonagemY - bacia.y;
        const distancia = Math.sqrt(dx * dx + dy * dy);

        if (distancia < distanciaInteracao) {
            pertoDeAlguma = true;
            elementoAtual = { ...bacia, categoria: 'bacia' };
            btnInspecionar.style.display = 'block';
            break; 
        }
    }

    // Checa proximidade com Açudes e Lagos
    if (!pertoDeAlguma) {
        for (let i = 0; i < acudesELagos.length; i++) {
            const item = acudesELagos[i];
            const dx = centroPersonagemX - item.x;
            const dy = centroPersonagemY - item.y;
            const distancia = Math.sqrt(dx * dx + dy * dy);

            if (distancia < distanciaInteracao) {
                pertoDeAlguma = true;
                elementoAtual = { ...item, categoria: 'acude' };
                btnInspecionar.style.display = 'block';
                break; 
            }
        }
    }

    if (!pertoDeAlguma) {
        btnInspecionar.style.display = 'none';
        elementoAtual = null;
    }
}

function gameLoop() {
    if (!jogoAtivo) return;

    if (teclas.w && posY > 0) {
        posY -= velocidade;
    }
    if (teclas.s && posY < (alturaMapa - tamanhoPersonagem)) {
        posY += velocidade;
    }
    if (teclas.a && posX > 0) {
        posX -= velocidade;
    }
    if (teclas.d && posX < (larguraMapa - tamanhoPersonagem)) {
        posX += velocidade;
    }

    atualizarCamera();
    verificarProximidade(); 
    
    requestAnimationFrame(gameLoop);
}

// Configura a câmera inicialmente
atualizarCamera();

// --- SISTEMA PARA DESCER A TELA DE INTRODUÇÃO NO CELULAR ---
let toqueInicioY = 0;
let toqueFimY = 0;

// Registra onde o usuário encostou o dedo pela primeira vez
telaInicial.addEventListener('touchstart', function(event) {
    toqueInicioY = event.changedTouches[0].screenY;
}, { passive: true });

// Acompanha o movimento do dedo
telaInicial.addEventListener('touchmove', function(event) {
    toqueFimY = event.changedTouches[0].screenY;
    let distanciaDeslizada = toqueFimY - toqueInicioY;
    
    // Se o usuário está puxando a tela para baixo (e não rolando para cima)
    if (distanciaDeslizada > 0) {
        // Move a tela visualmente acompanhando o dedo
        telaInicial.style.transform = `translateY(${distanciaDeslizada}px)`;
    }
}, { passive: true });

// Quando o usuário solta a tela
telaInicial.addEventListener('touchend', function(event) {
    let distanciaDeslizada = toqueFimY - toqueInicioY;
    
    // Se ele deslizou mais de 100 pixels para baixo, vamos sumir com a tela
    if (distanciaDeslizada > 100) {
        telaInicial.style.transform = 'translateY(100vh)'; // Empurra o restante da tela para fora
        telaInicial.style.opacity = '0'; // Deixa transparente
        
        // Espera a animação de 400ms (definida no CSS) terminar para remover de vez
        setTimeout(() => {
            telaInicial.style.display = 'none';
            jogoAtivo = true; // Libera o jogador para andar no mapa
        }, 400);
    } else {
        // Se ele deslizou pouquinho e soltou, a tela volta pra posição original (0)
        telaInicial.style.transform = 'translateY(0)';
    }
});

// Atualizando também o evento do botão "Começar Exploração" 
// para usar a mesma animação de descida caso ele clique no botão:
btnIniciar.addEventListener('click', () => {
    telaInicial.style.transform = 'translateY(100vh)';
    telaInicial.style.opacity = '0';
    setTimeout(() => {
        telaInicial.style.display = 'none';
        jogoAtivo = true; 
    }, 400);
});

// Ação ao soltar a tela (Deslize no celular)
telaInicial.addEventListener('touchend', function(event) {
    let distanciaDeslizada = toqueFimY - toqueInicioY;
    
    if (distanciaDeslizada > 100) {
        telaInicial.style.transform = 'translateY(100vh)';
        telaInicial.style.opacity = '0';
        
        setTimeout(() => {
            telaInicial.style.display = 'none';
            jogoAtivo = true; 
            gameLoop(); // ← INICIA O MAPA AQUI
        }, 400);
    } else {
        telaInicial.style.transform = 'translateY(0)';
    }
});

// Ação do Botão Unificada
btnIniciar.addEventListener('click', () => {
    telaInicial.style.transform = 'translateY(100vh)';
    telaInicial.style.opacity = '0';
    setTimeout(() => {
        telaInicial.style.display = 'none';
        jogoAtivo = true; 
        gameLoop(); // ← INICIA O MAPA AQUI
    }, 400);
});







