import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    itemWrapper: {
        position: 'relative',
        width: '100%',
        marginBottom: '1.5rem',
        transform: 'skew(-5deg)',
        transition: 'transform 0.1s ease',
        '&:hover': {
            transform: 'skew(-5deg) scale(1.02)',
            zIndex: 10,
        },
    },
    '@keyframes dropSequence': {
        '0%': {
            transform: 'skew(-5deg) scale(1.02)',
            opacity: 1,
        },
        '100%': {
            transform: 'skew(-5deg) scale(0.8)',
            opacity: 0,
        }
    },
    dropping: {
        animation: '$dropSequence 1s ease-in-out forwards',
        zIndex: 100,
        pointerEvents: 'none',
    },
    itemContent: {
        backgroundColor: ({ isDropping }) => isDropping ? '#EA4335' : '#FFFFFF',
        border: '0.25rem solid #1a1a1a',
        padding: '1.5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0.375rem 0.375rem 0px #F3AF19',
        color: ({ isDropping }) => isDropping ? '#FFFFFF' : '#1a1a1a',
        fontFamily: '"Arial Black", "Impact", sans-serif',
        textTransform: 'uppercase',
    },
    textUnskew: {
        transform: 'skew(5deg)',
        fontSize: '1.5rem',
        letterSpacing: '0.05rem',
    },
    skull: {
        marginLeft: '0.5rem',
        fontSize: '1.5rem',
    },
    crown: {
        marginLeft: '0.5rem',
        fontSize: '1.5rem',
    }
});

const PlayerItem = ({ player, isDropping, isHost }) => {
    const classes = useStyles({ isDropping });
    return (
        <div className={`${classes.itemWrapper} ${isDropping ? classes.dropping : ''}`}>
            <div className={classes.itemContent}>
                <span className={classes.textUnskew}>
                    {player.name}
                    {isHost && <span className={classes.crown} title="Host">👑</span>}
                    {isDropping && <span className={classes.skull}>💀</span>}
                </span>
            </div>
        </div>
    );
};

export default PlayerItem;
