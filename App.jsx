import React from 'react';
import {StatusBar} from 'react-native';
import Navigation from './src/Navigation';
import {AppProvider} from './src/components/AppContext';

export default function App() {
  return (
    <AppProvider>
      <StatusBar />
      <Navigation />
    </AppProvider>
  );
}
