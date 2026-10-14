"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./Nav.module.css";

const links = [
	{ href: "/projects", label: "Projects" },
	{ href: "/about", label: "About" },
	{ href: "https://t.me/s/na_mukhammad", label: "Channel", external: true },
];

export default function Nav() {
	const pathname = usePathname();
	const [theme, setTheme] = useState<"light" | "dark">("light");

	useEffect(() => {
		const saved = localStorage.getItem("theme");
		if (saved === "dark" || saved === "light") {
			setTheme(saved);
		} else {
			const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
			setTheme(prefersDark ? "dark" : "light");
		}
	}, []);

	const toggleTheme = () => {
		const next = theme === "light" ? "dark" : "light";
		setTheme(next);
		document.documentElement.setAttribute("data-theme", next);
		localStorage.setItem("theme", next);
	};

	return (
		<nav className={styles.nav}>
			<Link href="/" className={styles.logo}>
				Mukhammad
			</Link>
			<div className={styles.links}>
				{links.map((link) =>
					link.external ? (
						<a
							key={link.href}
							href={link.href}
							target="_blank"
							rel="noopener noreferrer"
							className={styles.link}>
							{link.label}
						</a>
					) : (
						<Link
							key={link.href}
							href={link.href}
							className={`${styles.link} ${pathname === link.href ? styles.active : ""}`}>
							{link.label}
						</Link>
					),
				)}
				<button
					onClick={toggleTheme}
					className={styles.themeToggle}
					aria-label="Toggle theme">
					{theme === "light" ? (
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
						</svg>
					) : (
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<circle cx="12" cy="12" r="5" />
							<line x1="12" y1="1" x2="12" y2="3" />
							<line x1="12" y1="21" x2="12" y2="23" />
							<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
							<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
							<line x1="1" y1="12" x2="3" y2="12" />
							<line x1="21" y1="12" x2="23" y2="12" />
							<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
							<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
						</svg>
					)}
				</button>
			</div>
		</nav>
	);
}
