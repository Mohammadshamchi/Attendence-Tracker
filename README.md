# Attendance Tracker System

This project consists of a frontend React application and a backend Node.js server for tracking attendance.

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Mohammadshamchi/attendance-system.git
   cd attendance-system
   ```

2. Install dependencies for both client and server:
   ```
   npm run install-all
   ```

## Configuration

1. Navigate to the `server` directory and create a `.env` file based on `.env.example`:
   ```
   cd server
   cp .env.example .env
   ```
   Edit the `.env` file with your specific configuration (e.g., database connection details).

2. Return to the root directory:
   ```
   cd ..
   ```

## Running the Application

1. Start the backend server:
   ```
   npm run server
   ```

2. In a new terminal, start the frontend development server:
   ```
   npm run client
   ```

3. Open your browser and visit `http://localhost:5173` to view the application.

## Development

- To run both frontend and backend concurrently:
  ```
  npm run dev
  ```

## Testing

- Run backend tests:
  ```
  npm run test:server
  ```

- Run frontend tests:
  ```
  npm run test:client
  ```

## Building for Production

1. Build the frontend:
   ```
   npm run build:client
   ```

2. The built frontend will be available in `client/dist/`.

3. To serve the built frontend and run the backend:
   ```
   npm run start
   ```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.