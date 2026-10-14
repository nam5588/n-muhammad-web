import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import Nav from "@/components/Nav";
import { getPost, getPosts } from "@/lib/cms";
import { formatPostDate } from "@/lib/date";
import { renderMarkdown } from "@/lib/markdown";
import { SITE_NAME, SITE_URL, pageMetadata } from "@/lib/site";
import styles from "../blog.module.css";

// generateMetadata va sahifa bitta so'rovni bo'lishadi
const loadPost = cache(getPost);

// Mavjud postlar build paytida tayyorlanadi; yangilari birinchi so'rovda yasaladi
export async function generateStaticParams() {
	return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const post = await loadPost((await params).slug);
	if (!post) return { title: "Not found" };
	return pageMetadata({
		title: `${post.title} — ${SITE_NAME}`,
		description: post.excerpt,
		path: `/blog/${post.slug}`,
		image: post.coverUrl ?? undefined,
		article: { publishedTime: post.publishedAt, modifiedTime: post.updatedAt, tags: post.tags },
	});
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
	const post = await loadPost((await params).slug);
	if (!post) notFound();

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title,
		description: post.excerpt,
		datePublished: post.publishedAt,
		dateModified: post.updatedAt,
		image: post.coverUrl ?? undefined,
		url: `${SITE_URL}/blog/${post.slug}`,
		author: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
	};

	return (
		<>
			<Nav />
			<main className={styles.main}>
				<Link href="/blog" className={styles.back}>
					← All posts
				</Link>
				<article>
					<h1 className={styles.postTitle}>{post.title}</h1>
					<div className={styles.meta}>
						<time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
						{post.tags.map((tag) => (
							<span key={tag} className={styles.tag}>
								{tag}
							</span>
						))}
					</div>
					{post.coverUrl && (
						// eslint-disable-next-line @next/next/no-img-element
						<img src={post.coverUrl} alt="" className={styles.cover} />
					)}
					<div className="prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />
				</article>
				<p className={styles.footerNote}>
					Follow new posts on <a href="https://t.me/na_mukhammad">Telegram</a>.
				</p>
			</main>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
		</>
	);
}
