const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/habittracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const habitSchema = new mongoose.Schema({
  name: String,
  frequency: String,
  records: [
    {
      date: Date,
      status: String,
    },
  ],
});

const Habit = mongoose.model('Habit', habitSchema);

app.get('/habits', async (req, res) => {
  const habits = await Habit.find();
  res.json(habits);
});

app.post('/habits', async (req, res) => {
  const habit = new Habit(req.body);
  await habit.save();
  res.json(habit);
});

app.put('/habits/:id', async (req, res) => {
  const habit = await Habit.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(habit);
});

app.delete('/habits/:id', async (req, res) => {
  await Habit.findByIdAndDelete(req.params.id);
  res.json({ message: 'Habit deleted' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
