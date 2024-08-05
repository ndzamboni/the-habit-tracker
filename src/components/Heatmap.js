import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import { Tooltip } from 'react-tooltip';
import 'react-calendar-heatmap/dist/styles.css';
import './Heatmap.css'; // Custom CSS for heatmap

function Heatmap({ habits, category }) {
  const today = new Date();
  const startDate = new Date(today.getFullYear(), today.getMonth() - 5, today.getDate());
  
  const habitLogs = habits.filter(habit => habit.category === category).flatMap(habit => habit.logs);
  const dateCounts = habitLogs.reduce((acc, log) => {
    const date = log.date.split('T')[0];
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += 1;
    return acc;
  }, {});

  const heatmapData = Object.entries(dateCounts).map(([date, count]) => ({
    date,
    count,
  }));

  return (
    <div>
      <h3>{category} - Daily Habit Completions</h3>
      <CalendarHeatmap
        startDate={startDate}
        endDate={today}
        values={heatmapData}
        classForValue={(value) => {
          if (!value) {
            return 'color-empty';
          }
          return `color-scale-${Math.min(value.count, 4)}`; // Assuming a max scale of 4 for simplicity
        }}
        tooltipDataAttrs={(value) => {
          return {
            'data-tooltip-id': 'heatmap-tooltip',
            'data-tooltip-content': value.date ? `${value.date}: ${value.count} habit(s)` : 'No data',
          };
        }}
      />
      <Tooltip id="heatmap-tooltip" />
    </div>
  );
}

export default Heatmap;
