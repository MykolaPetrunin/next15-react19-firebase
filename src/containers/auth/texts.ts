import {SignUpErrorCodes} from "@/containers/auth/types";

export const authTexts = {
    signUpErrors: {
        [SignUpErrorCodes.AlreadyInUse]: 'Email already exists',
        [SignUpErrorCodes.InvalidEmail]: 'Invalid email',
        [SignUpErrorCodes.OperationNotAllowed]: 'Email/password sign-in is disabled',
        [SignUpErrorCodes.WeakPassword]: 'Password is too weak',
        defaultError: 'Unknown sign up error',
    }
}