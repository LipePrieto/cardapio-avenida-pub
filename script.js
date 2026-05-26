/**
 * AVENIDA PUB BOCAINA
 * Script principal - Cardápio digital premium
 * Com Busca/Filtro, Dark/Light Mode e PWA
 */

// Dados das cervejas
const beers = [
    { name: "Heineken", price: 14, style: "Lager Premium" },
    { name: "Corona", price: 14, style: "Pilsener Leve" },
    { name: "Stella Artois", price: 13, style: "Puro Malte" },
    { name: "Spaten", price: 12, style: "München Lager" },
    { name: "Original", price: 11, style: "Leve & Refrescante" },
    { name: "Budweiser", price: 10, style: "Lager Americana" },
    { name: "Boa", price: 10, style: "Puro Sabor" },
    { name: "Brahma", price: 10, style: "Clássica Brasileira" },
    { name: "Skol", price: 10, style: "Leveza Única" },
    { name: "Amstel", price: 10, style: "Sabor Encorpado" }
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
        
        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
        });
        
        beerContainer.appendChild(card);
        beerCards.push(card);
    });
    
    updateSearchCount(beers.length);
};

// ========== SISTEMA DE BUSCA/FILTRO ==========
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearch');

const filterBeers = () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;
    
    beerCards.forEach((card, index) => {
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
    const savedTheme = localStorage.getItem('avenida-pub-theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        body.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }
};

const toggleTheme = () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('avenida-pub-theme', newTheme);
};

if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}
loadTheme();

// ========== PWA - SERVICE WORKER ==========
const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            console.log('✅ Service Worker registrado com sucesso!');
        } catch (error) {
            console.log('⚠️ Service Worker falhou:', error);
        }
    }
};

// Verificar se pode instalar como PWA
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Mostrar notificação para instalar
    const installBanner = document.createElement('div');
    installBanner.className = 'install-banner';
    installBanner.innerHTML = `
        <div class="install-banner-content">
            <i class="fas fa-download"></i>
            <span>Instale nosso app para uma experiência melhor!</span>
            <button id="installAppBtn">Instalar</button>
            <button id="closeBannerBtn"><i class="fas fa-times"></i></button>
        </div>
    `;
    
    const closeBanner = () => installBanner.remove();
    installBanner.querySelector('#closeBannerBtn')?.addEventListener('click', closeBanner);
    installBanner.querySelector('#installAppBtn')?.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`User response: ${outcome}`);
            deferredPrompt = null;
        }
        closeBanner();
    });
    
    document.body.appendChild(installBanner);
    
    setTimeout(() => {
        if (document.body.contains(installBanner)) {
            installBanner.style.opacity = '0';
            setTimeout(() => installBanner.remove(), 300);
        }
    }, 10000);
});

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

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Avenida Pub Bocaina - Inicializando...');
    
    createBeerCards();
    animateOnScroll();
    backToTopButton();
    smoothNavigation();
    addCurrentYear();
    registerServiceWorker();
    
    console.log('✅ Site pronto!');
});
