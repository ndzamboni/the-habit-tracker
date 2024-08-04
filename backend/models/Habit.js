const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  frequency: { type: String, enum: ['daily', 'monthly', 'yearly'], required: true },
  color: { type: String, required: true },
  logs: [{ date: { type: Date, required: true }, completed: { type: Boolean, required: true } }],
});

const Habit = mongoose.model('Habit', HabitSchema);

module.exports = Habit;
