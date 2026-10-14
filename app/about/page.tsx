import type { Metadata } from "next";
import Nav from "@/components/Nav";
import { ABOUT_FALLBACK } from "@/lib/about-fallback";
import { getActiveDocuments, getProfile, pickDocument } from "@/lib/cms";
import { renderMarkdown } from "@/lib/markdown";
import { pageMetadata } from "@/lib/site";
import styles from "./about.module.css";

export const metadata: Metadata = pageMetadata({
	title: "About — Mukhammad Numonkhujaev",
	description:
		"Second-year software engineering student at Kookmin University in Seoul on the GKS scholarship, building and shipping full-stack products as a freelancer.",
	path: "/about",
});

export default async function About() {
	const [profile, docs] = await Promise.all([getProfile(), getActiveDocuments()]);
	const bio = profile?.bio.trim() || ABOUT_FALLBACK;
	const resume = pickDocument(docs, "RESUME");
	const portfolio = pickDocument(docs, "PORTFOLIO");

	return (
		<>
			<Nav />
			<main className={styles.main}>
				<h1 className={styles.title}>About me</h1>

				<div className={styles.body} dangerouslySetInnerHTML={{ __html: renderMarkdown(bio) }} />

				<div className={styles.actions}>
					<a
						href="https://t.me/muhammad731"
						target="_blank"
						rel="noopener noreferrer"
						className={styles.btn}>
						Message on Telegram
					</a>
					{resume && (
						<a href="/resume" target="_blank" rel="noopener noreferrer" className={styles.btnSecondary}>
							Resume (PDF)
						</a>
					)}
					{portfolio && (
						<a href="/portfolio" target="_blank" rel="noopener noreferrer" className={styles.btnSecondary}>
							Portfolio (PDF)
						</a>
					)}
				</div>
			</main>
		</>
	);
}
