import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import { getProjects, type ProjectStatus } from "@/lib/cms";
import { STATUS_LABEL } from "@/lib/project-status";
import { pageMetadata } from "@/lib/site";
import styles from "./projects.module.css";

export const metadata: Metadata = pageMetadata({
	title: "Projects — Mukhammad Numonkhujaev",
	description:
		"Live products I have built: K-Life, Rebels, Pavloniya Choyxona, KursInfo Premium and Eko Pechka — full-stack apps with Next.js, NestJS, GraphQL and MongoDB.",
	path: "/projects",
});

const statusClass: Record<ProjectStatus, string> = {
	LIVE: styles.live,
	IN_PROGRESS: styles.wip,
	ARCHIVED: styles.archived,
};

// Ro'yxatda ko'p teg sig'maydi; to'liq ro'yxat loyiha sahifasida
const MAX_TAGS = 4;

export default async function Projects() {
	const projects = await getProjects();

	return (
		<>
			<Nav />
			<main className={styles.main}>
				<h1 className={styles.title}>Projects</h1>
				<p className={styles.subtitle}>Things I have built.</p>

				<ul className={styles.list}>
					{projects.map((project) => (
						<li key={project.slug} className={styles.row}>
							<div className={styles.thumb} aria-hidden>
								{project.imageUrl ? (
									// eslint-disable-next-line @next/next/no-img-element
									<img src={project.imageUrl} alt="" width={320} height={200} loading="lazy" />
								) : (
									<span>{project.title.charAt(0)}</span>
								)}
							</div>

							<div className={styles.body}>
								<div className={styles.head}>
									<h2 className={styles.name}>
										{/* ::after butun qatorni bosiladigan qiladi */}
										<Link href={`/projects/${project.slug}`} className={styles.stretched}>
											{project.title}
										</Link>
									</h2>
									<span className={`${styles.status} ${statusClass[project.status]}`}>
										{STATUS_LABEL[project.status]}
									</span>
								</div>

								<p className={styles.description}>{project.description}</p>

								<div className={styles.meta}>
									<div className={styles.tags}>
										{project.techStack.slice(0, MAX_TAGS).map((tag) => (
											<span key={tag} className={styles.tag}>
												{tag}
											</span>
										))}
										{project.techStack.length > MAX_TAGS && (
											<span className={styles.more}>+{project.techStack.length - MAX_TAGS}</span>
										)}
									</div>
									<div className={styles.links}>
										<span className={styles.year}>{project.year}</span>
										{project.liveUrl && (
											<a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
												Visit ↗
											</a>
										)}
										{project.githubUrl && (
											<a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
												GitHub
											</a>
										)}
									</div>
								</div>
							</div>
						</li>
					))}
				</ul>
			</main>
		</>
	);
}
