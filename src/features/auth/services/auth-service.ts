// services/user-service.ts

import { api } from "@/lib/api-factory";


export interface UserProfile {
  id: string;
  name: string;
  email: string;
}

// 1. Define the registration data structure
export interface RegisterInput {
  name: string;
  email: string;
  password?: string; // Optional depending on your backend
}

export const userService = {
  // 1. Add the Register function
  register: (data: RegisterInput) =>
    api.API<UserProfile>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
      // We usually don't cache registration attempts
      cache: 'no-store', 
    }),
};