import Link from "next/link";
import Nav from "@/components/Nav";
import SocialIcon from "@/components/SocialIcon";
import { getActiveDocuments, getProfile, pickDocument } from "@/lib/cms";
import { SITE_NAME } from "@/lib/site";
import styles from "./page.module.css";

// Profil API'da bo'lmasa (yoki API ishlamasa) shu qiymatlar chiqadi
const FALLBACK = {
	name: SITE_NAME,
	title: "Software Engineer · Builder",
	imageUrl: "/img.jpg",
	socials: [
		{ platform: "GitHub", url: "https://github.com/nam5588" },
		{ platform: "LinkedIn", url: "https://linkedin.com/in/mukhammad-numonkhujaev-3122b1361" },
		{ platform: "Telegram", url: "https://t.me/s/na_mukhammad" },
		{ platform: "YouTube", url: "https://www.youtube.com/@muhammadnomonhojaev" },
	],
};

export default async function Home() {
	const [profile, docs] = await Promise.all([getProfile(), getActiveDocuments()]);
	const p = profile ?? FALLBACK;
	const resume = pickDocument(docs, "RESUME");
	const portfolio = pickDocument(docs, "PORTFOLIO");

	return (
		<>
			<Nav />
			<main className={styles.main}>
				<section className={styles.hero}>
					<div className={styles.avatar}>
						<div className={styles.avatarFallback}>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img src={p.imageUrl || FALLBACK.imageUrl} alt={p.name} />
						</div>
					</div>

					<h1 className={styles.name}>{p.name}</h1>
					<p className={styles.role}>{p.title}</p>

					<div className={styles.socials}>
						{p.socials.map((s) => (
							<a
								key={s.url}
								href={s.url}
								target="_blank"
								rel="noopener noreferrer"
								className={styles.socialLink}
								aria-label={s.platform}>
								<SocialIcon platform={s.platform} />
							</a>
						))}
					</div>

					<p className={styles.bio}>I build things. Here are some of them.</p>

					<div className={styles.cta}>
						<Link href="/projects" className={styles.btnPrimary}>
							View Projects
						</Link>
						<Link href="/about" className={styles.btnSecondary}>
							About Me
						</Link>
						{resume && (
							<a href="/resume?download=1" className={styles.btnSecondary}>
								Download Resume
							</a>
						)}
						{portfolio && (
							<a href="/portfolio" target="_blank" rel="noopener noreferrer" className={styles.btnSecondary}>
								View Portfolio
							</a>
						)}
					</div>
				</section>
			</main>

			<footer className={styles.footer}>
				<span>© {new Date().getFullYear()} {p.name}</span>
				<span>^ ^</span>
			</footer>
		</>
	);
}
