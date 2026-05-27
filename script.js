/**
 * AVENIDA PUB BOCAINA
 * Script completo - Com imagens, busca, skeleton screen e dark/light mode
 */

const beers = [
    { name: "Brahma", price: 10, style: "Clássica Brasileira", top: true, image: "images/brahma.png" },
    { name: "Boa", price: 10, style: "Puro Sabor", top: true, image: "images/boa.png" },
    { name: "Heineken", price: 14, style: "Lager Premium", top: false, image: "images/heineken.png" },
    { name: "Corona", price: 14, style: "Pilsener Leve", top: false, image: "images/corona.png" },
    { name: "Stella Artois", price: 13, style: "Puro Malte", top: false, image: "images/stella.png" },
    { name: "Spaten", price: 12, style: "München Lager", top: false, image: "images/spaten.png" },
    { name: "Original", price: 11, style: "Leve & Refrescante", top: false, image: "images/original.png" },
    { name: "Budweiser", price: 10, style: "Lager Americana", top: false, image: "images/budweiser.png" },
    { name: "Skol", price: 10, style: "Leveza Única", top: false, image: "images/skol.png" },
    { name: "Amstel", price: 10, style: "Sabor Encorpado", top: false, image: "images/amstel.png" }
];

let beerCards = [];

const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

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
            <div class="beer-image">
                <img src="${beer.image}" alt="${beer.name}" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Ctext x=\'50\' y=\'70\' font-size=\'50\' text-anchor=\'middle\'%3E🍺%3C/text%3E%3C/svg%3E'">
            </div>
            <div class="beer-info">
                <div class="beer-name">${beer.name}</div>
                <div class="beer-volume">🍺 ${beer.style} • 600ml</div>
            </div>
            <div class="beer-price">
                <div class="price-value">
                    <span class="price-currency">R$</span> ${formatPrice(beer.price).replace('.', ',')}
                </div>
            </div>
        `;
        
        if (beer.top) {
            const topBadge = document.createElement('div');
            topBadge.className = 'top-badge';
            topBadge.textContent = 'Mais Pedida';
            card.appendChild(topBadge);
        }
        
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

// Busca
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

if (searchInput) searchInput.addEventListener('input', filterBeers);
if (clearSearchBtn) clearSearchBtn.addEventListener('click', clearSearch);

// Dark/Light Mode
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
        body.setAttribute('data-theme', 'dark');
    }
};

const toggleTheme = () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    try {
        localStorage.setItem('avenida-pub-theme', newTheme);
    } catch (e) {}
};

if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
loadTheme();

// Scroll animations
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

// Back to top
const backToTopButton = () => {
    const button = document.getElementById('backToTop');
    if (!button) return;
    
    window.addEventListener('scroll', () => {
        button.classList.toggle('show', window.scrollY > 300);
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
};

// Smooth navigation
const smoothNavigation = () => {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
};

// Footer year
const addCurrentYear = () => {
    const yearElement = document.querySelector('.footer-bottom p:first-child');
    if (yearElement) {
        yearElement.innerHTML = `&copy; ${new Date().getFullYear()} Avenida Pub Bocaina. Todos os direitos reservados.`;
    }
};

// Safari fix
const fixSafariVH = () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    showSkeleton();
    
    setTimeout(() => {
        createBeerCards();
        animateOnScroll();
        hideSkeleton();
    }, 800);
    
    backToTopButton();
    smoothNavigation();
    addCurrentYear();
    fixSafariVH();
    
    window.addEventListener('resize', fixSafariVH);
});
