import React from 'react';
import { createUseStyles } from 'react-jss';
import { useCreateGame } from '../hooks/useCreateGame';

const useStyles = createUseStyles({
    wrapper: {
        position: 'relative',
        display: 'inline-block',
        transform: 'skew(-5deg)',
        transition: 'transform 0.1s ease',
        '&:hover': {
            transform: 'skew(-5deg) scale(1.02)',
        },
        '&:active': {
            transform: 'skew(-5deg) scale(0.98)',
        },
    },
    button: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.75rem 1.5rem',
        backgroundColor: '#F3AF19',
        border: '0.25rem solid #1a1a1a',
        color: '#1a1a1a',
        fontFamily: '"Arial Black", "Impact", sans-serif',
        fontSize: '1rem',
        fontWeight: 900,
        textTransform: 'uppercase',
        letterSpacing: '0.0625rem',
        cursor: 'pointer',
        outline: 'none',
        boxShadow: '0.375rem 0.375rem 0px #9146FF',
        transition: 'all 0.1s ease',
        zIndex: 2,
        '&:hover': {
            backgroundColor: '#FFE449',
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
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    }
});

const CreateGameButton = ({ onSuccess }) => {
    const classes = useStyles();
    const { createGame, isCreating } = useCreateGame();

    const handleClick = async () => {
        if (isCreating) return;
        try {
            await createGame();
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error('Failed to create game:', error);
        }
    };

    return (
        <div className={classes.wrapper}>
            <button className={classes.button} onClick={handleClick} disabled={isCreating}>
                <div className={classes.contentUnskew}>{isCreating ? '...' : (
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                    </svg>
                )}</div>
            </button>
        </div>
    );
};

export default CreateGameButton;