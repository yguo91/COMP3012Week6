# DevTips Authentication App

A Node.js/Express application for sharing developer tips with user authentication and session management.

## Features

- 🔐 User authentication with session management
- 💡 Create, view, and manage developer tips
- 👍 Like and dislike tips
- 🗑️ Delete tips
- 👤 User-specific tip management
- 📱 Responsive design

## Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **View Engine**: EJS
- **Session Management**: express-session
- **Logging**: Morgan
- **Development**: TSX (TypeScript Execute)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yguo91/COMP3012Week6.git
cd devtips-auth-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3001
```

## Project Structure

```
src/
├── server.ts          # Express server setup and routes
├── data.ts            # Database mock and data functions
├── types.ts           # TypeScript type definitions
├── session.d.ts       # Session type declarations
└── views/
    ├── index.ejs      # Main tips page
    ├── login.ejs      # Login page
    └── partials/
        ├── head.ejs   # HTML head with styles
        └── header.ejs # Page header
```

## Available Scripts

- `npm run dev` - Start development server with TSX
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Run production server (after build)

## Test Accounts

The application comes with two pre-configured test accounts:

| Username | Password |
|----------|----------|
| jimmy123 | jimmy123! |
| sandra123 | sandra123! |

## API Routes

### Authentication
- `GET /login` - Display login page
- `POST /login` - Process login credentials
- `POST /logout` - Destroy session and logout

### Tips Management
- `GET /` - Display user's tips (requires authentication)
- `POST /tips` - Add a new tip
- `POST /tips/:id/like` - Like a tip
- `POST /tips/:id/dislike` - Dislike a tip
- `POST /tips/:id/delete` - Delete a tip

## Key Features Implementation

### Session Management
Sessions are configured with:
- 24-hour expiration
- HTTP-only cookies for security
- Automatic session cleanup on logout

### User Isolation
Each user can only see and manage their own tips. The system uses session-based user identification to ensure data isolation.

### Security Notes
⚠️ **For production deployment**, please:
- Change the session secret key
- Use environment variables for sensitive configuration
- Enable HTTPS and secure cookies
- Implement proper password hashing (currently using plain text for demo)
- Add input validation and sanitization
- Implement rate limiting

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Future Enhancements

- [ ] Password hashing with bcrypt
- [ ] User registration system
- [ ] Password reset functionality
- [ ] Tip categories/tags
- [ ] Search functionality
- [ ] Pagination for tips
- [ ] User profiles
- [ ] Social sharing features
- [ ] Real database integration (PostgreSQL/MongoDB)

## License

This project is licensed under the MIT License.

## Author

Eric Guo

## Acknowledgments

- Built as a lab project for learning authentication in Express.js
- Inspired by developer knowledge sharing communities