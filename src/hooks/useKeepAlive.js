import { useEffect } from 'react';
import { makeNetworkRequest } from '../utils/network';

/**
 * useKeepAlive
 * Prevents Render instances from spinning down by hitting
 * a health check endpoint every 10 minutes.
 */
export const useKeepAlive = (url = '/healthz') => {
    useEffect(() => {
        // Immediate call on mount
        const ping = () => {
            makeNetworkRequest(url, 'GET')
                .catch((err) => console.debug('Keep-alive ping suppressed:', err.message));
        };

        // Set interval for every 10 minutes (600,000 ms)
        const intervalId = setInterval(ping, 600000);

        // Initial ping
        ping();

        // Cleanup on unmount
        return () => clearInterval(intervalId);
    }, [url]);

    return null; // This is a "headless" hook
};