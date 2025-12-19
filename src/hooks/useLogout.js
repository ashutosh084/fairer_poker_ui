import useSWRMutation from 'swr/mutation';
import { makeNetworkRequest } from '../utils/network';

const logoutFetcher = (url) => makeNetworkRequest(url, 'POST');

export const useLogout = () => {
    const { trigger, isMutating, error } = useSWRMutation(
        '/api/auth/logout',
        logoutFetcher
    );

    return {
        logout: trigger,
        isLoggingOut: isMutating,
        logoutError: error
    };
};