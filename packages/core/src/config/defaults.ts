import type { Adapter, DefaultUserConfig, Rule, Severity } from "../types";

export const defaultAdapter: Adapter = "formatjs";

export const defaultRules: Record<Rule, Severity> = {
	"hardcoded-text": "error",
	"missing-translation": "error",
	"unused-translation": "warning",
	"missing-source-key": "error",
};

export const defaultConfig: DefaultUserConfig = {
	adapter: defaultAdapter,
	rules: defaultRules,
};
