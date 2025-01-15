import { FC } from 'react';

import { SetNewPassword } from '@/containers/setNewPassword/SetNewPassword';

interface Props {
    searchParams: Promise<{ oobCode?: string }>;
}

const SetNewPasswordPage: FC<Props> = async ({ searchParams }) => {
    const { oobCode } = await searchParams;
    return <SetNewPassword oobCode={oobCode} />;
};

export default SetNewPasswordPage;
