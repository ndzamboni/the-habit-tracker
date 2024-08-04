const express = require('express');
const Habit = require('../models/Habit');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.get('/', protect, async (req, res) => {
  const habits = await Habit.find({ user: req.user._id });
  res.json(habits);
});

router.post('/', protect, async (req, res) => {
  const { name, category, records } = req.body;

  const habit = new Habit({
    user: req.user._id,
    name,
    category,
    records,
  });

  await habit.save();
  res.json(habit);
});

router.put('/:id', protect, async (req, res) => {
  const { name, category, records } = req.body;

  const habit = await Habit.findByIdAndUpdate(
    req.params.id,
    { name, category, records },
    { new: true }
  );

  res.json(habit);
});

router.delete('/:id', protect, async (req, res) => {
  await Habit.findByIdAndDelete(req.params.id);
  res.json({ message: 'Habit deleted' });
});

module.exports = router;
