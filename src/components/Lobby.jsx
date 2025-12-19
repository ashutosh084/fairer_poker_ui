import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useWebSocket } from '../hooks/useWebSocket';
import Loader from './Loader';
import ErrorScreen from './ErrorScreen';
import PlayerItem from './PlayerItem';
import GameAction from './GameAction';
import CardView from './CardView';

const useStyles = createUseStyles({
    gameContainer: {
        width: '100%',
        height: '100dvh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: '6rem',
        boxSizing: 'border-box',
        overflow: 'hidden',
    },
    topBar: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: '2rem',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        zIndex: 100,
        width: '100%',
        boxSizing: 'border-box',
        pointerEvents: 'none',
    },
    topBarItem: {
        pointerEvents: 'auto',
    },
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
        boxShadow: '0.375rem 0.375rem 0px #9146FF',
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
    },
    header: {
        fontFamily: '"Arial Black", "Impact", sans-serif',
        fontSize: '3rem',
        color: '#FFFFFF',
        textTransform: 'uppercase',
        textShadow: '0.25rem 0.25rem 0px #1a1a1a',
        transform: 'skew(-5deg)',
        marginBottom: '2rem',
        textAlign: 'center',
        zIndex: 1,
        flexShrink: 0,
    },
    playerListContainer: {
        width: '100%',
        maxWidth: '37.5rem',
        flex: 1,
        minHeight: 0,
        overflowY: 'auto',
        padding: '1rem 4rem',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 1,
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
    gameContentWrapper: {
        flex: 1,
        width: '100%',
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflowY: 'auto',
    }
});

const LobbyContent = ({ game, onRetry, sendMessage, close, droppingIds = [], gameState, gameData, handleActionButton, joinedLate, disableAction }) => {
    const [confirming, setConfirming] = useState(false);
    const [isLeaving, setIsLeaving] = useState(false);

    const classes = useStyles({ confirming });

    useEffect(() => {
        let timeout;
        if (confirming) {
            timeout = setTimeout(() => {
                setConfirming(false);
            }, 3000);
        }
        return () => clearTimeout(timeout);
    }, [confirming]);

    const handleLeave = () => {
        if (isLeaving) return;

        if (confirming) {
            setIsLeaving(true);
            sendMessage('LEAVE_GAME');
            close();
            if (onRetry) onRetry();
        } else {
            setConfirming(true);
        }
    };

    return (
        <div className={classes.gameContainer}>
            <div className={classes.topBar}>
                <div className={classes.topBarItem}>
                    <div className={classes.wrapper}>
                        <button
                            className={classes.button}
                            onClick={handleLeave}
                            disabled={isLeaving}
                        >
                            <div className={classes.contentUnskew}>
                                {isLeaving ? 'EXITING...' : (confirming ? 'CONFIRM?' : (
                                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                                    </svg>
                                ))}
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <h1 className={classes.header}>{game?.host_name}'s Lobby</h1>

            {joinedLate && (
                <div className={classes.gameContentWrapper}>
                    <h1 className={classes.header}>GAME IN PROGRESS</h1>
                </div>
            )}

            {!joinedLate && gameState === 0 && (
                <div className={classes.playerListContainer}>
                    {game?.players?.map((player, index) => (
                        <PlayerItem key={player.user || index} player={player} isDropping={droppingIds.includes(player.user)} isHost={game.host_user === player.user} />
                    ))}
                </div>
            )}

            {!joinedLate && gameState !== 0 && (
                <div className={classes.gameContentWrapper}>
                    <CardView holeCards={gameData?.holeCards} board={gameData?.board} turn={gameData?.turn} river={gameData?.river} burnCards={gameData?.burnCards} />
                </div>
            )}


            {game.host_user === window.userId && (
                <div style={{ flexShrink: 0, width: '100%', display: 'flex', justifyContent: 'center', paddingBottom: '4rem' }}>
                    <GameAction
                        handleActionButton={handleActionButton}
                        gameState={gameState}
                        playerCount={game.players.length}
                        disable={disableAction}
                    />
                </div>
            )}
        </div>
    );
};

const Lobby = ({ game, onRetry }) => {
    const classes = useStyles({});
    const { isValid, close, sendMessage, lastMessage } = useWebSocket();
    const [droppingIds, setDroppingIds] = useState([]);
    const [timedOut, setTimedOut] = useState(false);
    /*
    if gameState is
    0 --> no active game
    1 --> game generating
    2 --> game started
    3 --> flop
    4 --> turn
    5 --> river
    6 --> failed to generate a game/error state
    */
    const [gameState, setGameState] = useState(0);
    const [gameData, setGameData] = useState({});
    const [joinedLate, setJoinedLate] = useState(gameState == 0 && game?.isPlaying);
    const [disableAction, setDisableAction] = useState(false);

    const handleActionButton = (isHostPlaying) => {
        if (disableAction) return;
        setDisableAction(true);
        switch (gameState) {
            case 0:
                setGameState(1);
                sendMessage('START_GAME', { hostPlaying: isHostPlaying });
                break;
            case 1:
                break;
            case 2:
                sendMessage('CONTI_GAME', { ...gameData, type: "FLOP" });
                break
            case 3:
                sendMessage('CONTI_GAME', { ...gameData, type: "TURN" });
                break
            case 4:
                sendMessage('CONTI_GAME', { ...gameData, type: "RIVER" });
                break
            case 5:
                sendMessage('CONTI_GAME', { type: "NEXT_ROUND" });
                setGameState(0);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        if (isValid) {
            sendMessage('JOIN_GAME');
            return;
        }

        const timer = setTimeout(() => {
            setTimedOut(true);
            if (close) close();
        }, 10000);

        return () => clearTimeout(timer);
    }, [isValid, close]);

    useEffect(() => {
        if (!lastMessage) return;

        switch (lastMessage.action) {
            case "PLAYER_DROPPED":
                const droppedId = lastMessage.payload?.id;
                if (droppedId) {
                    setDroppingIds(prev => [...prev, droppedId]);
                    setTimeout(() => {
                        setDroppingIds(prev => prev.filter(id => id !== droppedId));
                        onRetry();
                    }, 1000);
                }
                break;
            case "UPDATE_GAMES":
                if (disableAction)
                    setDisableAction(false);
                if (lastMessage.payload?.type === "START_GAME") {
                    setGameState(2);
                    setGameData(lastMessage.payload);
                    setJoinedLate(false);
                } else if (lastMessage.payload?.type === "FLOP") {
                    setGameState(3);
                    setGameData({ ...gameData, ...lastMessage.payload });
                } else if (lastMessage.payload?.type === "TURN") {
                    setGameState(4);
                    setGameData({ ...gameData, ...lastMessage.payload });
                } else if (lastMessage.payload?.type === "RIVER") {
                    setGameState(5);
                    setGameData({ ...gameData, ...lastMessage.payload });
                } else if (lastMessage.payload?.type === "NEXT_ROUND") {
                    setGameState(0);
                    setGameData({});
                    setJoinedLate(false);
                } else {
                    onRetry();
                }
                break;
            default:
                break;
        }

    }, [lastMessage]);


    const handleRetry = () => {
        setTimedOut(false);
        if (onRetry) onRetry();
    };

    if (timedOut) {
        return <ErrorScreen onRetry={handleRetry} title="Connection Failed" message="Unable to join game" />;
    }

    if (!isValid) {
        return (
            <div className={classes.gameContainer} style={{ justifyContent: 'center', paddingTop: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}><Loader /></div>
            </div>
        );
    }

    return (
        <LobbyContent
            game={game}
            onRetry={onRetry}
            sendMessage={sendMessage}
            close={close}
            droppingIds={droppingIds}
            gameState={gameState}
            gameData={gameData}
            handleActionButton={handleActionButton}
            joinedLate={joinedLate}
            disableAction={disableAction}
        />
    );
};

export default Lobby;