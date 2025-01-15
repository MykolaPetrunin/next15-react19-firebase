export enum SetNewPasswordErrorCodes {
    OperationNotAllowed = 'auth/operation-not-allowed',
    WeakPassword = 'auth/weak-password',
    InvalidActionCode = 'auth/invalid-action-code'
}

export interface SetNewPasswordError {
    code: SetNewPasswordErrorCodes;
}
