import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';

import wordsData1 from '../api/wordsData1.json';
import wordsData2 from '../api/wordsData2.json';
import wordsData3 from '../api/wordsData3.json';
import wordsData4 from '../api/wordsData4.json';

import { useWordContext } from '../context/WordContext';

const WordListScreen = React.memo(() => {
  const [data, setData] = useState([]);
  const [currentWordsData, setCurrentWordsData] = useState(wordsData1);
  const [selectedWords, setSelectedWords] = useState([]);

  // instanciando navigation
  const navigation = useNavigation();

  // Contexto para adicionar palavras visitadas
  const { addVisitedWord } = useWordContext();

  // Carrega as primeiras palavras da lista de dados
  useEffect(() => {
    const initialData = Object.keys(currentWordsData)
      .slice(0, 24)
      .map((key) => ({ id: key, word: key }));
    setData(initialData);
  }, []);

  // carregamento de mais palavras
  const loadMoreData = () => {
    const startIndex = data.length;
    const endIndex = startIndex + 9;

    if (startIndex < Object.keys(currentWordsData).length) {
      const newData = Object.keys(currentWordsData)
        .slice(startIndex, endIndex)
        .map((key) => ({ id: key, word: key }));
      setData([...data, ...newData]);
    } else {
      if (currentWordsData === wordsData1) {
        setCurrentWordsData(wordsData2);
      } else if (currentWordsData === wordsData2) {
        setCurrentWordsData(wordsData3);
      } else if (currentWordsData === wordsData3) {
        setCurrentWordsData(wordsData4);
      }
    }
  };

  // Função para lidar com o clique em uma palavra
  const handleWordClick = async (word) => {
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

      // Verifica se a palavra não está na lista de selecionadas e se a resposta foi bem-sucedida
      if (!selectedWords.includes(word) && response.status === 200) {
        const updatedSelectedWords = [...selectedWords, word];
        setSelectedWords(updatedSelectedWords);
        
        // adiciona a nova palvra pesquisada ao context
        addVisitedWord(word);
      }
      
      // redireciona para tela com o significado da palavra
      navigation.navigate('MeaningScreen', { response: response.data });
    } catch (error) {
      Alert.alert('Erro', 'Erro ao buscar definição da palavra', [{ text: 'OK'}]);
    }
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}> Word List </Text>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleWordClick(item.word)}>
              <View style={styles.card}>
                <Text style={styles.cardText}>{item.word}</Text>
              </View>
            </TouchableOpacity>
          )}
          numColumns={3}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.1}
        />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
    alignSelf: 'flex-start',
  },
  card: {
    flex: 1,
    width: 125,
    padding: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    fontSize: 16,
  }
});

export default WordListScreen;
