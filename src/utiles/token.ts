import Jwt from "jsonwebtoken";

class CreateTokens {
    accessToken = (id: any, role: string) =>
        Jwt.sign({_id: id, role}, process.env.JWT_KEY!, {expiresIn: process.env.JWT_EXPIRE})
    resetToken = (id: any) =>
        Jwt.sign({_id: id}, process.env.JWT_KEY_RESET!, {expiresIn: process.env.JWT_EXPIRE_RESET})
}

const createTokens = new CreateTokens();
export default createTokens;