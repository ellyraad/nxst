import { dirname } from "node:path";
import {
	type CreateNodesContextV2,
	type CreateNodesV2,
	createNodesFromFiles,
} from "@nx/devkit";

// biome-ignore lint/complexity/noBannedTypes: ok for now
export type BiomeOptions = {};

export const createNodesV2: CreateNodesV2<BiomeOptions> = [
	"**/biome.json",
	async (configFiles, options, context) => {
		return await createNodesFromFiles(
			(configFile, options, context) =>
				createNodesInternal(configFile, options, context),
			configFiles,
			options,
			context,
		);
	},
];

async function createNodesInternal(
	configFilePath: string,
	_options: BiomeOptions,
	_context: CreateNodesContextV2,
) {
	const root = dirname(configFilePath);

	if (root === ".") {
		return {};
	}

	// Project configuration to be merged into the rest of the Nx configuration
	return {
		projects: {
			[root]: {
				targets: {
					lint: {
						command: "npx @biomejs/biome lint {projectRoot}",
					},
					format: {
						command: "npx @biomejs/biome format --write {projectRoot}",
					},
					cache: true,
					inputs: [
						"defaut",
						"^default",
						"{workspaceRoot}/biome.json",
						{
							externalDependencies: ["@biomejs/biome"],
						},
					],
				},
			},
		},
	};
}
