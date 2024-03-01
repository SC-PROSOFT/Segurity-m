import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

/* views */
import {Login, Home} from '../views';

/* components */
import {Menu_} from '../components';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'Iniciar sesion',
            headerTitleAlign: 'center',
            headerShown: false,
          }}></Stack.Screen>

        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: true,
            title: 'Contraseña',
            headerTitle: 'Autenticación Prosoft',
            headerTitleAlign: 'left',
            headerStyle: {
              backgroundColor: '#365AC3',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 24,
            },
            headerRight: () => <Menu_ />,
          }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
