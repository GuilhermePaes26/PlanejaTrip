import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import MinhasViagens from './components/MinhasViagens'
// import Viagens from './components/viagens.js'
// import Home from './components/home';

import Rotas from './components/Rotas';

// const route = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>

        <Rotas/>

    </NavigationContainer>
  );
}
