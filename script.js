/**
 * AVENIDA PUB BOCAINA
 * Script principal - Cardápio digital premium
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

// Função para formatar preço em reais
const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    });
};

// Função para criar os cards das cervejas
const createBeerCards = () => {
    const beerContainer = document.getElementById('beerList');
    
    if (!beerContainer) {
        console.error('Container #beerList não encontrado');
        return;
    }
    
    // Limpa o container
    beerContainer.innerHTML = '';
    
    // Para cada cerveja, cria um card
    beers.forEach((beer, index) => {
        const card = document.createElement('div');
        card.className = 'beer-card';
        card.setAttribute('data-beer', beer.name);
        card.setAttribute('data-price', beer.price);
        
        // Estrutura do card
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
        
        // Adiciona efeito de clique (feedback visual)
        card.addEventListener('click', () => {
            // Pequena animação de feedback
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
            
            // Console log (pode ser substituído por toast no futuro)
            console.log(`🍺 ${beer.name} selecionada - R$ ${formatPrice(beer.price)}`);
        });
        
        beerContainer.appendChild(card);
    });
    
    console.log(`✅ ${beers.length} cervejas carregadas com sucesso!`);
};

// Função para corrigir o mapa (coordenadas aproximadas de Bocaina - SP)
const fixMapCoordinates = () => {
    // Coordenadas aproximadas de Bocaina - SP
    // Latitude: -22.1365, Longitude: -48.5180
    const mapFrame = document.querySelector('.google-map');
    if (mapFrame) {
        const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3692.456789012345!2d-48.521234!3d-22.139876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c68b2a5b6c7d8f%3A0x123456789abcdef!2sR.%20Pref.%20Guilherme%20Giraide%20Ferreira%20Canpam%2C%20626%20-%20Bocaina%2C%20SP%2C%2017245-128!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr`;
        mapFrame.src = embedUrl;
    }
};

// Função para animar elementos ao scroll
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
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
};

// Função para controlar o botão "Voltar ao topo"
const backToTopButton = () => {
    const button = document.getElementById('backToTop');
    if (!button) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.classList.add('show');
        } else {
            button.classList.remove('show');
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

// Função para suavizar a navegação dos links internos
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
                
                // Atualiza URL sem recarregar
                history.pushState(null, null, targetId);
            }
        });
    });
};

// Função para adicionar efeito de glassmorphism dinâmico no header
const dynamicHeaderEffect = () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const opacity = Math.min(scrolled / 500, 0.95);
        hero.style.setProperty('--scroll-opacity', opacity);
    });
};

// Função para adicionar tooltips nos ícones das redes sociais
const addTooltips = () => {
    const socialLinks = document.querySelectorAll('.social-link, .footer-social-link');
    
    socialLinks.forEach(link => {
        link.setAttribute('title', 'Abrir Instagram');
    });
};

// Função para exibir um console art (apenas para estilo)
const showConsoleArt = () => {
    console.log(`
    ╔═══════════════════════════════════════╗
    ║     🍺 AVENIDA PUB BOCAINA 🍺         ║
    ║                                       ║
    ║   Cardápio digital carregado com      ║
    ║   sucesso!                            ║
    ║                                       ║
    ║   ✨ Design Premium | Dark Mode       ║
    ║   📱 Totalmente Responsivo            ║
    ║   🎨 Neon Laranja & Dourado           ║
    ╚═══════════════════════════════════════╝
    `);
};

// Função para adicionar data atual no footer (opcional)
const addCurrentYear = () => {
    const yearElement = document.querySelector('.footer-bottom p:first-child');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = `&copy; ${currentYear} Avenida Pub Bocaina. Todos os direitos reservados.`;
    }
};

// Inicialização quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Inicializando Avenida Pub Bocaina...');
    
    // Cria os cards do cardápio
    createBeerCards();
    
    // Corrige o mapa
    fixMapCoordinates();
    
    // Anima elementos ao scroll
    animateOnScroll();
    
    // Configura botão voltar ao topo
    backToTopButton();
    
    // Configura navegação suave
    smoothNavigation();
    
    // Efeito dinâmico no header
    dynamicHeaderEffect();
    
    // Adiciona tooltips
    addTooltips();
    
    // Atualiza ano no footer
    addCurrentYear();
    
    // Mostra arte no console
    showConsoleArt();
});

// Adiciona efeito de parallax suave no hero (opcional)
window.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    if (!hero || window.innerWidth < 768) return;
    
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    const moveX = (mouseX - 0.5) * 20;
    const moveY = (mouseY - 0.5) * 20;
    
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translate(${moveX * 0.5}px, ${moveY * 0.5}px)`;
    }
});

// Previne o comportamento padrão de arrastar imagens (opcional)
document.querySelectorAll('img, .beer-card').forEach(el => {
    el.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
});
