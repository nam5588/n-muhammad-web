import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import { getProjects, type ProjectStatus } from '@/lib/cms';
import { pageMetadata } from '@/lib/site';
import styles from './projects.module.css';

export const metadata: Metadata = pageMetadata({
  title: 'Projects — Mukhammad Numonkhujaev',
  description:
    'Live products I have built: K-Life, Rebels, Pavloniya Choyxona, KursInfo Premium and Eko Pechka — full-stack apps with Next.js, NestJS, GraphQL and MongoDB.',
  path: '/projects',
});

const statusLabel: Record<ProjectStatus, string> = {
  LIVE: 'Live',
  IN_PROGRESS: 'In progress',
  ARCHIVED: 'Archived',
};

const statusClass: Record<ProjectStatus, string> = {
  LIVE: styles.live,
  IN_PROGRESS: styles.wip,
  ARCHIVED: styles.archived,
};

export default async function Projects() {
  const projects = await getProjects();

  return (
    <>
      <Nav />
      <main className={styles.main}>
        <h1 className={styles.title}>Projects</h1>
        <p className={styles.subtitle}>Things I have built.</p>

        <div className={styles.list}>
          {projects.map((project) => (
            <div key={project.slug} className={styles.project}>
              {project.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={project.imageUrl}
                  alt={`${project.title} screenshot`}
                  width={1200}
                  height={675}
                  loading="lazy"
                  className={styles.image}
                />
              )}
              <div className={styles.projectHeader}>
                <h2 className={styles.projectName}>{project.title}</h2>
                <span className={`${styles.status} ${statusClass[project.status]}`}>
                  {statusLabel[project.status]}
                </span>
              </div>

              <p className={styles.description}>{project.description}</p>

              <div className={styles.footer}>
                <div className={styles.tags}>
                  {project.techStack.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                  <span className={styles.year}>{project.year}</span>
                </div>

                <div className={styles.links}>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      Visit →
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
