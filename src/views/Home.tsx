import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Circle} from 'react-native-progress';
import LottieView from 'lottie-react-native';

const {width, height} = Dimensions.get('window');
const smallerDimension = Math.min(width, height);
const circleSize = smallerDimension * 0.5 * 0.8;

export const Home = () => {
  const animationRef = useRef<LottieView>(null);

  const [passwordRemaining, setPasswordRemaining] = useState<number>(0.85);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fillProgressCircle();
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    animationRef.current?.play();
    animationRef.current?.play(30, 120);
  }, []);

  const fillProgressCircle = () => {
    const currentDate = new Date();
    const horas = currentDate.getHours();
    const minutos = currentDate.getMinutes();

    // Convertir la hora a minutos totales y agregar los minutos
    const minutosTotales = horas * 60 + minutos;

    // Calcular el porcentaje
    const porcentaje = 1 - minutosTotales / (24 * 60);

    // Redondear el resultado a diez decimales
    const remaining = parseFloat(porcentaje.toString().slice(0, 10));

    if (horas == 0 && minutos < 2) {
      generateCurrentGebcPassword();
    }

    setPasswordRemaining(remaining);
  };

  const generateCurrentGebcPassword = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    const passwordValues = {
      val_1: Number(currentYear.toString().slice(2, 4)) + currentMonth,
      val_2: Number(currentYear.toString().slice(2, 4)) + currentDay,
      val_3: currentMonth + currentDay,
    };

    return `${passwordValues.val_1
      .toString()
      .padStart(2, '0')}${passwordValues.val_2
      .toString()
      .padStart(2, '0')}${passwordValues.val_3.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.passwordContainer}>
        <Circle
          size={100} // Tamaño del círculo
          indeterminate={false} // Hace que la barra de carga sea indeterminada (giratoria)
          progress={passwordRemaining}
          color={'#365AC3'} // Color de la barra de carga
          thickness={5} // Grosor de la barra de carga
          borderWidth={0}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}>
          <Text style={styles.textPassword}>
            {`SC${generateCurrentGebcPassword()}`}
          </Text>
        </Circle>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  passwordContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: circleSize,
    height: circleSize,
    aspectRatio: 1,
    borderRadius: 99999,
  },
  textPassword: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 13 * 1.3,
    color: 'black',
  },
  title: {
    color: 'black',
    textAlign: 'center',
    fontSize: 13 * 1.3,
  },
});
