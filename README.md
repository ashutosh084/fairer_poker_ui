# Fairer Poker UI
[Fairer Poker Online Demo](https://youtu.be/zSO_QKLiP58)

This is the frontend user interface for the **Fairer Poker** application. It is built with React and Vite, designed to provide a seamless experience for joining and playing poker games.

## Features

- **Lobby System**: Join active games and wait for other players.
- **Server Browser**: Browse available game servers.
- **Authentication**: Integrated login flow.
- **Real-time Updates**: Uses SWR for efficient data fetching and state synchronization.
- **Responsive Design**: Styled using `react-jss`.

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: React-JSS
- **Data Fetching**: SWR
- **HTTP Client**: Axios
- **Package Manager**: Yarn (v4.12.0)

## Getting Started

### Prerequisites

- Node.js
- Yarn (This project uses Yarn v4)

### Installation

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Start the development server:
   ```bash
   yarn dev
   ```

## Scripts

- `yarn dev`: Starts the development server.
- `yarn build`: Builds the application for production.
- `yarn preview`: Locally preview the production build.
- `yarn lint`: Runs ESLint to check for code quality issues.