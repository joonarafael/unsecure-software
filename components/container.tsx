"use client";

interface ContainerProps {
	children: React.ReactNode;
}

// container wrapper creates an upper bound for the content width

const Container = ({ children }: ContainerProps) => {
	return (
		<div className="min-w-[180px] w-[90vw] xl:w-[80vw] max-w-[1320px] flex justify-center items-center text-center">
			{children}
		</div>
	);
};

export default Container;
