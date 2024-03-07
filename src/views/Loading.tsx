import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, Easing} from 'react-native';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';

/* queries */
import {AsesoresApiService} from '../queries/api_prosoft/queries';
/* queries instances */
const asesoresApiService = new AsesoresApiService('192.168.0.173', '5025');
/* animacion */
const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);
/* local_database */
import {createTables} from '../queries/local_database/local_database_config';
import {asesoresService} from '../queries/local_database/services';
import {IAsesor} from '../common/types';

const Loading: React.FC = () => {
  const navigation: any = useNavigation();

  const animationProgress = useRef(new Animated.Value(0));

  useEffect(() => {
    initialCharge();
  }, []);
  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 2400,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, []);

  const initialCharge = async () => {
    try {
      await createTables();
      await loadAsesores();

      navigation.replace('Login');
    } catch (error: any) {
      if (error?.message == 'Network Error') {
        navigation.replace('Login');
      } else {
        console.error('error en la carga inicial');
      }
    }
  };

  const loadAsesores = async (): Promise<boolean> => {
    try {
      const asesores: IAsesor[] = await asesoresApiService._getAsesores();
      if (asesores.length > 0) await asesoresService.fillTable(asesores);
      return true;
    } catch (error: any) {
      throw error;
    }
  };

  return (
    <View>
      <AnimatedLottieView
        source={require('../../assets/cuadrado.json')}
        progress={animationProgress.current}
        style={{width: '100%', height: '100%'}}
        autoPlay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  texto: {
    color: 'black',
  },
});

export {Loading};
