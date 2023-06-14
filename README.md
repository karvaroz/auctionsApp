
# Auction MERN App

This is an application using express js in the backend and react js in the frontend.
User can participate in an auction and bid## Installation

Install auctionsApp with npm

```bash
  clone this repository
  git clone https://github.com/karvaroz/auctionsApp.git
```

```bash
  install dependencies with npm install
```

```bash
  configure necessary env variables in cd/backend and cd/frontend
  see below
```

```bash
  cd backend/
  npm run start
```

```bash
  cd frontend/
  npm run dev
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### Frontend

`VITE_REACT_APP_API_URL`

### Backend

`MONGO`
`JWT_SECRET_KEY`
`IMAGE_URL`


## Tech Stack Backend

- Node js
- Express js
- cors
- dotenv
- bcryptjs
- joi
- jsonwebtoken
- mongoose
- morgan
- nodemon
- redis
- socket.io
- @socket.io/redis-adapter

## Tech Stack Frontend

- React js
- axios
- jwt-decode
- react-hook-form
- react-icons
- react-router-dom
- socket.io-client
- sweetalert2
- Tailwind css

## Features

- Register a new user
- Login
- Create an Ad
- Get all Ads
- Get Ad by Id
- Join Room
- Get Room by Id
- Start Auction
- Offer a Bid
- Get All bids
- Health Check

## Deploy

- Backend on Render: https://auction-app-backend-karvaroz.onrender.com/api/v1
- Frontend on Netlify: https://auction-app-frontend-karvaroz.netlify.app/

## Authors

- [@karvaroz](https://www.github.com/karvaroz)

