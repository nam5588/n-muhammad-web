import { NextResponse, type NextRequest } from "next/server";
import { type ActiveDocument, getActiveDocuments, pickDocument } from "./cms";

/**
 * /resume va /portfolio — HR'ga yuborish uchun doimiy link. Har doim faol PDF'ga yo'naltiradi.
 *   ?lang=ko      — boshqa tildagi versiya (yo'q bo'lsa EN)
 *   ?download=1   — brauzerda ochmasdan yuklab olish (Cloudinary fl_attachment)
 */
export async function redirectToDocument(req: NextRequest, type: ActiveDocument["type"]) {
	const params = req.nextUrl.searchParams;
	const doc = pickDocument(await getActiveDocuments(), type, params.get("lang") ?? undefined);
	if (!doc) return NextResponse.redirect(new URL("/about", req.url));

	let url = doc.fileUrl;
	if (params.has("download")) {
		const name = doc.fileName.replace(/\.pdf$/i, "").replace(/[^\w-]/g, "_");
		url = url.replace("/upload/", `/upload/fl_attachment:${name}/`);
	}
	// 307: manzil fayl almashganda o'zgaradi, shuning uchun doimiy redirect emas
	return NextResponse.redirect(url, 307);
}
