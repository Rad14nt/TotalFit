"use client";
import {useState} from "react";
import {Amplify} from "aws-amplify";
import amplifyconfig from "../../amplifyconfiguration.json";
import {LoadingCircleComponent} from "@/components/component/loading-circle-component";
import {useRouter} from "next/navigation";
import useAsyncEffect from "use-async-effect";
import {fetchUser} from "@/actions/fetch-user";

Amplify.configure(amplifyconfig);

const Dashboard = () => {
    const [userAttributes, setUserAttributes] = useState<Partial<Record<string, string>> | null>(null);
    const [userData, setUserData] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useAsyncEffect(async () => {
        try {
            const userData = await fetchUser(router);
            if (userData) {
                setUserAttributes(userData.userAttributes);
                setUserData(userData.userData);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    if (isLoading) {
        return <LoadingCircleComponent/>;
    }

    return (
        <div className="w-full h-full">
            <div className="grid grid-cols-2 gap-8">

                <div className="grid gap-8 mb-8">
                    {/* 2x2 grid of small divs */}
                    <div className="grid grid-cols-9 grid-rows-2 gap-8 col-span-2 h-[21.25rem]">
                        <div className="grid col-span-4 row-span-2  gap-8">
                            {/* Weekly Progress Card */}
                            <div
                                className="bg-white dark:bg-darkBackground p-4 rounded-3xl shadow-sm h-full flex flex-col justify-between hover:shadow-[inset_0_0_10px_0_rgba(153,205,50,0.5)]">
                                <div className="flex items-center">
                                    <div className="bg-purple-100 p-2 rounded-full">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="48px"
                                            viewBox="0 -960 960 960"
                                            width="48px"
                                            fill="currentColor"
                                            className="text-purple-600 h-10 w-10"
                                        >
                                            <path
                                                d="m278-40 116-586-101 43v133h-61v-173l192-81q14-6 29.5-7.5T484-710q17 3 29.5 11t20.5 20l42 66q31 48 77.5 75.5T753-510v60q-70-2-123.5-30.5T533-568l-38 152 92 83v293h-60v-240l-108-98-79 338h-62Zm262-714q-30 0-51.5-21.5T467-827q0-30 21.5-51.5T540-900q30 0 51.5 21.5T613-827q0 30-21.5 51.5T540-754Z"/>
                                        </svg>

                                    </div>
                                    <div className="ml-4">
                                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                                            Weekly Progress
                                        </p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                            42km
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="w-full bg-purple-100 h-1.5 rounded-full">
                                        <div
                                            className="bg-purple-600 h-1.5 rounded-full"
                                            style={{width: '50%'}}
                                        ></div>
                                    </div>
                                </div>
                            </div>


                            {/* Another Weekly Progress Card */}
                            <div
                                className="bg-white dark:bg-darkBackground p-4 rounded-3xl shadow-sm h-full flex flex-col justify-between hover:shadow-[inset_0_0_10px_0_rgba(153,205,50,0.5)]">
                                <div className="flex items-center">
                                    <div className="bg-purple-100 p-2 rounded-full">
                                        <img
                                            src="/walk_icon.svg"
                                            alt="Directions Walk Icon"
                                            className="h-10 w-10 text-purple-600"
                                        />

                                    </div>
                                    <div className="ml-4">
                                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                                            Weekly Progress
                                        </p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                            42km
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="w-full bg-purple-100 h-1.5 rounded-full">
                                        <div
                                            className="bg-purple-600 h-1.5 rounded-full"
                                            style={{width: '50%'}}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="bg-white col-span-5 right dark:bg-darkBackground row-span-2 p-4 rounded-3xl shadow-sm h-full  hover:shadow-[inset_0_0_10px_0_rgba(153,205,50,0.5)]">
                            macros
                        </div>
                    </div>

                </div>

                <div
                    className="bg-white dark:bg-darkBackground p-4 rounded-3xl shadow-sm h-[21.25rem] hover:shadow-[inset_0_0_10px_0_rgba(153,205,50,0.5)]">
                    foooooods
                </div>
            </div>
            <div className="grid grid-cols-7 grid-rows-1 gap-8 h-96">

                <div
                    className="bg-white dark:bg-darkBackground col-span-5 p-4 rounded-3xl shadow-sm hover:shadow-[inset_0_0_10px_0_rgba(153,205,50,0.5)]">
                    Workouts

                </div>
                <div
                    className="bg-white dark:bg-darkBackground col-span-2 p-4 rounded-3xl shadow-sm hover:shadow-[inset_0_0_10px_0_rgba(153,205,50,0.5)]">
                    Friend activity

                </div>

            </div>

        </div>

    );
};

export default Dashboard;
