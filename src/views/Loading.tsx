import React, {useEffect} from 'react';

import {View, Text} from 'react-native';

/* queries */
import {AsesoresApiService} from '../queries/api_prosoft/queries';
/* queries instances */
const asesoresApiService = new AsesoresApiService('192.168.68.106', '7193');

const Loading: React.FC = () => {
  useEffect(() => {
    loadAsesores();
  }, []);

  const loadAsesores = async () => {
    try {
      const asesores = await asesoresApiService._getAsesores();
    } catch (error) {        
      console.error('el error: ', error);
    }
  };

  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
};

export {Loading};
