/** "Oct 14, 2026" — sayt ingliz tilida */
export function formatPostDate(iso: string): string {
	return new Date(iso).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
		timeZone: "Asia/Seoul",
	});
}
