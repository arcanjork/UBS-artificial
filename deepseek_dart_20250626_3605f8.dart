import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class FirebaseService {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  // Autenticação anônima
  Future<void> anonymousLogin() async {
    await _auth.signInAnonymously();
  }

  // Salvar dados de triagem
  Future<void> saveTriageData(Map<String, dynamic> data) async {
    await _firestore.collection('triages').add(data);
  }
}