class AIService {
  // Mock de análise de sintomas - substituir por API real
  Future<String> analyzeSymptoms(String symptoms) async {
    await Future.delayed(const Duration(seconds: 1)); // Simula processamento
    
    // TODO: Substituir por chamada HTTP para Hugging Face/MedAlpaca
    if (symptoms.toLowerCase().contains('febre') && 
        symptoms.toLowerCase().contains('tosse')) {
      return 'Possível quadro viral. Recomenda-se repouso e hidratação.';
    }
    
    return 'Procure uma unidade de saúde para avaliação.';
  }
}