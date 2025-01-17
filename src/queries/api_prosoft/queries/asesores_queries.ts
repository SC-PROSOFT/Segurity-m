import {createAxiosInstance} from '../axiosInstance';

/* types */

class AsesoresApiService {
  private axiosInstance;

  constructor(direccionIp: string, puerto: string) {
    this.axiosInstance = createAxiosInstance(direccionIp, puerto);
  }

  _getAsesores = async () => {
    try {
      const response = await this.axiosInstance.get(
        'v1/contabilidad/get-asesores',
      );

      return response.data.data;
    } catch (error: any) {
      if (error?.message == 'Network Error') {
        throw new Error(error.message);
      } else {
        throw new Error('Error al obtener los asesores');
      }
    }
  };
}

export {AsesoresApiService};
