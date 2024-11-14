export function LoadingCircleComponent() {
    return (
        <div className="flex items-center justify-center h-3/4">
            <div className="animate-spin">
                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#8ac241' }}>
                    <path
                        d="M12 4V2M12 22V20M20 12H22M2 12H4M16.95 7.05L18.36 5.64M5.64 18.36L7.05 16.95M16.95 16.95L18.36 18.36M5.64 5.64L7.05 7.05"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        </div>
    );
}
