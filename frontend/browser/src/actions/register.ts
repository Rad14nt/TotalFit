import { UserControllerApi, UserRegistrationDto } from "@/api";
import { useRouter } from "next/navigation";
import { authentify } from "./authentify";

export const registerUser = async (
    router: ReturnType<typeof useRouter>,
    userData: UserRegistrationDto
) => {
    try {
        const authResult = await authentify(router);
        if (!authResult) {
            return null;
        }

        const { token } = authResult;

        if (token) {
            const apiInstance = new UserControllerApi();
            const response = await apiInstance.registerUser(userData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        }

        return null;
    } catch (error) {
        console.log("Error registering user:", error);
        return null;
    }
};
