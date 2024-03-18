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

  async deleteTable(): Promise<boolean> {
    return this.asesoresController.deleteTable();
  }

  async fillTable(asesores: IAsesor[]): Promise<boolean> {
    return this.asesoresController.fillTable(asesores);
  }

  async getAll(): Promise<IAsesor[]> {
    return this.asesoresController.getAll();
  }

  async Login(
    id: number,
    contrasena: string,
  ): Promise<{login: boolean; estado: "S" | "N"}> {
    return this.asesoresController.login(id, contrasena);
  }
}

const asesoresService = new AsesoresService();

export {asesoresService};
