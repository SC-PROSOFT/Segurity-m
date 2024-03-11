import {ResultSet} from 'react-native-sqlite-storage';

import {IOtp} from '../../../common/types';

import {db} from '../local_database_config';

interface IOtpController<T> {
  createTable?(): Promise<boolean>;
  fillTable(otp: T[]): Promise<boolean>;
  getByDia(id: number): Promise<T>;
  getAll(): Promise<T | T[]>;
}

class OtpController implements IOtpController<IOtp> {
  async createTable(): Promise<boolean> {
    const sqlCreateStatement = `
    CREATE TABLE IF NOT EXISTS otp (
        dia INTEGER PRIMARY KEY,
        llave_generada INTEGER CHECK (length(llave_generada) = 8)
    )
    `;

    return new Promise((resolve, reject) => {
      db.transaction((tx: any) => {
        tx.executeSql(
          sqlCreateStatement,
          null,
          (_: ResultSet, response: ResultSet) => {
            resolve(true);
          },
          (error: ResultSet) => {
            reject(new Error('Fallo crear tabla otp'));
          },
        );
      });
    });
  }

  async fillTable(otp: IOtp[]): Promise<boolean> {
    const innerInsertBlockOfAsesores = (otp: IOtp[]) => {
      const placeholders = otp.map(() => '(?, ?)').join(', ');

      const sqlInsertStatement = `
          INSERT OR REPLACE INTO otp (
            dia,
            llave_generada

          ) VALUES ${placeholders}
        `;

      const values = otp.flatMap(otp => [otp.dia, otp.llave_generada]);

      return new Promise((resolve, reject) => {
        db.transaction((tx: any) => {
          tx.executeSql(
            sqlInsertStatement,
            values,
            (_: ResultSet, result: ResultSet) => {
              resolve(result.rows.raw());
            },
            (error: Error) => {
              console.log('el error: ', error);
              reject(new Error('Fallo guardar bloque otp'));
            },
          );
        });
      });
    };

    return new Promise(async (resolve, reject) => {
      try {
        let otpTemp = [];
        let contador = 0;
        const bloques = 10;

        if (otp.length > bloques) {
          let iteraciones = Math.floor(otp.length / bloques);
          for (let i = 0; i < iteraciones; i++) {
            for (let j = 0; j < bloques; j++) {
              otpTemp.push(otp[contador]);
              contador = contador + 1;
            }
            await innerInsertBlockOfAsesores(otpTemp);
            otpTemp = [];
          }
          if (contador < otp.length) {
            let resta = otp.length - contador;
            for (let j = 1; j <= resta; j++) {
              otpTemp.push(otp[contador]);
              contador = contador + 1;
            }
            await innerInsertBlockOfAsesores(otpTemp);
            resolve(true);
          } else {
            resolve(true);
          }
        } else {
          await innerInsertBlockOfAsesores(otp);
          resolve(true);
        }
      } catch (error: any) {
        reject(new Error(error.message));
      }
    });
  }

  async getByDia(dia: number): Promise<IOtp> {
    const sqlSelectStatement = `
        SELECT * FROM otp WHERE dia= '${dia}';
    `;

    return new Promise((resolve, reject) => {
      db.transaction((tx: any) => {
        tx.executeSql(
          sqlSelectStatement,
          null,
          (_: ResultSet, response: ResultSet) => {
            resolve(response.rows.raw()[0]);
          },
          (error: ResultSet) => {
            reject(new Error('Fallo obtener otp por dia'));
          },
        );
      });
    });
  }

  async getAll(): Promise<IOtp[]> {
    const sqlSelectStatement = `
        SELECT * FROM otp
    `;

    return new Promise((resolve, reject) => {
      db.transaction((tx: any) => {
        tx.executeSql(
          sqlSelectStatement,
          null,
          (_: ResultSet, response: ResultSet) => {
            resolve(response.rows.raw());
          },
          (error: ResultSet) => {
            reject(new Error('Fallo obtener otp'));
          },
        );
      });
    });
  }
}

export {OtpController};
