import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';

const FavoritesScreen = () => {
  const [favoriteWords, setFavoriteWords] = useState([]);

  const navigation = useNavigation();

  // Função para acessar a tela com o significado da palavra selecionada
  const handleMeaning = async (word) => {
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
  
      navigation.navigate('MeaningScreen', { response: response.data });
    } catch (error) {
      Alert.alert('Erro', 'Erro ao buscar definição da palavra', [{ text: 'OK'}]);
    }
  };

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
          <View style={styles.row}>
            <TouchableOpacity style={styles.wordItem} onPress={() => handleMeaning(item)}>
              <Text style={styles.text}>{item}</Text>
            </TouchableOpacity>

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
