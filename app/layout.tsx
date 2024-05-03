// THIS FILE IS THE MAIN ENTRYPOINT FOR THE WEB APPLICATION

import type { Metadata } from "next";
import "./globals.css";

import dynamic from "next/dynamic";
import { Inter } from "next/font/google";

const Footer = dynamic(() => import("../components/footer"), {
	ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Securing Software",
	description: "Project I for the course Cyber Security Base 2024",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<main className="flex w-full justify-center items-center">
					{children}
				</main>
				<Footer />
			</body>
		</html>
	);
}
