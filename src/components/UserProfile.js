import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user profile data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: userProfile } = await axios.get(`${process.env.REACT_APP_API_URL}/api/profile/user`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUserData(userProfile);
      } catch (err) {
        setError('Error fetching user profile');
        console.error('Error fetching user profile:', err);
      }
    };

    const fetchUserHabits = async () => {
      try {
        const { data: userHabits } = await axios.get(`${process.env.REACT_APP_API_URL}/api/profile/user/habits`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setHabits(userHabits);
      } catch (err) {
        setError('Error fetching user habits');
        console.error('Error fetching user habits:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    fetchUserHabits();
  }, []);

  const calculateActiveStreaks = (habits) => {
    return habits.map((habit) => {
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
  };

  const activeStreaks = calculateActiveStreaks(habits);

  if (loading) {
    return <Spinner animation="border" />;
  }

  return (
    <Container>
      <h1>Your Profile</h1>

      {error && <Alert variant="danger">{error}</Alert>}

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
                <p><strong>Active Streaks:</strong> {Math.max(...activeStreaks)} days</p>
                {/* Add charts or other advanced analytics here */}
              </div>
            ) : (
              <p>No habits to display</p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default UserProfile;
