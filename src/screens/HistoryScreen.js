import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useWordContext } from '../context/WordContext';

const HistoryScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false);

  const { visitedWords } = useWordContext();

  // Função para verificar se uma palavra está favoritada
  const isWordFavorited = (word) => {
    return favorites.includes(word);
  };

  // Função para adicionar ou remover palavra dos favoritos
  const handleFavorite = async (word) => {
    try {
      if (isWordFavorited(word)) {
        // Remova a palavra da lista de favoritos
        const updatedFavorites = favorites.filter((favWord) => favWord !== word);
        await AsyncStorage.setItem('favoriteWords', JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
      } else {
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

  useFocusEffect(
    useCallback(() => {
      // Carregua a lista de palavras favoritadas do AsyncStorage quando o componente for montado
      const loadFavoriteWords = async () => {
        try {
          const favoriteWordsJSON = await AsyncStorage.getItem('favoriteWords');
          if (favoriteWordsJSON) {
            const parsedFavoriteWords = JSON.parse(favoriteWordsJSON);
            setFavorites(parsedFavoriteWords);
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
      <Text style={styles.title}>Histórico de Palavras Salvas</Text>
      <FlatList
        data={visitedWords}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.wordItem}>
            <Text style={styles.text}>{item}</Text>

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
  wordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 18,
  },
  favoriteButtonText: {
    fontSize: 18,
  },
});

export default HistoryScreen;
