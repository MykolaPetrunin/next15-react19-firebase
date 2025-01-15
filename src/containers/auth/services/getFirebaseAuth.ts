import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { initializeAppCheck, ReCaptchaV3Provider } from '@firebase/app-check';

let app: FirebaseApp | undefined;
let auth: Auth | undefined;

const getFirebaseAuth = () => {
    if (!app) {
        app = initializeApp({
            apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
            authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
            measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
        });
        if (typeof window !== 'undefined') {
            initializeAppCheck(app, {
                provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY!),
                isTokenAutoRefreshEnabled: true
            });
        }
    }
    if (!auth) {
        auth = getAuth(app);
    }

    return auth;
};

export default getFirebaseAuth;
