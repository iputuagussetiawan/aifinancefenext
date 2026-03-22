export interface ISession {
    _id: string
    userId: string
    userAgent: string
    createdAt: string // or Date if you parse it
    expiredAt: string // or Date if you parse it
    isCurrent?: boolean // Optional because it's not present in all objects
}

export interface ISessionResponse {
    message: string
    sessions: ISession[]
}

export interface IRole {
    _id: string
    name: string
    permissions: string[]
}

export interface IUser {
    _id: string
    name: string
    email: string
    profilePicture: string
    isEmailVerified: boolean
    isActive: boolean
    lastLogin: string // or Date if you parse it
    createdAt: string // or Date
    updatedAt: string // or Date
    onboardingComplete: boolean
    role: IRole
}

// This matches the response structure from your session/me service
export interface IUserResponse {
    message: string
    user: IUser
}
