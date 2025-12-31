# Frontend Mentor - Memory game solution

This is a solution to the [Memory game challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/memory-game-vse4WFPvM). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Features](#features)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Project Structure](#project-structure)
  - [Key Features Implementation](#key-features-implementation)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Getting Started](#getting-started)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the game depending on their device's screen size
- See hover states for all interactive elements on the page
- Play the Memory game either solo or multiplayer (up to 4 players)
- Set the theme to use numbers or icons within the tiles
- Choose to play on either a 6x6 or 4x4 grid

### Features

#### Single Player Mode
- **Theme Selection**: Choose between Numbers or Icons for tile content
- **Grid Size Options**: Play on a 4x4 (8 pairs) or 6x6 (18 pairs) grid
- **Game Timer**: Real-time elapsed time tracking that starts on first move
- **Move Counter**: Tracks the number of moves made during the game
- **Match Detection**: Automatic detection of matching pairs with visual feedback
- **Fade Animation**: Matched pairs fade out smoothly
- **Results Modal**: Game completion screen showing time elapsed and moves taken
- **Restart & New Game**: Options to restart current game or setup a new one

#### Online Multiplayer Mode
- **Room Creation**: Create private game rooms with unique shareable links
- **Player Lobby**: Waiting room for players to join before game starts
- **Up to 4 Players**: Support for 2, 3, or 4 player games
- **Ready System**: Non-host players must mark themselves as ready before game can start
- **Custom Player Names**: Players can set their display name before joining
- **Host Controls**: Room creator can start, restart, or cancel games
- **Turn-Based Gameplay**: Clear indication of whose turn it is with visual indicators
- **Real-Time Sync**: All game actions synchronized across all players via WebSockets
- **Pause/Resume**: Any player can pause the game; only the pauser can resume
- **Player Left Handling**: Graceful handling when a player leaves mid-game
- **Game Results**: Winner announcement with tie detection for equal scores

#### Responsive Design
- **Mobile-First Approach**: Optimized for mobile devices first, then scaled up
- **Mobile Menu**: Full-screen overlay menu for mobile devices
- **Tablet Dropdown**: Compact dropdown menu for tablet-sized screens
- **Desktop Navigation**: Full navigation bar with all options visible
- **Adaptive Grid**: Tile sizes adjust based on screen size and grid configuration

### Screenshot

<!-- Add screenshots here -->

### Links

- Solution URL: [GitHub](https://github.com/DrakeHermit/memory-game)
<!-- - Live Site URL: [Live Site](https://your-live-site-url.com) -->

## My process

### Built with

- [React 19](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework
- [Zustand](https://zustand-demo.pmnd.rs/) - Lightweight state management
- [React Router DOM v7](https://reactrouter.com/) - Client-side routing
- [Socket.io Client](https://socket.io/) - Real-time bidirectional communication
- [React Icons](https://react-icons.github.io/react-icons/) - Popular icon packs as React components
- Mobile-first workflow
- CSS Grid & Flexbox

### Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── GameBoard.tsx          # Single player game tile component
│   │   ├── MultiplayerGameBoard.tsx # Multiplayer game tile (memoized)
│   │   ├── NavBar.tsx             # Main navigation with responsive menus
│   │   ├── MobileMenu.tsx         # Mobile overlay menu
│   │   ├── TabletDropdown.tsx     # Tablet dropdown menu
│   │   ├── Header.tsx             # Logo header component
│   │   ├── Icon.tsx               # SVG icon renderer for icon theme
│   │   ├── TimeComponent.tsx      # Game timer display
│   │   ├── MultiplayerFooter.tsx  # Player score cards with turn indicator
│   │   ├── ResultsModal.tsx       # Single player game over modal
│   │   ├── MultiplayerResultModal.tsx # Multiplayer results with rankings
│   │   ├── PausedGameModal.tsx    # Pause overlay for multiplayer
│   │   ├── PlayerLeftModal.tsx    # Player disconnection notification
│   │   ├── SinglePlayerContent.tsx # Game setup form for single player
│   │   └── MultiplayerSetup.tsx   # Room creation interface
│   │
│   ├── pages/
│   │   ├── GamePage.tsx           # Single player game view
│   │   ├── MultiplayerGamePage.tsx # Multiplayer game view
│   │   └── LobbyPage.tsx          # Multiplayer waiting room
│   │
│   ├── store/
│   │   ├── gameStateStore.ts      # Single player game state (Zustand)
│   │   ├── socketStore.ts         # WebSocket connection & multiplayer state
│   │   └── useLobbyStore.ts       # Game settings & form state (persisted)
│   │
│   ├── hooks/
│   │   ├── useGameTimer.ts        # Timer logic with start/stop/reset
│   │   └── useLobbyEffects.ts     # Socket event handlers for lobby/game
│   │
│   ├── layout/
│   │   └── LobbyLayout.tsx        # Shared layout for setup screens
│   │
│   ├── types/
│   │   └── game.ts                # TypeScript interfaces (Coin, Player, GameState)
│   │
│   ├── utils/
│   │   └── gameUtils.ts           # Grid generation & shuffle functions
│   │
│   ├── App.tsx                    # Router configuration
│   ├── main.tsx                   # React entry point
│   └── index.css                  # Global styles & Tailwind imports
│
├── public/
│   └── assets/
│       ├── icons/                 # SVG icons for icon theme
│       ├── favicon-32x32.png
│       ├── logo.svg
│       └── memory-logo-*.png
│
└── package.json
```

### Key Features Implementation

#### State Management with Zustand

Three separate stores handle different aspects of the application:

1. **`gameStateStore.ts`** - Manages single player game logic:
   - Game phase tracking (`waitingForTurn`, `firstCoinFlipped`, `clearingCoins`, `gameOver`)
   - Flipped coins array
   - Matched pairs tracking
   - Move counter
   - Game timer string

2. **`socketStore.ts`** - Handles multiplayer functionality:
   - WebSocket connection management
   - Player ID persistence via sessionStorage
   - Room creation/joining/leaving
   - Real-time game state synchronization
   - Event handlers for all socket events

3. **`useLobbyStore.ts`** - Persists game settings:
   - Theme selection (numbers/icons)
   - Player count (1-4)
   - Grid size (4x4/6x6)
   - Uses Zustand's persist middleware with localStorage

#### Real-Time Multiplayer

The multiplayer system uses Socket.io for real-time communication:

```typescript
// Key socket events handled:
- 'roomCreated'      // Room successfully created
- 'joinRoom'         // Player joined a room
- 'playerJoined'     // Another player joined
- 'playerLeftRoom'   // Player disconnected
- 'gameState'        // Full game state update
- 'gameStarted'      // Game has begun
- 'gamePaused'       // Game paused by a player
- 'gameResumed'      // Game resumed
- 'flipCoinsBack'    // Non-matching coins should flip back
- 'roomRemoved'      // Room has been deleted
```

#### Game Logic - Singleplayer

The game uses a state machine pattern for managing game phases:

1. **waitingForTurn** - Ready for first coin selection
2. **firstCoinFlipped** - One coin revealed, waiting for second
3. **matchingCoins** - Two coins revealed, checking for match
4. **clearingCoins** - Non-matching coins flipping back (500ms delay)
5. **gameOver** - All pairs matched

#### Responsive Navigation

The NavBar component adapts to screen size:
- **Mobile (<768px)**: Menu button opens full-screen MobileMenu overlay
- **Tablet (768px-1024px)**: Dropdown menu with TabletDropdown component
- **Desktop (>1024px)**: Full inline navigation buttons

### What I learned

- **Real-time multiplayer architecture**: Implementing turn-based gameplay with WebSockets, handling race conditions, and maintaining synchronized state across multiple clients
- **Zustand state management**: Using multiple stores with different persistence strategies and integrating with React hooks
- **TypeScript with React**: Strong typing for components, stores, and socket events
- **Game state machines**: Managing complex game flow with predictable state transitions
- **Session persistence**: Maintaining player identity across page refreshes using sessionStorage
- **Responsive design patterns**: Building adaptive UIs that work seamlessly across device sizes

### Continued development

Future improvements could include:

 - Implement rematch functionality in multiplayer
 - Add database persistance

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/DrakeHermit/memory-game.git
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the frontend directory:
   ```env
   VITE_BACKEND_URL=http://localhost:3000
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

> **Note**: For multiplayer functionality, you'll also need to run the backend server. See the backend README for setup instructions.

## Author

- Frontend Mentor - [@DrakeHermit](https://www.frontendmentor.io/profile/DrakeHermit)
