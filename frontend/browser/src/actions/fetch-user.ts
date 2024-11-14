// In actions/fetch-user.ts
import { UserControllerApi } from "@/api";
import { useRouter } from "next/navigation";
import { authentify } from "./authentify";

export const fetchUser = async (router: ReturnType<typeof useRouter>) => {
    try {
        const authResult = await authentify(router);
        if (!authResult) {
            return null;
        }

        const { token, userAttributes } = authResult;

        if (token) {
            const apiInstance = new UserControllerApi();
            try {
                const response = await apiInstance.getUserByCognitoUserId({
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                return {
                    userAttributes,
                    userData: response.data
                };
            } catch (error: unknown) {
                const typedError = error as any;

                if (typedError.response && typedError.response.status === 404) {
                    return {
                        userAttributes,
                        userData: null
                    };
                } else {
                    console.log("Error fetching user:", typedError);
                    throw typedError;
                }
            }
        }

        return { userAttributes, userData: null };
    } catch (error) {
        console.log("Error in authentify or fetch:", error);
        return null;
    }
};
