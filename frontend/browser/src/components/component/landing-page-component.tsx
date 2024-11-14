import Link from "next/link"
import {Button} from "../ui/button"


interface IconProps extends React.SVGProps<SVGSVGElement> {
}

interface LandingPageComponentProps {
    onGetStartedClick: () => void;
}

export function LandingPageComponent({ onGetStartedClick }: LandingPageComponentProps) {
    return (
        <div className="flex flex-col min-h-[100dvh]">
            <header className="w-full flex justify-center bg-background">
                <div className="w-full max-w-screen-xl px-4 lg:px-6 h-20 flex items-center justify-between">
                    <Link href="#" className="flex items-center justify-center" prefetch={false}>
                        <span className="text-3xl font-bold text-lightgreen">TotalFitX</span>
                        <span className="sr-only">TotalFitX</span>
                    </Link>
                    <nav className="ml-auto flex gap-4 sm:gap-6">
                        <Link href="#" className="text-base font-medium hover:underline underline-offset-4" prefetch={false}>
                            Features
                        </Link>
                        <Link href="#" className="text-base font-medium hover:underline underline-offset-4" prefetch={false}>
                            Pricing
                        </Link>
                        <Link href="#" className="text-base font-medium hover:underline underline-offset-4" prefetch={false}>
                            About
                        </Link>
                        <Link href="#" className="text-base font-medium hover:underline underline-offset-4" prefetch={false}>
                            Contact
                        </Link>
                    </nav>
                </div>
            </header>
            <main className="flex-1 ">
                <section className="w-full pt-12 md:pt-24 lg:pt-32 border-y">
                    <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
                        <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
                            <div>
                                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                                    Take Control of Your Health and Fitness
                                </h1>
                                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                    TotalFitX is your comprehensive health and fitness app, empowering and helping you to achieve your wellness goals.
                                </p>
                                <div className="mt-6">
                                    <button
                                        onClick={onGetStartedClick}
                                        className="inline-flex h-10 items-center justify-center rounded-md bg-lightgreen px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                    >
                                        Log In or Sign Up
                                    </button>
                                </div>
                            </div>
                            <img
                                src="/logo.svg"
                                width="550"
                                height="550"
                                alt="Hero"
                                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
                            />
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container space-y-12 px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Comprehensive Health Tracking</h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    TotalFitX provides a centralized dashboard to track your steps, calories, sleep, workouts, and health
                                    metrics, giving you a complete picture of your well-being.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
                            <div className="grid gap-1">
                                <LayoutDashboardIcon className="h-8 w-8 text-primary" />
                                <h3 className="text-lg font-bold">Dashboard</h3>
                                <p className="text-sm text-muted-foreground">
                                    Centralized tracking of your steps, calories, sleep, workouts, and health metrics.
                                </p>
                            </div>
                            <div className="grid gap-1">
                                <NutIcon className="h-8 w-8 text-primary" />
                                <h3 className="text-lg font-bold">Nutrition</h3>
                                <p className="text-sm text-muted-foreground">
                                    Personalized meal plans, food logging, and a comprehensive recipe database.
                                </p>
                            </div>
                            <div className="grid gap-1">
                                <WorkflowIcon className="h-8 w-8 text-primary" />
                                <h3 className="text-lg font-bold">Workouts</h3>
                                <p className="text-sm text-muted-foreground">
                                    Customizable workouts, progress tracking, and real-time form analysis.
                                </p>
                            </div>
                            <div className="grid gap-1">
                                <GroupIcon className="h-8 w-8 text-primary" />
                                <h3 className="text-lg font-bold">Community</h3>
                                <p className="text-sm text-muted-foreground">
                                    Connect with others, join groups, and access certified trainers.
                                </p>
                            </div>
                            <div className="grid gap-1">
                                <XIcon className="h-8 w-8 text-primary" />
                                <h3 className="text-lg font-bold">AI Integration</h3>
                                <p className="text-sm text-muted-foreground">
                                    Predictive analytics, voice assistant, and dynamic goal adjustments.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-muted-foreground">&copy; 2024 TotalFitX. All rights reserved.</p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
                        Terms of Service
                    </Link>
                    <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
                        Privacy
                    </Link>
                </nav>
            </footer>
        </div>
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
            <path d="M3 7V5c0-1.1.9-2 2-2h2"/>
            <path d="M17 3h2c1.1 0 2 .9 2 2v2"/>
            <path d="M21 17v2c0 1.1-.9 2-2 2h-2"/>
            <path d="M7 21H5c-1.1 0-2-.9-2-2v-2"/>
            <rect width="7" height="5" x="7" y="7" rx="1"/>
            <rect width="7" height="5" x="10" y="12" rx="1"/>
        </svg>
    )
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
            <rect width="7" height="9" x="3" y="3" rx="1"/>
            <rect width="7" height="5" x="14" y="3" rx="1"/>
            <rect width="7" height="9" x="14" y="12" rx="1"/>
            <rect width="7" height="5" x="3" y="16" rx="1"/>
        </svg>
    )
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
            <path d="M12 4V2"/>
            <path
                d="M5 10v4a7.004 7.004 0 0 0 5.277 6.787c.412.104.802.292 1.102.592L12 22l.621-.621c.3-.3.69-.488 1.102-.592A7.003 7.003 0 0 0 19 14v-4"/>
            <path
                d="M12 4C8 4 4.5 6 4 8c-.243.97-.919 1.952-2 3 1.31-.082 1.972-.29 3-1 .54.92.982 1.356 2 2 1.452-.647 1.954-1.098 2.5-2 .595.995 1.151 1.427 2.5 2 1.31-.621 1.862-1.058 2.5-2 .629.977 1.162 1.423 2.5 2 1.209-.548 1.68-.967 2-2 1.032.916 1.683 1.157 3 1-1.297-1.036-1.758-2.03-2-3-.5-2-4-4-8-4Z"/>
        </svg>
    )
}


function WorkflowIcon(props: IconProps) {
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
            <rect width="8" height="8" x="3" y="3" rx="2"/>
            <path d="M7 11v4a2 2 0 0 0 2 2h4"/>
            <rect width="8" height="8" x="13" y="13" rx="2"/>
        </svg>
    )
}


function XIcon(props: IconProps) {
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
            <path d="M18 6 6 18"/>
            <path d="m6 6 12 12"/>
        </svg>
    )
}
