import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './paginas/Login';
import Home from './paginas/Home';
import CalendarScreen from './paginas/CalendarScreen';
import MapScreen from './paginas/MapScreen';
import ClockScreen from './paginas/ClockScreen';
import Tarefas from './paginas/Tarefas';
import Doc from './paginas/Doc';
import Works from './paginas/Works'; // Página para "Obras"
import Workers from './paginas/Workers'; // Página para "Funcionários"
import CadastroObras from './paginas/CadastroObras'; // Página para "Cadastro de Obras"

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: true, title: 'Home' }}
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
          name="Tarefas"
          component={Tarefas}
          options={{ headerShown: false, title: 'Tarefas' }}
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
  );
};

export default App;
