import dynamic from "next/dynamic";

interface ClientOnlyProps {
	children: JSX.Element;
}

const ClientOnly = ({ children }: ClientOnlyProps) => {
	return children;
};

export default dynamic(() => Promise.resolve(ClientOnly), {
	ssr: false,
});
