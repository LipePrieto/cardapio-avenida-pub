/**
 * AVENIDA PUB BOCAINA
 * Script principal - Com Brahma e Boa no TOPO + Mais Pedidas
 */

// Dados das cervejas (Brahma e Boa agora estão no TOPO)
const beers = [
    { name: "Brahma", price: 10, style: "Clássica Brasileira", top: true },   // 🔥 MAIS PEDIDA - TOPO
    { name: "Boa", price: 10, style: "Puro Sabor", top: true },               // 🔥 MAIS PEDIDA - TOPO
    { name: "Heineken", price: 14, style: "Lager Premium", top: false },
    { name: "Corona", price: 14, style: "Pilsener Leve", top: false },
    { name: "Stella Artois", price: 13, style: "Puro Malte", top: false },
    { name: "Spaten", price: 12, style: "München Lager", top: false },
    { name: "Original", price: 11, style: "Leve & Refrescante", top: false },
    { name: "Budweiser", price: 10, style: "Lager Americana", top: false },
    { name: "Skol", price: 10, style: "Leveza Única", top: false },
    { name: "Amstel", price: 10, style: "Sabor Encorpado", top: false }
];

// Elementos DOM
let beerCards = [];

// Formatar preço
const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    });
};

// Simular carregamento com Skeleton Screen
const showSkeleton = () => {
    const skeleton = document.getElementById('skeletonLoader');
    const beerList = document.getElementById('beerList');
    const sinucaCard = document.getElementById('sinucaCard');
    const menuNote = document.getElementById('menuNote');
    
    if (skeleton) skeleton.style.display = 'flex';
    if (beerList) beerList.style.display = 'none';
    if (sinucaCard) sinucaCard.style.display = 'none';
    if (menuNote) menuNote.style.display = 'none';
};

const hideSkeleton = () => {
    const skeleton = document.getElementById('skeletonLoader');
    const beerList = document.getElementById('beerList');
    const sinucaCard = document.getElementById('sinucaCard');
    const menuNote = document.getElementById('menuNote');
    
    if (skeleton) skeleton.style.display = 'none';
    if (beerList) beerList.style.display = 'flex';
    if (sinucaCard) sinucaCard.style.display = 'block';
    if (menuNote) menuNote.style.display = 'flex';
};

// Criar cards das cervejas
const createBeerCards = () => {
    const beerContainer = document.getElementById('beerList');
    if (!beerContainer) return;
    
    beerContainer.innerHTML = '';
    beerCards = [];
    
    beers.forEach((beer, index) => {
        const card = document.createElement('div');
        card.className = 'beer-card';
        card.setAttribute('data-name', beer.name.toLowerCase());
        card.setAttribute('data-price', beer.price);
        card.style.animationDelay = `${0.05 * (index + 1)}s`;
        
        card.innerHTML = `
            <div class="beer-info">
                <div class="beer-name">${beer.name}</div>
                <div class="beer-volume">🍺 ${beer.style} • 600ml</div>
            </div>
            <div class="beer-price">
                <div class="price-value">
                    <span class="price-currency">R$</span> ${formatPrice(beer.price).replace('.', ',')}
                </div>
                <div class="beer-icon">
                    <i class="fas fa-beer"></i>
                </div>
            </div>
        `;
        
        // Adiciona selo "Mais Pedida" apenas para Brahma e Boa
        if (beer.top) {
            const topBadge = document.createElement('div');
            topBadge.className = 'top-badge';
            topBadge.textContent = 'Mais Pedida';
            card.appendChild(topBadge);
        }
        
        // Evento de toque/clique
        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
            console.log(`🍺 ${beer.name} selecionada - R$ ${formatPrice(beer.price)}`);
        });
        
        beerContainer.appendChild(card);
        beerCards.push(card);
    });
    
    updateSearchCount(beers.length);
    console.log('✅ Brahma e Boa estão no TOPO do cardápio! 🔥');
};

// ========== SISTEMA DE BUSCA/FILTRO ==========
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearch');

const filterBeers = () => {
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    let visibleCount = 0;
    
    beerCards.forEach((card) => {
        const beerName = card.getAttribute('data-name');
        if (searchTerm === '' || beerName.includes(searchTerm)) {
            card.classList.remove('hidden');
            visibleCount++;
        } else {
            card.classList.add('hidden');
        }
    });
    
    updateSearchCount(visibleCount);
};

const updateSearchCount = (count) => {
    const searchCountSpan = document.getElementById('searchCount');
    if (searchCountSpan) {
        if (count === 0) {
            searchCountSpan.innerHTML = '🍺 Nenhuma cerveja encontrada';
            searchCountSpan.style.color = '#ff8c00';
        } else if (count === beers.length) {
            searchCountSpan.innerHTML = `🍺 ${count} cervejas disponíveis`;
            searchCountSpan.style.color = '#888';
        } else {
            searchCountSpan.innerHTML = `🍺 ${count} de ${beers.length} cervejas encontradas`;
            searchCountSpan.style.color = '#ffb347';
        }
    }
};

const clearSearch = () => {
    if (searchInput) {
        searchInput.value = '';
        filterBeers();
        searchInput.focus();
    }
};

if (searchInput) {
    searchInput.addEventListener('input', filterBeers);
}
if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', clearSearch);
}

// ========== DARK/LIGHT MODE TOGGLE ==========
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

const loadTheme = () => {
    try {
        const savedTheme = localStorage.getItem('avenida-pub-theme');
        if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
            body.setAttribute('data-theme', savedTheme);
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            body.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        }
    } catch (e) {
        console.log('Erro ao carregar tema:', e);
        body.setAttribute('data-theme', 'dark');
    }
};

const toggleTheme = () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    try {
        localStorage.setItem('avenida-pub-theme', newTheme);
    } catch (e) {
        console.log('Erro ao salvar tema:', e);
    }
};

if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}
loadTheme();

// ========== ANIMAÇÃO AO SCROLL ==========
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.beer-card, .feature-card, .info-card, .map-wrapper, .payment-item, .sinuca-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease';
        observer.observe(element);
    });
};

// ========== BACK TO TOP ==========
const backToTopButton = () => {
    const button = document.getElementById('backToTop');
    if (!button) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.classList.add('show');
        } else {
            button.classList.remove('show');
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
};

// ========== NAVEGAÇÃO SUAVE ==========
const smoothNavigation = () => {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
};

// ========== ATUALIZAR ANO NO FOOTER ==========
const addCurrentYear = () => {
    const yearElement = document.querySelector('.footer-bottom p:first-child');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = `&copy; ${currentYear} Avenida Pub Bocaina. Todos os direitos reservados.`;
    }
};

// ========== FIX PARA SAFARI (100vh issue) ==========
const fixSafariVH = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Avenida Pub Bocaina - Inicializando...');
    
    // Mostra skeleton screen
    showSkeleton();
    
    // Simula carregamento
    setTimeout(() => {
        createBeerCards();
        animateOnScroll();
        hideSkeleton();
        console.log('✅ Cardápio carregado! Brahma e Boa estão no TOPO 🔥');
    }, 800);
    
    backToTopButton();
    smoothNavigation();
    addCurrentYear();
    fixSafariVH();
    
    window.addEventListener('resize', fixSafariVH);
});
