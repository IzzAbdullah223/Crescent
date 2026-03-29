import {} from 'express';
import { signUpSchema } from '../libs/types.js';
export async function signUp(req, res) {
    const body = req.body;
    const result = signUpSchema.safeParse(body);
    if (!result.success) {
        return res.status(500).json({
            success: "failure"
        });
    }
    return res.status(200).json({
        sucess: true
    });
}
//# sourceMappingURL=authController.js.map