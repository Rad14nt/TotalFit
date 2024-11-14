import { fetchAuthSession, fetchUserAttributes } from "@aws-amplify/auth";
import { useRouter } from "next/navigation";

interface UserAttributes {
    email: string | undefined;
    sub: string | undefined;
    picture: string | undefined;
}

export const authentify = async (router: ReturnType<typeof useRouter>) => {
    try {
        const session = await fetchAuthSession();
        const token = session.tokens?.accessToken;

        if (!token) {
            console.log("No valid token found, redirecting to login page");
            router.push("/");
            return null;
        }

        const attributes = await fetchUserAttributes();
        const formattedAttributes: UserAttributes = {
            email: attributes.email,
            sub: attributes.sub,
            picture: attributes.picture
        };

        return { token, userAttributes: formattedAttributes };
    } catch (error) {
        console.error("Error during authentication:", error);
        router.push("/");
        return null;
    }
};
