import { describe, expect, it } from "vitest";
import { UserConfigSchema } from "../types";
import {
  invalidAdapter,
  invalidEmptyInclude,
  invalidEmptyLocales,
  invalidExtraKey,
  invalidMissingTranslations,
  invalidSeverity,
  invalidSourceLocaleNotInLocales,
  invalidUnknownRule,
  validMinimal,
  validMultiLocale,
  validSourceLocaleNotFirst,
  validWithRuleOverrides,
} from "./__fixtures__";
import { defaultRules } from "./defaults";
import { mergeConfig } from "./merge";

describe("mergeConfig", () => {
  it("fills default rules when user passes an empty rules map", () => {
    const config = mergeConfig(validMinimal);

    expect(config.rules).toEqual(defaultRules);
    expect(config.adapter).toBe("formatjs");
    expect(config.sourceLocale).toBe("en");
  });

  it("keeps multi-locale user fields and merges default rules", () => {
    const config = mergeConfig(validMultiLocale);

    expect(config.locales).toEqual(["en", "fr", "ar"]);
    expect(config.rules).toEqual(defaultRules);
  });

  it("lets user rule overrides win over defaults", () => {
    const config = mergeConfig(validWithRuleOverrides);

    expect(config.rules["hardcoded-text"]).toBe("warning");
    expect(config.rules["unused-translation"]).toBe("error");
    expect(config.rules["missing-translation"]).toBe(
      defaultRules["missing-translation"],
    );
    expect(config.rules["missing-source-key"]).toBe(
      defaultRules["missing-source-key"],
    );
  });

  it("allows sourceLocale that is not the first locales entry", () => {
    const config = mergeConfig(validSourceLocaleNotFirst);

    expect(config.sourceLocale).toBe("en");
    expect(config.locales).toEqual(["fr", "en"]);
    expect(config.rules["missing-source-key"]).toBe("warning");
  });
});

describe("UserConfigSchema fixtures", () => {
  it.each([
    ["validMinimal", validMinimal],
    ["validMultiLocale", validMultiLocale],
    ["validWithRuleOverrides", validWithRuleOverrides],
    ["validSourceLocaleNotFirst", validSourceLocaleNotFirst],
  ] as const)("%s parses", (_name, fixture) => {
    expect(UserConfigSchema.safeParse(fixture).success).toBe(true);
  });

  it.each([
    ["invalidSourceLocaleNotInLocales", invalidSourceLocaleNotInLocales],
    ["invalidEmptyLocales", invalidEmptyLocales],
    ["invalidEmptyInclude", invalidEmptyInclude],
    ["invalidAdapter", invalidAdapter],
    ["invalidSeverity", invalidSeverity],
    ["invalidUnknownRule", invalidUnknownRule],
    ["invalidMissingTranslations", invalidMissingTranslations],
    ["invalidExtraKey", invalidExtraKey],
  ] as const)("%s is rejected", (_name, fixture) => {
    expect(UserConfigSchema.safeParse(fixture).success).toBe(false);
  });
});
