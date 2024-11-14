import React from "react";
import Link from "next/link";

interface SideNavProps {
    pathname: string;
    isCollapsed: boolean;
}

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export function SideNavComponent({ pathname, isCollapsed }: SideNavProps) {
    const navItems = [
        { href: '/dashboard', label: 'Dashboard', Icon: LayoutDashboardIcon },
        { href: '/activity', label: 'Activity', Icon: ActivityIcon },
        { href: '/nutrition', label: 'Nutrition', Icon: NutIcon },
        { href: '/community', label: 'Community', Icon: GroupIcon },
        { href: '/analytics', label: 'Analytics', Icon: AnalyticsIcon },
        { href: '/smart-gadgets', label: 'Gadgets', Icon: GadgetsIcon },
    ];

    return (
        <div className={`h-full ${isCollapsed ? 'w-24' : 'w-80'} flex-shrink-0 relative flex bg-white dark:bg-darkBackground shadow-lg transition-all duration-300 overflow-hidden`}>
            <nav className="flex flex-col items-start gap-8 pt-6 pb-4 h-full w-full relative">
                <div className="flex items-center w-full">
                    <div className={`flex items-center ${isCollapsed ? 'pl-6' : 'pl-6'} pt-2`}>
                        <img src="/logo.svg" alt="TotalFitX Logo" className="h-14 w-14"/>
                        <div
                            className={`text-newPrimary pt-2 text-3xl font-bold ml-3 transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'}`}
                            style={{
                                transitionProperty: 'opacity, width',
                                transitionTimingFunction: 'ease',
                            }}
                        >
                            TotalFitX
                        </div>
                    </div>
                </div>
                <div className="grid w-full gap-4 pt- mt-12 relative">
                    {navItems.map(({ href, label, Icon }) => {
                        const isActive = pathname === href;
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={`relative flex items-center text-lg font-medium border-2 rounded-l-lg ${isCollapsed ? 'justify-center rounded-lg ml-2.5' : 'ml-2.5'} ${
                                    isActive
                                        ? `bg-atlantis-100 dark:border-atlantis-400 dark:bg-transparent border-transparent dark:text-atlantis-400 text-atlantis-600 dark:shadow-[inset_0_0_10px_0_rgba(153,205,50,0.5)] ${isCollapsed ? 'mx-2' : 'ml-2'}`
                                        : `${isCollapsed ? '' : 'ml-2 '} border-transparent text-sidebarText hover:text-atlantis-400 dark:text-sidebarTextDark dark:hover:text-white`
                                }`}
                                style={{ height: '4.5rem', width: isCollapsed ? '4.5rem' : '100%' }}
                            >
                                <div className="h-full flex-shrink-0 flex justify-center items-center" style={{ width: '4.3rem' }}>
                                    <div className={`flex items-center justify-center w-8 h-8`}>
                                        <Icon className="h-10 w-10"/>
                                    </div>
                                </div>

                                {!isCollapsed && (
                                    <span>
                                        {label}
                                    </span>
                                )}
                                {isActive && !isCollapsed && (
                                    <div
                                        className="absolute right-0 top-0 h-full w-3 bg-atlantis-600 dark:bg-atlantis-400 rounded-sm"
                                        style={{ right: '0px' }}
                                    ></div>
                                )}
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
}




function ActivityIcon(props: IconProps) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
        </svg>
    );
}


function GroupIcon(props: IconProps) {
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
            <path d="M3 7V5c0-1.1.9-2 2-2h2" />
            <path d="M17 3h2c1.1 0 2 .9 2 2v2" />
            <path d="M21 17v2c0 1.1-.9 2-2 2h-2" />
            <path d="M7 21H5c-1.1 0-2-.9-2-2v-2" />
            <rect width="7" height="5" x="7" y="7" rx="1" />
            <rect width="7" height="5" x="10" y="12" rx="1" />
        </svg>
    );
}

function LayoutDashboardIcon(props: IconProps) {
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
            <rect width="7" height="9" x="3" y="3" rx="1" />
            <rect width="7" height="5" x="14" y="3" rx="1" />
            <rect width="7" height="9" x="14" y="12" rx="1" />
            <rect width="7" height="5" x="3" y="16" rx="1" />
        </svg>
    );
}

function NutIcon(props: IconProps) {
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
            <path d="M12 4V2" />
            <path d="M5 10v4a7.004 7.004 0 0 0 5.277 6.787c.412.104.802.292 1.102.592L12 22l.621-.621c.3-.3.69-.488 1.102-.592A7.003 7.003 0 0 0 19 14v-4" />
            <path d="M12 4C8 4 4.5 6 4 8c-.243.97-.919 1.952-2 3 1.31-.082 1.972-.29 3-1 .54.92.982 1.356 2 2 1.452-.647 1.954-1.098 2.5-2 .595.995 1.151 1.427 2.5 2 1.31-.621 1.862-1.058 2.5-2 .629.977 1.162 1.423 2.5 2 1.209-.548 1.68-.967 2-2 1.032.916 1.683 1.157 3 1-1.297-1.036-1.758-2.03-2-3-.5-2-4-4-8-4Z" />
        </svg>
    );
}

function ReplyIcon(props: IconProps) {
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
            <polyline points="9 17 4 12 9 7" />
            <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
        </svg>
    );
}

function AnalyticsIcon(props: IconProps) {
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
            <path d="M12 20v-7" />
            <path d="M18 20V10" />
            <path d="M6 20v-4" />
        </svg>
    );
}

function GadgetsIcon(props: IconProps) {
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
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <path d="M16 3v4h-2V3" />
            <path d="M8 3v4H6V3" />
            <path d="M16 17v4h-2v-4" />
            <path d="M8 17v4H6v-4" />
            <path d="M3 9h18" />
            <path d="M3 15h18" />
        </svg>
    );
}
