const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const User = require('../models/User');
const Habit = require('../models/Habit');

const router = express.Router();

// Route to get user profile
router.get('/user', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user data' });
  }
});

// Route to get user habits
router.get('/user/habits', authMiddleware, async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.user._id });
    if (!habits) {
      return res.status(404).json({ message: 'No habits found' });
    }
    res.json(habits);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user habits' });
  }
});

module.exports = router;
