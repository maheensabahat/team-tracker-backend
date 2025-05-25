import { z } from "zod";
import { GoalStatus } from "@prisma/client";

export const createGoalSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().max(500).optional(),
  dueDate: z.coerce.date(),
  status: z.nativeEnum(GoalStatus).default("NOT_STARTED"),
});

export const updateGoalSchema = createGoalSchema
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    "At least one field must be provided"
  );

export const getGoalsSchema = z.object({
  status: z.nativeEnum(GoalStatus).optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});
