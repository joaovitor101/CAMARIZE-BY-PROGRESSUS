// Função para scroll suave para seções
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Função para animar elementos quando entram na viewport
function animateOnScroll() {
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animar elementos filhos com delay
                const animatedElements = entry.target.querySelectorAll('.animate-on-scroll');
                animatedElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('animated');
                    }, index * 150);
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Função para navegação mobile
function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
}

// Função para mudar navbar no scroll
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Função para animar contadores
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 segundos
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Função para efeito parallax suave
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Função para animar cards com hover simples
function initCardAnimations() {
    const cards = document.querySelectorAll('.servico-card, .membro-card, .sobre-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Função para smooth scroll para links internos
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Ajuste para navbar fixa
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Função para animar elementos na entrada da página
function initEntranceAnimations() {
    const animatedElements = document.querySelectorAll('.hero-title, .hero-subtitle, .cta-button, .hero-image');
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(40px)';
        
        setTimeout(() => {
            element.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Função para efeito de digitação
function typeWriter(element, text, speed = 80) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Função para inicializar efeito de digitação no título
function initTypeWriter() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
}

// Função para animar ícones com rotação 3D
function animateIcons() {
    const icons = document.querySelectorAll('.card-icon i, .servico-icon img');
    
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'rotateY(360deg) scale(1.2)';
            icon.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'rotateY(0deg) scale(1)';
        });
    });
}

// Função para lazy loading de imagens
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Função para efeito de partículas avançadas no hero
function initParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Criar partículas flutuantes mais sofisticadas
    for (let i = 0; i < 80; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 6 + 3;
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.4 + 0.2});
            border-radius: 50%;
            left: ${startX}%;
            top: ${startY}%;
            animation: particleFloat ${duration}s linear infinite;
            animation-delay: ${delay}s;
            box-shadow: 0 0 ${size * 2}px rgba(255, 255, 255, 0.3);
        `;
        hero.appendChild(particle);
    }
    
    // Adicionar partículas que seguem o mouse
    hero.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.7) { // 30% de chance de criar partícula
            const particle = document.createElement('div');
            particle.className = 'mouse-particle';
            
            const size = Math.random() * 4 + 2;
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                pointer-events: none;
                animation: mouseParticle 2s ease-out forwards;
                z-index: 10;
            `;
            hero.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 2000);
        }
    });
}

// Função para scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #e74c3c, #ff6b6b);
        z-index: 1001;
        transition: width 0.1s ease;
        box-shadow: 0 2px 10px rgba(231, 76, 60, 0.5);
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Função para animar números quando visíveis
function animateNumbers() {
    const numbers = document.querySelectorAll('.animate-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const number = entry.target;
                const finalValue = parseInt(number.textContent);
                let currentValue = 0;
                const increment = finalValue / 50;
                
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        number.textContent = finalValue;
                        clearInterval(timer);
                    } else {
                        number.textContent = Math.floor(currentValue);
                    }
                }, 30);
                
                observer.unobserve(number);
            }
        });
    });
    
    numbers.forEach(number => observer.observe(number));
}

// Função para efeito de revelação de texto
function initTextReveal() {
    const texts = document.querySelectorAll('.reveal-text');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    });
    
    texts.forEach(text => observer.observe(text));
}

// Função para efeito de cursor brilhante
function initGlowingCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'glowing-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(231, 76, 60, 0.8), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        opacity: 0;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
}

// Função para animar elementos com stagger
function initStaggerAnimations() {
    const staggerElements = document.querySelectorAll('.stagger-animate');
    
    staggerElements.forEach(container => {
        const items = container.querySelectorAll('.stagger-item');
        
        items.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                el.style.transition = 'all 0.6s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 150);
        });
    });
}

// Função para efeito de morphing no hero
function initMorphingEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Criar formas geométricas que se transformam
    const shapes = ['circle', 'square', 'triangle'];
    let currentShape = 0;
    
    setInterval(() => {
        const shape = document.createElement('div');
        shape.className = 'morphing-shape';
        
        const size = Math.random() * 100 + 50;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        shape.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}%;
            top: ${y}%;
            background: rgba(255, 255, 255, 0.1);
            border-radius: ${shapes[currentShape] === 'circle' ? '50%' : '0'};
            animation: morphingShape 8s ease-in-out infinite;
            pointer-events: none;
            z-index: 1;
        `;
        
        hero.appendChild(shape);
        
        setTimeout(() => {
            shape.remove();
        }, 8000);
        
        currentShape = (currentShape + 1) % shapes.length;
    }, 2000);
}

// Função principal para inicializar tudo
function init() {
    // Aguardar o DOM carregar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
        return;
    }
    
    // Inicializar todas as funcionalidades
    initEntranceAnimations();
    initMobileNav();
    initNavbarScroll();
    animateOnScroll();
    initCardAnimations();
    initSmoothScroll();
    animateIcons();
    initLazyLoading();
    initParticles();
    initScrollProgress();
    animateNumbers();
    initTextReveal();
    initGlowingCursor();
    initStaggerAnimations();
    initMorphingEffect();
    
    // Iniciar typewriter após um pequeno delay
    setTimeout(initTypeWriter, 500);
    
    // Adicionar classes para animações
    addAnimationClasses();
}

// Função para adicionar classes de animação
function addAnimationClasses() {
    // Adicionar classes para stagger animations
    const serviceCards = document.querySelectorAll('.servico-card');
    serviceCards.forEach((card, index) => {
        card.classList.add('stagger-item');
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Adicionar classes para reveal text
    const texts = document.querySelectorAll('.servico-content p, .sobre-card p');
    texts.forEach(text => {
        text.classList.add('reveal-text');
    });
}

// Inicializar quando a página carregar
init();

// Adicionar estilos CSS dinâmicos para animações
const style = document.createElement('style');
style.textContent = `
    .particle {
        pointer-events: none;
    }
    
    .mouse-particle {
        pointer-events: none;
    }
    
    .reveal-text {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }
    
    .reveal-text.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        padding: 20px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        gap: 15px;
        animation: slideDown 0.3s ease;
    }
    
    .nav-menu.active .nav-link {
        padding: 10px 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
    }
    
    .nav-menu.active .nav-link:hover {
        background: rgba(231, 76, 60, 0.1);
        padding-left: 10px;
    }
    
    .nav-menu.active .nav-link:last-child {
        border-bottom: none;
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .stagger-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .stagger-item.staggered {
        opacity: 1;
        transform: translateY(0);
    }
    
    .morphing-shape {
        animation: morphingShape 8s ease-in-out infinite;
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes morphingShape {
        0%, 100% {
            transform: scale(0.8) rotate(0deg);
            opacity: 0.3;
        }
        50% {
            transform: scale(1.2) rotate(180deg);
            opacity: 0.6;
        }
    }
    
    @keyframes mouseParticle {
        0% {
            transform: scale(1);
            opacity: 0.8;
        }
        100% {
            transform: scale(0) translateY(-20px);
            opacity: 0;
        }
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
        
        .glowing-cursor {
            display: none;
        }
    }
    
    /* Melhorias para cards */
    .servico-card, .membro-card, .sobre-card {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .servico-card:hover, .membro-card:hover, .sobre-card:hover {
        transform: translateY(-10px) scale(1.02);
    }
    
    /* Efeito de brilho nos botões */
    .cta-button::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
        transition: left 0.6s ease;
    }
    
    .cta-button:hover::after {
        left: 100%;
    }
    
    /* Animações de entrada para seções */
    .section {
        opacity: 0;
        transform: translateY(60px);
        transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .section.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Efeito de hover para ícones */
    .card-icon:hover, .servico-icon:hover {
        transform: scale(1.1) rotate(5deg);
    }
    
    /* Efeito de hover para imagens */
    .sobre-image:hover img, .membro-foto:hover img {
        transform: scale(1.05);
    }
`;
document.head.appendChild(style);
