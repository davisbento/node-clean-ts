import { generateHashId } from '@/helpers/GenerateHashId';
import { EnBotStatus, IBot } from '@/interfaces/IBot';
import { Model, model, Schema, SchemaTypes, Types } from 'mongoose';

const BotSchema = new Schema<IBot>(
  {
    type: String,
    userId: {
      type: Types.ObjectId,
      required: true,
      ref: 'User'
    },
    name: String,
    identificator: {
      type: String,
      default: () => generateHashId()
    },
    status: {
      type: String,
      default: EnBotStatus.new
    },
    strategyId: {
      type: Types.ObjectId,
      required: false,
      ref: 'Strategy'
    },
    strategyName: String,
    botApiId: String,
    botApiReturn: SchemaTypes.Mixed
  },
  { timestamps: true }
);
export const Bot: Model<IBot> = model<IBot>('Bot', BotSchema);
