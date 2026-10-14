import { timingSafeEqual } from "crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { CMS_TAG } from "@/lib/cms";

/**
 * n-muhammad-api admin'da o'zgarish bo'lganda chaqiradi:
 *   POST /api/revalidate  Authorization: Bearer <REVALIDATE_SECRET>  { "paths": ["/blog", "/blog/slug"] }
 * API'dan olingan barcha ma'lumot (CMS_TAG) va berilgan sahifalar keyingi so'rovda qayta yasaladi.
 */
export async function POST(req: NextRequest) {
	const secret = process.env.REVALIDATE_SECRET;
	const token = req.headers.get("authorization")?.replace(/^Bearer /, "") ?? "";
	if (!secret || !safeEqual(token, secret)) {
		return NextResponse.json({ ok: false }, { status: 401 });
	}

	const body = (await req.json().catch(() => ({}))) as { paths?: unknown };
	const paths = Array.isArray(body.paths)
		? body.paths.filter((p): p is string => typeof p === "string" && p.startsWith("/")).slice(0, 20)
		: [];

	revalidateTag(CMS_TAG);
	for (const path of paths) revalidatePath(path);
	revalidatePath("/sitemap.xml");

	return NextResponse.json({ ok: true, paths });
}

function safeEqual(a: string, b: string): boolean {
	const ab = Buffer.from(a);
	const bb = Buffer.from(b);
	return ab.length === bb.length && timingSafeEqual(ab, bb);
}
