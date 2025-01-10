# A.R.I.A. (Artificial Response & Interaction System)

**A.R.I.A.** is an AI-powered chatbot designed to enhance conversational AI capabilities. Built using the MERN stack, GPT-3.5, and Material-UI, it provides secure, scalable, and responsive interactions for a seamless user experience.

## Features
- **Advanced AI Capabilities**: Powered by GPT-3.5 for natural and engaging conversations.
- **Secure Authentication**: Implements JWT, bcrypt, and HTTP-only cookies for user authentication and session management.
- **Responsive Front-End**: Built with Vite.js and Material-UI for a modern, user-friendly interface.
- **Persistent Chat Histories**: Stores user conversations in MongoDB for easy access and continuity.
- **Scalable Architecture**: Designed to handle high traffic efficiently using the MERN stack.

## Tech Stack
- **Back-End**: Node.js, Express.js
- **Front-End**: React.js, Vite.js, Material-UI
- **Database**: MongoDB
- **AI Integration**: OpenAI API
- **Authentication**: JWT, bcrypt

## Installation and Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/YashInTech/A.R.I.A..git
   ```
2. Navigate to the project directory:
   ```bash
   cd ARIA
   ```
3. Install dependencies for both the client and server:
   ```bash
   npm install
   cd client
   npm install
   cd ..
   ```
4. Create a `.env` file in the backend directory and add the following variables:
   ```env
   OPENAI_SECRET=<your_openai_api_key>
   OPENAI_ORGANISATION_ID=<your_openai_org_id>
   MONGODB_URL=<your_mongo_connection_string>
   JWT_SECRET=<your_jwt_secret>
   COOKIE_SECRET=<your_cookie_secret>
   ```
5. Start the development servers:
   - Server:
     ```bash
     npm run server
     ```
   - Client:
     ```bash
     cd client
     npm start
     ```

## Usage
- Navigate to `http://localhost:3000` to access the chatbot interface.
- Register or log in to start interacting with **A.R.I.A.**.
- Explore conversational AI capabilities and manage chat histories.

## Contributing
Contributions are welcome! Feel free to submit issues or pull requests for improvements and feature suggestions.

## License
This project is licensed under the [MIT License](LICENSE).
