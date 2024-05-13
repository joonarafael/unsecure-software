"use client";

interface SessionProviderProps {
	children: React.ReactNode;
}

const SessionProvider = ({ children }: SessionProviderProps) => {
	return <>{children}</>;
};

export default SessionProvider;
