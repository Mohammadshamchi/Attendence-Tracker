# Attendance Tracker System

This project consists of a frontend React application and a backend Node.js server for tracking attendance.

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/Mohammadshamchi/Attendence-Tracker.git
   cd Attendence-Tracker
   ```

2. Install dependencies for both client and server:
   ```
   npm install
   ```

## Running the Application

To run both frontend and backend concurrently in development mode:

```
npm run dev
```

This will start the backend server and the frontend development server.

- The backend will be available at `http://localhost:5000` (or the port specified in your .env file)
- The frontend will be available at `http://localhost:5173`

## Building for Production

1. Build the frontend:

   ```
   npm run build
   ```

2. To start the production server (which will serve the built frontend):
   ```
   npm start
   ```

## Project Structure

- `/client`: Frontend React application
- `/server`: Backend Node.js server

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
