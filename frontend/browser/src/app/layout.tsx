"use client";
import React, { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { usePathname, useRouter } from 'next/navigation';
import useAsyncEffect from "use-async-effect";
import { fetchUser } from "@/actions/fetch-user";
import { SideNavComponent } from "@/components/component/side-nav-component";
import { HeaderComponent } from "@/components/component/header-component";
import { refreshToken } from "@/auth";
import { authentify } from "@/actions/authentify";
import { AccountSetupStepper} from "@/components/component/account-setup-stepper";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [userAttributes, setUserAttributes] = useState<Partial<Record<string, string>> | null>(null);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isScreenNarrow, setIsScreenNarrow] = useState(false);
    const [isUserDataFetched, setIsUserDataFetched] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const handleUserFetch = async () => {
        const userResult = await fetchUser(router);
        if (userResult && userResult.userAttributes) {
            setUserAttributes(userResult.userAttributes);
            setIsUserDataFetched(!!userResult.userData);
        } else {
            router.push("/");
        }
    };

    useAsyncEffect(() => {
        handleUserFetch();
    }, [router]);

    const handleCompleteRegistration = async () => {
        await handleUserFetch();
    };

    useEffect(() => {
        const tokenRefreshInterval = setInterval(async () => {
            const newToken = await refreshToken();
            if (!newToken) {
                router.push("/");
            }
        }, 15 * 60 * 1000);

        return () => clearInterval(tokenRefreshInterval);
    }, [router]);

    useEffect(() => {
        const handleResize = () => {
            const isNarrow = window.innerWidth < 1200;
            setIsScreenNarrow(isNarrow);
            if (isNarrow) {
                setIsSidebarCollapsed(true);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleSidebar = () => {
        if (!isScreenNarrow) {
            setIsSidebarCollapsed(prevState => !prevState);
        }
    };

    return (
        <html lang="en">
        <head>
            <title>TotalFitX</title>
            <link rel="shortcut icon" href="/logo.svg" />
        </head>
        <body className={`${inter.className} flex min-h-screen overflow-hidden`}>
        {!userAttributes ? (
            <div className="flex-grow">
                <main className="w-full h-full">
                    {children}
                </main>
            </div>
        ) : (
            <div className="flex flex-grow overflow-hidden min-h-screen bg-white dark:bg-darkBackground relative">
                <SideNavComponent pathname={pathname} isCollapsed={isSidebarCollapsed} />
                <div className="flex flex-col flex-grow overflow-hidden">
                    <HeaderComponent toggleSidebar={toggleSidebar} isScreenNarrow={isScreenNarrow} />
                    <div className={`flex-grow overflow-y-auto bg-newLightGray rounded-tl-3xl dark:bg-darkSecondaryBackground p-12 ${!isUserDataFetched ? 'blur-md' : ''}`}>
                        <main className="w-full h-full">
                            {children}
                        </main>
                    </div>
                </div>

                {!isUserDataFetched && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
                        <AccountSetupStepper onComplete={handleCompleteRegistration} />
                    </div>
                )}
            </div>
        )}
        </body>
        </html>
    );
}
