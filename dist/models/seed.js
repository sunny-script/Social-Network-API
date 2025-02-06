import mongoose from 'mongoose';
import User from '../models/user.js';
import Thought from '../models/thought.js';
import dotenv from 'dotenv';
dotenv.config();
// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworkDB');
        console.log('MongoDB connected');
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
        }
        else {
            console.error('Unknown error', err);
        }
        process.exit(1);
    }
};
const seedDatabase = async () => {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Thought.deleteMany({});
        console.log('Existing data cleared.');
        // Create users
        const users = await User.insertMany([
            {
                username: 'johndoe',
                email: 'johndoe@example.com',
                friends: [] // Ensure friends array exists
            },
            {
                username: 'janedoe',
                email: 'janedoe@example.com',
                friends: [] // Prevents `undefined` errors
            },
            {
                username: 'alice',
                email: 'alice@example.com',
                friends: []
            },
            {
                username: 'bob',
                email: 'bob@example.com',
                friends: []
            }
        ]);
        console.log('Users seeded.');
        // Create thoughts
        const thoughts = await Thought.insertMany([
            {
                thoughtText: 'This is my first thought!',
                username: users[0].username,
                userId: users[0]._id
            },
            {
                thoughtText: 'I love coding!',
                username: users[1].username,
                userId: users[1]._id
            }
        ]);
        console.log('Thoughts seeded.');
        // Update users with thoughts
        await Promise.all(thoughts.map(async (thought) => {
            await User.findByIdAndUpdate(thought.userId, { $push: { thoughts: thought._id } });
        }));
        console.log('Users linked with thoughts.');
        // Add reactions separately
        await Thought.findByIdAndUpdate(thoughts[0]._id, {
            $push: {
                reactions: [
                    {
                        reactionId: new mongoose.Types.ObjectId(),
                        reactionBody: 'Nice thought!',
                        username: users[1].username,
                        createdAt: new Date()
                    },
                    {
                        reactionId: new mongoose.Types.ObjectId(),
                        reactionBody: 'I agree!',
                        username: users[2].username,
                        createdAt: new Date()
                    }
                ]
            }
        });
        await Thought.findByIdAndUpdate(thoughts[1]._id, {
            $push: {
                reactions: [
                    {
                        reactionId: new mongoose.Types.ObjectId(),
                        reactionBody: 'Coding is life!',
                        username: users[0].username,
                        createdAt: new Date()
                    }
                ]
            }
        });
        console.log('Reactions added.');
        // Establish friendships
        await User.findByIdAndUpdate(users[0]._id, { $addToSet: { friends: users[1]._id } });
        await User.findByIdAndUpdate(users[1]._id, { $addToSet: { friends: users[0]._id } });
        await User.findByIdAndUpdate(users[2]._id, { $addToSet: { friends: users[3]._id } });
        await User.findByIdAndUpdate(users[3]._id, { $addToSet: { friends: users[2]._id } });
        console.log('Friendships established.');
        console.log('Database seeding complete.');
        process.exit();
    }
    catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
};
// Run the script
(async () => {
    await connectDB();
    await seedDatabase();
})();
