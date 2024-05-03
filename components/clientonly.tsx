import dynamic from "next/dynamic";

interface ClientOnlyProps {
	children: JSX.Element;
}

// no server sided rendering for the children within this component

const ClientOnly = ({ children }: ClientOnlyProps) => {
	return children;
};

export default dynamic(() => Promise.resolve(ClientOnly), {
	ssr: false,
});
