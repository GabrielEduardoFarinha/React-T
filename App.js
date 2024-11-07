import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './paginas/Login';
import Home from './paginas/Home';
import CalendarScreen from './paginas/CalendarScreen';
import MapScreen from './paginas/MapScreen';
import ClockScreen from './paginas/ClockScreen';
import CadastroObras from './paginas/CadastroObras.js';
import Works from './paginas/Works.js';
import Workers from './paginas/Workers.js';
import Doc from './paginas/Doc.js';
import DatabaseProvider from './database/DatabaseProvider';

const Stack = createStackNavigator();

const App = () => {
  return (
    <DatabaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: true, title: 'P&G' }}
          />
          <Stack.Screen
            name="Works"
            component={Works}
            options={{ headerShown: true, title: 'Obras' }}
          />
          <Stack.Screen
            name="Workers"
            component={Workers}
            options={{ headerShown: true, title: 'Funcionários' }}
          />
          <Stack.Screen
            name="Calendar"
            component={CalendarScreen}
            options={{ headerShown: true, title: 'Calendar' }}
          />
          <Stack.Screen
            name="Map"
            component={MapScreen}
            options={{ headerShown: true, title: 'Map' }}
          />
          <Stack.Screen
            name="Clock"
            component={ClockScreen}
            options={{ headerShown: true, title: 'Clock' }}
          />
          <Stack.Screen
            name="Doc"
            component={Doc}
            options={{ headerShown: false, title: 'Documentação' }}
          />
          <Stack.Screen
            name="CadastroObras"
            component={CadastroObras}
            options={{ headerShown: true, title: 'Cadastro de Obras' }}
          />
          
          
        </Stack.Navigator>
      </NavigationContainer>
    </DatabaseProvider>
  );
};

export default App;
