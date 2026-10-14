import type { Metadata } from "next";
import Nav from "@/components/Nav";
import ResumeDialog from "@/components/ResumeDialog";
import { ABOUT_FALLBACK } from "@/lib/about-fallback";
import { getActiveDocuments, getProfile } from "@/lib/cms";
import { renderMarkdown } from "@/lib/markdown";
import { pageMetadata } from "@/lib/site";
import styles from "./about.module.css";

const EMAIL = "mukhammad5589@gmail.com";

export const metadata: Metadata = pageMetadata({
	title: "About — Mukhammad Numonkhujaev",
	description:
		"Second-year software engineering student at Kookmin University in Seoul on the GKS scholarship, building and shipping full-stack products as a freelancer.",
	path: "/about",
});

export default async function About() {
	const [profile, docs] = await Promise.all([getProfile(), getActiveDocuments()]);
	const bio = profile?.bio.trim() || ABOUT_FALLBACK;

	return (
		<>
			<Nav />
			<main className={styles.main}>
				<h1 className={styles.title}>About me</h1>

				<div className={styles.body} dangerouslySetInnerHTML={{ __html: renderMarkdown(bio) }} />

				<div className={styles.actions}>
					<a href={`mailto:${EMAIL}`} className={styles.btn}>
						Email me
					</a>
					<a
						href="https://t.me/muhammad731"
						target="_blank"
						rel="noopener noreferrer"
						className={styles.btnSecondary}>
						Message on Telegram
					</a>
					<ResumeDialog
						docs={docs.map(({ type, language }) => ({ type, language }))}
						className={styles.btnSecondary}
					/>
				</div>
				<p className={styles.email}>
					<a href={`mailto:${EMAIL}`} translate="no">
						{EMAIL}
					</a>
				</p>
			</main>
		</>
	);
}
