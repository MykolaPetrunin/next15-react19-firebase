export const signUpFormTexts = {
    title: 'Sign Up',
    buttons: {
        back: 'Back',
        signUp: 'Sign Up',
        loading: 'Loading...'
    },
    inputs: {
        email: {
            label: 'Email',
            placeholder: 'm@example.com',
            error: 'Invalid email format'
        },
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
    }
};
