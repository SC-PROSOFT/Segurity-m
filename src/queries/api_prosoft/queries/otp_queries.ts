import {createAxiosInstance} from '../axiosInstance';

/* types */

class OtpApiService {
  private axiosInstance;
  private direccionIp;

  constructor(direccionIp: string, puerto: string) {
    this.axiosInstance = createAxiosInstance(direccionIp, puerto);
    this.direccionIp = direccionIp;
  }

  _getOtp = async () => {
    try {
      const response = await this.axiosInstance.get('v1/contabilidad/get-otp');
      return response.data.data;
    } catch (error: any) {
      if (error?.message == 'Network Error') {
        throw new Error(error.message);
      } else {
        throw new Error('Error al obtener los OTP');
      }
    }
  };
}

export {OtpApiService};
