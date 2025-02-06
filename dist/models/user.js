import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    username: { type: String, unique: true, required: true, trim: true },
    email: { type: String, unique: true, required: true, match: [/.+@.+\..+/, 'Must match an email address!'] },
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }] // Ensure it always exists
}, {
    toJSON: {
        virtuals: true
    },
    id: false
});
// Ensure virtual `friendCount` works correctly even if `friends` is undefined
userSchema.virtual('friendCount').get(function () {
    return this.friends ? this.friends.length : 0; // Fix: Handle undefined friends
});
const User = model('User', userSchema);
export default User;
