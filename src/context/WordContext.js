import React, { createContext, useState, useContext } from 'react';

// Criando contexto para armazenar as informações das palavras
const WordContext = createContext();

// Criando hook personalizado para acessar o contexto
export const useWordContext = () => {
  return useContext(WordContext);
};

// Criando o provedor de contexto
export const WordProvider = ({ children }) => {
  const [visitedWords, setVisitedWords] = useState([]);

  // Função para adicionar uma palavra à lista de palavras visitadas
  const addVisitedWord = (word) => {
    setVisitedWords((prevVisitedWords) => [...prevVisitedWords, word]);
  };

  return (
    <WordContext.Provider value={{ visitedWords, addVisitedWord }}>
      {children}
    </WordContext.Provider>
  );
};
