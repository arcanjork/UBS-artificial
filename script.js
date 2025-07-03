class VoiceRecognition {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.init();
    }

    init() {
        if ('webkitSpeechRecognition' in window) {
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'pt-BR';

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                document.getElementById('symptoms-input').value = transcript;
                this.toggleListening();
            };

            this.recognition.onerror = (event) => {
                console.error('Erro no reconhecimento:', event.error);
                this.toggleListening();
            };
        }
    }

    toggleListening() {
        if (!this.recognition) {
            alert('Recurso de voz não disponível no seu navegador');
            return;
        }

        this.isListening = !this.isListening;
        const voiceBtn = document.getElementById('voice-search-btn');
        
        if (this.isListening) {
            this.recognition.start();
            voiceBtn.classList.add('active', 'pulse-animation');
            voiceBtn.innerHTML = '<i class="fas fa-microphone-slash"></i>';
        } else {
            this.recognition.stop();
            voiceBtn.classList.remove('active', 'pulse-animation');
            voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        }
    }
}

// Uso:
const voiceRecognition = new VoiceRecognition();
document.getElementById('voice-search-btn').addEventListener('click', () => {
    voiceRecognition.toggleListening();
});