import useSWRMutation from 'swr/mutation';
import { makeNetworkRequest } from '../utils/network';

const leaveGameFetcher = (url) => makeNetworkRequest(url, 'POST');

export const useLeaveGame = (gameId) => {
    const { trigger, isMutating, error } = useSWRMutation(
        `/api/play/removeme/${gameId}`,
        leaveGameFetcher
    );

    return {
        leaveGame: trigger,
        isLeaving: isMutating,
        leaveError: error
    };
};