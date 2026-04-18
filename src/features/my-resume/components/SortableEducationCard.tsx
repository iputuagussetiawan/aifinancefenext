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
                        'bg-card border-l-[#eab308] shadow-sm',
                        isDragging &&
                            'z-50 scale-[1.02] border-dashed border-[#eab308] bg-[#eab308]/5 opacity-80 shadow-xl',
                    )}
                >
                    <CardContent className="pt-6">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex cursor-move items-center gap-2 opacity-40 transition-opacity hover:opacity-100">
                                <GripVertical size={20} />
                                <span className="text-[10px] font-bold tracking-wider uppercase">
                                    Reorder Item
                                </span>
                            </div>

                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:bg-destructive/10 h-8 w-8"
                                onClick={() => onRemove(index)}
                            >
                                <Trash2 size={18} />
                            </Button>
                        </div>

                        {children}
                    </CardContent>
                </Card>
            </div>
        )
    },
)

SortableEducationCard.displayName = 'SortableEducationCard'
