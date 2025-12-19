import React from 'react';
import { createUseStyles } from 'react-jss';
import { useGoogleLogin } from '../hooks/useGoogleLogin';

const useStyles = createUseStyles({
    wrapper: {
        position: 'relative',
        display: 'inline-block',
        // Skew the container to give it that dynamic gaming look
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
        gap: '0.75rem',
        padding: '1rem 2rem',
        backgroundColor: '#F3AF19', // Fortnite Yellow
        border: '0.25rem solid #1a1a1a',
        color: '#1a1a1a',
        fontFamily: '"Arial Black", "Impact", sans-serif',
        fontSize: '1.25rem',
        fontWeight: 900,
        textTransform: 'uppercase',
        letterSpacing: '0.0625rem',
        cursor: 'pointer',
        outline: 'none',
        boxShadow: '0.5rem 0.5rem 0px #9146FF', // Poppy Purple shadow
        transition: 'all 0.1s ease',
        zIndex: 2,
        '&:hover': {
            backgroundColor: '#FFE449',
            boxShadow: '0.625rem 0.625rem 0px #9146FF',
        },
        '&:active': {
            boxShadow: '0.25rem 0.25rem 0px #9146FF',
            transform: 'translate(0.125rem, 0.125rem)',
        },
        '&:disabled': {
            backgroundColor: '#cccccc',
            cursor: 'not-allowed',
            boxShadow: 'none',
        }
    },
    // We need to un-skew the content so the text/icon looks straight
    contentUnskew: {
        transform: 'skew(5deg)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
    },
    iconContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: '50%',
        width: '1.75rem',
        height: '1.75rem',
        padding: '0.25rem',
        border: '0.125rem solid #1a1a1a',
    }
});

const LoginButton = () => {
    const classes = useStyles();

    const { trigger, isMutating } = useGoogleLogin();

    const handleLogin = () => {
        trigger();
    };

    return (
        <div className={classes.wrapper}>
            <button className={classes.button} onClick={handleLogin} disabled={isMutating}>
                <div className={classes.contentUnskew}>
                    <div className={classes.iconContainer}>
                        <svg viewBox="0 0 24 24" width="100%" height="100%"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                    </div>
                    <span>{isMutating ? 'Loading...' : 'Login'}</span>
                </div>
            </button>
        </div>
    );
};

export default LoginButton;
