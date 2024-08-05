const express = require('express');
const Habit = require('../models/Habit');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function calculateFrequency(logs) {
  const logDates = logs.map(log => new Date(log.date));
  const sortedDates = logDates.sort((a, b) => a - b);
  const intervals = [];

  for (let i = 1; i < sortedDates.length; i++) {
    intervals.push((sortedDates[i] - sortedDates[i - 1]) / (1000 * 60 * 60 * 24));
  }

  const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;

  if (avgInterval <= 1) return 'daily';
  if (avgInterval <= 7) return 'weekly';
  if (avgInterval <= 30) return 'monthly';
  return 'yearly';
}

// Create habit
router.post('/', authMiddleware, async (req, res) => {
  const { name, category, date, duration } = req.body;
  try {
    let color;
    const existingHabit = await Habit.findOne({ userId: req.user._id, category });

    if (existingHabit) {
      color = existingHabit.color;
    } else {
      color = getRandomColor();
    }

    const habit = await Habit.create({ userId: req.user._id, name, category, frequency: 'daily', color, logs: [{ date, duration }] });
    res.status(201).json(habit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get user habits
router.get('/:userId', authMiddleware, async (req, res) => {
  const { userId } = req.params;
  try {
    const habits = await Habit.find({ userId });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Log habit activity
router.post('/log/:habitId', authMiddleware, async (req, res) => {
  const { habitId } = req.params;
  const { date, duration } = req.body;
  try {
    const habit = await Habit.findById(habitId);
    habit.logs.push({ date, duration });
    habit.frequency = calculateFrequency(habit.logs);
    await habit.save();
    res.json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete habit
router.delete('/:habitId', authMiddleware, async (req, res) => {
  const { habitId } = req.params;
  try {
    await Habit.findByIdAndDelete(habitId);
    res.json({ message: 'Habit deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete category
router.delete('/category/:category', authMiddleware, async (req, res) => {
  const { category } = req.params;
  try {
    await Habit.deleteMany({ userId: req.user._id, category });
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
