import getFirebaseAuth from "@/containers/auth/services/getFirebaseAuth";
import {useCallback} from "react";
import {signOut as signOutFirebase} from "firebase/auth";
import {logOut} from "@/containers/auth/services/logOut";

export const useSignOut = () => {
    return useCallback(async () => {
        const auth = getFirebaseAuth();

        await signOutFirebase(auth);
        await logOut();
    }, []);
}