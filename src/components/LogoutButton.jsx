import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useLogout } from '../hooks/useLogout';

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
        // Changes color to Red when asking for confirmation
        backgroundColor: ({ confirming }) => confirming ? '#EA4335' : '#F3AF19',
        border: '0.25rem solid #1a1a1a',
        color: ({ confirming }) => confirming ? '#FFFFFF' : '#1a1a1a',
        fontFamily: '"Arial Black", "Impact", sans-serif',
        fontSize: '1rem',
        fontWeight: 900,
        textTransform: 'uppercase',
        letterSpacing: '0.0625rem',
        cursor: 'pointer',
        outline: 'none',
        boxShadow: '0.375rem 0.375rem 0px #9146FF', // Poppy Purple shadow
        transition: 'all 0.1s ease',
        zIndex: 2,
        '&:hover': {
            backgroundColor: ({ confirming }) => confirming ? '#FF5545' : '#FFE449',
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

const LogoutButton = ({ onRetry }) => {
    const [confirming, setConfirming] = useState(false);
    const classes = useStyles({ confirming });
    const { logout, isLoggingOut } = useLogout();

    // Auto-reset confirmation if not clicked within 3 seconds
    useEffect(() => {
        let timeout;
        if (confirming) {
            timeout = setTimeout(() => {
                setConfirming(false);
            }, 3000);
        }
        return () => clearTimeout(timeout);
    }, [confirming]);

    const handleClick = async () => {
        if (isLoggingOut) return;

        if (confirming) {
            try {
                await logout();
                if (onRetry) onRetry();
            } catch (error) {
                console.error('Logout failed:', error);
                setConfirming(false);
            }
        } else {
            setConfirming(true);
        }
    };

    return (
        <div className={classes.wrapper}>
            <button
                className={classes.button}
                onClick={handleClick}
                disabled={isLoggingOut}
            >
                <div className={classes.contentUnskew}>
                    {isLoggingOut ? 'EXITING...' : (confirming ? 'CONFIRM?' : (
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                            <path d="M16 13v-2H7V8l-5 4 5 4v-3z" />
                            <path d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z" />
                        </svg>
                    ))}
                </div>
            </button>
        </div>
    );
};

export default LogoutButton;