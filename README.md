# Habit Tracker App

## Description

The Habit Tracker App is a comprehensive tool designed to help users track and manage their habits effectively. It offers a clean, responsive UI with both light and dark modes, and allows users to visualize their habits through various types of charts. The app also supports feature requests from users, ensuring continuous improvement based on user feedback.

## Features

- **User Authentication**: Register, login, and manage user profiles.
- **Habit Tracking**: Track habits with categories, dates, and durations.
- **Visualization**: Multiple chart types including line, bar, pie, radar, and heatmap.
- **Dark/Light Mode**: Toggle between dark and light themes.
- **Responsive Design**: Mobile-friendly interface.
- **Feature Requests**: Users can submit feature requests through a modal form.
- **FAQ and About Us**: Sections to provide information and support.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/habit-tracker.git
   cd habit-tracker

2. **Install dependencies**:
    ```bash
    npm install
    ```
3. **Set up environment variables**:
    ```bash
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```
4. **Run the app**:
    ```bash
    rpm run dev
    ```

## Usage

1. **Register**: Create a new account

2. **Login**: Access your account using your credentials

3. **Dashboard**: Add, view, and delete habits. Filter habits by category and visualize your data.

4. **Feature Requests**: Submit ideas and suggestions for improving the app.

## Technologies Used

- **Frontend**: React, Redux, React Router, Chart.js, Nivo, Bootstrap
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT
- **Styling**: CSS, Bootstrap

## Screenshots

![Screenshot 1](/src/images/demo1.PNG)
![Screenshot 2](/src/images/demo2.PNG)
![Screenshot 3](/src/images/demo3.PNG)

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
