# LawVriksh Authentication API

Hey there! This is a simple backend authentication service I built for LawVriksh. It handles Google OAuth login and provides a secure way to access protected content through JWT tokens.

## What does it do?

The main goal was to create a clean authentication system where users can:
- Sign in with their Google account
- Get a JWT token after successful login  
- Use that token to access protected legal content

Pretty straightforward, right?

## Tech Stack

I kept it simple and used:
- **Node.js** with **Express.js** for the server
- **MongoDB** to store user information
- **Passport.js** for handling Google OAuth
- **JWT** for token-based authentication
- **Mongoose** for database operations

## Getting Started

### What you'll need:
- Node.js installed on your machine
- A MongoDB database (local or cloud)
- Google OAuth credentials from Google Cloud Console

### Setting up Google OAuth:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or use an existing one)
3. Enable the Google+ API
4. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized redirect URI: `http://localhost:3000/auth/google/callback`
5. Save your Client ID and Client Secret - you'll need these!

### Installation:

```bash
# Clone the project
git clone <your-repo-url>
cd backend-intern-auth

# Install dependencies
npm install
```

### Environment Configuration:

Create a `.env` file in the root directory and add your credentials:

```env
# Your Google OAuth credentials
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

# JWT secret (make this something random and secure!)
JWT_SECRET=your_super_secret_jwt_key_make_it_long_and_random

# MongoDB connection
MONGODB_URI=mongodb://localhost:27017/lawvriksh_auth

# Server port
PORT=3000
```

### Running the application:

```bash
# For development (with auto-restart)
npm run dev

# For production
npm start
```

The server will be running at `http://localhost:3000`

## How it works

### Authentication Flow:
1. User visits `/auth/google` to start the login process
2. They get redirected to Google's login page
3. After successful login, Google sends them back to `/auth/google/callback`
4. Our server creates a JWT token and sends it back
5. User can now use this token to access protected endpoints

### Protected Endpoints:
The main protected endpoint is `/api/posts` which returns legal content. You need to include the JWT token in the Authorization header like this:
```
Authorization: Bearer your_jwt_token_here
```

## API Endpoints

### Authentication:
- `GET /auth/google` - Start Google OAuth login
- `GET /auth/google/callback` - Handle OAuth callback

### Protected Content:
- `GET /api/posts` - Get legal posts (requires JWT token)

## Testing with Postman

I've included a Postman collection (`LawVriksh_Auth_API_Simple.postman_collection.json`) that shows:

1. **OAuth Flow**: How to initiate login and handle the callback
2. **Unauthorized Access**: What happens when you try to access protected content without a token
3. **Authorized Access**: Successfully accessing content with a valid token

Just import the collection into Postman and you'll see examples of all the different scenarios!

## Project Structure

```
src/
├── app.js              # Main server setup
├── config/
│   ├── database.js     # MongoDB connection
│   └── passport.js     # Google OAuth setup
├── middleware/
│   └── auth.js         # JWT verification
├── models/
│   └── User.js         # User database model
└── routes/
    ├── auth.js         # Login/logout routes
    └── api.js          # Protected content routes
```
## What I learned building this

This was a really good exercise in understanding how modern authentication works. Here are some key things I picked up:

### JWT vs Sessions
I decided to go with JWT tokens because they're stateless - the server doesn't need to remember anything about the user session. This makes it easier to scale and perfect for API-based applications.

### Google OAuth Integration
Setting up OAuth was trickier than I expected! The callback URL configuration is crucial - if it doesn't match exactly what you set in Google Cloud Console, nothing works. Also learned that you need to handle the authorization code properly to exchange it for user information.

### Error Handling
I made sure to handle different error scenarios:
- What happens if someone tries to access protected content without a token
- Invalid or expired tokens
- Server errors

### Security Considerations
- Used CORS to control which domains can access the API
- JWT tokens expire after 24 hours for security
- Stored sensitive configuration in environment variables

## Common Issues (and how I fixed them)

1. **"Redirect URI mismatch"**: Make sure your callback URL in `.env` exactly matches what you set in Google Cloud Console
2. **MongoDB connection errors**: Check if MongoDB is running and the connection string is correct
3. **JWT verification fails**: The secret in your `.env` file must be the same one used to sign the tokens

## What's next?

This is a basic implementation that covers the core requirements. In a real-world application, you might want to add:
- Refresh tokens for better security
- Rate limiting to prevent abuse
- More detailed user profiles
- Logging for better debugging

But for now, this does exactly what was asked for - simple, secure authentication with Google OAuth and JWT tokens!

## Need help?

If you run into any issues, check the Postman collection first - it has examples of all the requests and expected responses. The console logs will also show you what's happening during the OAuth flow.

---

That's it! Pretty straightforward authentication service that gets the job done.
