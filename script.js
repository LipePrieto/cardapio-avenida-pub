/**
 * AVENIDA PUB BOCAINA
 * Script principal - Cardápio digital premium
 * Mobile First
 */

// Dados das cervejas (600ml)
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

// Função para formatar preço
const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    });
};

// Criar cards das cervejas
const createBeerCards = () => {
    const beerContainer = document.getElementById('beerList');
    
    if (!beerContainer) {
        console.error('Container #beerList não encontrado');
        return;
    }
    
    beerContainer.innerHTML = '';
    
    beers.forEach((beer) => {
        const card = document.createElement('div');
        card.className = 'beer-card';
        
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
        
        // Feedback ao tocar/clicar
        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
        });
        
        beerContainer.appendChild(card);
    });
    
    console.log(`✅ ${beers.length} cervejas carregadas`);
};

// Animação ao scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.beer-card, .feature-card, .info-card, .map-wrapper');
    
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

// Botão voltar ao topo
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

// Navegação suave
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

// Atualizar ano no footer
const addCurrentYear = () => {
    const yearElement = document.querySelector('.footer-bottom p:first-child');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = `&copy; ${currentYear} Avenida Pub Bocaina. Todos os direitos reservados.`;
    }
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    createBeerCards();
    animateOnScroll();
    backToTopButton();
    smoothNavigation();
    addCurrentYear();
    
    console.log('🍺 Avenida Pub Bocaina - Pronto para servir!');
});
