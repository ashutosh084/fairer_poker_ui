import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createUseStyles } from 'react-jss'
import LoginButton from './components/LoginButton'
import Loader from './components/Loader'
import ErrorScreen from './components/ErrorScreen'
import Lobby from './components/Lobby'
import { useActiveGames } from './hooks/useActiveGames'
import ServerBrowser from './components/ServerBrowser'

const useStyles = createUseStyles({
  '@global': {
    'html, body': {
      margin: 0,
      padding: 0,
      overflow: 'hidden',
    }
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#150050',
  }
});

const App = () => {
  const classes = useStyles();
  const { isLoading, isUnauthorized, isServiceUnavailable, data, retry } = useActiveGames();

  const activeGame = data ? data.find(game => game.active) : null;

  return (
    <div className={classes.container}>
      {isLoading && <Loader />}

      {isServiceUnavailable && <ErrorScreen onRetry={retry} />}

      {isUnauthorized && <LoginButton />}

      {!isServiceUnavailable && !isUnauthorized && data && (
        activeGame ? (
          <Lobby game={activeGame} onRetry={retry} />
        ) : (
          <ServerBrowser games={data} onRetry={retry} />
        )
      )}
    </div>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
