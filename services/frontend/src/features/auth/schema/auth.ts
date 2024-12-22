import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email({ message: "유효하지 않은 이메일 형식입니다" }),
  password: z.string().min(8, { message: "8자 이상 입력해주세요" }),
});
