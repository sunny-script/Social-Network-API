// import mongoose, { Schema, model, Document } from 'mongoose';
// import reactionSchema from './reaction';

// export interface IThought extends Document {
//   thoughtText: string;
//   username: string;
//   createdAt: Date;
//   reactions: mongoose.Types.Array<any>;
// }

// const ThoughtSchema = new Schema<IThought>({
//   thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
//   createdAt: { type: Date, default: Date.now },
//   username: { type: String, required: true },
//   reactions: [reactionSchema],
// });

// ThoughtSchema.virtual('reactionCount').get(function () {
//   return this.reactions.length;
// });

// const Thought = model<IThought>('Thought', ThoughtSchema);

// export default Thought;

import { Schema, model } from 'mongoose';
import reactionSchema from './reaction';

const ThoughtSchema = new Schema({
  thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
  createdAt: { type: Date, default: Date.now },
  username: { type: String, required: true },
  reactions: [reactionSchema], // Embed Reaction schema here
});

ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

export default Thought;
