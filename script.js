// Toggle Search Bar
document.querySelector('.search-btn').addEventListener('click', () => {
    document.querySelector('.search-bar').style.display = 
        document.querySelector('.search-bar').style.display === 'block' ? 'none' : 'block';
});

// Mobile Menu
document.querySelector('.mobile-menu-btn').addEventListener('click', () => {
    document.querySelector('.main-nav').style.display = 
        document.querySelector('.main-nav').style.display === 'flex' ? 'none' : 'flex';
});

// Animações ao scroll
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Efeito parallax suave
    if (scrollY > 100) {
        document.querySelector('.main-header').style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        document.querySelector('.main-header').style.boxShadow = 'none';
    }
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Sua lógica de inicialização aqui
});