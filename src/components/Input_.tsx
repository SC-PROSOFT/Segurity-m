import React from 'react';
import {View, StyleSheet} from 'react-native';

import {TextInput} from 'react-native-paper';

type Mode = 'outlined' | 'flat';
type KeyboadType = 'default' | 'number-pad';

interface InputProps {
  value: string;
  label: string;
  name: string;
  mode?: Mode;
  password?: boolean;
  keyboardType?: KeyboadType;
  icon?: string;
  handleInputChange: (name: string, text: string) => void;
}

export const Input_ = ({
  value,
  label,
  name,
  mode,
  password = false,
  keyboardType,
  icon,
  handleInputChange,
}: InputProps) => {
  return (
    <View style={styles.inputContainer}>
      {/* <Icon name="menu" size={20} color="black" /> */}
      <TextInput
        value={value}
        label={label}
        onChangeText={text => handleInputChange(name, text)}
        mode={mode}
        keyboardType={keyboardType}
        secureTextEntry={password}
        left={
          icon && <TextInput.Icon icon={icon} size={22} style={styles.icon} />
        }
        style={styles.input}></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: '#fff',
    height: 60,
    fontSize: 16,
  },
  icon: {
    borderRightColor: '#2b4bb0',
    marginTop: 13,
    borderRightWidth: 0.5,
    borderRadius: 0
  },
});
