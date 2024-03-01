import React from 'react';

import {StyleSheet, View} from 'react-native';

/* components mui */
import {Button, Dialog, Text} from 'react-native-paper';

/* context */
import {infoAlertContext} from '../context';

export const InfoAlert = () => {
  const {showInfoAlert, hideInfoAlert, infoAlertConfig} = infoAlertContext();

  const {type} = infoAlertConfig;

  const hideDialog = () => {
    hideInfoAlert();
  };

  const titleAlert = () => {
    type type = 'error' | 'success' | 'info';

    const {type}: {type: type} = infoAlertConfig;

    switch (type) {
      case 'success':
        return '¡Bien hecho!';

      case 'error':
        return 'Algo salio mal';

      case 'info':
        return '¡Atencion!';

      default:
        return '¡Atencion!';
    }
  };

  const contentAlert = () => {
    const {description} = infoAlertConfig;

    return description;
  };

  const textButton = () => {
    type type = 'error' | 'success' | 'info';

    const {type}: {type: type} = infoAlertConfig;

    switch (type) {
      case 'error':
      case 'info':
        return 'Intentar de nuevo';

      case 'success':
        return 'Continuar';

      default:
        break;
    }
  };

  const styles = StyleSheet.create({
    textButton: {
      color:
        type == 'success' ? '#19C22A' : type == 'error' ? '#DE3A45' : '#365AC3',
    },
  });

  return (
    <Dialog visible={infoAlertConfig.visible} onDismiss={hideDialog}>
      <Dialog.Title>{titleAlert()}</Dialog.Title>

      <Dialog.Content>
        <Text variant="bodyMedium">{contentAlert()}</Text>
      </Dialog.Content>

      <Dialog.Actions>
        <Button onPress={hideDialog}>
          <Text style={styles.textButton}>{textButton()}</Text>
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};
