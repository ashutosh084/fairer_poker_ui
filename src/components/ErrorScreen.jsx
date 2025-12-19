import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        padding: '2.5rem',
        backgroundColor: '#1a1a1a',
        border: '0.25rem solid #EA4335', // Error Red
        transform: 'skew(-3deg)',
        boxShadow: '0.75rem 0.75rem 0px #000000',
        maxWidth: '90%',
        margin: '0 1.875rem',
    },
    title: {
        fontFamily: '"Arial Black", "Impact", sans-serif',
        fontSize: '2.25rem',
        color: '#EA4335',
        textTransform: 'uppercase',
        margin: 0,
        letterSpacing: '0.125rem',
        textShadow: '0.125rem 0.125rem 0px #000000',
    },
    message: {
        fontFamily: 'sans-serif',
        fontSize: '1.125rem',
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    button: {
        marginTop: '1rem',
        padding: '0.75rem 2rem',
        backgroundColor: '#150050',
        border: '0.25rem solid #EA4335',
        color: '#EA4335',
        fontFamily: '"Arial Black", "Impact", sans-serif',
        fontSize: '1.25rem',
        textTransform: 'uppercase',
        cursor: 'pointer',
        boxShadow: '0.375rem 0.375rem 0px #000000',
        transition: 'all 0.1s ease',
        '&:hover': {
            backgroundColor: '#251060',
            boxShadow: '0.5rem 0.5rem 0px #000000',
            transform: 'translate(-0.125rem, -0.125rem)',
        },
        '&:active': {
            boxShadow: '0.125rem 0.125rem 0px #000000',
            transform: 'translate(0.125rem, 0.125rem)',
        }
    },
});

const ErrorScreen = ({ onRetry, title = "Service Unavailable", message = "Unable to connect to the game server." }) => {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <h1 className={classes.title}>{title}</h1>
            <p className={classes.message}>
                {message}
            </p>
            <button
                className={classes.button}
                onClick={onRetry}
            >
                Retry
            </button>
        </div>
    );
};

export default ErrorScreen;