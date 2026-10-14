import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import { getProject, getProjects, type ProjectStatus } from "@/lib/cms";
import { STATUS_LABEL } from "@/lib/project-status";
import { SITE_NAME, pageMetadata } from "@/lib/site";
import styles from "../projects.module.css";

const statusClass: Record<ProjectStatus, string> = {
	LIVE: styles.live,
	IN_PROGRESS: styles.wip,
	ARCHIVED: styles.archived,
};

export async function generateStaticParams() {
	return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const project = await getProject((await params).slug);
	if (!project) return { title: "Not found" };
	const description = project.description.length > 160 ? `${project.description.slice(0, 157)}…` : project.description;
	return pageMetadata({
		title: `${project.title} — ${SITE_NAME}`,
		description,
		path: `/projects/${project.slug}`,
		image: project.imageUrl ?? undefined,
	});
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
	const project = await getProject((await params).slug);
	if (!project) notFound();

	return (
		<>
			<Nav />
			<main className={styles.main}>
				<Link href="/projects" className={styles.back}>
					← All projects
				</Link>

				<div className={styles.detailHead}>
					<h1 className={styles.detailTitle}>{project.title}</h1>
					<span className={`${styles.status} ${statusClass[project.status]}`}>{STATUS_LABEL[project.status]}</span>
				</div>
				<p className={styles.year}>{project.year}</p>

				{project.imageUrl && (
					// eslint-disable-next-line @next/next/no-img-element
					<img src={project.imageUrl} alt={`${project.title} screenshot`} width={1200} height={675} className={styles.hero} />
				)}

				<p className={styles.detailText}>{project.description}</p>

				{project.techStack.length > 0 && (
					<>
						<h2 className={styles.section}>Built with</h2>
						<div className={styles.tags}>
							{project.techStack.map((tag) => (
								<span key={tag} className={styles.tag}>
									{tag}
								</span>
							))}
						</div>
					</>
				)}

				<div className={styles.actions}>
					{project.liveUrl && (
						<a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
							Visit site ↗
						</a>
					)}
					{project.githubUrl && (
						<a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.btnSecondary}>
							GitHub
						</a>
					)}
				</div>
			</main>
		</>
	);
}
