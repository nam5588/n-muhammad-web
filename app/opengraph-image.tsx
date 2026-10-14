import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Shared link preview for every page (inherited by /about and /projects).
export default function OpengraphImage() {
	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					padding: "0 96px",
					background: "#fafaf8",
					color: "#1a1a18",
				}}>
				<div style={{ fontSize: 72, fontWeight: 600 }}>{SITE_NAME}</div>
				<div style={{ fontSize: 34, color: "#6b6b67", marginTop: 20 }}>
					Software Engineer · Full-stack (Next.js, NestJS, GraphQL)
				</div>
				<div style={{ fontSize: 28, color: "#999", marginTop: 48 }}>
					n-muhammad.uz
				</div>
			</div>
		),
		size,
	);
}
