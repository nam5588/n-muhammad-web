import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import { getPosts } from "@/lib/cms";
import { formatPostDate } from "@/lib/date";
import { pageMetadata } from "@/lib/site";
import styles from "./blog.module.css";

export const metadata: Metadata = pageMetadata({
	title: "Blog — Mukhammad Numonkhujaev",
	description: "Notes on building and shipping products: engineering, freelancing and studying in Korea.",
	path: "/blog",
});

export default async function Blog() {
	const posts = await getPosts();

	return (
		<>
			<Nav />
			<main className={styles.main}>
				<h1 className={styles.title}>Blog</h1>
				<p className={styles.subtitle}>Notes on building things.</p>

				{posts.length === 0 ? (
					<p className={styles.empty}>No posts yet.</p>
				) : (
					<div>
						{posts.map((post) => (
							<Link key={post.slug} href={`/blog/${post.slug}`} className={styles.item}>
								<h2 className={styles.itemTitle}>{post.title}</h2>
								{post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
								<div className={styles.meta}>
									<time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
									{post.tags.map((tag) => (
										<span key={tag} className={styles.tag}>
											{tag}
										</span>
									))}
								</div>
							</Link>
						))}
					</div>
				)}
			</main>
		</>
	);
}
