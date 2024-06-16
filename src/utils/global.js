import { retornaCep } from "../services/api";

export const inputMascaraCep = (e, setValores = false) => {
    if (!e.target.value) return "";

    const valorFormatado = e.target.value.replace(/\D/g, '');

    if (valorFormatado.length === 8) {
        e.target.value = valorFormatado.replace(/(\d{5})(\d{3})/, '$1-$2');

        if(setValores){
            retornaCep(valorFormatado)
            .then((response) => {
                const endereco = response.data;

                setValores(endereco);
            })
            .catch((error) => {
                console.error('Erro ao obter dados do CEP:', error);
            });
        }
    }
}


export const inputMascaraTelefoneCelular = (e) => {
    if (!e.target.value) return ""
    e.target.value = e.target.value.replace(/\D/g, '')
    e.target.value = e.target.value.replace(/(\d{2})(\d)/, "($1)$2")
    e.target.value = e.target.value.replace(/(\d)(\d{4})$/, "$1-$2")
}

export const inputMascaraCPF_CNPJ = (e) => {
    if (!e.target.value) return "";

    const valorFormatado = e.target.value.replace(/\D/g, '');

    e.target.value = e.target.value.replace(/\D/g, '');

    if (valorFormatado.length === 14) {
        e.target.value = valorFormatado.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    } else if (valorFormatado.length === 18) {
        e.target.value = valorFormatado.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
}

export function verificaEmail(email) {
    var regexEmail = /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

    return regexEmail.test(email);
}

export const servicosOficina = [
    "Troca de óleo e filtros",
    "Alinhamento e balanceamento de rodas",
    "Revisão e manutenção de freios",
    "Substituição de pastilhas e discos de freio",
    "Reparos no sistema de suspensão",
    "Troca de amortecedores",
    "Revisão e reparo do sistema de escapamento",
    "Manutenção do sistema de ar condicionado",
    "Revisão do sistema de injeção eletrônica",
    "Diagnóstico de falhas com scanner",
    "Troca de correia dentada",
    "Serviços de embreagem",
    "Troca de bateria",
    "Reparos no sistema elétrico",
    "Troca de velas de ignição",
    "Revisão de motor",
    "Troca de filtros de ar e de combustível",
    "Revisão de câmbio (manual e automático)",
    "Troca de óleo do câmbio",
    "Serviços de lanternagem e pintura",
    "Alinhamento de direção",
    "Reparos no sistema de direção hidráulica ou elétrica",
    "Reparos no sistema de arrefecimento (radiador, bomba d’água)",
    "Limpeza de bicos injetores",
    "Troca de pneus",
    "Balanceamento de pneus",
    "Instalação de acessórios automotivos",
    "Reparos em vidros automotivos",
    "Inspeção veicular e emissão de laudos técnicos",
    "Serviços de funilaria",
    "Troca de lâmpadas e faróis",
    "Reparos em sistema de airbags",
    "Reparos em sistema de ABS",
    "Serviços de polimento e cristalização de pintura",
    "Reparos em sistema de ignição",
    "Reparos em sistema de combustível",
    "Troca de juntas homocinéticas",
    "Manutenção de diferencial",
    "Troca de juntas e retentores",
    "Revisão de alternador",
    "Troca de motor de arranque",
    "Reparos em sistemas de ventilação",
    "Descarbonização de motor",
    "Revisão de sistema de escapamento esportivo",
    "Serviços de personalização automotiva",
    "Instalação de som automotivo",
    "Instalação de alarmes e travas elétricas",
    "Revisão de sistema de tração 4x4",
    "Reparos em sistema de freio de mão",
    "Lavagem técnica de motor"
];
  
export const marcasDeVeiculos = [
    "Acura",
    "Alfa Romeo",
    "Ashok Leyland",
    "Aston Martin",
    "Audi",
    "BAIC",
    "Bajaj",
    "Benelli",
    "Bentley",
    "BMW",
    "Buick",
    "BYD",
    "Cadillac",
    "Chevrolet",
    "Chery",
    "Chrysler",
    "Citroën",
    "Dacia",
    "Daewoo",
    "Daihatsu",
    "Datsun",
    "Dodge",
    "Dongfeng",
    "Ducati",
    "Ferrari",
    "Fiat",
    "Fisker",
    "Ford",
    "Foton",
    "Freightliner",
    "GAC",
    "Geely",
    "Genesis",
    "GMC",
    "Great Wall",
    "Harley-Davidson",
    "Haval",
    "Hero MotoCorp",
    "Holden",
    "Honda",
    "Honda (motos)",
    "Hummer",
    "Hyundai",
    "Infiniti",
    "Isuzu",
    "Iveco",
    "Jaguar",
    "Jeep",
    "Kawasaki",
    "Kia",
    "KTM",
    "Lada",
    "Lamborghini",
    "Land Rover",
    "Lexus",
    "Lincoln",
    "Lotus",
    "Mahindra",
    "Mahindra (motos)",
    "MAN",
    "Maruti Suzuki",
    "Maserati",
    "Mazda",
    "Mercedes-Benz",
    "Mercedes-Benz Trucks",
    "MG",
    "Mini",
    "Mitsubishi",
    "MV Agusta",
    "Nissan",
    "Opel",
    "Peugeot",
    "Piaggio",
    "Plymouth",
    "Pontiac",
    "Porsche",
    "Ram",
    "Renault",
    "Rolls-Royce",
    "Royal Enfield",
    "Saab",
    "Saturn",
    "Scania",
    "Scion",
    "SEAT",
    "Skoda",
    "Smart",
    "Studebaker",
    "Subaru",
    "Suzuki",
    "Suzuki (motos)",
    "Tata",
    "Tesla",
    "Toyota",
    "Triumph",
    "TVS",
    "Vauxhall",
    "Volkswagen",
    "Volvo",
    "Volvo Trucks",
    "Yamaha"
];

export const tiposDeVeiculos = [
    "Carros",
    "Motocicletas",
    "Caminhonetes",
    "Vans",
    "Caminhões",
];

export const tiposPropulsaoComuns = [
    "Gasolina",
    "Diesel",
    "Flex",
    "Elétrico puro (EV)",
    "Híbrido",
    "Plug-in híbrido",
    "Veículo a hidrogênio",
    "Veículo movido a gás natural"
];