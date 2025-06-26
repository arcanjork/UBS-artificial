import 'package:flutter/material.dart';

class TriageScreen extends StatefulWidget {
  const TriageScreen({super.key});

  @override
  State<TriageScreen> createState() => _TriageScreenState();
}

class _TriageScreenState extends State<TriageScreen> {
  final _formKey = GlobalKey<FormState>();
  final _symptomsController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Triagem de Sintomas')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                controller: _symptomsController,
                decoration: const InputDecoration(
                  labelText: 'Descreva seus sintomas',
                  border: OutlineInputBorder(),
                ),
                maxLines: 3,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Por favor, descreva seus sintomas';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: _analyzeSymptoms,
                child: const Text('Analisar Sintomas'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _analyzeSymptoms() {
    if (_formKey.currentState!.validate()) {
      // TODO: Integrar com IA
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => ResultsScreen(
            symptoms: _symptomsController.text,
          ),
        ),
      );
    }
  }
}