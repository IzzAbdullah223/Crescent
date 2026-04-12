import z from "zod";
export declare const signUpSchema: z.ZodObject<{
    username: z.ZodString;
    displayname: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
}, z.z.core.$strip>;
export type postData = {
    content?: string;
    tags?: string[];
    pictureURL?: File | null;
    githubRepo?: string;
};
//# sourceMappingURL=types.d.ts.map