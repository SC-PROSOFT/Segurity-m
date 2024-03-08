import {ResultSet} from 'react-native-sqlite-storage';

import {IAsesor} from '../../../common/types';

import {db} from '../local_database_config';

interface IAsesoresController<T> {
  createTable?(): Promise<boolean>;
  fillTable(asesores: T[]): Promise<boolean>;
  getById(id: number): Promise<T>;
  login(id: number, password: string): Promise<boolean>;
}

class AsesoresController implements IAsesoresController<IAsesor> {
  async createTable(): Promise<boolean> {
    const sqlCreateStatement = `
    CREATE TABLE IF NOT EXISTS asesores (
        id INTEGER PRIMARY KEY,
        nombre TEXT CHECK(length(nombre) <= 30),
        contrasena TEXT CHECK(length(contrasena) <= 30),
        estado INTEGER CHECK(estado IN (0, 1))
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
            reject(new Error('Fallo crear tabla asesores'));
          },
        );
      });
    });
  }

  async fillTable(asesores: IAsesor[]): Promise<boolean> {
    const innerInsertBlockOfAsesores = (asesores: IAsesor[]) => {
      const placeholders = asesores.map(() => '(?, ?, ?, ?)').join(', ');

      const sqlInsertStatement = `
          INSERT OR REPLACE INTO asesores (
            id,
            nombre,
            contrasena,
            estado

          ) VALUES ${placeholders}
        `;

      const values = asesores.flatMap(asesor => [
        asesor.id,
        asesor.nombre,
        asesor.contrasena,
        asesor.estado,
      ]);

      return new Promise((resolve, reject) => {
        db.transaction((tx: any) => {
          tx.executeSql(
            sqlInsertStatement,
            values,
            (_: ResultSet, result: ResultSet) => {
              resolve(result.rows.raw());
            },
            (error: Error) => {
              reject(new Error('Fallo guardar bloque asesores'));
            },
          );
        });
      });
    };

    return new Promise(async (resolve, reject) => {
      try {
        let asesoresTemp = [];
        let contador = 0;
        const bloques = 10;

        if (asesores.length > bloques) {
          let iteraciones = Math.floor(asesores.length / bloques);
          for (let i = 0; i < iteraciones; i++) {
            for (let j = 0; j < bloques; j++) {
              asesoresTemp.push(asesores[contador]);
              contador = contador + 1;
            }
            await innerInsertBlockOfAsesores(asesoresTemp);
            asesoresTemp = [];
          }
          if (contador < asesores.length) {
            let resta = asesores.length - contador;
            for (let j = 1; j <= resta; j++) {
              asesoresTemp.push(asesores[contador]);
              contador = contador + 1;
            }
            await innerInsertBlockOfAsesores(asesoresTemp);
            resolve(true);
          } else {
            resolve(true);
          }
        } else {
          await innerInsertBlockOfAsesores(asesores);
          resolve(true);
        }
      } catch (error: any) {
        reject(new Error(error.message));
      }
    });
  }

  async getById(id: number): Promise<IAsesor> {
    const sqlSelectStatement = `
        SELECT * FROM asesores WHERE id= '${id}';
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
            reject(new Error('Fallo obtener articulos'));
          },
        );
      });
    });
  }

  async getAll(): Promise<IAsesor[]> {
    const sqlSelectStatement = `
        SELECT * FROM asesores
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
            reject(new Error('Fallo obtener asesores'));
          },
        );
      });
    });
  }

  async login(id: number, contrasena: string): Promise<boolean> {
    const sqlSelectStatement = `
        SELECT * FROM asesores WHERE id= '${id}' AND contrasena= '${contrasena}';
    `;

    return new Promise((resolve, reject) => {
      db.transaction((tx: any) => {
        tx.executeSql(
          sqlSelectStatement,
          null,
          (_: ResultSet, response: ResultSet) => {
            console.log();
            if (response.rows.raw().length == 0) {
              resolve(false);
            } else {
              resolve(true);
            }
          },
          (error: ResultSet) => {
            console.log('el error: ', error);
            reject(new Error('Fallo al iniciar sesion'));
          },
        );
      });
    });
  }
}

export {AsesoresController};
