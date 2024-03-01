import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

interface ButtonProps {
  value?: string;
  iconName?: string;
  colorButton?: string;
  colorText?: string;
  iconSize?: number;
  disabled?: boolean;
  pressNormalButton: Function;
}

export const Button_ = ({
  value,
  colorButton,
  colorText,
  disabled,
  pressNormalButton,
}: ButtonProps) => {
  const styles = StyleSheet.create({
    container: {
      width: '100%',
    },
    button: {},
    textButton: {
      color: colorText,
    },
    internalButton: {
      display: 'flex',
      justifyContent: 'center',
      height: 60,
    },
  });

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        buttonColor={colorButton}
        onPress={() => pressNormalButton()}
        style={styles.button}
        contentStyle={styles.internalButton}
        disabled={disabled}>
        <Text style={styles.textButton}>{value}</Text>
      </Button>
    </View>
  );
};
