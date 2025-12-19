import useSWRMutation from 'swr/mutation';
import { makeNetworkRequest } from '../utils/network';

const joinGameFetcher = (url) => makeNetworkRequest(url, 'POST');

export const useJoinGame = (gameId) => {
    const { trigger, isMutating, error } = useSWRMutation(
        `/api/play/addme/${gameId}`,
        joinGameFetcher
    );

    return {
        joinGame: trigger,
        isJoining: isMutating,
        joinError: error
    };
};