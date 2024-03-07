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

  //   async getQuantityAlmacenes(): Promise<string> {
  //     return this.almacenesRepository.getQuantity();
  //   }
}

const asesoresService = new AsesoresService();

export {asesoresService};
