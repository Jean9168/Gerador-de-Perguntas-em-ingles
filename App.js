import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

// Lista de exercícios
const exercicios = [
  { pergunta: 'Como se diz "gato" em inglês?', resposta: 'cat' },
  { pergunta: 'Como se diz "cachorro" em inglês?', resposta: 'dog' },
  { pergunta: 'Como se diz "carro" em inglês?', resposta: 'car' },
  { pergunta: 'Como se diz "casa" em inglês?', resposta: 'house' },
  { pergunta: 'Como se diz "escola" em inglês?', resposta: 'school' },
  { pergunta: 'Como se diz "maçã" em inglês?', resposta: 'apple' },
  { pergunta: 'Como se diz "livro" em inglês?', resposta: 'book' },
  { pergunta: 'Como se diz "mesa" em inglês?', resposta: 'table' },
  { pergunta: 'Como se diz "cadeira" em inglês?', resposta: 'chair' },
  { pergunta: 'Como se diz "sol" em inglês?', resposta: 'sun' },
];

const App = () => {
  const [indice, setIndice] = useState(0); // Índice do exercício atual
  const [resposta, setResposta] = useState(''); // Resposta do usuário
  const [pontos, setPontos] = useState(0); // Pontuação do usuário
  const [tempoRestante, setTempoRestante] = useState(15); // Tempo restante para a pergunta
  const [dificuldade, setDificuldade] = useState('fácil'); // Nível de dificuldade
  const [tempoPorPergunta, setTempoPorPergunta] = useState(15); // Tempo baseado na dificuldade
  const [jogoIniciado, setJogoIniciado] = useState(false); // Estado do início do jogo

  useEffect(() => {
    // Atualiza o temporizador a cada segundo
    if (tempoRestante > 0) {
      const timer = setTimeout(() => {
        setTempoRestante(tempoRestante - 1);
      }, 1000);

      return () => clearTimeout(timer); // Limpa o temporizador ao desmontar
    } else {
      Alert.alert(
        'Tempo Esgotado!',
        `A resposta correta era "${exercicios[indice].resposta}".`
      );
      passarParaProximaPergunta();
    }
  }, [tempoRestante]);

  const verificarResposta = () => {
    const respostaCorreta = exercicios[indice].resposta.toLowerCase().trim();
    if (resposta.toLowerCase().trim() === respostaCorreta) {
      Alert.alert('Correto!', 'Você acertou!');
      setPontos(pontos + 1);
    } else {
      Alert.alert(
        'Errado!',
        `A resposta correta era "${respostaCorreta}".`
      );
    }
    passarParaProximaPergunta();
  };

  const passarParaProximaPergunta = () => {
    setResposta('');
    if (indice < exercicios.length - 1) {
      setIndice(indice + 1);
      setTempoRestante(10); // Reinicia o temporizador
    } else {
      Alert.alert('Fim do Jogo', `Você marcou ${pontos} ponto(s)!`);
      setIndice(0);
      setPontos(0);
      setTempoRestante(10); // Reinicia o temporizador
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pergunta}>
        {exercicios[indice].pergunta}
      </Text>
      <Text style={styles.tempo}>
        Tempo restante: {tempoRestante} segundos
      </Text>
      <TextInput
        style={styles.input}
        value={resposta}
        onChangeText={setResposta}
        placeholder="Sua resposta"
      />
      <Button title="Verificar" onPress={verificarResposta} />
      <Text style={styles.pontos}>Pontuação: {pontos}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f8ff',
  },
  pergunta: {
    fontSize: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
  tempo: {
    fontSize: 16,
    color: 'red',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    width: '80%',
    paddingHorizontal: 8,
    marginBottom: 16,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  pontos: {
    marginTop: 16,
    fontSize: 18,
    color: '#333',
  },
});

export default App;
