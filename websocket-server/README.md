# WebSocket Server

This project is a WebSocket server built with Node.js. It allows real-time communication between clients and the server using the WebSocket protocol.

## Project Structure

```
websocket-server
├── src
│   ├── server.js          # Entry point for the WebSocket server
│   ├── handlers
│   │   └── websocket.js   # Handles WebSocket events
│   └── config
│       └── index.js       # Configuration settings
├── package.json           # npm configuration file
├── .env                   # Environment variables
├── .gitignore             # Git ignore file
└── README.md              # Project documentation
```

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd websocket-server
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

## Configuration

Create a `.env` file in the root directory and specify the port number for the WebSocket server:

```
PORT=3000
```

## Running the Server

To start the WebSocket server, run the following command:

```bash
npm start
```

## Usage

Once the server is running, clients can connect to it using the WebSocket protocol. The server will handle incoming connections and messages as defined in the `src/handlers/websocket.js` file.

## License

This project is licensed under the MIT License.