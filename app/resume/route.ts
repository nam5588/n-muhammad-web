import type { NextRequest } from "next/server";
import { redirectToDocument } from "@/lib/document-redirect";

export function GET(req: NextRequest) {
	return redirectToDocument(req, "RESUME");
}
