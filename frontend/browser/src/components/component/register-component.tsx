import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { handleSignUp, handleSignInWithGoogle } from '@/auth';
import { useRouter } from 'next/navigation';

interface RegisterComponentProps {
    onClose: () => void;
    onSwitchToLogin: () => void;
}
interface IconProps extends React.SVGProps<SVGSVGElement> {}

const passwordRequirements = [
    { regex: /.{8,}/, message: 'Password must be at least 8 characters long.' },
    { regex: /[A-Z]/, message: 'Password must contain at least one uppercase letter.' },
    { regex: /[a-z]/, message: 'Password must contain at least one lowercase letter.' },
    { regex: /[0-9]/, message: 'Password must contain at least one number.' },
    { regex: /[!@#$%^&*.]/, message: 'Password must contain at least one special character.' },
];

export function RegisterComponent({ onClose, onSwitchToLogin }: RegisterComponentProps) {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
    const [serverError, setServerError] = useState<string | null>(null);
    const router = useRouter();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string) => {
        for (let requirement of passwordRequirements) {
            if (!requirement.regex.test(password)) {
                return requirement.message;
            }
        }
        return null;
    };

    const handleEmailBlur = () => {
        if (email && !validateEmail(email)) {
            setEmailError('Invalid email address.');
        } else {
            setEmailError(null);
        }
    };

    const handlePasswordBlur = () => {
        const error = validatePassword(password);
        setPasswordError(error);

        if (confirmPassword && password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match.');
        } else {
            setConfirmPasswordError(null);
        }
    };

    const handleConfirmPasswordBlur = () => {
        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match.');
        } else {
            setConfirmPasswordError(null);
        }
    };

    const handleRegister = async () => {
        handleEmailBlur();
        handlePasswordBlur();
        handleConfirmPasswordBlur();

        if (emailError || passwordError || confirmPasswordError) {
            setServerError('Please fix the errors above before proceeding.');
            return;
        }

        try {
            await handleSignUp({ email, password }, router);
        } catch (err: any) {
            if (err.name === 'UsernameExistsException') {
                setServerError('User already exists. Please use a different email or login.');
            } else {
                setServerError('Registration failed. Please check your details and try again.');
            }
        }
    };

    return (
        <Card className="w-full max-w-sm rounded-lg border border-input shadow-lg relative">
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-muted-foreground hover:bg-muted"
                onClick={onClose}
            >
                <XIcon className="h-5 w-5" />
                <span className="sr-only">Close</span>
            </Button>

            <CardHeader className="space-y-2 p-6">
                <CardTitle className="text-2xl font-bold">Register</CardTitle>
                <CardDescription>Create your account to get started with our platform.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
                <div className="grid gap-4">
                    <Button variant="outline" className="flex items-center justify-center gap-2" onClick={() => handleSignInWithGoogle(router)}>
                        <img src="/google_logo.svg" alt="Hero" className="h-5 w-5" />
                        Google
                    </Button>
                </div>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">Or register with email</span>
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" value={email} onBlur={handleEmailBlur} onChange={(e) => setEmail(e.target.value)} />
                    <div className="h-2">
                        {emailError && <p className="text-red-500">{emailError}</p>}
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Input id="password" type={passwordVisible ? 'text' : 'password'} placeholder="********" value={password} onBlur={handlePasswordBlur} onChange={(e) => setPassword(e.target.value)} />
                        <Button
                            variant="ghost"
                            className="absolute right-2 top-1/2 -translate-y-1/2"
                            aria-label="Toggle password visibility"
                            onClick={togglePasswordVisibility}
                        >
                            <EyeIcon className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                        <Input id="confirmPassword" type={confirmPasswordVisible ? 'text' : 'password'} placeholder="********" value={confirmPassword} onBlur={handleConfirmPasswordBlur} onChange={(e) => setConfirmPassword(e.target.value)} />
                        <Button
                            variant="ghost"
                            className="absolute right-2 top-1/2 -translate-y-1/2"
                            aria-label="Toggle password visibility"
                            onClick={toggleConfirmPasswordVisibility}
                        >
                            <EyeIcon className="h-5 w-5" />
                        </Button>
                    </div>
                    <div className="h-2">
                        {(passwordError || confirmPasswordError) && <p className="text-red-500">{passwordError || confirmPasswordError}</p>}
                    </div>
                </div>
                <div className="h-2">
                    {serverError && <p className="text-red-500">{serverError}</p>}
                </div>
            </CardContent>
            <CardFooter className="flex justify-between gap-4 p-6">
                <Button variant="outline" onClick={onSwitchToLogin}>Login</Button>
                <Button type="submit" onClick={handleRegister}>Register</Button>
            </CardFooter>
        </Card>
    );
}

function XIcon(props: IconProps) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    );
}

function EyeIcon(props: IconProps) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}
