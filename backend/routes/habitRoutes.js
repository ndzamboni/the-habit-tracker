const express = require('express');
const Habit = require('../models/Habit');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Create habit
router.post('/', authMiddleware, async (req, res) => {
  const { name, frequency, color } = req.body;
  try {
    const habit = await Habit.create({ userId: req.user._id, name, frequency, color });
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
  const { date, completed } = req.body;
  try {
    const habit = await Habit.findById(habitId);
    habit.logs.push({ date, completed });
    await habit.save();
    res.json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
