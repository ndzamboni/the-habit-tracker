import { useEffect } from 'react';

const useReminder = (habit, time) => {
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      if (now.getHours() === time.getHours() && now.getMinutes() === time.getMinutes()) {
        new Notification(`Reminder for habit: ${habit.name}`);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [habit, time]);
};

export default useReminder;
