// THIS FILE IS THE MAIN ENTRYPOINT FOR THE WEB APPLICATION
// layout.tsx defines the core HTML structure of the website and every route

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
				{children}
				<Footer />
			</body>
		</html>
	);
}
