import { FC } from 'react';
import Link from 'next/link';

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { setNewPasswordFormTexts } from '@/components/setNewPasswordForm/texts';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { appPaths } from '@/configs/appPaths';

export const PasswordSet: FC = () => {
    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-xl">{setNewPasswordFormTexts.success.title}</CardTitle>
                <CardDescription>{setNewPasswordFormTexts.success.description}</CardDescription>
            </CardHeader>
            <CardFooter className="justify-center">
                <Link className={cn([buttonVariants({ variant: 'secondary' }), 'grow'])} href={appPaths.auth.login}>
                    {setNewPasswordFormTexts.buttons.backToLogin}
                </Link>
            </CardFooter>
        </Card>
    );
};
