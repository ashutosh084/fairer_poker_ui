import React, { useState, useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        margin: '1rem 0',
        zIndex: 10,
    },
    row: {
        display: 'flex',
        justifyContent: 'center',
        gap: '0.75rem',
        flexWrap: 'wrap',
    },
    cardSlot: {
        width: '3.5rem',
        height: '5rem',
        backgroundColor: '#FFFFFF',
        border: '0.25rem solid #1a1a1a',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0.25rem 0.25rem 0px #1a1a1a',
        transform: 'skew(-5deg)',
        transition: 'transform 0.1s ease',
        position: 'relative',
        '&:hover': {
            transform: 'skew(-5deg) scale(1.1)',
            zIndex: 20,
        }
    },
    emptySlot: {
        backgroundColor: '#e0e0e0',
        backgroundImage: 'repeating-linear-gradient(45deg, #d0d0d0 25%, transparent 25%, transparent 50%, #d0d0d0 50%, #d0d0d0 75%, transparent 75%, transparent 100%)',
        backgroundSize: '10px 10px',
        opacity: 0.6,
    },
    cardContent: {
        width: '100%',
        height: '100%',
        transform: 'skew(5deg)',
        fontFamily: '"Arial Black", "Impact", sans-serif',
        fontSize: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 1,
        userSelect: 'none',
    },
    redSuit: {
        color: '#EA4335',
    },
    blackSuit: {
        color: '#1a1a1a',
    },
    suit: {
        fontSize: '1.75rem',
    },
    // Animation classes
    absoluteFace: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'opacity 0.5s ease-in-out',
        backgroundColor: '#FFFFFF', // Ensure background covers underlying elements
    },
    burning: {
        animation: '$burnEffect 0.5s ease-in-out infinite alternate',
        zIndex: 2,
    },
    '@keyframes burnEffect': {
        '0%': { boxShadow: 'inset 0 0 0 transparent', filter: 'brightness(1)' },
        '100%': { boxShadow: 'inset 0 0 20px #EA4335', filter: 'brightness(1.2) sepia(0.5) hue-rotate(-10deg)' }
    },
    fadeIn: {
        animation: '$fadeInEffect 0.5s ease-out forwards',
    },
    '@keyframes fadeInEffect': {
        '0%': { opacity: 0, transform: 'scale(0.9)' },
        '100%': { opacity: 1, transform: 'scale(1)' }
    }
});

const CardFace = ({ card }) => {
    const classes = useStyles();
    const rank = card.slice(0, -1);
    const suitChar = card.slice(-1);

    let suitSymbol = '';
    let isRed = false;

    switch (suitChar) {
        case 'H': suitSymbol = '♥'; isRed = true; break;
        case 'D': suitSymbol = '♦'; isRed = true; break;
        case 'C': suitSymbol = '♣'; isRed = false; break;
        case 'S': suitSymbol = '♠'; isRed = false; break;
        default: suitSymbol = '?';
    }

    return (
        <div className={`${classes.cardContent} ${isRed ? classes.redSuit : classes.blackSuit}`}>
            <span>{rank === 'T' ? '10' : rank}</span>
            <span className={classes.suit}>{suitSymbol}</span>
        </div>
    );
};

const AnimatedCard = ({ card, burnCard, index, type, revealDuration }) => {
    const classes = useStyles();
    const [phase, setPhase] = useState('IDLE'); // IDLE, SHOW_BURN, BURNING, REVEALED
    const animatedRef = useRef(false);

    // Valid card is short string (e.g. 'AH', '10S'). Encrypted is long.
    const isVisible = card && card.length <= 3;
    const isBurnVisible = burnCard && burnCard.length <= 3;

    useEffect(() => {
        if (isVisible && !animatedRef.current) {
            if (type === 'flop') {
                // Flop Animation Sequence
                // Total duration for all 3 cards is revealDuration.
                // Per card slot time = revealDuration / 3
                const slotDuration = revealDuration / 3;
                const startDelay = index * slotDuration;

                // 1. Show Burn Card
                const t1 = setTimeout(() => {
                    setPhase('SHOW_BURN');
                }, startDelay);

                // 2. Start Burn Animation (shortly after showing)
                const t2 = setTimeout(() => {
                    setPhase('BURNING');
                }, startDelay + (slotDuration * 0.2));

                // 3. Reveal Board Card (fade out burn, fade in board)
                const t3 = setTimeout(() => {
                    setPhase('REVEALED');
                }, startDelay + (slotDuration * 0.8));

                animatedRef.current = true;
                return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
            } else {
                // Other cards (Hole, Turn, River) just fade in
                setPhase('REVEALED');
                animatedRef.current = true;
            }
        } else if (!isVisible) {
            // Reset if card becomes hidden/encrypted again (e.g. new game)
            setPhase('IDLE');
            animatedRef.current = false;
        }
    }, [isVisible, type, index, revealDuration]);

    // If not visible yet, show empty slot
    if (!isVisible && phase === 'IDLE') {
        return <div className={`${classes.cardSlot} ${classes.emptySlot}`} />;
    }

    // If it was already revealed previously (re-render), just show it
    if (isVisible && animatedRef.current && phase === 'IDLE') {
        // This handles the case where we mount with data already present (no animation desired? or maybe yes?)
        // For now, let's assume if we mount with data, we just show it. 
        // But the useEffect above will trigger 'REVEALED' immediately for non-flop, or sequence for flop.
        // If we want to skip animation on refresh, we'd need more complex logic. 
        // Given the prompt, we likely want the animation or just the final state.
        // The useEffect will set phase to REVEALED eventually.
        // We'll let the useEffect handle the state transition.
    }

    const showBurn = (phase === 'SHOW_BURN' || phase === 'BURNING') && isBurnVisible;
    const showCard = phase === 'REVEALED';
    const isBurning = phase === 'BURNING';

    return (
        <div className={classes.cardSlot}>
            {/* Burn Card Layer */}
            <div
                className={`${classes.absoluteFace} ${isBurning ? classes.burning : ''}`}
                style={{ opacity: showBurn ? 1 : 0, zIndex: showBurn ? 2 : 1 }}
            >
                {burnCard && <CardFace card={burnCard} />}
            </div>

            {/* Actual Card Layer */}
            <div
                className={`${classes.absoluteFace} ${showCard && type !== 'flop' ? classes.fadeIn : ''}`}
                style={{ opacity: showCard ? 1 : 0, zIndex: showCard ? 3 : 1 }}
            >
                {card && <CardFace card={card} />}
            </div>
        </div>
    );
};

const CardView = ({ holeCards = [], board = [], turn = [], river = [], burnCards = [], flopRevealDuration = 2500 }) => {
    const classes = useStyles();

    // Hole cards: 2 slots
    const holeSlots = [0, 1].map(i => ({
        card: holeCards[i] || null,
        type: 'hole',
        index: i
    }));

    // Community cards: 5 slots (3 Flop + 1 Turn + 1 River)
    // Flop: indices 0, 1, 2
    // Turn: index 3
    // River: index 4

    const communitySlots = [];

    // Flop Slots
    for (let i = 0; i < 3; i++) {
        communitySlots.push({
            card: board[i] || null,
            burnCard: burnCards[0] || null, // Use first burn card for all flop cards
            type: 'flop',
            index: i
        });
    }

    // Turn Slot
    communitySlots.push({
        card: turn[0] || null,
        burnCard: burnCards[1] || null,
        type: 'turn',
        index: 3
    });

    // River Slot
    communitySlots.push({
        card: river[0] || null,
        burnCard: burnCards[2] || null,
        type: 'river',
        index: 4
    });

    return (
        <div className={classes.container}>
            <div className={classes.row}>
                {holeSlots.map((slot, i) => (
                    <AnimatedCard
                        key={`hole-${i}`}
                        card={slot.card}
                        type={slot.type}
                        index={slot.index}
                        revealDuration={flopRevealDuration}
                    />
                ))}
            </div>

            <div className={classes.row}>
                {communitySlots.map((slot, i) => (
                    <AnimatedCard
                        key={`comm-${i}`}
                        card={slot.card}
                        burnCard={slot.burnCard}
                        type={slot.type}
                        index={slot.index} // Index 0-2 for flop, used for delay
                        revealDuration={flopRevealDuration}
                    />
                ))}
            </div>
        </div>
    );
};

export default CardView;
