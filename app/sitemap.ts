import type { MetadataRoute } from "next";
import { getPosts, getProjects } from "@/lib/cms";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const pages = ["", "/projects", "/about", "/blog"].map((path) => ({ url: `${SITE_URL}${path}` }));
	const posts = (await getPosts()).map((post) => ({
		url: `${SITE_URL}/blog/${post.slug}`,
		lastModified: new Date(post.updatedAt),
	}));
	const projects = (await getProjects()).map((p) => ({ url: `${SITE_URL}/projects/${p.slug}` }));
	return [...pages, ...projects, ...posts];
}
