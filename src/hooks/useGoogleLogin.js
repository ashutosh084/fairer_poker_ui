import { useState } from 'react';
import { prepareTargetUrl } from '../utils/network';

export const useGoogleLogin = () => {
    const [isMutating, setIsMutating] = useState(false);

    const trigger = () => {
        setIsMutating(true);
        window.location.href = prepareTargetUrl('/api/auth/google');
    };

    return {
        trigger,
        isMutating,
    };
};