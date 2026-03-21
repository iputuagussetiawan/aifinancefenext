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
