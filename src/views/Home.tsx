import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

export const Home = () => {
  const days = dayjs().locale('es').format();

  const [date, setDate] = useState<any>(days);
  const [selectedDate, setSelectedDate] = useState<string>('');

  useEffect(() => {
    cargarFecha(date);
  }, []);

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
          selectedTextStyle={{color: '#365AC3', fontWeight: 'bold'}}
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
      <View style={styles.passwordContainer}>
        <View
          style={{
            height: '35%',
            backgroundColor: '#4A5A88',
            width: '100%',
            justifyContent: 'center',
            borderTopEndRadius: 15,
            borderTopLeftRadius: 15,
          }}>
          <Text style={styles.labelPassword}>Clave</Text>
        </View>

        <View style={{height: '65%', justifyContent: 'center'}}>
          <Text style={styles.textPassword}>
            {`SC${generateCurrentGebcPassword()}`}
          </Text>
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
    marginTop: 5,
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
