import { signIn, signInWithRedirect, signOut, signUp, fetchAuthSession, fetchUserAttributes } from 'aws-amplify/auth';

export const handleSignUp = async ({ email, password }, router) => {
    try {
        const { user } = await signUp({
            username: email,
            password,
            attributes: {
                email,
            },
        });
        console.log('User signed up:', user);
    } catch (error) {
        console.log('Error signing up:', error);
        throw error;
    }
};

export const handleSignIn = async ({ email, password }, router) => {
    try {
        await signIn({ username: email, password });
        router.push('/dashboard');
    } catch (error) {
        if (error.name === 'UserAlreadyAuthenticatedException') {
            console.log('User already authenticated');
            router.push('/dashboard');
        } else {
            console.log('Error signing in:', error);
            throw error;
        }
    }
};

export const handleSignInWithGoogle = async (router) => {
    try {
        await signInWithRedirect({ provider: 'Google' });
        router.push('/dashboard');
    } catch (error) {
        console.log('Error signing in with Google:', error);
        throw error;
    }
};

export const logOut = async (router) => {
    try {
        await signOut();
        console.log('User signed out');
    } catch (error) {
        console.log('Error signing out:', error);
        throw error;
    }
};

export const refreshToken = async () => {
    try {
        const session = await fetchAuthSession();
        return session.tokens.accessToken;
    } catch (error) {
        console.log('Error fetching auth session:', error);
        return null;
    }
};

