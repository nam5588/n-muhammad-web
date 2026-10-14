export interface Project {
	slug: string;
	name: string;
	description: string;
	tags: string[];
	url?: string;
	github?: string;
	year: string;
	status: "live" | "wip" | "archived";
}

// Add your projects here
export const projects: Project[] = [
	{
		slug: "project-four",
		name: "K-Life",
		description:
			"K-Life is an interactive Korean language learning platform for Uzbek learners, built around K-drama episodes. Students watch scenes via Cloudflare Stream, complete exercises, get AI speaking feedback (Whisper + LLM), and review vocabulary with spaced repetition. Includes Google/Kakao/Telegram OAuth, JWT dual-token auth, and an admin CMS.",
		tags: [
			"TypeScript",
			"NestJS",
			"Next.js",
			"GraphQL",
			"MongoDB",
			"Cloudflare Stream",
			"Cloudflare R2",
			"Groq AI",
		],
		github: "https://github.com/nam5588",
		url: "https://k-life.uz",
		year: "2026",
		status: "live",
	},
	{
		slug: "kursinfo-premium",
		name: "KursInfo Premium (Telegram Bot)",
		description:
			"Telegram premium channel bot for Uzbekistan's currency market: it collects USD rates from 20 banks, the Central Bank (cbu.uz), market, ATM, mobile app and gold sources in parallel, then publishes scheduled rate tables with change tracking (↑↓), instant price alerts and AI-powered forecasts and analysis. It also includes a separate subscription bot with payments and a Telegram admin panel.",
		tags: [
			"Python",
			"aiogram",
			"PostgreSQL",
			"Redis",
			"SQLAlchemy",
			"APScheduler",
			"OpenAI",
			"Docker",
		],
		github: "https://github.com/nam5588",
		url: "https://t.me/subskursinfobot",
		year: "2026",
		status: "live",
	},
	{
		slug: "pavloniya-choyxona",
		name: "Pavloniya Choyxona (Restaurant Management System)",
		description:
			"Full-stack management system for a choyxona (traditional Uzbek teahouse) that covers reservations, waiter ordering, the kitchen workflow and receipts. Waiters build orders with an optimistically updated cart, chefs update dish status that reaches staff in real time over WebSockets, and reservations can include off-menu custom items. Receipts are printed straight to Android thermal printers via RawBT (ESC/POS), with QR codes and PDF export. Access is role-based, using JWT with HTTP-only refresh cookies, and a separate batch service handles background jobs.",
		tags: [
			"NestJS",
			"GraphQL",
			"Apollo",
			"MongoDB",
			"Mongoose",
			"WebSocket",
			"JWT",
			"Next.js",
			"React",
			"MUI",
			"TypeScript",
			"Railway",
			"Vercel",
		],
		github: "https://github.com/nam5588",
		url: "https://pavloniyachoyxonasi.uz",
		year: "2026",
		status: "live",
	},
		{
		slug: "project-two",
		name: "Rebels",
		description:
			"Rebels School is a full-stack online language learning platform for Uzbek students. Students watch video lessons streamed securely via Cloudflare Stream, follow structured courses, and communicate with teachers in real-time chat. Built on a NestJS + GraphQL API with MongoDB, it uses JWT authentication and a Next.js frontend, and is supported by a Telegram admin bot for platform management.",
		tags: [
			"TypeScript",
			"NestJS",
			"NextJS",
			"GraphQL",
			"MongoDB",
			"Cloudflare Stream",
		],
		github: "https://github.com/nam5588",
		url: "https://rebels.kr",
		year: "2026",
		status: "live",
	},
	{
		slug: "ekopechka-2",
		name: "Eko Pechka 2.0",
		description:
			"Eko Pechka 2.0 is an e-commerce platform for an eco-friendly heating equipment business in Uzbekistan. Customers browse a dynamic product catalog by category, view detailed specifications and photos, and contact the seller to place orders. A full rebuild of version 1.0, it replaces static pages with a MongoDB-backed Node.js + Express API and a responsive React frontend, so the catalog can be updated without code changes.",
		tags: ["TypeScript", "ReactJS", "NodeJS", "Express", "MongoDB"],
		url: "https://ekopechka.uz",
		github: "https://github.com/nam5588/ekopechka-react",
		year: "2025",
		status: "live",
	},
	{
		slug: "ekopechka-1",
		name: "Eko Pechka 1.0",
		description:
			"The first version of the Eko Pechka website: a static, responsive company site built with HTML, CSS, and JavaScript. It presents the company, showcases its heating products, and provides contact options for customers. Kept as an archive project, it laid the groundwork for the later rebuild as Eko Pechka 2.0.",
		tags: ["HTML", "CSS", "JavaScript"],
		github: "https://github.com/nam5588/ekopechka-front",
		url: "https://old.ekopechka.uz",
		year: "2023",
		status: "live",
	},
];
