const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  frequency: { type: String, enum: ['daily', 'weekly', 'monthly', 'yearly'], required: true },
  color: { type: String, required: true },
  logs: [{ date: { type: Date, required: true }, duration: { type: Number, required: true } }],
});

const Habit = mongoose.model('Habit', HabitSchema);

module.exports = Habit;
