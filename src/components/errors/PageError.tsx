import { FC } from 'react';

import { Button } from '@/components/ui/button';
import { errorTexts } from '@/components/errors/texts';

export const PageError: FC<{
    error: Error & { digest?: string };
    reset: () => void;
}> = ({ reset }) => {
    return (
        <div className="flex-grow flex items-center justify-center">
            <div className="flex flex-col gap-3 text-center">
                <h2 className="text-gray-800 font-medium text-xl">{errorTexts.pageError.global}</h2>
                <div className="flex justify-center">
                    <Button onClick={() => reset()}>{errorTexts.pageError.tryAgain}</Button>
                </div>
            </div>
        </div>
    );
};
