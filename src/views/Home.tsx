import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, Animated} from 'react-native';
import {Button} from 'react-native-paper';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
/* redux hooks */
import {useAppSelector} from '../redux/hooks';

import {otpService} from '../queries/local_database/services';

// Obtener dimensiones del dispositivo
const windowDimensions = Dimensions.get('window');

export const Home = () => {
  const deviceHeightInPixels = windowDimensions.height;

  const days = dayjs().locale('es');

  const objAsesor = useAppSelector(store => store.asesor.objAsesor);

  const [date, setDate] = useState<any>(days);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [elevationAnim] = useState(new Animated.Value(130));
  const [textOpacityAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    cargarFecha(date);
  }, []);
  useEffect(() => {
    generateCurrentGebcPassword();
  }, [selectedDate]);
  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(elevationAnim, {
            toValue: 10, // Valor más bajo de elevación
            duration: 1000,
            useNativeDriver: true, // Usar driver nativo para la animación
          }),
          Animated.timing(elevationAnim, {
            toValue: 130, // Valor inicial de elevación
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ).start(); // Iniciar la animación en bucle
    };

    startAnimation(); // Iniciar la animación al montar el componente
  }, [elevationAnim]);

  const cargarFecha = (dateScope: any) => {
    const date = new Date(dateScope);

    const meses = [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre',
    ];

    const mes = meses[date.getMonth()];
    const dia = date.getDate();
    const año = date.getFullYear();

    const fechaFormateada = `${mes}, ${dia}, ${año}`;

    setSelectedDate(fechaFormateada);
  };

  const obtenerDiaDelAnio = () => {
    const fecha_objeto: any = new Date(date);

    const inicio_del_anio: any = new Date(fecha_objeto.getFullYear(), 0, 0);
    const diferencia = fecha_objeto - inicio_del_anio;
    const un_dia_en_milisegundos = 1000 * 60 * 60 * 24;
    const dia_del_anio = Math.floor(diferencia / un_dia_en_milisegundos);

    return dia_del_anio;
  };

  const obtenerMesDelAnio = () => {
    const fecha_objeto = new Date(date);

    const mes_del_anio = fecha_objeto.getMonth() + 1; // Agregamos 1 ya que los meses van de 0 a 11
    return mes_del_anio;
  };

  const generateCurrentGebcPassword = async () => {
    const dia_del_anio = obtenerDiaDelAnio();
    const mes_del_anio = obtenerMesDelAnio();
    const random_otp_number = (await otpService.getByDia(dia_del_anio))
      .llave_generada;
    const id_operador = objAsesor.id;

    const passwordValues =
      dia_del_anio + mes_del_anio + random_otp_number + id_operador;

    setCurrentPassword(passwordValues.toString());

    // Animación de desaparición y aparición del texto
    Animated.sequence([
      Animated.timing(textOpacityAnim, {
        toValue: 0, // Valor de opacidad más bajo (desaparece el texto)
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.timing(textOpacityAnim, {
        toValue: 1, // Valor de opacidad inicial (aparece el texto)
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(); // Iniciar la animación
  };

  return (
    <View style={styles.container}>
      <View style={styles.passwordContainer}>
        <Animated.View style={[styles.outerCircle, {elevation: elevationAnim}]}>
          <View style={styles.innerCircle}>
            <Text style={styles.labelPassword}>Clave</Text>
            <View style={{overflow: 'hidden'}}>
              <Animated.Text
                style={[styles.textPassword, {opacity: textOpacityAnim}]}>
                {currentPassword}
              </Animated.Text>
            </View>
          </View>
        </Animated.View>
      </View>

      <View style={styles.containerDate}>
        <DateTimePicker
          locale={'es'}
          mode="single"
          date={date}
          onChange={params => {
            setDate(params.date);
            cargarFecha(params.date);
          }}
          selectedItemColor="#d8e3ff"
          selectedTextStyle={{color: '#4036C2', fontWeight: 'bold'}}
          calendarTextStyle={{color: 'grey'}}
          headerTextStyle={{color: '#303134', fontSize: 20}}
          headerButtonColor="#303134"
          weekDaysTextStyle={{color: '#303134'}}
          height={Number(deviceHeightInPixels) / 3.1}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black', fontSize: 16, margin: 15}}>
            {selectedDate}
          </Text>

          <Button
            mode="contained-tonal"
            buttonColor="#d8e3ff"
            textColor="#4036C2"
            onPress={() => {
              setDate(days);
              cargarFecha(days);
            }}>
            Hoy
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerCircle: {
    width: 250,
    height: 250,
    borderRadius: 150,
    backgroundColor: '#d8e3ff',
    elevation: 50,
    shadowColor: '#4036C2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textPassword: {
    fontSize: 18 * 1.3,
    letterSpacing: 2,
    fontWeight: 'bold',
    color: 'black',
  },
  labelPassword: {
    fontSize: 11 * 1.3,
    color: 'black',
    textAlign: 'center',
  },
  //
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    width: '100%',
    height: '100%',
    padding: 10,
  },
  passwordContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '48%',
  },
  containerDate: {
    backgroundColor: '#fff',
    height: '50%',
    borderRadius: 20,
    padding: 10,
    elevation: 10,
    marginTop: 5,
  },

  title: {
    color: 'black',
    textAlign: 'center',
    fontSize: 13 * 1.3,
  },
});
