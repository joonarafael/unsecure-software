"use client";

interface FormErrorProps {
	text?: string | null;
}

const FormError = ({ text }: FormErrorProps) => {
	return (
		<p className="text-red-500 text-sm">{text ?? "Something went wrong!"}</p>
	);
};

export default FormError;
