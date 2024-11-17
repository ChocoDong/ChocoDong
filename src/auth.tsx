import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

type AuthCredentials = {
    email: string;
    password: string;
};

export function signIn({ email, password }: AuthCredentials): Promise<FirebaseAuthTypes.UserCredential> {
    return auth().signInWithEmailAndPassword(email, password);
}

export function signUp({ email, password }: AuthCredentials): Promise<FirebaseAuthTypes.UserCredential> {
    return auth().createUserWithEmailAndPassword(email, password);
}

export function subscribeAuth(callback: (user: FirebaseAuthTypes.User | null) => void): () => void {
    return auth().onAuthStateChanged(callback);
}

export function signOut(): Promise<void> {
    return auth().signOut();
}
