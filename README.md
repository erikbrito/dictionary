# Dictionary App

O projeto é uma aplicação React Native que permite aos usuários pesquisar definições de palavras e salvar suas palavras favoritas em uma lista. Ele também fornece funcionalidades para reproduzir a pronúncia de palavras, manter um histórico de palavras pesquisadas e gerenciar uma lista de palavras favoritas.

### Tabela de Conteúdo

- [Recursos](#recursos)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré Requitos](#pré-requisitos)
  - [Configuração do Projeto](#configuração-do-projeto)
  - [Executando o Aplicativo](#executando-o-aplicativo)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Gerenciamento de Dados](#gerenciamento-de-dados)
- [Uso](#uso)

## Recursos

- Pesquisar definições de palavras.
- Reproduzir a pronúncia de palavras (se disponível).
- Salvar palavras em uma lista de histórico.
- Gerenciar uma lista de palavras favoritas.
- Limpar histórico de pesquisa.
- Limpar lista de palavras favoritas.

## Tecnologias Utilizadas

- React Native
- Metro bundler (v0.76.8)
- React Navigation
- Axios
- AsyncStorage
- Context Api
- React Native Vector Icons
- React Native Sound Player
  
## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

- Node.js: [Download Node.js](https://nodejs.org/)
- npm (gerenciador de pacotes Node.js): Normalmente, já é instalado junto com o Node.js.
- React Native CLI: Execute o seguinte comando para instalar globalmente o React Native CLI:

  ```shell
  npm install -g react-native-cli
  ```

- Xcode (apenas para desenvolvimento iOS): [Download Xcode](https://developer.apple.com/xcode/)
- Android Studio (apenas para desenvolvimento Android): [Download Android Studio](https://developer.android.com/studio)

## Configuração do Projeto

1. Clone este repositório em sua máquina local:

   ```shell
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   ```

2. Navegue até o diretório do projeto:

   ```shell
   cd nome-do-repositorio
   ```

3. Instale as dependências do projeto:

   ```shell
   npm install ou yarn install
   ```

## Executando o Aplicativo

Siga as instruções apropriadas para executar o aplicativo em um dispositivo Android ou iOS.

### Para Android:

1. Certifique-se de ter um emulador Android configurado ou um dispositivo Android conectado via USB.
2. Execute o aplicativo com o comando:

   ```shell
   npx react-native run-android
   ```

### Para iOS:

1. Certifique-se de ter o Xcode instalado.
2. Execute o aplicativo com o comando:

   ```shell
   npx react-native run-ios
   ```

Abra o aplicativo em um emulador ou dispositivo físico.

## Observações

É importante observar que o bundler javascript Metro para o React Native está na versão v0.76.8 e talvez ao executar esse projeto ele carregue o aplicativo de forma extremamente lenta podendo demorar mais de 1 min para abrir o aplicativo.

## Estrutura do Projeto

A estrutura de diretórios do projeto é a seguinte:

- `src`: Contém os componentes e telas do aplicativo.
  - `api`: Arquivos JSON contendo palavras para exibição.
  - `context`: Contextos para gerenciamento de estados globais.
  - `screens`: Telas do aplicativo.
- `routes`: Rotas de navegação entre as telas do aplicativo.

```
projeto/
  ├── src/
  │   ├── api/
  │   │   ├── WordsData1.json
  │   │   ├── WordsData2.json
  │   │   ├── WordsData3.json
  │   │   └── WordsData4.json
  │   ├── context/
  │   │   └── WordContext.js
  │   ├── screens/
  │   │   ├── FavoritesScreen.js
  │   │   ├── HistoryScreen.js
  │   │   ├── HomeScreen.js
  │   │   ├── InfoScreen.js
  │   │   └── WordListScreen.js
  ├── Routes.js
  ├── App.js
  ├── README.md
  ├── package.json
  └── ...
```

Claro, aqui está uma versão aprimorada da seção "Gerenciamento de Dados" no seu README:

## Gerenciamento de Dados

O aplicativo utiliza duas abordagens para o gerenciamento de dados:

### 1. AsyncStorage

O AsyncStorage é utilizado para armazenar informações, como as palavras favoritas do usuário. Essa escolha de armazenamento persistente permite aos usuários acessarem seu histórico de palavras favoritas, mesmo após fecharem o aplicativo ou desligarem o dispositivo. Isso proporciona uma experiência contínua e personalizada, permitindo que os usuários mantenham um registro das palavras que consideram importantes.

### 2. Context API

O aplicativo também faz uso da Context API para o armazenamento temporário das palavras pesquisadas. Isso permite aos usuários acessar seu histórico de palavras pesquisadas apenas enquanto o aplicativo estiver em execução. Quando o aplicativo é fechado, o histórico de pesquisa é mantido apenas durante a sessão atual. Essa abordagem é ideal para oferecer aos usuários uma visão rápida de suas pesquisas recentes enquanto eles exploram e interagem com o aplicativo.

Juntas, essas duas estratégias de gerenciamento de dados proporcionam uma experiência de usuário completa, com a capacidade de manter um histórico de palavras pesquisadas e favoritas, ao mesmo tempo em que oferecem um desempenho eficiente no armazenamento de informações temporárias e permanentes.

## Uso

### Tela Inicial

- Na tela inicial, você verá três abas: "Word List", "History" e "Favorites".
- Clique em "Word List" para ver uma lista de palavras.
- Clique em uma palavra para ver a definição e a pronúncia (se disponível).
- Você pode favoritar uma palavra na tela de definição.
- Na aba "History", você pode ver seu histórico de palavras pesquisadas.
- Na aba "Favorites", você pode gerenciar sua lista de palavras favoritas.

### Tela de Definição (Info)

- Na tela de definição, você verá a palavra, a pronúncia e a definição (se disponível).
- Você pode reproduzir a pronúncia da palavra clicando no ícone "play" (se disponível).
- Você pode navegar entre diferentes palavras usando os botões "Voltar" e "Avançar".
- Você pode voltar para a tela inicial clicando no ícone "X".

### Tela de Histórico (History)

- Na tela de histórico, você verá uma lista das palavras pesquisadas.
- Você pode favoritar ou desfavoritar palavras nesta tela.

### Tela de Favoritos (Favorites)

- Na tela de favoritos, você verá uma lista das palavras favoritas.
- Você pode remover palavras da lista de favoritos ou limpar toda a lista.


>  This is a challenge by [Coodesh](https://coodesh.com/)
