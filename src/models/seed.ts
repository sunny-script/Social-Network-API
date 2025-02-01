import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './user.js';
import Thought from './thought.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to the database
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/socialNetworkDB', {
    });
    console.log('Database connected successfully!');

    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});
    console.log('Existing data cleared.');

    // Create users
    const users = await User.insertMany([
      { username: 'john_doe', email: 'john@example.com' },
      { username: 'jane_doe', email: 'jane@example.com' },
      { username: 'sam_smith', email: 'sam@example.com' },
      { username: 'lucy_liu', email: 'lucy@example.com' },
    ]);
    console.log('Users created:', users);

    // Create thoughts
    const thoughts = await Thought.insertMany([
      { thoughtText: "Here's John's first thought.", username: 'john_doe' },
      { thoughtText: "John's second thought is insightful!", username: 'john_doe' },
      { thoughtText: "Jane's random thought.", username: 'jane_doe' },
      { thoughtText: "Sam shares a profound idea.", username: 'sam_smith' },
      { thoughtText: "Lucy's exciting travel story!", username: 'lucy_liu' },
    ]);
    console.log('Thoughts created:', thoughts);

    // Associate thoughts with users
    await User.findOneAndUpdate(
      { username: 'john_doe' },
      { $push: { thoughts: [thoughts[0]._id, thoughts[1]._id] } }
    );
    await User.findOneAndUpdate(
      { username: 'jane_doe' },
      { $push: { thoughts: [thoughts[2]._id] } }
    );
    await User.findOneAndUpdate(
      { username: 'sam_smith' },
      { $push: { thoughts: [thoughts[3]._id] } }
    );
    await User.findOneAndUpdate(
      { username: 'lucy_liu' },
      { $push: { thoughts: [thoughts[4]._id] } }
    );
    console.log('Thoughts associated with users.');

    // Add reactions to thoughts
    thoughts[0].reactions.push({
      reactionBody: 'Amazing thought!',
      username: 'jane_doe',
    });
    thoughts[0].reactions.push({
      reactionBody: 'Very insightful!',
      username: 'lucy_liu',
    });

    thoughts[2].reactions.push({
      reactionBody: 'I love this!',
      username: 'sam_smith',
    });

    thoughts[3].reactions.push({
      reactionBody: 'Thought-provoking!',
      username: 'john_doe',
    });

    await thoughts[0].save();
    await thoughts[2].save();
    await thoughts[3].save();
    console.log('Reactions added to thoughts.');

    // Establish bi-directional friendships
    await User.findByIdAndUpdate(
      users[0]._id, // John
      { $addToSet: { friends: [users[1]._id, users[2]._id] } }
    );
    await User.findByIdAndUpdate(
      users[1]._id, // Jane
      { $addToSet: { friends: [users[0]._id, users[3]._id] } }
    );
    await User.findByIdAndUpdate(
      users[2]._id, // Sam
      { $addToSet: { friends: [users[0]._id, users[3]._id] } }
    );
    await User.findByIdAndUpdate(
      users[3]._id, // Lucy
      { $addToSet: { friends: [users[1]._id, users[2]._id] } }
    );
    console.log('Friendships established.');

    console.log('Database seeding complete!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
  }
};

seedDatabase();
