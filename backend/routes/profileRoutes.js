const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const Habit = require('../models/Habit');
const User = require('../models/User');

const router = express.Router();

// Get user profile data
router.get('/user', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user data' });
  }
});

// Get user habits and streaks
router.get('/user/habits', authMiddleware, async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.user._id });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching habits' });
  }
});

module.exports = router;
