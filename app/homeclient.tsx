"use client";

// HOME PAGE CLIENT SIDE

interface HomeClientProps {
	currentTime: string;
}

const HomeClient = ({ currentTime }: HomeClientProps) => {
	return (
		<div>
			<p>{currentTime}</p>
		</div>
	);
};

export default HomeClient;
