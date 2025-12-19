import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useJoinGame } from '../hooks/useJoinGame';

const useStyles = createUseStyles({
    itemWrapper: {
        position: 'relative',
        width: '100%',
        marginBottom: '1.5rem', // Space between items
        transform: 'skew(-5deg)',
        cursor: 'pointer',
        transition: 'transform 0.1s ease',
        '&:hover': {
            transform: 'skew(-5deg) scale(1.02)',
            zIndex: 10,
        },
        '&:active': {
            transform: 'skew(-5deg) scale(0.98)',
        }
    },
    itemContent: {
        backgroundColor: ({ confirming, hasError }) => (confirming || hasError) ? '#EA4335' : '#00E5FF',
        border: '0.25rem solid #1a1a1a',
        padding: '1.5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0.375rem 0.375rem 0px #9146FF', // Poppy Purple shadow
        color: ({ confirming, hasError }) => (confirming || hasError) ? '#FFFFFF' : '#1a1a1a',
        fontFamily: '"Arial Black", "Impact", sans-serif',
        textTransform: 'uppercase',
        transition: 'all 0.1s ease',
        '&:hover': {
            boxShadow: '0.5rem 0.5rem 0px #9146FF',
        }
    },
    textUnskew: {
        transform: 'skew(5deg)',
        fontSize: '1.5rem',
        letterSpacing: '0.05rem',
    }
});

const GameItem = ({ game, onRetry }) => {
    const [confirming, setConfirming] = useState(false);
    const [hasError, setHasError] = useState(false);
    const classes = useStyles({ confirming, hasError });
    const { joinGame, isJoining, joinError } = useJoinGame(game.id);

    useEffect(() => {
        let timeout;
        if (confirming) {
            timeout = setTimeout(() => {
                setConfirming(false);
            }, 3000);
        }
        return () => clearTimeout(timeout);
    }, [confirming]);

    useEffect(() => {
        let timeout;
        if (hasError) {
            timeout = setTimeout(() => {
                setHasError(false);
            }, 1000);
        }
        return () => clearTimeout(timeout);
    }, [hasError]);

    const handleClick = async () => {
        if (isJoining || hasError) return;

        if (confirming) {
            try {
                await joinGame();
                if (onRetry) onRetry();
            } catch (error) {
                console.error('Join failed', error);
                setConfirming(false);
                setHasError(true);
            }
        } else {
            setConfirming(true);
        }
    };

    return (
        <div className={classes.itemWrapper} onClick={handleClick}>
            <div className={classes.itemContent}>
                <span className={classes.textUnskew}>
                    {hasError ? "Something's Wrong" : (isJoining ? 'JOINING...' : (confirming ? 'CONFIRM JOIN?' : `${game.host_name}'S GAME`))}
                </span>
            </div>
        </div>
    );
};

export default GameItem;
