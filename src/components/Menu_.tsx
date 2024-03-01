import * as React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Menu} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

/* icons */
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

/* context */
import {menuContext, decisionAlertContext} from '../context';

export const Menu_ = () => {
  const navigation: any = useNavigation();

  const {showDecisionAlert} = decisionAlertContext();
  const {menu, showMenu, hideMenu} = menuContext();

  const logout = () => {
    navigation.replace('Login');
  };

  const toggleMenuItem = (executeFunction: () => void) => {
    executeFunction();
    hideMenu();
  };

  return (
    <View style={styles.container}>
      <Menu
        visible={menu.visible}
        onDismiss={() => hideMenu()}
        anchor={
          <TouchableOpacity onPress={() => showMenu()}>
            <Icon name="menu" size={30} color="#fff" />
          </TouchableOpacity>
        }
        style={styles.menuContainer}>
        <Menu.Item
          onPress={() =>
            toggleMenuItem(() =>
              showDecisionAlert({
                type: 'info',
                description: '¿Desea cerrar sesión?',
                textButton: 'Cerrar sesion',
                executeFunction: () => logout(),
              }),
            )
          }
          leadingIcon="logout"
          title="Cerrar sesion"
          style={styles.item}
        />
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  menuContainer: {
    marginTop: 10,
  },
  item: {
    marginTop: -8,
    marginBottom: -8,
  },
});
