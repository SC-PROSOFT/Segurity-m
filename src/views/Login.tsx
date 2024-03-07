import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
/* components */
import {Input_, Button_} from '../components';
/* context */
import {infoAlertContext} from '../context';
/* local_database */
import {asesoresService} from '../queries/local_database/services';
/* interfaces */
interface userInfo {
  user: string;
  password: string;
}

const Form: React.FC<any> = ({
  inputs,
  handleInputChange,
  toggleLoginButton,
}) => {
  const {user, password} = inputs;

  const formStyles = StyleSheet.create({
    formContainer: {},
    rememberAccountContainer: {
      flexDirection: 'row',
    },
    rememberAccountText: {
      color: '#000',
    },
  });

  return (
    <View style={formStyles.formContainer}>
      <Input_
        value={user}
        label="Usuario"
        name="user"
        mode="outlined"
        keyboardType="default"
        handleInputChange={handleInputChange}
      />

      <Input_
        value={password}
        label="Contrasena"
        name="password"
        password={true}
        handleInputChange={handleInputChange}
      />
      <View style={{marginTop: 15}}>
        <Button_
          value="Iniciar sesion"
          pressNormalButton={toggleLoginButton}
          colorButton="#445FB3"
        />
      </View>
    </View>
  );
};

const Login: React.FC = () => {
  const navigation: any = useNavigation();

  const {showInfoAlert} = infoAlertContext();

  const [inputs, setInputs] = useState({
    user: '',
    password: '',
  });

  /* procedure */
  const handleInputChange = (name: string, text: string) => {
    setInputs(prevState => ({...prevState, [name]: text}));
  };

  const toggleLoginButton = async () => {
    login({user: inputs.user, password: inputs.password});
  };

  const login = async ({user, password}: userInfo) => {
    if (user == '99' && password == '641218') {
      navigation.replace('Home');
    } else {
      showInfoAlert({
        visible: true,
        type: 'error',
        description: 'Usuario o contraseña invalidos',
      });
    }
  };

  const loginStyles = StyleSheet.create({
    container: {
      backgroundColor: '#E9ECF5',
      flex: 1,
    },
    pensadorContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '35%',
    },
    titleContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 40,
      height: '10%',
    },
    formContainer: {
      width: '100%',
      height: '45%',

      paddingHorizontal: 20,
    },
    footerContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      height: '30%',
      paddingBottom: 3,
    },
    pensadorBorder: {
      backgroundColor: '#FDFDFD',
      width: 150,
      height: 200,
      borderRadius: 10,
      elevation: 5,
    },
    pensador: {
      width: '100%',
      height: '100%',
    },

    title1: {
      fontWeight: 'bold',
      color: '#303134',
      fontSize: 26,
    },
    title2: {
      fontWeight: 'bold',
      color: '#445FB3',
      fontSize: 28,
      marginLeft: 7,
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <SafeAreaView style={loginStyles.container}>
        <View style={loginStyles.titleContainer}>
          <Text style={loginStyles.title2}>Autenticación Prosoft</Text>
        </View>

        <View style={loginStyles.formContainer}>
          <Form
            inputs={inputs}
            handleInputChange={handleInputChange}
            toggleLoginButton={toggleLoginButton}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export {Login};
