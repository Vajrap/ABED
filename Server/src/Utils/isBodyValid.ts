import { z } from 'zod'

export function isBodyValid(schema: z.ZodTypeAny, data: unknown): boolean {
  return schema.safeParse(data).success;
}