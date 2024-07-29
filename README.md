# Online Movie Ticket Booking System

## Overview

The Online Movie Ticket Booking System is a web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). This platform allows users to book movie tickets online, manage their profiles, view booking history, and much more. It includes features for admins, production companies, and show owners to manage movies, cast, crew, and bookings.

## Features

### Admin Features
- **Authorization**: Login, forgot password, change password, and profile management.
- **User Management**: View, add, edit, delete users and assign roles and permissions.
- **Movie Management**: Add, edit, delete movies.
- **Cast Management**: Add, edit, delete cast members.
- **Crew Management**: Add, edit, delete crew members.
- **Booking Management**: View, cancel bookings, manage payments.
- **Analytics and Reports**: Generate and view ticket sales, user activity, and movie performance reports.
- **Notification Management**: Manage notifications for new registrations and approval requests.
- **Promotions and Discounts**: Manage coupons, promo codes, seasonal offers, and bundle offers.

### User Features
- **Authentication**: Register, login, and manage profiles.
- **Movie Browsing**: Browse movies and view details.
- **Ticket Booking**: Book tickets for movies, view booking history, and manage bookings.
- **Payment Management**: Handle payments securely.

## Tech Stack

- **Frontend**: React.js, Material-UI, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Docker, AWS (or any preferred cloud service)

## Installation

### Prerequisites

- Node.js
- MongoDB
- Docker (optional, for containerized deployment)

### Steps

1. **Clone the Repository**
    ```bash
    git clone https://github.com/your-repo/online-movie-ticket-booking.git
    cd online-movie-ticket-booking
    ```

2. **Backend Setup**
    ```bash
    cd backend
    npm install
    ```

3. **Environment Variables**
    - Create a `.env` file in the `backend` directory.
    - Add the following environment variables:
      ```env
      PORT=5000
      MONGO_URI=your_mongodb_connection_string
      JWT_SECRET=your_jwt_secret
      ```

4. **Run the Backend Server**
    ```bash
    npm start
    ```

5. **Frontend Setup**
    ```bash
    cd ../frontend
    npm install
    ```

6. **Environment Variables**
    - Create a `.env` file in the `frontend` directory.
    - Add the following environment variables:
      ```env
      REACT_APP_API_URL=http://localhost:5000/api
      ```

7. **Run the Frontend Server**
    ```bash
    npm start
    ```

8. **Access the Application**
    - Open your browser and go to `http://localhost:3000`.

## Usage

### Admin

1. **Login**: Use admin credentials to log in.
2. **Manage Users**: Navigate to the user management section to add, edit, or delete users.
3. **Manage Movies**: Add new movies, edit existing ones, or delete irrelevant movies.
4. **View Reports**: Access analytics and reports to monitor ticket sales, user activity, and movie performance.

### User

1. **Register**: Create a new account.
2. **Browse Movies**: View available movies and their details.
3. **Book Tickets**: Select a movie, choose showtime and location, and book tickets.
4. **Manage Bookings**: View booking history and manage your bookings.

## Contributing

We welcome contributions from the community. Please follow these steps to contribute:

1. **Fork the repository**.
2. **Create a new branch** (`git checkout -b feature-branch`).
3. **Commit your changes** (`git commit -m 'Add some feature'`).
4. **Push to the branch** (`git push origin feature-branch`).
5. **Create a Pull Request**.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or support, please contact [irene.mariyam123@gmail.com].
