// Banco de dados avançado
const symptomDatabase = {
    common: [
        "Febre", "Dor de cabeça", "Tosse", "Dor de garganta",
        "Náuseas", "Tontura", "Fadiga", "Dor nas costas"
    ],
    bodyParts: {
        head: ["Dor de cabeça", "Tontura", "Visão turva"],
        chest: ["Dor no peito", "Falta de ar", "Tosse"],
        abdomen: ["Dor abdominal", "Náuseas", "Azia"],
        limbs: ["Dor nas articulações", "Inchaço", "Formigamento"]
    },
    conditions: [
        { name: "Gripe", symptoms: ["Febre", "Tosse", "Dor no corpo"] },
        { name: "Enxaqueca", symptoms: ["Dor de cabeça", "Náuseas", "Sensibilidade à luz"] }
    ]
};

// Elementos DOM
const symptomsInput = document.getElementById('symptoms-input');
const suggestionPanel = document.getElementById('suggestion-panel');
const historyPanel = document.getElementById('history-panel');
const clearBtn = document.getElementById('clear-btn');
const voiceBtn = document.getElementById('voice-search-btn');
const analyzeBtn = document.getElementById('analyze-btn');
const suggestionTags = document.querySelector('.suggestion-tags');
const bodyMapAreas = document.querySelector('.body-map-areas');
const historyItems = document.querySelector('.history-items');
const clearHistoryBtn = document.getElementById('clear-history');

// Histórico
let searchHistory = JSON.parse(localStorage.getItem('symptomHistory')) || [];

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    loadCommonSymptoms();
    setupBodyMap();
    loadHistory();
    
    // Verifica se há histórico para mostrar
    if (searchHistory.length > 0) {
        historyPanel.classList.remove('hidden');
    }
});

// Event Listeners
symptomsInput.addEventListener('input', (e) => {
    const value = e.target.value;
    clearBtn.classList.toggle('hidden', value.length === 0);
    
    if (value.length > 2) {
        showSmartSuggestions(value);
    } else if (value.length === 0) {
        suggestionPanel.classList.add('hidden');
        historyPanel.classList.remove('hidden');
    }
});

symptomsInput.addEventListener('focus', () => {
    if (symptomsInput.value.length === 0 && searchHistory.length > 0) {
        historyPanel.classList.remove('hidden');
    } else if (symptomsInput.value.length > 0) {
        suggestionPanel.classList.remove('hidden');
    }
});

symptomsInput.addEventListener('blur', () => {
    setTimeout(() => {
        suggestionPanel.classList.add('hidden');
        historyPanel.classList.add('hidden');
    }, 200);
});

clearBtn.addEventListener('click', () => {
    symptomsInput.value = '';
    clearBtn.classList.add('hidden');
    symptomsInput.focus();
});

voiceBtn.addEventListener('click', toggleVoiceRecognition);
clearHistoryBtn.addEventListener('click', clearHistory);

// Funções
function loadCommonSymptoms() {
    suggestionTags.innerHTML = symptomDatabase.common.map(symptom => `
        <div class="symptom-tag" data-symptom="${symptom}">${symptom}</div>
    `).join('');
    
    document.querySelectorAll('.symptom-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            addSymptomToInput(tag.dataset.symptom);
        });
    });
}

function setupBodyMap() {
    // Cria áreas clicáveis no mapa do corpo
    const areas = [
        { id: 'head', top: '5%', left: '35%', width: '30%', height: '15%' },
        { id: 'chest', top: '20%', left: '25%', width: '50%', height: '20%' },
        { id: 'abdomen', top: '40%', left: '30%', width: '40%', height: '20%' },
        { id: 'limbs', top: '60%', left: '20%', width: '60%', height: '35%' }
    ];
    
    bodyMapAreas.innerHTML = areas.map(area => `
        <div class="body-area" 
             data-area="${area.id}"
             style="top:${area.top}; left:${area.left}; width:${area.width}; height:${area.height}">
        </div>
    `).join('');
    
    document.querySelectorAll('.body-area').forEach(area => {
        area.addEventListener('click', () => {
            const symptoms = symptomDatabase.bodyParts[area.dataset.area];
            showBodyPartSymptoms(symptoms);
        });
    });
}

function showBodyPartSymptoms(symptoms) {
    suggestionPanel.querySelector('.common-symptoms').innerHTML = `
        <h4>Sintomas relacionados</h4>
        <div class="suggestion-tags">
            ${symptoms.map(symptom => `
                <div class="symptom-tag" data-symptom="${symptom}">${symptom}</div>
            `).join('')}
        </div>
    `;
    
    document.querySelectorAll('.symptom-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            addSymptomToInput(tag.dataset.symptom);
        });
    });
}

function showSmartSuggestions(inputText) {
    // Simulação de IA - na prática, integraria com uma API
    const matchedSymptoms = symptomDatabase.common.filter(symptom => 
        symptom.toLowerCase().includes(inputText.toLowerCase())
    );
    
    const matchedConditions = symptomDatabase.conditions.filter(condition => 
        condition.symptoms.some(s => s.toLowerCase().includes(inputText.toLowerCase()))
    );
    
    let suggestionsHTML = '';
    
    if (matchedSymptoms.length > 0) {
        suggestionsHTML += `
            <div class="suggestion-group">
                <h4>Sintomas correspondentes</h4>
                <div class="suggestion-tags">
                    ${matchedSymptoms.map(symptom => `
                        <div class="symptom-tag" data-symptom="${symptom}">
                            ${highlightMatch(symptom, inputText)}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    if (matchedConditions.length > 0) {
        suggestionsHTML += `
            <div class="suggestion-group">
                <h4>Possíveis condições</h4>
                <div class="condition-list">
                    ${matchedConditions.map(condition => `
                        <div class="condition-item" data-condition="${condition.name}">
                            <strong>${condition.name}</strong>
                            <div class="condition-symptoms">
                                ${condition.symptoms.join(', ')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    if (suggestionsHTML) {
        suggestionPanel.querySelector('.suggestion-content').innerHTML = suggestionsHTML;
        suggestionPanel.classList.remove('hidden');
        historyPanel.classList.add('hidden');
        
        document.querySelectorAll('.symptom-tag').forEach(tag => {
            tag.addEventListener('click', () => {
                addSymptomToInput(tag.dataset.symptom);
            });
        });
        
        document.querySelectorAll('.condition-item').forEach(item => {
            item.addEventListener('click', () => {
                symptomsInput.value = item.dataset.condition;
                suggestionPanel.classList.add('hidden');
            });
        });
    } else {
        suggestionPanel.classList.add('hidden');
    }
}

function addSymptomToInput(symptom) {
    const currentValue = symptomsInput.value.trim();
    symptomsInput.value = currentValue ? `${currentValue}, ${symptom}` : symptom;
    symptomsInput.focus();
    suggestionPanel.classList.add('hidden');
}

function highlightMatch(text, match) {
    if (!match) return text;
    const regex = new RegExp(match, 'gi');
    return text.replace(regex, `<span class="highlight">${match}</span>`);
}

function toggleVoiceRecognition() {
    // Implementação similar à anterior
}

function loadHistory() {
    historyItems.innerHTML = searchHistory.map((item, index) => `
        <div class="history-item" data-index="${index}">
            <div class="history-query">${item.query.substring(0, 50)}${item.query.length > 50 ? '...' : ''}</div>
            <div class="history-date">${new Date(item.date).toLocaleString()}</div>
        </div>
    `).join('');
    
    document.querySelectorAll('.history-item').forEach(item => {
        item.addEventListener('click', () => {
            const historyItem = searchHistory[item.dataset.index];
            symptomsInput.value = historyItem.query;
            suggestionPanel.classList.add('hidden');
            historyPanel.classList.add('hidden');
        });
    });
}

function clearHistory() {
    if (confirm('Tem certeza que deseja limpar todo o histórico?')) {
        searchHistory = [];
        localStorage.setItem('symptomHistory', JSON.stringify(searchHistory));
        historyPanel.classList.add('hidden');
    }
}

// Ao enviar a análise
analyzeBtn.addEventListener('click', () => {
    const query = symptomsInput.value.trim();
    if (query) {
        // Adiciona ao histórico
        searchHistory.unshift({
            query,
            date: new Date().toISOString()
        });
        
        // Limita a 10 itens no histórico
        searchHistory = searchHistory.slice(0, 10);
        
        // Salva no localStorage
        localStorage.setItem('symptomHistory', JSON.stringify(searchHistory));
        
        // Processa a análise (implementar sua lógica)
        processAnalysis(query);
    }
});

function processAnalysis(query) {
    // Sua lógica de análise aqui
    console.log("Analisando:", query);
}