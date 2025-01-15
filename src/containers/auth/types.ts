export enum AuthState {
    Login = 'login',
    SignUp = 'register',
    ResetPassword = 'resetPassword'
}

export enum SignUpErrorCodes {
    AlreadyInUse = 'auth/email-already-in-use',
    InvalidEmail = 'auth/invalid-email',
    OperationNotAllowed = 'auth/operation-not-allowed',
    WeakPassword = 'auth/weak-password'
}

export interface SignUpError {
    code: SignUpErrorCodes;
}

export enum ResetPasswordErrorCodes {
    InvalidEmail = 'auth/invalid-email',
    UserNotFound = 'auth/user-not-found'
}

export interface ResetPasswordError {
    code: ResetPasswordErrorCodes;
}

export enum SinInWithPasswordErrorCodes {
    InvalidEmail = 'auth/invalid-email',
    UserNotFound = 'auth/user-not-found',
    WrongPassword = 'auth/wrong-password',
    UserDisabled = 'auth/user-disabled'
}

export interface SinInWithPasswordError {
    code: SinInWithPasswordErrorCodes;
}

export enum SinInWithPopupErrorCodes {
    PopupClosedByUser = 'auth/popup-closed-by-user',
    CancelledPopupRequest = 'auth/cancelled-popup-request',
    PopupBlocked = 'auth/popup-blocked',
    OperationNotAllowed = 'auth/operation-not-allowed',
    AccountExistsWithDifferentCredential = 'auth/account-exists-with-different-credential',
    InvalidCredential = 'auth/invalid-credential',
    InvalidEmail = 'auth/invalid-email',
    UnauthorizedDomain = 'auth/unauthorized-domain'
}

export interface SinInWithPopupError {
    code: SinInWithPopupErrorCodes;
}
