import React from 'react';

import Routes from './src/routes';
import { WordProvider } from './src/context/WordContext';

export default function App() {
  return (
    <WordProvider>
      <Routes />
    </WordProvider>
  );
}
