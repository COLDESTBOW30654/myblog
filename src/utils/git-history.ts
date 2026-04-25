import { gitHubEditConfig } from "../config";
import gitHistory from "../json/git-history.json";

export interface Commit {
	hash: string;
	date: string;
	message: string;
}

export function getPostHistory(postId: string): Commit[] {
	try {
		let normalizedId = postId.replace(/\\/g, "/");
		
		if (!normalizedId.endsWith('.md') && !normalizedId.endsWith('.mdx')) {
			normalizedId += '.md';
		}

		const historyMap = gitHistory as Record<string, Commit[]>;
		
		if (historyMap?.[normalizedId]) {
			return historyMap[normalizedId];
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
