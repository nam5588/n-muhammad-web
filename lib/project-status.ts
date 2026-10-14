import type { ProjectStatus } from "./cms";

export const STATUS_LABEL: Record<ProjectStatus, string> = {
	LIVE: "Live",
	IN_PROGRESS: "In progress",
	ARCHIVED: "Archived",
};
