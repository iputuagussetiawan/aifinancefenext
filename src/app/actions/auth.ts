"use server" // 🗝️ This is the bridge

import { userService, type RegisterInput } from "@/app/services/user-service"

export async function handleRegister(data: RegisterInput) {
  try {
    const user = await userService.register(data)
    return { success: true, user }
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to register" }
  }
}