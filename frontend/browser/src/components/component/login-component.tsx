import React, {useState} from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {handleSignIn, handleSignInWithGoogle} from '@/auth';
import {useRouter} from 'next/navigation';

interface LoginComponentProps {
    onClose: () => void;
    onSwitchToRegister: () => void;
}

interface IconProps extends React.SVGProps<SVGSVGElement> {
}

export function LoginComponent({onClose, onSwitchToRegister}: LoginComponentProps) {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleLogin = async () => {
        try {
            await handleSignIn({email, password}, router);
            router.push('/dashboard');
        } catch (err: any) {
            if (err.name === 'UserNotFoundException') {
                setError('Incorrect username or password. Please try again.');
            } else if (err.name === 'NotAuthorizedException') {
                setError('Incorrect username or password. Please try again.');
            } else {
                setError('Login failed. Please check your email and password and try again.');
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
                <XIcon className="h-5 w-5"/>
                <span className="sr-only">Close</span>
            </Button>

            <CardHeader className="space-y-2 p-6">
                <CardTitle className="text-2xl font-bold">Login</CardTitle>
                <CardDescription>Enter your email and password to log in or log in using your Google
                    account!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
                <div className="grid gap-4">
                    <Button variant="outline" className="flex items-center justify-center gap-2"
                            onClick={() => handleSignInWithGoogle(router)}>
                        <img src="/google_logo.svg" alt="Hero" className="h-5 w-5"/>
                        Google
                    </Button>
                </div>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t"/>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Input id="password" type={passwordVisible ? 'text' : 'password'} placeholder="********"
                               value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <Button
                            variant="ghost"
                            className="absolute right-2 top-1/2 -translate-y-1/2"
                            aria-label="Toggle password visibility"
                            onClick={togglePasswordVisibility}
                        >
                            <EyeIcon className="h-5 w-5"/>
                        </Button>
                    </div>
                    <div className="h-2">
                        {error && <p className="text-red-500">{error}</p>}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between gap-4 p-6">
                <Button variant="outline" onClick={onSwitchToRegister}>Sign Up</Button>
                <Button type="submit" onClick={handleLogin}>Login</Button>
            </CardFooter>
        </Card>
    );
}

function XIcon(props: IconProps) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18"/>
            <path d="m6 6 12 12"/>
        </svg>
    );
}

function EyeIcon(props: IconProps) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
            <circle cx="12" cy="12" r="3"/>
        </svg>
    );
}
