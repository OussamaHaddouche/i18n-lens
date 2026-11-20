import { z } from "zod";
import { RuleSchema, RulesSchema } from "./Rules.type";
import { SeveritySchema } from "./Severity.type";

export const AdapterSchema = z.literal("formatjs");
export type Adapter = z.infer<typeof AdapterSchema>;

export const LocalesSchema = z.array(z.string()).nonempty();
export type Locales = z.infer<typeof LocalesSchema>;

export const sourceLocaleSchema = z.string();
export type SourceLocale = z.infer<typeof sourceLocaleSchema>;

const sourceLocaleInLocales = {
  check: (config: { locales: string[]; sourceLocale: string }) =>
    config.locales.includes(config.sourceLocale),
  message: { error: "Source locale must be one of the locales" },
};

export const ConfigSchema = z
  .strictObject({
    adapter: AdapterSchema,
    locales: LocalesSchema,
    sourceLocale: sourceLocaleSchema,
    translations: z.string(),
    include: z.array(z.string()).nonempty(),
    rules: RulesSchema,
  })
  .refine(sourceLocaleInLocales.check, sourceLocaleInLocales.message);
export type Config = z.infer<typeof ConfigSchema>;

export const UserConfigSchema = z
  .strictObject({
    adapter: AdapterSchema.optional(),
    locales: LocalesSchema,
    sourceLocale: sourceLocaleSchema,
    translations: z.string(),
    include: z.array(z.string()).nonempty(),
    rules: z.partialRecord(RuleSchema, SeveritySchema),
  })
  .refine(sourceLocaleInLocales.check, sourceLocaleInLocales.message);
export type UserConfig = z.infer<typeof UserConfigSchema>;
