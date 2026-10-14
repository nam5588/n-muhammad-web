import { projects as staticProjects } from "./projects";

const API_URL = process.env.API_URL ?? "https://api.n-muhammad.uz/graphql";

/** Admin'da o'zgarish bo'lganda /api/revalidate shu tegni yangilaydi */
export const CMS_TAG = "cms";

export type ProjectStatus = "LIVE" | "IN_PROGRESS" | "ARCHIVED";

export interface Project {
	slug: string;
	title: string;
	description: string;
	status: ProjectStatus;
	techStack: string[];
	year: number;
	liveUrl?: string | null;
	githubUrl?: string | null;
	imageUrl?: string | null;
}

export interface Profile {
	name: string;
	title: string;
	bio: string;
	imageUrl: string;
	socials: { platform: string; url: string }[];
}

export interface PostSummary {
	slug: string;
	title: string;
	excerpt: string;
	coverUrl?: string | null;
	tags: string[];
	publishedAt: string;
	updatedAt: string;
}

export interface Post extends PostSummary {
	content: string;
}

export interface ActiveDocument {
	type: "RESUME" | "PORTFOLIO";
	language: "EN" | "KO" | "UZ";
	fileName: string;
	fileUrl: string;
}

async function gql<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
	const res = await fetch(API_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ query, variables }),
		// Soatda bir marta yangilanadi; admin'dagi o'zgarish esa darhol (revalidateTag)
		next: { revalidate: 3600, tags: [CMS_TAG] },
	});
	const body = (await res.json()) as { data?: T; errors?: { message: string }[] };
	if (body.errors?.length || !body.data) {
		throw new Error(`API: ${body.errors?.[0]?.message ?? res.status}`);
	}
	return body.data;
}

/**
 * API ishlamay qolsa (deploy paytida yoki Railway uxlab qolsa) sayt bo'sh qolmasin —
 * loyihalar uchun koddagi statik ro'yxat zaxira sifatida ishlatiladi.
 */
export async function getProjects(): Promise<Project[]> {
	try {
		const { projects } = await gql<{ projects: Project[] }>(
			"{ projects { slug title description status techStack year liveUrl githubUrl imageUrl } }",
		);
		return projects;
	} catch (err) {
		console.error("getProjects: statik ro'yxat ishlatildi", err);
		const status = { live: "LIVE", wip: "IN_PROGRESS", archived: "ARCHIVED" } as const;
		return staticProjects.map((p) => ({
			slug: p.slug,
			title: p.name,
			description: p.description,
			status: status[p.status],
			techStack: p.tags,
			year: Number(p.year),
			liveUrl: p.url,
			githubUrl: p.github,
		}));
	}
}

/** Bitta loyiha (detal sahifa uchun). Ro'yxatdan olinadi: kesh bitta, API ishlamasa statik zaxira ham ishlaydi */
export async function getProject(slug: string): Promise<Project | null> {
	return (await getProjects()).find((p) => p.slug === slug) ?? null;
}

export async function getProfile(): Promise<Profile | null> {
	try {
		const { profile } = await gql<{ profile: Profile | null }>(
			"{ profile { name title bio imageUrl socials { platform url } } }",
		);
		return profile;
	} catch (err) {
		console.error("getProfile", err);
		return null;
	}
}

export async function getPosts(): Promise<PostSummary[]> {
	try {
		const { posts } = await gql<{ posts: PostSummary[] }>(
			"{ posts { slug title excerpt coverUrl tags publishedAt updatedAt } }",
		);
		return posts;
	} catch (err) {
		console.error("getPosts", err);
		return [];
	}
}

/** Topilmasa null; API xatosi esa yuqoriga uzatiladi (404 emas, xato sahifasi chiqsin) */
export async function getPost(slug: string): Promise<Post | null> {
	const { post } = await gql<{ post: Post | null }>(
		"query ($slug: String!) { post(slug: $slug) { slug title excerpt content coverUrl tags publishedAt updatedAt } }",
		{ slug },
	);
	return post;
}

export async function getActiveDocuments(): Promise<ActiveDocument[]> {
	try {
		const { activeDocuments } = await gql<{ activeDocuments: ActiveDocument[] }>(
			"{ activeDocuments { type language fileName fileUrl } }",
		);
		return activeDocuments;
	} catch (err) {
		console.error("getActiveDocuments", err);
		return [];
	}
}

/** Til so'ralmasa EN, u bo'lmasa birinchi mavjudi */
export function pickDocument(
	docs: ActiveDocument[],
	type: ActiveDocument["type"],
	language?: string,
): ActiveDocument | undefined {
	const ofType = docs.filter((d) => d.type === type);
	return (
		ofType.find((d) => d.language === language?.toUpperCase()) ??
		ofType.find((d) => d.language === "EN") ??
		ofType[0]
	);
}
