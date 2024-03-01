import React, {Ref} from 'react';
import {View, StyleSheet} from 'react-native';

import {TextInput} from 'react-native-paper';

type Mode = 'outlined' | 'flat';
type KeyboadType = 'default' | 'number-pad';

interface InputProps {
  value: string;
  label: string;
  name: string;
  mode?: Mode;
  password?: boolean,
  keyboardType?: KeyboadType;
  handleInputChange: (name: string, text: string) => void;
  inputRef?: any; // referencia como es logico no lo pude tipar por ahora // no cachi no es logico att: el mismo cachi. si estoy loquito :/
}

export const Input_ = ({
  value,
  label,
  name,
  mode,
  password = false,
  keyboardType,
  handleInputChange,
  inputRef,
}: InputProps) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        ref={inputRef}
        value={value}
        label={label}
        onChangeText={text => handleInputChange(name, text)}
        mode={mode}
        keyboardType={keyboardType}
        secureTextEntry={password}
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
});
