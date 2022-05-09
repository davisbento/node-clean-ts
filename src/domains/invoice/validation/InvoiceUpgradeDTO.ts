import * as yup from 'yup';

export interface IUpgradeInvoiceModel {
  subscriptionId: string;
}

export const upgradeInvoiceDto = yup.object({
  subscriptionId: yup.string().required()
});
