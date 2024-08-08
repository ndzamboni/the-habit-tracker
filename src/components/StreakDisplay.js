import React from 'react';
import './StreakDisplay.css';

function StreakDisplay({ habits }) {
  const calculateStreak = (logs) => {
    if (logs.length === 0) return 0;

    const sortedLogs = logs.sort((a, b) => new Date(a.date) - new Date(b.date));
    let currentStreak = 1;
    let maxStreak = 1;

    for (let i = 1; i < sortedLogs.length; i++) {
      const prevDate = new Date(sortedLogs[i - 1].date);
      const currDate = new Date(sortedLogs[i].date);
      const diffDays = Math.round((currDate - prevDate) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        currentStreak += 1;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        currentStreak = 1;
      }
    }

    return maxStreak;
  };

  const categoryStreaks = habits.reduce((acc, habit) => {
    if (!acc[habit.category]) {
      acc[habit.category] = {
        category: habit.category,
        logs: [],
      };
    }
    acc[habit.category].logs = acc[habit.category].logs.concat(habit.logs);
    return acc;
  }, {});

  const streaks = Object.values(categoryStreaks).map((categoryData) => ({
    category: categoryData.category,
    streak: calculateStreak(categoryData.logs),
  }));

  return (
    <div className="streak-display">
      <h3>Current Category Streaks</h3>
      <div className="streak-container">
        {streaks.map((streak) => (
          <div key={streak.category} className="streak-card">
            <h4>{streak.category}</h4>
            <div className="streak-number">{streak.streak} days</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StreakDisplay;
