import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
/* redux hooks */
import {useAppSelector} from '../redux/hooks';

import {otpService} from '../queries/local_database/services';

export const Home = () => {
  const days = dayjs().locale('es');

  const objAsesor = useAppSelector(store => store.asesor.objAsesor);

  const [date, setDate] = useState<any>(days);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState<string>('');

  useEffect(() => {
    cargarFecha(date);
  }, []);
  useEffect(() => {
    generateCurrentGebcPassword();
  }, [selectedDate]);

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

    console.log('dia_del_anio', dia_del_anio);
    console.log('mes_del_anio', mes_del_anio);
    console.log('random_otp_number', random_otp_number);
    console.log('id_operador', id_operador);

    const passwordValues =
      dia_del_anio + mes_del_anio + random_otp_number + id_operador;

    setCurrentPassword(passwordValues.toString());
  };

  return (
    <View style={styles.container}>
      <View style={styles.passwordContainer}>
        <View
          style={{
            height: '35%',
            backgroundColor: '#2b4bb0',
            width: '100%',
            justifyContent: 'center',
            borderTopEndRadius: 15,
            borderTopLeftRadius: 15,
          }}>
          <Text style={styles.labelPassword}>Clave</Text>
        </View>

        <View style={{height: '65%', justifyContent: 'center'}}>
          <Text style={styles.textPassword}>{`${currentPassword}`}</Text>
        </View>
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
          selectedTextStyle={{color: '#2b4bb0', fontWeight: 'bold'}}
          calendarTextStyle={{color: 'grey'}}
          headerTextStyle={{color: '#303134', fontSize: 20}}
          headerButtonColor="#303134"
          weekDaysTextStyle={{color: '#303134'}}
          height={250}
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
            textColor="#365AC3"
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
  container: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    width: '100%',
    height: '100%',
    padding: 10,
  },
  containerDate: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    elevation: 10,
    marginTop: 5,
  },
  passwordContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '100%',
    height: '10%',
    borderRadius: 20,
    elevation: 10,
  },
  labelPassword: {
    fontSize: 10 * 1.3,
    color: 'white',
    textAlign: 'center',
  },
  textPassword: {
    fontSize: 16 * 1.3,
    letterSpacing: 2,
    fontWeight: 'bold',
    color: 'black',
  },
  title: {
    color: 'black',
    textAlign: 'center',
    fontSize: 13 * 1.3,
  },
});
