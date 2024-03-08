import SQLite from 'react-native-sqlite-storage';

/* local database services */
import {asesoresService, otpService} from './services';

const db: any = SQLite.openDatabase({name: 'localdb1'});

/* create tables */
const createTables = async (): Promise<boolean> => {
  try {
    await asesoresService.createTable();
    await otpService.createTable();

    return true;
  } catch (error: any) {
    if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error(
        'Error desconocido, contacta al equipo de desarrollo [localdbError]',
      );
    }
  }
};

export {db, createTables};
