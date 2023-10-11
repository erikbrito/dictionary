import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SoundPlayer from 'react-native-sound-player'
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'

const MeaningScreen = ({ route }) => {
  // Extrai os parâmetros da rota
  const { response } = route.params;
  const totalPages = response.length;

  const navigation = useNavigation();

  const [currentPage, setCurrentPage] = useState(0);
  const [word, setWord] = useState([])

  const [isPlaying, setIsPlaying] = useState(false);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioPosition, setAudioPosition] = useState(0);

  // Função para retornar à tela inicial
  const handleExit = () => {
    navigation.navigate('HomeScreen');
  }

  // Botão para retornar para o significado anterior
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Botão para abrir o proximo significado
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
   
  // Quando o componente for montado tratar os dados
  useEffect(() => {
    setWord([
      {
        'word': response[currentPage].word,
        'phonetic': response[currentPage]?.phonetic,
        'audio': response[currentPage]?.phonetics?.find(a => a?.audio),
        'meaning': response[currentPage]?.meanings?.map(m => `${m.partOfSpeech} - ${m.definitions[0]?.definition}`)
      }
    ])
  }, [response, currentPage])
  
  // Função para reproduzir o áudio da palavra
  const playSong = () => {
    try {
      SoundPlayer.playUrl(word[0]?.audio?.audio)
      setIsPlaying(true)
    } catch (e) {
      alert('Cannot play the file')
      console.log('cannot play the song file', e)
    }
  }
  
  // Função para pausar a reprodução do áudio
  const pauseSong = () => {
    SoundPlayer.pause()
    setIsPlaying(false)
  }

  useEffect(() => {
    // Atualiza a posição e duração do áudio a cada segundo
    let timer = setTimeout(() => loadCurrentTIme(), 1000);

    return function cleanUP() {
      clearInterval(timer)
    }
  })

  // Função para carregar a posição atual do áudio e a duração do áudio
  const loadCurrentTIme = useCallback(() => {
    if (isPlaying){
      SoundPlayer
        .getInfo()
        .then(info => {setAudioPosition(info.currentTime), setAudioDuration(info.duration)})
        .catch(error => console.error(error));

        if (audioPosition === audioDuration) {
          setIsPlaying(false)
        }
    } else {
      setAudioPosition(0)
      setAudioDuration(0)
    }
  },[isPlaying])

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.exit} onPress={handleExit}>
        <Icon name="times" size={30} solid style={styles.exitButtonText}/>
      </TouchableOpacity>

      <View style={styles.body}>

        <View style={styles.card}>
          <Text style={styles.textCard}>{JSON.stringify(word[0]?.word, null, 2)}</Text>
          <Text style={styles.textCard}>{JSON.stringify(word[0]?.phonetic, null, 2)}</Text>
        </View>

        <View style={styles.audioContent}>
          {
            word[0]?.audio?.audio && (
              <>
                {
                  isPlaying ? (
                    <TouchableOpacity onPress={() => pauseSong()}>
                      <Icon name="pause" size={30} solid style={styles.audioButton}/>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => playSong()}>
                      <Icon name="play" size={30} solid style={styles.audioButton}/>
                    </TouchableOpacity>
                  )
                }
              
                <Slider
                  style={styles.audioSlider}
                  minimumValue={0}
                  maximumValue={audioDuration}
                  value={audioPosition}
                  minimumTrackTintColor="#007AFF"
                  maximumTrackTintColor="#000000"
                />
              </>
              
            )
          }
        </View>
        
        <View style={styles.meaningContent}>
          <Text style={styles.textTitle}>Meanings</Text>
          <Text style={styles.textMeaning}>{JSON.stringify(word[0]?.meaning[0], null, 2)}</Text>
        </View>

        <View style={styles.pageButtons}>
          <TouchableOpacity style={styles.button} onPress={handlePreviousPage}>
            <Text style={styles.pageButtonText}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleNextPage}>
            <Text style={styles.pageButtonText}>Avançar</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  exitButtonText: {
    fontSize: 25,
    margin: 16
  },
  card: {
    backgroundColor: '#e6d0de',
    borderRadius: 8,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    width: '95%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCard: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  audioContent: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 15,
    padding: 20
  },
  audioButton: {
    margin: 5,
  },
  audioSlider: {
    width: '95%',
  },
  textTitle: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  meaningContent: {},
  textTitle: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  textMeaning: {
    fontSize: 17,
    fontWeight: 'bold'
  },
  pageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    borderWidth: 1,
    width: 170,
    height: 50,
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pageButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default MeaningScreen;
