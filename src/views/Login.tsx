import React, {useState, useEffect} from 'react';
import DeviceInfo from 'react-native-device-info';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  View,
  Text,
  StyleSheet,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
/* components */
import {Input_, Button_, DirectionIpConfig} from '../components';
/* context */
import {infoAlertContext} from '../context';
/* local_database */
import {asesoresService} from '../queries/local_database/services';
/* redux hooks */
import {useAppSelector, useAppDispatch} from '../redux/hooks';
/* redux slices */
import {setObjAsesor, setObjDirectionIpConfig} from '../redux/slices';
/* dimensiones */
const windowWidth = Dimensions.get('window').width;
const scale = windowWidth / 375;
/* interfaces */
interface FooterProps {
  appVersion: string;
}
interface userInfo {
  id: number;
  contrasena: string;
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
      <View>
        <Input_
          value={user}
          label="Operador"
          name="user"
          mode="outlined"
          keyboardType="default"
          icon="account"
          handleInputChange={handleInputChange}
        />
      </View>

      <View style={{marginTop: 5}}>
        <Input_
          value={password}
          label="Contrasena"
          name="password"
          mode="outlined"
          password={true}
          icon="lock"
          handleInputChange={handleInputChange}
        />
      </View>

      <View style={{marginTop: 15}}>
        <Button_
          value="Iniciar sesion"
          pressNormalButton={toggleLoginButton}
          colorButton="#394D80"
        />
      </View>
    </View>
  );
};

const Footer: React.FC<FooterProps> = ({appVersion}) => {
  const footerStyles = StyleSheet.create({
    footerText: {
      color: '#394D80',
      fontSize: 15,
    },
  });

  return (
    <>
      <Text style={footerStyles.footerText}>
        © 2024 PROSOFT Versión {appVersion}
      </Text>
    </>
  );
};

const Login: React.FC = () => {
  const dispatch = useAppDispatch();

  const navigation: any = useNavigation();

  const {showInfoAlert} = infoAlertContext();

  const [inputs, setInputs] = useState({
    user: '',
    password: '',
  });
  const [appVersion, setAppVersion] = useState('');
  const [showLogo, setShowLogo] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);

  /* procedure */
  useEffect(() => {
    fetchAppVersion();
    adjustScreenSize();
  });

  const handleInputChange = (name: string, text: string) => {
    setInputs(prevState => ({...prevState, [name]: text}));
  };

  const toggleLoginButton = async () => {
    login({id: Number(inputs.user), contrasena: inputs.password});
  };

  const login = async ({id, contrasena}: userInfo) => {
    try {
      const tryLogin = await asesoresService.Login(id, contrasena);

      const todos = await asesoresService.getAll();

      console.log('todos', todos)

      const encontrado = todos.find(elem => elem.id == id);

      if (tryLogin.login && tryLogin.estado == 'N') {
        return showInfoAlert({
          visible: true,
          type: 'info',
          description:
            'Operador inactivo. Solicita la activacion al equipo de PROSOFT.',
        });
      }

      if (tryLogin.login && tryLogin.estado == 'S') {
        dispatch(setObjAsesor({id}));
        navigation.replace('Home');
      } else {
        showInfoAlert({
          visible: true,
          type: 'info',
          description: 'Usuario o contraseña invalidos.',
        });
      }
    } catch (error) {
      showInfoAlert({
        visible: true,
        type: 'error',
        description:
          'Error En el inicio de sesion, contacta al equipo de desarrollo',
      });
    }
  };

  const fetchAppVersion = () => {
    const version = DeviceInfo.getVersion();
    setAppVersion(version);
  };

  const adjustScreenSize = () => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setShowLogo(false);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setShowLogo(true);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  };

  const hideDirectionIpConfig = () => {
    setVisible(false);
  };

  const saveDirectionIpConfig = ({ip, port}: {ip: string; port: string}) => {
    dispatch(setObjDirectionIpConfig({ip, port}));

    hideDirectionIpConfig();
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
      height: '40%',
    },
    titleContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: showLogo ? 0 : 0,
      height: showLogo ? '5%' : '15%',
    },
    formContainer: {
      width: '100%',
      height: '40%',
      paddingHorizontal: 20,
    },
    footerContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      height: showLogo ? '15%' : '38%',
      paddingBottom: 3,
    },
    pensadorBorder: {
      backgroundColor: '#FDFDFD',
      width: 150,
      height: 200 * scale,
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
      fontSize: 18 * scale,
    },
    title2: {
      fontWeight: 'bold',
      color: '#394D80',
      fontSize: 20 * scale,
      marginLeft: 7,
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <SafeAreaView style={loginStyles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            padding: 10,
            position: 'absolute',
          }}>
          <TouchableOpacity onPress={() => navigation.replace('Loading')}>
            <Icon name="cloud-sync-outline" size={30} color="#394D80" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setVisible(true)}>
            <Icon name="application-cog" size={30} color="#394D80" />
          </TouchableOpacity>
        </View>

        {showLogo && (
          <View style={loginStyles.pensadorContainer}>
            <View style={loginStyles.pensadorBorder}>
              <Image
                source={require('../../assets/pensador.png')}
                style={loginStyles.pensador}
              />
            </View>
          </View>
        )}

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

        <View style={loginStyles.footerContainer}>
          <Footer appVersion={appVersion}></Footer>
        </View>
      </SafeAreaView>

      <DirectionIpConfig
        visible={visible}
        hideDirectionIpConfig={hideDirectionIpConfig}
        saveDirectionIpConfig={saveDirectionIpConfig}
      />
    </KeyboardAvoidingView>
  );
};

export {Login};
