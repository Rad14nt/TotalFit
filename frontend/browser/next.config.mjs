/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_AWS_REGION: process.env.NEXT_PUBLIC_AWS_REGION,
        NEXT_PUBLIC_AWS_USER_POOL_ID: process.env.NEXT_PUBLIC_AWS_USER_POOL_ID,
        NEXT_PUBLIC_AWS_CLIENT_ID: process.env.NEXT_PUBLIC_AWS_CLIENT_ID,
        NEXT_PUBLIC_COGNITO_DOMAIN: process.env.NEXT_PUBLIC_COGNITO_DOMAIN,
        NEXT_PUBLIC_REDIRECT_SIGNIN: process.env.NEXT_PUBLIC_REDIRECT_SIGNIN,
        NEXT_PUBLIC_REDIRECT_SIGNOUT: process.env.NEXT_PUBLIC_REDIRECT_SIGNOUT,
    },
};

export default nextConfig;
