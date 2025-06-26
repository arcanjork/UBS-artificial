// Banco de dados simplificado de unidades de saúde
const healthUnits = [
    { name: "UPA Centro", address: "Rua Principal, 123", distance: "1.2km" },
    { name: "UBS Jardim das Flores", address: "Av. das Palmeiras, 456", distance: "2.5km" },
    { name: "Hospital Municipal", address: "Praça da Saúde, s/n", distance: "3.1km" }
];

// Simulação de IA médica
function medicalAI(symptoms) {
    const lowerSymptoms = symptoms.toLowerCase();
    
    if (lowerSymptoms.includes("febre") && lowerSymptoms.includes("tosse")) {
        return {
            diagnosis: "Possível quadro viral (gripe/resfriado)",
            advice: "Repouso, hidratação e monitoramento da febre. Procure uma unidade se persistir por mais de 3 dias."
        };
    } else if (lowerSymptoms.includes("dor no peito") || lowerSymptoms.includes("falta de ar")) {
        return {
            diagnosis: "Sintomas cardiorrespiratórios",
            advice: "Procure atendimento URGENTE em uma unidade de saúde."
        };
    } else {
        return {
            diagnosis: "Sintomas gerais",
            advice: "Recomendamos avaliação médica para diagnóstico preciso."
        };
    }
}

// Elementos da DOM
const symptomSection = document.getElementById('symptom-section');
const resultsSection = document.getElementById('results-section');
const symptomsInput = document.getElementById('symptoms-input');
const analyzeBtn = document.getElementById('analyze-btn');
const aiResult = document.getElementById('ai-result');
const unitsList = document.getElementById('units-list');
const newCheckBtn = document.getElementById('new-check');

// Event Listeners
analyzeBtn.addEventListener('click', analyzeSymptoms);
newCheckBtn.addEventListener('click', resetApp);

// Função principal
function analyzeSymptoms() {
    const symptoms = symptomsInput.value.trim();
    
    if (symptoms === "") {
        alert("Por favor, descreva seus sintomas");
        return;
    }

    // Processamento
    const analysis = medicalAI(symptoms);
    displayResults(analysis);
}

function displayResults(analysis) {
    // Mostra resultado da IA
    aiResult.innerHTML = `
        <h3>${analysis.diagnosis}</h3>
        <p>${analysis.advice}</p>
    `;

    // Mostra unidades de saúde
    unitsList.innerHTML = healthUnits.map(unit => `
        <li>
            <strong>${unit.name}</strong><br>
            ${unit.address}<br>
            <span class="distance">${unit.distance}</span>
        </li>
    `).join('');

    // Alterna entre as seções
    symptomSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');
}

function resetApp() {
    symptomsInput.value = "";
    symptomSection.classList.remove('hidden');
    resultsSection.classList.add('hidden');
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    resultsSection.classList.add('hidden');
});
