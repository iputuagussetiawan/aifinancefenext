"use server";
import { userService } from "../services/auth-service";
import type { SignupInputType } from "../types/auth-type";
export async function handleRegister(data: SignupInputType) {
  try {
    const user = await userService.register(data);
    return { success: true, user };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to register" };
  }
}
