'use client'

import React from 'react'
import { useSortable } from '@dnd-kit/react/sortable'
import { GripVertical } from 'lucide-react'

interface SortableItemProps {
    id: string
    index: number
    children: React.ReactNode
}

export function SortableItem({ id, children }: SortableItemProps) {
    const { ref, isDragging } = useSortable({ id })

    return (
        <li
            ref={ref}
            className={`bg-card flex items-center gap-3 rounded-lg border p-4 shadow-sm transition-all ${isDragging ? 'border-primary bg-primary/5 z-50 scale-105 opacity-80 shadow-lg' : 'opacity-100'} `}
        >
            <div className="text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing">
                <GripVertical size={20} />
            </div>

            <div className="flex-1">{children}</div>
        </li>
    )
}
