'use client'

import React, { useState } from 'react'
import { move } from '@dnd-kit/helpers' // New helper for reordering
import { DragDropProvider } from '@dnd-kit/react'

import { SortableItem } from './SortableItem'

export default function SortableList() {
    const [items, setItems] = useState([1, 2, 3, 4, 5])

    return (
        <div className="mx-auto mt-10 max-w-md">
            <DragDropProvider
                onDragEnd={(event) => {
                    // 1. Calculate the new order first
                    const updatedItems = move(items, event)
                    // 2. Log the fresh data immediately
                    console.log('New order:', updatedItems)

                    // 3. Update the state with the pre-calculated value
                    setItems(updatedItems)
                }}
            >
                <ul className="space-y-2 p-0">
                    {items.map((id, index) => (
                        <SortableItem key={id} id={id} index={index} />
                    ))}
                </ul>
            </DragDropProvider>
        </div>
    )
}
