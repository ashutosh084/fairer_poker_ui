import { useMemo } from 'react';
import useSWR from 'swr';
import { makeNetworkRequest } from '../utils/network';

const fetcher = (url) => makeNetworkRequest(url, 'POST');

export const useActiveGames = () => {
    const { data: dataNUser, error, isLoading, isValidating, mutate } = useSWR('/api/play/activegames', fetcher, {
        shouldRetryOnError: false,
        revalidateOnFocus: false,
    });


    const processedData = useMemo(() => {
        if (!dataNUser) return dataNUser;
        const data = dataNUser?.games;
        window.userId = dataNUser?.userId;

        const games = {};
        data.forEach(game => {
            if (games[game.host_user]) {
                games[game.host_user].player_user.push(game.player_user);
                if (game.active) {
                    games[game.host_user].active = true;
                }
            } else {
                games[game.host_user] = { ...game, player_user: [game.player_user] };
            }
        });
        return Object.values(games);
    }, [dataNUser]);

    const isUnauthorized = error && error.response && error.response.status === 401;
    // If there is an error but it's NOT 401, treat it as service unavailable (network error, 500, etc.)
    // We check !isValidating so the error screen disappears while we are retrying
    const isServiceUnavailable = error && !isUnauthorized && !isValidating;

    return {
        data: processedData,
        isLoading: isLoading || isValidating,
        isUnauthorized,
        isServiceUnavailable,
        retry: () => mutate(),
    };
};
