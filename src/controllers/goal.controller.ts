import { Request, Response } from "express";
import { z } from "zod";
import {
  getGoalsSchema,
  updateGoalSchema,
  createGoalSchema,
} from "../validation/goals.validation";
import prisma from "../prisma/client";

export const getGoals = async (req: Request, res: Response) => {
  try {
    const { status } = getGoalsSchema.parse(req.query);

    const goals = await prisma.goal.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: "desc" },
    });
    res.json(goals);

    res.json(goals);
  } catch (error) {
    handleError(res, error, "Failed to fetch goals");
  }
};

export const createGoal = async (req: Request, res: Response) => {
  try {
    const data = createGoalSchema.parse(req.body);
    const goal = await prisma.goal.create({ data });
    res.status(201).json(goal);
  } catch (error) {
    handleError(res, error, "Failed to create goal");
  }
};

export const updateGoal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = updateGoalSchema.parse(req.body);

    const goal = await prisma.goal.update({
      where: { id },
      data,
    });

    res.json(goal);
  } catch (error) {
    handleError(res, error, "Failed to update goal");
  }
};

export const deleteGoal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.goal.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    handleError(res, error, "Failed to delete goal");
  }
};

// Error Handler Utility
function handleError(res: Response, error: unknown, defaultMessage: string) {
  if (error instanceof z.ZodError) {
    res.status(400).json({
      error: "Validation failed",
      details: error.errors,
    });
  } else {
    console.error(error);
    res.status(500).json({ error: defaultMessage });
  }
}
