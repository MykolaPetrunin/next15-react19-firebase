import { FC, PropsWithChildren } from 'react';

import { AuthLayout as AuthLayoutComponent } from '@/components/authLayout/AuthLayout';

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
    return <AuthLayoutComponent>{children}</AuthLayoutComponent>;
};

export default AuthLayout;
