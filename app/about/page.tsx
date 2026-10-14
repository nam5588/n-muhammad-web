import type { Metadata } from "next";
import Nav from "@/components/Nav";
import { pageMetadata } from "@/lib/site";
import styles from "./about.module.css";

export const metadata: Metadata = pageMetadata({
	title: "About — Mukhammad Numonkhujaev",
	description:
		"Second-year software engineering student at Kookmin University in Seoul on the GKS scholarship, building and shipping full-stack products as a freelancer.",
	path: "/about",
});

export default function About() {
	return (
		<>
			<Nav />
			<main className={styles.main}>
				<h1 className={styles.title}>About me</h1>

				<div className={styles.body}>
					<p>
						Hey, I'm <strong>Mukhammad Numonkhujaev</strong> — a second-year
						software engineering student at Kookmin University in Seoul, studying
						on the Global Korea Scholarship (GKS).
					</p>
					<p>
						Alongside my studies I work as a freelance full-stack developer. I
						build with Next.js, NestJS, GraphQL and MongoDB, and several of my
						projects are live and used by real customers — from a K-drama based
						Korean learning platform to a restaurant management system for a
						teahouse in Uzbekistan.
					</p>
					<p>
						You can reach me on{" "}
						<a
							href="https://t.me/muhammad731"
							target="_blank"
							rel="noopener noreferrer">
							Telegram
						</a>{" "}
						or{" "}
						<a
							href="https://linkedin.com/in/mukhammad-numonkhujaev-3122b1361"
							target="_blank"
							rel="noopener noreferrer">
							LinkedIn
						</a>
						. I'm always happy to talk about ideas, products, or anything
						interesting.
					</p>
				</div>

				<a
					href="https://t.me/muhammad731"
					target="_blank"
					rel="noopener noreferrer"
					className={styles.btn}>
					Message on Telegram
				</a>
			</main>
		</>
	);
}
