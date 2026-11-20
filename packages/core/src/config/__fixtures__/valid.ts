import type { UserConfig } from "../../types";

export const validMinimal = {
	adapter: "formatjs",
	locales: ["en"],
	sourceLocale: "en",
	translations: "./locales/{{locale}}.json",
	include: ["src/**/*.{ts,tsx}"],
	rules: {},
} as const satisfies UserConfig;

export const validMultiLocale = {
	adapter: "formatjs",
	locales: ["en", "fr", "ar"],
	sourceLocale: "en",
	translations: "./src/locales/{{locale}}.json",
	include: ["src/**/*.{ts,tsx}"],
	rules: {},
} as const satisfies UserConfig;

export const validWithRuleOverrides = {
	adapter: "formatjs",
	locales: ["en", "fr"],
	sourceLocale: "en",
	translations: "./locales/{{locale}}.json",
	include: ["app/**/*.{ts,tsx}"],
	rules: {
		"hardcoded-text": "warning",
		"unused-translation": "error",
	},
} as const satisfies UserConfig;

export const validSourceLocaleNotFirst = {
	adapter: "formatjs",
	locales: ["fr", "en"],
	sourceLocale: "en",
	translations: "./i18n/{{locale}}.json",
	include: ["src/**/*.tsx"],
	rules: {
		"missing-source-key": "warning",
	},
} as const satisfies UserConfig;
