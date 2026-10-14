import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import { projects } from '@/lib/projects';
import { pageMetadata } from '@/lib/site';
import styles from './projects.module.css';

export const metadata: Metadata = pageMetadata({
  title: 'Projects — Mukhammad Numonkhujaev',
  description:
    'Live products I have built: K-Life, Rebels, Pavloniya Choyxona, KursInfo Premium and Eko Pechka — full-stack apps with Next.js, NestJS, GraphQL and MongoDB.',
  path: '/projects',
});

const statusLabel: Record<string, string> = {
  live: 'Live',
  wip: 'In progress',
  archived: 'Archived',
};

export default function Projects() {
  return (
    <>
      <Nav />
      <main className={styles.main}>
        <h1 className={styles.title}>Projects</h1>
        <p className={styles.subtitle}>Things I have built.</p>

        <div className={styles.list}>
          {projects.map((project) => (
            <div key={project.slug} className={styles.project}>
              <div className={styles.projectHeader}>
                <h2 className={styles.projectName}>{project.name}</h2>
                <span className={`${styles.status} ${styles[project.status]}`}>
                  {statusLabel[project.status]}
                </span>
              </div>

              <p className={styles.description}>{project.description}</p>

              <div className={styles.footer}>
                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                  <span className={styles.year}>{project.year}</span>
                </div>

                <div className={styles.links}>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      Visit →
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
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
