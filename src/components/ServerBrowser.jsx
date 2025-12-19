import React from 'react';
import { createUseStyles } from 'react-jss';
import LogoutButton from './LogoutButton';
import GameItem from './GameItem';
import CreateGameButton from './CreateGameButton';
import ReloadButton from './ReloadButton';

const useStyles = createUseStyles({
    lobbyContainer: {
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // Ensure it fills the parent
        boxSizing: 'border-box',
    },
    topBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        zIndex: 100,
        width: '100%',
        boxSizing: 'border-box',
        pointerEvents: 'none', // Let clicks pass through the empty bar area
    },
    topBarItem: {
        pointerEvents: 'auto', // Re-enable clicks for the button
        display: 'flex',
        gap: '1rem',
    },
    gameListContainer: {
        width: '100%',
        maxWidth: '37.5rem', // ~600px
        // Height allows showing roughly 2.5 items to hint at scrolling
        height: '60vh',
        overflowY: 'auto',
        padding: '1rem 4rem', // Padding to account for skew/shadow clipping
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // Custom Scrollbar styling
        '&::-webkit-scrollbar': {
            width: '0.75rem',
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderLeft: '1px solid rgba(255,255,255,0.1)',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#F3AF19',
            border: '0.125rem solid #1a1a1a',
        },
    },
    noGamesMessage: {
        color: '#ffffff',
        fontFamily: '"Arial Black", "Impact", sans-serif',
        fontSize: '2rem',
        textTransform: 'uppercase',
        textShadow: '0.125rem 0.125rem 0px #1a1a1a',
        transform: 'skew(-5deg)',
        marginTop: '2rem',
        textAlign: 'center',
    }
});

const ServerBrowser = ({ games, onRetry }) => {
    const classes = useStyles();

    // Ensure games is an array
    const gameList = Array.isArray(games) ? games : [];

    return (
        <div className={classes.lobbyContainer}>
            <div className={classes.topBar}>
                <div className={classes.topBarItem}>
                    <LogoutButton onRetry={onRetry} />
                </div>
                <div className={classes.topBarItem}>
                    <ReloadButton onClick={onRetry} />
                    <CreateGameButton onSuccess={onRetry} />
                </div>
            </div>

            <div className={classes.gameListContainer}>
                {gameList.length > 0 ? (
                    gameList.map((game, index) => <GameItem key={game.id || index} game={game} onRetry={onRetry} />)
                ) : (
                    <div className={classes.noGamesMessage}>No Active Games</div>
                )}
            </div>
        </div>
    );
};

export default ServerBrowser;