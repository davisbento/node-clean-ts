import { ILicense } from '@/interfaces/ILicense';

export interface ILicenseRepository {
  getById(id: string): Promise<ILicense>;
  getAllAvailable(): Promise<ILicense[]>;
}
