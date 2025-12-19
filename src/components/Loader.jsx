import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    loaderContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.25rem',
    },
    spinner: {
        width: '3.125rem',
        height: '3.125rem',
        border: '0.375rem solid #1a1a1a',
        borderTop: '0.375rem solid #F3AF19', // Fortnite Yellow
        borderRadius: '50%',
        animation: '$spin 1s linear infinite',
        boxShadow: '0 0 0.9375rem #9146FF', // Poppy Purple glow
    },
    text: {
        fontFamily: '"Arial Black", "Impact", sans-serif',
        color: '#F3AF19',
        fontSize: '1.5rem',
        textTransform: 'uppercase',
        letterSpacing: '0.125rem',
        textShadow: '0.1875rem 0.1875rem 0px #1a1a1a',
        transform: 'skew(-5deg)',
    },
    '@keyframes spin': {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
    },
});

const Loader = () => {
    const classes = useStyles();
    return (
        <div className={classes.loaderContainer}>
            <div className={classes.spinner} />
            <div className={classes.text}>Loading...</div>
        </div>
    );
};

export default Loader;