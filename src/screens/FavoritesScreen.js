import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesScreen = () => {
  const [favoriteWords, setFavoriteWords] = useState([]);

  // Função para remover uma palavra da lista dos favoritos
  const removeFavoriteWord = async (wordToRemove) => {
    try {
      const updatedFavorites = favoriteWords.filter((word) => word !== wordToRemove);
      setFavoriteWords(updatedFavorites);
      await AsyncStorage.setItem('favoriteWords', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Erro ao remover palavra favoritada:', error);
    }
  };

  // Função para limpar toda a lista de favoritos
  const clearFavorites = async () => {
    try {
      setFavoriteWords([]);
      await AsyncStorage.removeItem('favoriteWords');
    } catch (error) {
      console.error('Erro ao limpar lista de favoritos:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      // Carregue a lista de palavras favoritadas quando o componente for montado
      const loadFavoriteWords = async () => {
        try {
          const favoriteWordsJSON = await AsyncStorage.getItem('favoriteWords');
          if (favoriteWordsJSON) {
            const parsedFavoriteWords = JSON.parse(favoriteWordsJSON);
            setFavoriteWords(parsedFavoriteWords);
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
      <Text style={styles.title}>Palavras Favoritadas</Text>
      <FlatList
        data={favoriteWords}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.wordItem}>
            <Text style={styles.text}>{item}</Text>

            <TouchableOpacity onPress={() => removeFavoriteWord(item)}>
              <Text style={styles.removeButton}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View>
        <TouchableOpacity style={styles.button} onPress={clearFavorites}>
          <Text style={styles.buttonText}>Limpar Lista</Text>
        </TouchableOpacity>
      </View>

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
  removeButton: {
    fontSize: 18,
  },
  button: {
    alignSelf: 'center',
    borderWidth: 1,
    width: 170,
    height: 50,
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 'auto'
  },
});

export default FavoritesScreen;
