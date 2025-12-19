import React from 'react';
import { createUseStyles } from 'react-jss';

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
        }
    },
    contentUnskew: {
        transform: 'skew(5deg)',
        display: 'flex',
        alignItems: 'center',
    }
});

const ReloadButton = ({ onClick }) => {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <button className={classes.button} onClick={onClick} title="Reload">
                <div className={classes.contentUnskew}>
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
                    </svg>
                </div>
            </button>
        </div>
    );
};

export default ReloadButton;