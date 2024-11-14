import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logOut } from "@/auth";

interface IconProps extends React.SVGProps<SVGSVGElement> {}

const handleSignOut = async () => {
    try {
        await logOut();
        window.location.href = "/";
    } catch (error) {
        console.log("Error signing out:", error);
    }
};

export function HeaderComponent({ toggleSidebar, isScreenNarrow }: { toggleSidebar: () => void, isScreenNarrow: boolean }) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        document.documentElement.classList.toggle("dark");
        setIsDarkMode(!isDarkMode);
    };

    return (
        <header
            className="flex items-center justify-between bg-white dark:bg-darkBackground px-4 pr-12 py-3md:px-6"
            style={{ height: "130px", minHeight: "130px", maxHeight: "130px" }}
        >
            <div className="flex items-center gap-4">
                {!isScreenNarrow && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full w-14 h-14 hover:bg-transparent hover:border-atlantis-400 hover:border-2 md:w-16 md:h-16"
                        onClick={toggleSidebar}
                    >
                        <MenuIcon className="h-8 w-8 text-newPrimary" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                )}
                <h1 className="text-[28px] font-bold text-black dark:text-darkText">
                    Dashboard
                </h1>
            </div>

            <div className="flex flex-grow justify-end items-center">
                <div className="relative max-w-lg" style={{ marginRight: "30px" }}>
                    <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-black dark:text-darkText" />
                    <Input
                        type="search"
                        placeholder="Search here..."
                        className="w-[300px] rounded-lg bg-[#EFEFEF] dark:bg-darkSecondaryBackground shadow-sm pl-12 pr-4 h-[46px] text-sm focus-visible:ring-0 focus-visible:ring-offset-atlantis-400 focus:border-atlantis-400 outline-none focus:outline-none"
                    />
                </div>
                <div className="flex items-center gap-[16px]">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-[8px] shadow-sm bg-atlantis-100 dark:bg-transparent dark:border-atlantis-400 dark:border-2 w-[46px] h-[46px]"
                        onClick={toggleDarkMode}
                    >
                        {isDarkMode ? (
                            <SunIcon className="h-6 w-6 text-atlantis-400 dark:text-atlantis-400" />
                        ) : (
                            <MoonIcon className="h-6 w-6 text-atlantis-700" />
                        )}
                        <span className="sr-only">Toggle dark mode</span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-[8px] shadow-sm bg-atlantis-100 dark:bg-transparent dark:border-atlantis-400 dark:border-2 w-[46px] h-[46px]"
                    >
                        <BellIcon className="h-6 w-6 text-atlantis-700 dark:text-atlantis-400" />
                        <span className="sr-only">Notifications</span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-[8px] shadow-sm bg-atlantis-100 dark:bg-transparent dark:border-atlantis-400 dark:border-2 w-[46px] h-[46px]"
                    >
                        <Icon1 className="h-6 w-6 text-atlantis-700 dark:text-atlantis-400" />
                        <span className="sr-only">Icon 1</span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-[8px] shadow-sm bg-atlantis-100 dark:bg-transparent dark:border-atlantis-400 dark:border-[2px]  w-[46px] h-[46px]"
                    >
                        <Icon2 className="h-6 w-6 text-atlantis-700 dark:text-atlantis-400" />
                        <span className="sr-only">Icon 2</span>
                    </Button>
                </div>

                <div className="flex items-center ml-6 gap-[16px]">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full flex items-center"
                            >
                                <Avatar className="h-[49px] w-[49px]">
                                    <AvatarImage src="/portrait.png" alt="User Profile" />
                                    <AvatarFallback>PP</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>My Account</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleSignOut}>
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-black dark:text-darkText whitespace-nowrap">
                            Peter Parkur
                        </span>
                        <span className="text-xs text-muted-foreground">Admin</span>
                    </div>
                </div>
            </div>
        </header>
    );
}


function Icon1(props: IconProps) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10"/>
            <line x1="14" y1="8" x2="10" y2="16"/>
        </svg>
    );
}

function Icon2(props: IconProps) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        </svg>
    );
}

function BellIcon(props: IconProps) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
        </svg>
    );
}

function MenuIcon(props: IconProps) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="4" x2="20" y1="12" y2="12"/>
            <line x1="4" x2="20" y1="6" y2="6"/>
            <line x1="4" x2="20" y1="18" y2="18"/>
        </svg>
    );
}

function MoonIcon(props: IconProps) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
        </svg>
    );
}

function SearchIcon(props: IconProps) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.3-4.3"/>
        </svg>
    );
}

function SunIcon(props: IconProps) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2"/>
            <path d="M12 20v2"/>
            <path d="m4.93 4.93 1.41 1.41"/>
            <path d="m17.66 17.66 1.41 1.41"/>
            <path d="M2 12h2"/>
            <path d="M20 12h2"/>
            <path d="m6.34 17.66-1.41 1.41"/>
            <path d="m19.07 4.93-1.41 1.41"/>
        </svg>
    )
}
