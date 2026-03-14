import { gitHubEditConfig } from "../config";
import gitHistory from "../json/git-history.json";

export interface Commit {
	hash: string;
	date: string;
	message: string;
}

export function getPostHistory(postId: string): Commit[] {
	try {
		const normalizedId = postId.replace(/\\/g, "/");

		if (gitHistory?.[normalizedId]) {
			return gitHistory[normalizedId];
		}

		const idWithoutPrefix = normalizedId.replace(/^posts\//, "");
		if (gitHistory?.[idWithoutPrefix]) {
			return gitHistory[idWithoutPrefix];
		}

		const parts = normalizedId.split("/");
		const filename = parts[parts.length - 1];
		if (gitHistory?.[filename]) {
			return gitHistory[filename];
		}

		return [];
	} catch (e) {
		console.error(`Failed to get git history for post: ${postId}`, e);
		return [];
	}
}

export function getCommitUrl(hash: string): string {
	if (!gitHubEditConfig.enable || !gitHubEditConfig.baseUrl) {
		return "#";
	}

	const blobIndex = gitHubEditConfig.baseUrl.indexOf("/blob/");
	if (blobIndex !== -1) {
		const repoRoot = gitHubEditConfig.baseUrl.substring(0, blobIndex);
		return `${repoRoot}/commit/${hash}`;
	}

	return `${gitHubEditConfig.baseUrl}/../../commit/${hash}`;
}
