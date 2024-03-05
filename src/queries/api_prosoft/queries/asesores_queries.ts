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
      console.log(this.axiosInstance.getUri());

      const response = await this.axiosInstance.get('v1/GEBCsecurity/asesores');

      console.log('los asesores: ', response);

      return true;
    } catch (error) {
        console.error("error en la consulta: ", error)
      throw new Error('Error al obtener los asesores');
    }
  };
}

export {AsesoresApiService};
