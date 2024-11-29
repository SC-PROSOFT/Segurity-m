import React, {useState, useEffect} from 'react';

import {StyleSheet} from 'react-native';
import {Button, Dialog, Text} from 'react-native-paper';

/* components */
import {Input_} from '../components';
/* redux */
import {useAppSelector} from '../redux/hooks';

interface DirectionIpConfigProps {
  visible: boolean;
  hideDirectionIpConfig: () => void;
  saveDirectionIpConfig: ({ip, port}: {ip: string; port: string}) => void;
}

const DirectionIpConfig: React.FC<DirectionIpConfigProps> = ({
  visible,
  hideDirectionIpConfig,
  saveDirectionIpConfig,
}) => {
  const [inputs, setInputs] = useState({
    ip: '',
    port: '',
  });

  const objDirectionIpConfig = useAppSelector(
    store => store.directionIpConfig.objDirectionIpConfig,
  );

  useEffect(() => {
    setInputs({
      ...objDirectionIpConfig,
    });
  }, []);

  const handleInputChange = (name: string, text: string) => {
    setInputs(prevState => ({...prevState, [name]: text}));
  };

  return (
    <Dialog visible={visible} onDismiss={hideDirectionIpConfig} style={{}}>
      <Dialog.Title>Configuracion de conexion</Dialog.Title>

      <Dialog.Content>
        <Text variant="bodyMedium">
          Introduce la direccion ip y el puerto que usaras
        </Text>

        <Input_
          value={inputs.ip}
          label={'Direccion IP'}
          name="ip"
          mode="outlined"
          keyboardType="default"
          icon="server-minus"
          handleInputChange={handleInputChange}
        />

        <Input_
          value={inputs.port}
          label={'Puerto'}
          name="port"
          mode="outlined"
          keyboardType="default"
          icon="midi-port"
          handleInputChange={handleInputChange}
        />
      </Dialog.Content>

      <Dialog.Actions>
        <Button
          onPress={() => {
            hideDirectionIpConfig();
            saveDirectionIpConfig({ip: inputs.ip, port: inputs.port});
          }}>
          <Text style={styles.successButton}>guardar</Text>
        </Button>
        <Button onPress={hideDirectionIpConfig}>
          <Text>Cancelar</Text>
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  successButton: {
    color: '#19C22A',
  },
});

export {DirectionIpConfig};
