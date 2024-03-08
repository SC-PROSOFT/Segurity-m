import {AsesoresController} from '../controllers';

import {IAsesor} from '../../../common/types';

const asesoresController = new AsesoresController();

class AsesoresService {
  private asesoresController: AsesoresController;

  constructor() {
    this.asesoresController = asesoresController;
  }

  async createTable(): Promise<boolean> {
    return this.asesoresController.createTable();
  }

  async fillTable(asesores: IAsesor[]): Promise<boolean> {
    return this.asesoresController.fillTable(asesores);
  }

  async getAll(): Promise<IAsesor[]> {
    return this.asesoresController.getAll();
  }

  async Login(id: number, contrasena: string): Promise<boolean> {
    return this.asesoresController.login(id, contrasena);
  }
}

const asesoresService = new AsesoresService();

export {asesoresService};
