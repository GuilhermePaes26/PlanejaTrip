import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Rotas from './components/Rotas';

// const route = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>

        <Rotas/>

    </NavigationContainer>
  );
}
