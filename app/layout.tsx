import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, pageMetadata } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	...pageMetadata({ title: SITE_NAME, description: SITE_DESCRIPTION, path: "/" }),
	robots: {
		index: true,
		follow: true,
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<script dangerouslySetInnerHTML={{ __html: `
					(function(){
						var s = localStorage.getItem('theme');
						var d = window.matchMedia('(prefers-color-scheme: dark)').matches;
						document.documentElement.setAttribute('data-theme', s || (d ? 'dark' : 'light'));
					})();
				`}} />
			</head>
			<body>
				{children}
				{/* Vercel Analytics — tracks page views automatically, no config needed */}
				<Analytics />
			</body>
		</html>
	);
}
