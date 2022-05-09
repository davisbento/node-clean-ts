import { generateHashId } from '@/helpers/GenerateHashId';
import { IUser, IUserStrategy } from '@/interfaces/IUser';
import { Model, model, Schema, Types } from 'mongoose';

const UserStrategySchema = new Schema<IUserStrategy>(
  {
    strategy: Schema.Types.Mixed,
    invoiceId: {
      type: Types.ObjectId,
      ref: 'Invoice'
    }
  },
  {
    timestamps: true
  }
);

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: Schema.Types.Mixed,
    identificator: {
      type: String,
      default: () => generateHashId()
    },
    dob: Date,
    password: {
      type: String,
      required: true
    },
    userSponsorId: {
      type: Types.ObjectId,
      required: false,
      ref: 'User'
    },
    paymentGatewayUserId: String,
    cardTokens: [
      {
        type: String
      }
    ],
    paymentMethods: [{ type: Schema.Types.Mixed }],
    emailConfirm: { type: Boolean, default: false },
    otpSecret: String,
    otpImageUrl: String,
    otpActive: { type: Boolean, default: false },
    hasPaiedSubscription: { type: Boolean, default: false },
    subscription: Schema.Types.Mixed,
    iuguSubscriptionId: String,
    strategies: [UserStrategySchema]
  },
  { timestamps: true }
);

export const User: Model<IUser> = model<IUser>('User', UserSchema);
