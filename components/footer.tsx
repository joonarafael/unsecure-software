"use client";

const Footer = () => {
	return (
		<div>
			<div>
				<p>FAVICON BY</p>
				<p
					onClick={() => {
						window.open("https://www.freepik.com", "_blank");
					}}
					className="hover:underline cursor-pointer"
				>
					FREEPIK
				</p>
			</div>
		</div>
	);
};

export default Footer;
