# Instagram Clone

This project is an advanced Instagram clone built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with modern tools and libraries such as Redux Toolkit Query (RTK Query) for state management and data fetching, and Tailwind CSS for styling. It includes features to replicate the functionality of Instagram.

## Features

- **User Authentication**: Secure sign-up and login functionality with JWT.
- **Photo Upload**: Users can upload images with captions.
- **Video Upload and Reels**: Share video content with users, including a dedicated reels section.
- **Feed**: View posts and reels from all users in a chronological feed.
- **User Profiles**: Each user has a profile displaying their posts and videos.
- **Like and Comment**: Interact with posts and reels through likes and comments.
- **Follow and Unfollow**: Follow other users to see their content on your feed.
- **Notifications**: Stay updated with notifications for likes, comments, follows, and mentions.
- **Search**: Search for users and content by hashtags or usernames.
- **Responsive Design**: Fully responsive layout for an optimal experience on any device.

## Live Demo

Experience the application live: [Instagram Clone](https://instagram-one-gilt.vercel.app)

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Solaget/instagram-clone.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd instagram-clone
   ```

3. **Install dependencies for both client and server**:

   ```bash
   # Install server dependencies
   cd backend
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

4. **Set up environment variables**:

   Create a `.env` file in the `backend` directory with the following content:

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_URL=your_cloudinary_url # For image and video uploads
   ```

5. **Start the development servers**:

   ```bash
   # Start the server
   cd backend
   npm start

   # Start the client
   cd ../client
   npm start
   ```

   The application should now be running at `http://localhost:3000`.

## Technologies Used

### Frontend

- **Framework**: React.js
- **State Management**: Redux Toolkit Query (RTK Query)
- **Styling**: Tailwind CSS
- **Video Rendering**: React Player

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Cloud Storage**: Cloudinary for media uploads

### Additional Features

- **Real-Time Notifications**: WebSocket (Socket.IO) integration for instant updates.
- **Optimized API**: RESTful API with efficient state synchronization via RTK Query.

## Contributing

Contributions are welcome! Please fork the repository, create a branch for your feature or bug fix, and submit a pull request.

---

*Note: This project is for educational purposes and is not affiliated with or endorsed by Instagram.* 
