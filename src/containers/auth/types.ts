export enum AuthState {
    Login = 'login',
    SignUp = 'register',
    ResetPassword = 'resetPassword',
}

// switch (error.code) {
//                case 'auth/email-already-in-use':
//                    console.error('This email is already in use.');
//                    break;
//                case 'auth/invalid-email':
//                    console.error('Invalid email format.');
//                    break;
//                case 'auth/operation-not-allowed':
//                    console.error('Email/password sign-in is disabled.');
//                    break;
//                case 'auth/weak-password':
//                    console.error('Password is too weak.');
//                    break;
//                default:
//                    console.error('Unknown error:', error.message);

export enum SignUpErrorCodes {
    AlreadyInUse = 'auth/email-already-in-use',
    InvalidEmail = 'auth/invalid-email',
    OperationNotAllowed = 'auth/operation-not-allowed',
    WeakPassword = 'auth/weak-password',
}

export interface SignUpError {
    code: SignUpErrorCodes;
}