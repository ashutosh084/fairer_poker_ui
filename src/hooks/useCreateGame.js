import useSWRMutation from 'swr/mutation';
import { makeNetworkRequest } from '../utils/network';

const createGameFetcher = (url) => makeNetworkRequest(url, 'POST');

export const useCreateGame = () => {
    const { trigger, isMutating, error } = useSWRMutation(
        '/api/play/letsplay',
        createGameFetcher
    );

    return {
        createGame: trigger,
        isCreating: isMutating,
        createError: error
    };
};