import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, Easing} from 'react-native';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';

/* redux */
import {useAppSelector} from '../redux/hooks';
/* queries */
import {
  AsesoresApiService,
  OtpApiService,
} from '../queries/api_prosoft/queries';
/* local_database */
import {createTables} from '../queries/local_database/local_database_config';
import {asesoresService, otpService} from '../queries/local_database/services';
/* types */
import {IAsesor, IOtp} from '../common/types';

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const Loading: React.FC = () => {
  const navigation: any = useNavigation();
  const animationProgress = useRef(new Animated.Value(0));

  const objDirectionIpConfig = useAppSelector(
    store => store.directionIpConfig.objDirectionIpConfig,
  );

  const asesoresApiService = new AsesoresApiService(
    objDirectionIpConfig.ip,
    objDirectionIpConfig.port,
  );
  const otpApiService = new OtpApiService(
    objDirectionIpConfig.ip,
    objDirectionIpConfig.port,
  );

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
      await loadOtp();

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

      if (asesores.length > 0) {
        await asesoresService.deleteTable();
        await asesoresService.fillTable(asesores);
      }
      return true;
    } catch (error: any) {
      throw error;
    }
  };

  const loadOtp = async (): Promise<boolean> => {
    try {
      const otp: IOtp[] = await otpApiService._getOtp();
      if (otp.length > 0) await otpService.fillTable(otp);

      return true;
    } catch (error) {
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

export {Loading};
