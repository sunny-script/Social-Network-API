import { Schema, Types } from 'mongoose';

export const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: string | number | Date) => new Date(timestamp).toLocaleString()
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

