import React from 'react';
import Cards from './Cards';
import { Header, ThemeProvider } from 'react-native-elements';

export default function App() {
  return (
    <ThemeProvider>
      <Header
        centerComponent={{ text: 'Magic Cards', style: { color: '#fff' } }}
      />
      <Cards />
    </ThemeProvider>
  );
}
