import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    container: {
        width: 'calc(100% - 4rem)',
        maxWidth: '37.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        margin: '2rem',
        zIndex: 10,
    },
    checkboxRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        cursor: 'pointer',
        opacity: ({ disabled }) => disabled ? 0.5 : 1,
        pointerEvents: ({ disabled }) => disabled ? 'none' : 'auto',
        transform: 'skew(-5deg)',
        transition: 'transform 0.1s ease',
        '&:hover': {
            transform: ({ disabled }) => disabled ? 'skew(-5deg)' : 'skew(-5deg) scale(1.05)',
        },
        '&:active': {
            transform: 'skew(-5deg) scale(0.95)',
        },
    },
    checkbox: {
        width: '2rem',
        height: '2rem',
        border: '0.25rem solid #1a1a1a',
        backgroundColor: ({ playing, disabled }) => disabled ? '#e0e0e0' : (playing ? '#F3AF19' : '#FFFFFF'),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0.25rem 0.25rem 0px #1a1a1a',
        transition: 'background-color 0.1s ease',
    },
    checkIcon: {
        width: '1.5rem',
        height: '1.5rem',
        fill: '#1a1a1a',
        display: ({ playing }) => playing ? 'block' : 'none',
    },
    label: {
        fontFamily: '"Arial Black", "Impact", sans-serif',
        fontSize: '1.5rem',
        color: '#FFFFFF',
        textTransform: 'uppercase',
        textShadow: '0.125rem 0.125rem 0px #1a1a1a',
        userSelect: 'none',
    },
    buttonWrapper: {
        position: 'relative',
        width: '100%',
        transform: 'skew(-5deg)',
        transition: 'transform 0.1s ease',
        '&:hover': {
            transform: ({ disabled }) => disabled ? 'skew(-5deg)' : 'skew(-5deg) scale(1.02)',
            zIndex: 11,
        },
        '&:active': {
            transform: 'skew(-5deg) scale(0.98)',
        },
    },
    button: {
        width: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        backgroundColor: '#00E5FF', // Cyan for Start action
        border: '0.25rem solid #1a1a1a',
        color: '#1a1a1a',
        fontFamily: '"Arial Black", "Impact", sans-serif',
        fontSize: '1.5rem',
        fontWeight: 900,
        textTransform: 'uppercase',
        letterSpacing: '0.1rem',
        cursor: 'pointer',
        outline: 'none',
        boxShadow: '0.375rem 0.375rem 0px #9146FF',
        transition: 'all 0.1s ease',
        '&:hover': {
            backgroundColor: '#33EBFF',
            boxShadow: '0.5rem 0.5rem 0px #9146FF',
        },
        '&:active': {
            boxShadow: '0.125rem 0.125rem 0px #9146FF',
            transform: 'translate(0.125rem, 0.125rem)',
        },
        '&:disabled': {
            backgroundColor: '#cccccc',
            cursor: 'not-allowed',
            boxShadow: 'none',
        }
    },
    contentUnskew: {
        transform: 'skew(5deg)',
    }
});

const gameStateVsButtonText = [
    "START GAME",
    "STARTING...",
    "FLOP",
    "TURN",
    "RIVER",
    "NEXT ROUND",
    "ERROR"
]

const GameAction = ({ handleActionButton, gameState, playerCount }) => {

    const [playing, setPlaying] = useState(true);
    const isStarting = gameState === 1;
    const disabled = gameState === 1 || playerCount < 2;
    const classes = useStyles({ playing, disabled });

    const togglePlaying = () => {
        if (!isStarting && !disabled) {
            setPlaying(!playing);
        }
    };

    const handleStartClick = () => {
        if (handleActionButton) {
            handleActionButton(playing);
        }
    };

    return (
        <div className={classes.container}>
            {
                gameState < 1 && (
                    <div className={classes.checkboxRow} onClick={togglePlaying}>
                        <div className={classes.checkbox}>
                            <svg className={classes.checkIcon} viewBox="0 0 24 24">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                            </svg>
                        </div>
                        <span className={classes.label}>Playing?</span>
                    </div>
                )
            }

            <div className={classes.buttonWrapper}>
                <button
                    className={classes.button}
                    onClick={handleStartClick}
                    disabled={isStarting || disabled}
                >
                    <div className={classes.contentUnskew}>
                        {gameStateVsButtonText[gameState]}
                    </div>
                </button>
            </div>
        </div>
    );
};

export default GameAction;