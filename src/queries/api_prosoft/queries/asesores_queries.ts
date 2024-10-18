import {createAxiosInstance} from '../axiosInstance';

/* types */

class AsesoresApiService {
  private axiosInstance;
  private direccionIp;

  constructor(direccionIp: string, puerto: string) {
    this.axiosInstance = createAxiosInstance(direccionIp, puerto);
    this.direccionIp = direccionIp;
  }

  _getAsesores = async () => {
    try {
      let busco = this.axiosInstance.getUri();
      console.log('busco', busco)

      const response = await this.axiosInstance.get(
        'v1/contabilidad/get-asesores',
      );
      console.log('response', response);
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
