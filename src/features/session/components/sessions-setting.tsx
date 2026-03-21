'use client'

import React, { useEffect, useState } from 'react'
import { Chrome, Globe, Laptop, Loader2, Monitor, Smartphone } from 'lucide-react'

import { handleGetAllSessions } from '../actions/session-action'
import type { ISession } from '../types/session-type'
import SessionItem from './session-item'

export default function SessionSetting() {
    const [sessions, setSessions] = useState<ISession[]>([])
    const [isLoading, setIsLoading] = useState(true) // Start as true if fetching on mount
    const [error, setError] = useState<string | null>(null)

    const fetchSessions = async () => {
        setIsLoading(true)
        const result = await handleGetAllSessions()

        if (result.success) {
            setSessions(result.sessions || [])
        } else {
            setError(result.error || 'Something went wrong')
        }
        setIsLoading(false)
    }

    useEffect(() => {
        fetchSessions()
    }, [])

    // 3. Helper to parse UA strings
    const getSessionDetails = (ua: string) => {
        const lowerUA = ua.toLowerCase()
        let Icon = Monitor
        let browser = 'Unknown Browser'
        let os = 'Unknown OS'

        if (lowerUA.includes('chrome')) browser = 'Chrome'
        else if (lowerUA.includes('safari')) browser = 'Safari'
        else if (lowerUA.includes('apidog')) browser = 'Apidog'
        else if (lowerUA.includes('node')) browser = 'Node.js'

        if (lowerUA.includes('windows')) os = 'Windows'
        else if (lowerUA.includes('mac os')) os = 'macOS'
        else if (lowerUA.includes('linux')) os = 'Linux'
        else os = 'Web Client'

        if (browser === 'Chrome') Icon = Chrome
        if (os === 'Windows' || os === 'macOS') Icon = Laptop

        return { Icon, browser, os }
    }

    const handleDelete = (id: string) => {
        setIsLoading(true)
        // Simulate API call
        setTimeout(() => {
            setSessions((prev) => prev.filter((s) => s._id !== id))
            setIsLoading(false)
        }, 1000)
    }

    const currentSession = sessions.find((s) => s.isCurrent)
    const otherSessions = sessions.filter((s) => !s.isCurrent)

    return (
        <div className="space-y-8">
            {/* Current Session */}
            <div className="border-border bg-card rounded-xl border p-6">
                <h3 className="mb-1 text-lg font-bold">Current active session</h3>
                <p className="text-muted-foreground mb-6 text-sm">
                    You’re logged into this account on this device.
                </p>
                {currentSession && (
                    <SessionItem
                        session={{ _id: currentSession._id, isCurrent: true }}
                        parsedDetails={getSessionDetails(currentSession.userAgent)}
                        timeAgo="Active now"
                        onDelete={handleDelete}
                    />
                )}
            </div>

            {/* Other Sessions */}
            <div className="border-border bg-card rounded-xl border p-6">
                <h3 className="mb-1 text-lg font-bold">Other sessions</h3>
                <div className="divide-border divide-y">
                    {otherSessions.length > 0 ? (
                        otherSessions.map((session) => (
                            <SessionItem
                                key={session._id}
                                session={{ _id: session._id, isCurrent: false }}
                                parsedDetails={getSessionDetails(session.userAgent)}
                                timeAgo="Last active 2 days ago"
                                loading={isLoading}
                                onDelete={handleDelete}
                            />
                        ))
                    ) : (
                        <p className="text-muted-foreground py-4 text-sm">
                            No other active sessions.
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
