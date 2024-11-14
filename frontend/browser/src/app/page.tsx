"use client";

import { useState, useEffect } from "react";
import { Amplify } from 'aws-amplify';
import { fetchUserAttributes } from '@aws-amplify/auth';

import amplifyconfig from '../amplifyconfiguration.json';
import { LandingPageComponent } from "@/components/component/landing-page-component";
import { LoginComponent } from "@/components/component/login-component";
import { RegisterComponent } from "@/components/component/register-component";
import 'aws-amplify/auth/enable-oauth-listener';
import { useRouter } from 'next/navigation';

Amplify.configure(amplifyconfig);

export default function Home() {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            try {
                const user = await fetchUserAttributes();
                if (user) {
                    router.push('/dashboard');
                }
            } catch (error) {
                console.log('User not authenticated', error);
            }
        };

        checkUser();
    }, [router]);

    const handleOpenLogin = () => {
        setShowLogin(true);
        setShowRegister(false);
    };

    const handleOpenRegister = () => {
        setShowRegister(true);
        setShowLogin(false);
    };

    const handleClose = () => {
        setShowLogin(false);
        setShowRegister(false);
    };

    return (
        <div className={showLogin || showRegister ? "relative" : ""}>
            <LandingPageComponent onGetStartedClick={handleOpenLogin} />
            {(showLogin || showRegister) && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={handleClose}></div>
                    {showLogin && <LoginComponent onClose={handleClose} onSwitchToRegister={handleOpenRegister} />}
                    {showRegister && <RegisterComponent onClose={handleClose} onSwitchToLogin={handleOpenLogin} />}
                </div>
            )}
        </div>
    );
}
