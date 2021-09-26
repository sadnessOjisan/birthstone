import { z } from "zod";

const item = z.object({
  title: z.string(),
  published: z.string(),
  url: z.string(),
});

export const schema = z.array(item);

export type ResponseType = z.infer<typeof schema>;
export type ItemType = z.infer<typeof item>;
