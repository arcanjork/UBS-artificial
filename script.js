// Elementos da DOM
const elements = {
    searchInput: document.querySelector('.search-container input'),
    analyzeBtn: document.querySelector('.search-container .btn-primary'),
    resultsSection: document.querySelector('.results-section'),
    voiceSearchBtn: document.querySelector('#voice-search-btn'),
    mobileMenuBtn: document.querySelector('.mobile-menu-btn'),
    mainNav: document.querySelector('.main-nav')
};

// Dados de exemplo
const symptomDatabase = {
    common: ["Febre", "Dor de cabeça", "Tosse", "Dor de garganta", "Náuseas"],
    conditions: [
        {
            name: "Gripe",
            symptoms: ["Febre", "Tosse", "Dor no corpo"],
            severity: "medium",
            recommendations: [
                "Repouso e hidratação",
                "Medir temperatura regularmente",
                "Procurar UBS se persistir"
            ]
        }
    ]
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
    setupVoiceRecognition();
});

// Event Listeners
function initEventListeners() {
    elements.analyzeBtn.addEventListener('click', analyzeSymptoms);
    elements.mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

// Análise de sintomas
function analyzeSymptoms() {
    const symptoms = elements.searchInput.value.trim();
    
    if (!symptoms) {
        alert("Por favor, descreva seus sintomas");
        return;
    }
    
    // Simular análise (na prática, chamada à API)
    simulateAnalysis(symptoms);
}

function simulateAnalysis(symptoms) {
    // Mostrar loading
    elements.analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analisando...';
    elements.analyzeBtn.disabled = true;
    
    // Simular delay de rede/processamento
    setTimeout(() => {
        const analysis = {
            diagnosis: "Possível infecção respiratória",
            severity: "medium",
            recommendations: [
                "Repouso e hidratação abundante",
                "Medir temperatura a cada 4 horas",
                "Procurar UBS se sintomas persistirem"
            ]
        };
        
        displayResults(analysis);
        
        // Restaurar botão
        elements.analyzeBtn.innerHTML = '<i class="fas fa-stethoscope"></i> Analisar';
        elements.analyzeBtn.disabled = false;
    }, 1500);
}

// Exibir resultados
function displayResults(analysis) {
    const resultsCard = elements.resultsSection.querySelector('.results-card');
    
    // Atualizar conteúdo
    resultsCard.querySelector('.result-diagnosis h3').textContent = analysis.diagnosis;
    
    const severityElement = resultsCard.querySelector('.result-severity');
    severityElement.className = `result-severity ${analysis.severity}`;
    severityElement.querySelector('span').textContent = 
        analysis.severity === 'high' ? 'Gravidade alta' :
        analysis.severity === 'medium' ? 'Gravidade moderada' : 'Gravidade baixa';
    
    const recommendationsList = resultsCard.querySelector('.result-recommendations ul');
    recommendationsList.innerHTML = analysis.recommendations.map(rec => `
        <li>
            <i class="fas fa-check-circle"></i>
            <span>${rec}</span>
        </li>
    `).join('');
    
    // Mostrar seção de resultados
    elements.resultsSection.classList.remove('hidden');
    elements.resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Menu mobile
function toggleMobileMenu() {
    elements.mainNav.classList.toggle('active');
}

// Reconhecimento de voz
function setupVoiceRecognition() {
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'pt-BR';
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            elements.searchInput.value = transcript;
            toggleVoiceUI(false);
        };
        
        recognition.onerror = (event) => {
            console.error('Erro no reconhecimento:', event.error);
            toggleVoiceUI(false);
        };
        
        elements.voiceSearchBtn.addEventListener('click', () => {
            if (elements.voiceSearchBtn.classList.contains('active')) {
                recognition.stop();
                toggleVoiceUI(false);
            } else {
                recognition.start();
                toggleVoiceUI(true);
            }
        });
    } else {
        elements.voiceSearchBtn.style.display = 'none';
    }
}

function toggleVoiceUI(isListening) {
    elements.voiceSearchBtn.classList.toggle('active', isListening);
    elements.voiceSearchBtn.innerHTML = isListening ? 
        '<i class="fas fa-microphone-slash"></i>' : 
        '<i class="fas fa-microphone"></i>';
}