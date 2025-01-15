'use client';

import { FC, useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';
import { useSignOut } from '@/containers/auth/hooks/useSignOut';

export const SignOutButton: FC = () => {
    const signOut = useSignOut();
    const [loading, setLoading] = useState(false);

    const handleSignOut = useCallback(async () => {
        setLoading(true);
        await signOut();
        setLoading(false);
    }, [signOut]);

    return (
        <Button variant="outline" disabled={loading} onClick={handleSignOut}>
            Sign Out
        </Button>
    );
};
