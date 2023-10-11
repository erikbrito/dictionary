import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';

import { useWordContext } from '../context/WordContext';

const HistoryScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false);

  const { visitedWords } = useWordContext();

  const navigation = useNavigation();

  // Função para verificar se uma palavra está favoritada
  const isWordFavorited = (word) => {
    return favorites.includes(word);
  };

  // Função para adicionar ou remover palavra dos favoritos
  const handleFavorite = async (word) => {
    try {
      if (isWordFavorited(word)) {
        console.log('1')
        console.log(favorites)
        // Remova a palavra da lista de favoritos
        const updatedFavorites = favorites.filter((favWord) => favWord !== word);
        await AsyncStorage.setItem('favoriteWords', JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
      } else {
        console.log('2')
        // Adicione a palavra à lista de favoritos
        const updatedFavorites = [...favorites, word];
        await AsyncStorage.setItem('favoriteWords', JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
      }

      setIsFavorited(!isFavorited);
    } catch (error) {
      console.error('Erro ao favoritar palavra:', error);
    }
  };
  
  // Função para acessar a tela com o significado da palavra selecionada
  const handleMeaning = async (word) => {
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
  
      navigation.navigate('MeaningScreen', { response: response.data });
    } catch (error) {
      Alert.alert('Erro', 'Erro ao buscar definição da palavra', [{ text: 'OK'}]);
    }
  };

  console.log(favorites)

  useFocusEffect(
    useCallback(() => {
      // Carregua a lista de palavras favoritadas do AsyncStorage quando o componente for montado
      const loadFavoriteWords = async () => {
        try {
          console.log('3')
          const favoriteWordsJSON = await AsyncStorage.getItem('favoriteWords');
          setFavorites([])
          if (favoriteWordsJSON) {
            const parsedFavoriteWords = JSON.parse(favoriteWordsJSON);
            setFavorites(parsedFavoriteWords);
            console.log('4')
          }
        } catch (error) {
          console.error('Erro ao carregar palavras favoritadas:', error);
        }
      };

      loadFavoriteWords();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Palavras Visitadas</Text>
      <FlatList
        data={visitedWords}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <TouchableOpacity style={styles.wordItem} onPress={() => handleMeaning(item)}>
              <Text style={styles.text}>{item}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleFavorite(item)}>
              <Text style={styles.favoriteButtonText}>
                {isWordFavorited(item) ? 'Remover' : 'Favoritar'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  wordItem: {
    width: 300,
  },
  text: {
    fontSize: 18,
  },
  favoriteButtonText: {
    fontSize: 18,
  },
});

export default HistoryScreen;
