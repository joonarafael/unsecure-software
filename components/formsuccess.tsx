"use client";

interface FormSuccessProps {
	text?: string | null;
}

const FormSuccess = ({ text }: FormSuccessProps) => {
	return <p className="text-emerald-500 text-sm">{text ?? "Success!"}</p>;
};

export default FormSuccess;
