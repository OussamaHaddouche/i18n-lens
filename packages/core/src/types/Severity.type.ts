import { z } from "zod";

export const SeveritySchema = z.enum(["warning", "error"]);

export type Severity = z.infer<typeof SeveritySchema>;
