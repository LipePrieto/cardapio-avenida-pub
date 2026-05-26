// Lista de cervejas conforme especificação (600ml)
const beers = [
    { name: "Heineken", price: 14 },
    { name: "Corona", price: 14 },
    { name: "Stella Artois", price: 13 },
    { name: "Spaten", price: 12 },
    { name: "Original", price: 11 },
    { name: "Budweiser", price: 10 },
    { name: "Boa", price: 10 },
    { name: "Brahma", price: 10 },
    { name: "Skol", price: 10 },
    { name: "Amstel", price: 10 }
];

// Mapeamento de dicas de estilo para cada cerveja
const getBeerStyleHint = (name) => {
    const hints = {
        "Heineken": "Lager Premium",
        "Corona": "Pilsener leve",
        "Stella Artois": "Puro Malte",
        "Spaten": "München Lager",
        "Original": "Leve & Refrescante",
        "Budweiser": "Lager Americana",
        "Boa": "Puro Sabor",
        "Brahma": "Clássica",
        "Skol": "Leveza única",
        "Amstel": "Sabor encorpado"
    };
    return hints[name] || "Gelada 600ml";
};

// Função para formatar preço
const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

// Função para criar os cards das cervejas
const createBeerCards = () => {
    const beerContainer = document.getElementById('beerList');
    
    if (!beerContainer) return;
    
    // Limpa o container (caso tenha algo)
    beerContainer.innerHTML = '';
    
    // Para cada cerveja, cria um card
    beers.forEach((beer) => {
        const card = document.createElement('div');
        card.className = 'beer-card';
        
        // Parte esquerda (informações)
        const leftDiv = document.createElement('div');
        leftDiv.className = 'beer-info';
        
        const beerNameSpan = document.createElement('div');
        beerNameSpan.className = 'beer-name';
        beerNameSpan.textContent = beer.name;
        
        const hintSpan = document.createElement('div');
        hintSpan.className = 'beer-type-hint';
        hintSpan.textContent = getBeerStyleHint(beer.name);
        
        leftDiv.appendChild(beerNameSpan);
        leftDiv.appendChild(hintSpan);
        
        // Parte direita (preço e ícone)
        const rightDiv = document.createElement('div');
        rightDiv.className = 'beer-price';
        
        const priceSpan = document.createElement('div');
        priceSpan.className = 'price-value';
        priceSpan.innerHTML = `<span class="price-currency">R$</span> ${formatPrice(beer.price).replace('.', ',')}`;
        
        const glassIcon = document.createElement('div');
        glassIcon.className = 'glass-icon';
        glassIcon.style.fontSize = '1.3rem';
        glassIcon.style.marginTop = '6px';
        glassIcon.style.textAlign = 'right';
        glassIcon.textContent = '🍺';
        
        rightDiv.appendChild(priceSpan);
        rightDiv.appendChild(glassIcon);
        
        card.appendChild(leftDiv);
        card.appendChild(rightDiv);
        
        beerContainer.appendChild(card);
    });
};

// Função para adicionar efeito de hover dinâmico (opcional)
const addInteractiveEffects = () => {
    // Efeito de clique nos cards (opcional - apenas para mostrar interatividade)
    const cards = document.querySelectorAll('.beer-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const beerName = card.querySelector('.beer-name')?.textContent;
            if (beerName) {
                console.log(`🍺 ${beerName} selecionada!`);
                // Pequeno feedback visual sutil
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.transform = '';
                }, 150);
            }
        });
    });
};

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    createBeerCards();
    addInteractiveEffects();
    console.log('🍻 Cardápio Avenida Pub carregado com sucesso!');
});

// Opcional: Recarregar cards se houver mudanças dinâmicas (caso queira adicionar filtros no futuro)
// Exportar para possível uso futuro (se necessário)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { beers, formatPrice, createBeerCards };
}
