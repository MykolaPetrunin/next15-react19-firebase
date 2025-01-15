export const setNewPasswordFormTexts = {
    title: 'Set new password',
    description: 'Please enter your new password below.',
    inputs: {
        password: {
            label: 'Password',
            placeholder: 'Please enter your password',
            errors: {
                minLength: 'Password must be at least 8 characters long',
                maxLength: 'Password must be no more than 4096 characters long',
                uppercase: 'Password must contain at least one uppercase letter',
                lowercase: 'Password must contain at least one lowercase letter',
                numeric: 'Password must contain at least one numeric character',
                special: 'Password must contain at least one special character'
            }
        },
        repeatPassword: {
            label: 'Repeat password',
            placeholder: 'Please repeat your password',
            error: 'Passwords do not match'
        }
    },
    buttons: {
        backToLogin: 'Back to login',
        submit: 'Set new password',
        loading: 'Loading...'
    },
    noOobCode: {
        title: 'Your link is invalid',
        description: 'Your link is invalid or expired. Please request a new one.'
    },
    success: {
        title: 'Password set',
        description: 'Your password has been successfully set. You can now log in with your new password.'
    }
};
