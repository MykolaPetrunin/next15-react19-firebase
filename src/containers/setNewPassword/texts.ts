import { SetNewPasswordErrorCodes } from '@/containers/setNewPassword/types';

export const setNewPasswordTexts = {
    setNewPasswordErrors: {
        [SetNewPasswordErrorCodes.OperationNotAllowed]: 'Email/password sign-in is disabled',
        [SetNewPasswordErrorCodes.WeakPassword]: 'Password is too weak',
        [SetNewPasswordErrorCodes.InvalidActionCode]: 'The action code provided is invalid'
    }
};
