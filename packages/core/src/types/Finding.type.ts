import { z } from "zod";
import { RuleSchema } from "./Rules.type";
import { SeveritySchema } from "./Severity.type";

export const FindingSchema = z.strictObject({
	severity: SeveritySchema,
	ruleId: RuleSchema,
	message: z.string(),
	location: z.strictObject({
		file: z.string(),
		line: z.number().optional(),
		column: z.number().optional(),
	}),
});

export type Finding = z.infer<typeof FindingSchema>;
