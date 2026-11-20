/** Invalid user configs — intentionally not typed as UserConfig. */

export const invalidSourceLocaleNotInLocales = {
	adapter: "formatjs",
	locales: ["en", "fr"],
	sourceLocale: "de",
	translations: "./locales/{{locale}}.json",
	include: ["src/**/*.{ts,tsx}"],
	rules: {},
};

export const invalidEmptyLocales = {
	adapter: "formatjs",
	locales: [],
	sourceLocale: "en",
	translations: "./locales/{{locale}}.json",
	include: ["src/**/*.{ts,tsx}"],
	rules: {},
};

export const invalidEmptyInclude = {
	adapter: "formatjs",
	locales: ["en"],
	sourceLocale: "en",
	translations: "./locales/{{locale}}.json",
	include: [],
	rules: {},
};

export const invalidAdapter = {
	adapter: "i18next",
	locales: ["en"],
	sourceLocale: "en",
	translations: "./locales/{{locale}}.json",
	include: ["src/**/*.{ts,tsx}"],
	rules: {},
};

export const invalidSeverity = {
	adapter: "formatjs",
	locales: ["en"],
	sourceLocale: "en",
	translations: "./locales/{{locale}}.json",
	include: ["src/**/*.{ts,tsx}"],
	rules: {
		"hardcoded-text": "info",
	},
};

export const invalidUnknownRule = {
	adapter: "formatjs",
	locales: ["en"],
	sourceLocale: "en",
	translations: "./locales/{{locale}}.json",
	include: ["src/**/*.{ts,tsx}"],
	rules: {
		"not-a-real-rule": "error",
	},
};

export const invalidMissingTranslations = {
	adapter: "formatjs",
	locales: ["en"],
	sourceLocale: "en",
	include: ["src/**/*.{ts,tsx}"],
	rules: {},
};

export const invalidExtraKey = {
	adapter: "formatjs",
	locales: ["en"],
	sourceLocale: "en",
	translations: "./locales/{{locale}}.json",
	include: ["src/**/*.{ts,tsx}"],
	rules: {},
	coverage: { minimum: 90 },
};
