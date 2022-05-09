import { License } from '@/entities/License';
import { ILicense } from '@/interfaces/ILicense';
import { Types } from 'mongoose';

import { ILicenseRepository } from '../ILicenseRepository';

export class DbLicenseRepository implements ILicenseRepository {
  constructor(private readonly licenseModel: typeof License) {}

  public async getById(id: string): Promise<ILicense> {
    return this.licenseModel.findOne({ _id: Types.ObjectId(id), active: true });
  }

  public async getAllAvailable(): Promise<ILicense[]> {
    return this.licenseModel.find({ active: true }, {}, { sort: { order: 1 } });
  }
}
