import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [habits, setHabits] = useState([]);
  
  useEffect(() => {
    // Fetch user profile data
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/profile/user`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    // Fetch user habits and streaks
    const fetchUserHabits = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/profile/user/habits`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setHabits(data);
      } catch (error) {
        console.error('Error fetching user habits:', error);
      }
    };

    fetchUserProfile();
    fetchUserHabits();
  }, []);

  return (
    <Container>
      <h1>Your Profile</h1>
      <Row>
        <Col md={4}>
          {/* User Overview */}
          <div className="profile-overview">
            <h2>User Overview</h2>
            {userData ? (
              <div>
                <p><strong>Username:</strong> {userData.username}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Total Habits:</strong> {habits.length}</p>
              </div>
            ) : (
              <p>Loading user data...</p>
            )}
          </div>
        </Col>
        <Col md={8}>
          {/* Advanced Analytics */}
          <div className="profile-analytics">
            <h2>Advanced Analytics</h2>
            {habits.length > 0 ? (
              <div>
                <p><strong>Active Streaks:</strong> {calculateActiveStreaks(habits)}</p>
                {/* You can add more analytics here like charts */}
              </div>
            ) : (
              <p>Loading habits data...</p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

// Helper function to calculate active streaks
function calculateActiveStreaks(habits) {
  const activeStreaks = habits.map(habit => {
    const logs = habit.logs.sort((a, b) => new Date(b.date) - new Date(a.date));
    let streak = 1;
    for (let i = 1; i < logs.length; i++) {
      const prevDate = new Date(logs[i - 1].date);
      const currDate = new Date(logs[i].date);
      const diffDays = (prevDate - currDate) / (1000 * 60 * 60 * 24);
      if (diffDays === 1) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  });
  return Math.max(...activeStreaks);
}

export default UserProfile;
