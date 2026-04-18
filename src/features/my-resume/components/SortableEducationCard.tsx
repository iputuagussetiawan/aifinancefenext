import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function SortableEducationCard({ id, children, onRemove }: any) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id,
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 0,
        position: 'relative' as const,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`bg-card rounded-lg border p-4 shadow-sm ${isDragging ? 'ring-primary opacity-50 ring-2' : ''}`}
        >
            <div className="flex gap-4">
                {/* DRAG HANDLE */}
                <div {...attributes} {...listeners} className="cursor-grab p-1">
                    <GripVertical className="text-muted-foreground" />
                </div>

                <div className="flex-1">{children}</div>

                <Button variant="ghost" size="icon" onClick={onRemove} className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
