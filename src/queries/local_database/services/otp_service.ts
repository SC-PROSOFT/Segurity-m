import {OtpController} from '../controllers';

import {IOtp} from '../../../common/types';

const otpController = new OtpController();

class OtpService {
  private otpController: OtpController;

  constructor() {
    this.otpController = otpController;
  }

  async createTable(): Promise<boolean> {
    return this.otpController.createTable();
  }

  async fillTable(otp: IOtp[]): Promise<boolean> {
    return this.otpController.fillTable(otp);
  }

  async getAll(): Promise<IOtp[]> {
    return this.otpController.getAll();
  }
}

const otpService = new OtpService();

export {otpService};
