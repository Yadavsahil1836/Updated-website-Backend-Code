import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      index: {
        unique: true,
        sparse: true, // This allows multiple documents without the username field
      },
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photo: { type: String, default: '' },
    role: { type: String, default: 'user' },
  },
  { timestamps: true },
);

// Drop the existing username index if it exists and recreate it with sparse option
mongoose
  .model('User', userSchema)
  .collection.dropIndex('username_1')
  .then(() =>
    console.log('Dropped username index, will be recreated with sparse option'),
  )
  .catch((err) => {
    // It's okay if the index doesn't exist yet
    console.log('Note about index:', err.message);
  });

export default mongoose.model('User', userSchema);
