// Elementos da DOM
const heroSection = document.querySelector('.hero');
const resultsSection = document.querySelector('.results-section');
const analyzeBtn = document.querySelector('.btn-primary');
const backLink = document.querySelector('.back-link');

// Simulação de IA médica (mesma função anterior)
function medicalAI(symptoms) {
    // ... (manter mesma implementação anterior)
}

// Event listeners
analyzeBtn.addEventListener('click', () => {
    const symptoms = document.querySelector('.symptom-card textarea').value.trim();
    
    if (!symptoms) {
        alert('Por favor, descreva seus sintomas');
        return;
    }
    
    const analysis = medicalAI(symptoms);
    displayResults(analysis);
});

backLink.addEventListener('click', () => {
    resultsSection.classList.add('hidden');
    heroSection.classList.remove('hidden');
});

function displayResults(analysis) {
    // Atualizar a UI com os resultados
    const diagnosisElement = document.querySelector('.diagnosis-result h3');
    const recommendationsElement = document.querySelector('.recommendations');
    
    diagnosisElement.textContent = analysis.diagnosis;
    
    // Atualizar recomendações
    recommendationsElement.innerHTML = analysis.advice
        .split('. ')
        .filter(advice => advice.trim() !== '')
        .map(advice => `
            <li>
                <i class="fas fa-check-circle"></i>
                ${advice.trim()}.
            </li>
        `).join('');
    
    // Mostrar seção de resultados
    heroSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');
}