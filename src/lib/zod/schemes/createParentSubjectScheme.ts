import {z} from "zod";

export type ParentSchemeFormInput = z.infer<typeof parentSubjectScheme>;

export const parentSubjectScheme = z.object({
    name:z.string().min(3),
    hexColor:z.string(),
    hexBgColor: z.string()
})

