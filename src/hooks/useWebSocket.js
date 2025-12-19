import { useState, useEffect, useRef, useCallback } from 'react';

export const useWebSocket = () => {
    const [lastMessage, setLastMessage] = useState(null);
    const [isValid, setIsValid] = useState(false);
    const wsRef = useRef(null);

    useEffect(() => {
        // Construct the WebSocket URL based on the current window location
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const host = window.location.host;
        const url = `${protocol}//${host}/ws`;

        const ws = new WebSocket(url);
        wsRef.current = ws;
        let isCleanedUp = false;
        let pingInterval;

        ws.onopen = () => {
            if (isCleanedUp) return;
            // Send PING to verify connection
            try {
                ws.send(JSON.stringify({ action: 'PING' }));
            } catch (error) {
                console.error('Error sending PING:', error);
            }

            pingInterval = setInterval(() => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify({ action: 'PING' }));
                }
            }, 30000);
        };

        ws.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);

                if (message && message.action === 'PONG') {
                    setIsValid(true);
                } else setLastMessage({
                    action: message.action,
                    payload: message.payload
                });
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        };

        ws.onclose = () => {
            setIsValid(false);
            if (pingInterval) {
                clearInterval(pingInterval);
                pingInterval = null;
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            setIsValid(false);
        };

        return () => {
            isCleanedUp = true;
            if (pingInterval) clearInterval(pingInterval);
            ws.close();
        };
    }, []);

    const sendMessage = useCallback((action, payload) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({ action, payload }));
        } else {
            console.warn('WebSocket is not open. Message not sent.');
        }
    }, []);

    const close = useCallback(() => {
        if (wsRef.current) {
            wsRef.current.close();
        }
    }, []);

    return { lastMessage, isValid, sendMessage, close };
};
