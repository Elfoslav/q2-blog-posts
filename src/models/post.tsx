import { z } from "zod";

export const postSchema = z.object({
	id: z.number().optional(),
	image: z.string().optional(),
	title: z
		.preprocess(
			(val) => (typeof val === "string" ? val.trim() : val),
			z.string()
		)
		.refine((val) => val.replace(/\s/g, "").length >= 3, {
			message: "Titulek musí mít alespoň 3 znaky.",
		}),
	content: z
		.preprocess(
			(val) => (typeof val === "string" ? val.trim() : val),
			z.string()
		)
		.refine((val) => val.replace(/\s/g, "").length >= 10, {
			message: "Obsah musí mít alespoň 10 znaků.",
		}),
	author: z
		.preprocess(
			(val) => (typeof val === "string" ? val.trim() : val),
			z.string()
		)
		.refine((val) => val.replace(/\s/g, "").length >= 1, {
			message: "Autor je povinný",
		}),
});

// Infer the TypeScript type
export type Post = z.infer<typeof postSchema>;
