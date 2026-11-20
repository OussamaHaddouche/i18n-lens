import { z } from "zod";
import { SeveritySchema } from "./Severity.type";

export const RuleSchema = z.union([
  z.literal("hardcoded-text"),
  z.literal("missing-translation"),
  z.literal("unused-translation"),
  z.literal("missing-source-key"),
]);

export type Rule = z.infer<typeof RuleSchema>;

export const RulesSchema = z.record(RuleSchema, SeveritySchema);

export type Rules = z.infer<typeof RulesSchema>;
