'use client'

import { useSortable } from '@dnd-kit/react/sortable'

import { cn } from '@/lib/utils'

interface SortableItemProps {
    id: number | string
    index: number
}

export function SortableItem({ id, index }: SortableItemProps) {
    // The new version simplifies this to just a 'ref'
    const { ref, isDragging } = useSortable({ id, index })

    return (
        <li
            ref={ref}
            className={cn(
                // Base Styles
                'mb-2 cursor-move list-none rounded border p-4 transition-all',
                // Default Styles (Not Dragging)
                'border-solid shadow-sm active:scale-[1.02]',
                // Dragging Styles
                isDragging &&
                    'scale-100 border-dashed border-[#eab308] bg-[#eab308]/5 opacity-80 shadow-none',
            )}
        >
            <div className="flex items-center gap-3">
                <span className={cn('font-medium', isDragging && 'text-[#eab308]')}>
                    Item {id} Key {index}
                </span>
            </div>
        </li>
    )
}
