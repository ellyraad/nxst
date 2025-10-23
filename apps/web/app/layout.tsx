import type { Metadata } from "next";
import "./globals.css";
import type { JSX } from "react";

export const metadata: Metadata = {
	title: "NXST",
	description: "Boilerplate",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>): JSX.Element {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
