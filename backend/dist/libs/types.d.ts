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
    pictureURL?: string;
    githubRepo?: string;
};
//# sourceMappingURL=types.d.ts.map