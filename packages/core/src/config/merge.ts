import type { Config, UserConfig } from "../types";
import { ConfigSchema } from "../types";
import { defaultConfig } from "./defaults";

export function mergeConfig(userConfig: UserConfig): Config {
	return ConfigSchema.parse({
		...defaultConfig,
		...userConfig,
		rules: {
			...defaultConfig.rules,
			...userConfig.rules,
		},
	});
}
