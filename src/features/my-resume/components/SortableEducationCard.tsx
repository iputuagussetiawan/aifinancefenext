'use client'

import React, { memo } from 'react'
import { useSortable } from '@dnd-kit/react/sortable'
import { GripVertical, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface SortableCardProps {
    id: string
    index: number
    onRemove: (index: number) => void
    children: React.ReactNode
}

export const SortableEducationCard = memo(
    ({ id, index, onRemove, children }: SortableCardProps) => {
        const { ref, isDragging } = useSortable({ id, index })

        return (
            <div ref={ref} className="transition-all duration-200">
                <Card
                    className={cn(
                        'relative overflow-hidden border-l-4 transition-all',
                        // Normal State
                        'bg-card border-l-[#eab308] shadow-sm',
                        // Dragging State: Yellow dashed border & tinted background
                        isDragging &&
                            'border-dashed border-[#eab308] bg-[#eab308]/5 opacity-80 shadow-none',
                    )}
                >
                    <CardContent className="pt-6">
                        <div className="pointer-events-none absolute top-2 right-2 left-2 flex items-center justify-between">
                            {/* Drag Handle: Explicitly styled for the user */}
                            <div className="pointer-events-auto flex cursor-move items-center gap-2 opacity-40 transition-opacity hover:opacity-100">
                                <GripVertical size={20} className="text-muted-foreground" />
                                <span className="text-[10px] font-bold tracking-wider uppercase">
                                    Drag to reorder
                                </span>
                            </div>

                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:bg-destructive/10 pointer-events-auto h-8 w-8"
                                onClick={() => onRemove(index)}
                            >
                                <Trash2 size={18} />
                            </Button>
                        </div>

                        <div className="mt-4">{children}</div>
                    </CardContent>
                </Card>
            </div>
        )
    },
)

SortableEducationCard.displayName = 'SortableEducationCard'
