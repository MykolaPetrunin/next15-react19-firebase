import { ResetPasswordErrorCodes, SignUpErrorCodes, SinInWithPasswordErrorCodes, SinInWithPopupErrorCodes } from '@/containers/auth/types';

export const authTexts = {
    signUpErrors: {
        [SignUpErrorCodes.AlreadyInUse]: 'Email already exists',
        [SignUpErrorCodes.InvalidEmail]: 'Invalid email',
        [SignUpErrorCodes.OperationNotAllowed]: 'Email/password sign-in is disabled',
        [SignUpErrorCodes.WeakPassword]: 'Password is too weak'
    },
    resetPasswordErrors: {
        [ResetPasswordErrorCodes.InvalidEmail]: 'Invalid email',
        [ResetPasswordErrorCodes.UserNotFound]: 'User not found'
    },
    signInWithPasswordErrors: {
        [SinInWithPasswordErrorCodes.InvalidEmail]: 'Invalid email',
        [SinInWithPasswordErrorCodes.UserNotFound]: 'User not found',
        [SinInWithPasswordErrorCodes.WrongPassword]: 'Wrong password',
        [SinInWithPasswordErrorCodes.UserDisabled]: 'User is disabled'
    },
    signInWithPopupErrors: {
        [SinInWithPopupErrorCodes.PopupClosedByUser]: 'Popup closed by user',
        [SinInWithPopupErrorCodes.CancelledPopupRequest]: 'Cancelled popup request',
        [SinInWithPopupErrorCodes.PopupBlocked]: 'Popup blocked',
        [SinInWithPopupErrorCodes.OperationNotAllowed]: 'Operation not allowed',
        [SinInWithPopupErrorCodes.AccountExistsWithDifferentCredential]: 'Account exists with different credential',
        [SinInWithPopupErrorCodes.InvalidCredential]: 'Invalid credential',
        [SinInWithPopupErrorCodes.InvalidEmail]: 'Invalid email',
        [SinInWithPopupErrorCodes.UnauthorizedDomain]: 'Unauthorized domain'
    },
    signOutErrors: {
        unknown: '"An unknown error occurred during logout"'
    }
};
