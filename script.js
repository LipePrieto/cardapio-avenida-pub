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
    const mapFrame = document.querySelector('.google-map');
    if (mapFrame && mapFrame.src.includes('pb=!1m18')) {
        // O mapa já está configurado corretamente no HTML
        console.log('🗺️ Mapa carregado com sucesso');
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
    ║   ⚽ Transmissão de Jogos             ║
    ╚═══════════════════════════════════════╝
    `);
};

// Função para adicionar data atual no footer
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

// Previne o comportamento padrão de arrastar elementos
document.querySelectorAll('.beer-card, .feature-card').forEach(el => {
    el.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
});
