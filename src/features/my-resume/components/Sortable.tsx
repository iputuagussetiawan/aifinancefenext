'use client'

import React, { useState } from 'react'
import { move } from '@dnd-kit/helpers'
import { DragDropProvider } from '@dnd-kit/react'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { SortableItem } from './SortableItem'

interface Todo {
    id: string
    text: string
    completed: boolean
    orderPosition: number
}

export default function SortableList() {
    const [todos, setTodos] = useState<Todo[]>([
        { id: '1', text: 'Master React Hook Form', completed: false, orderPosition: 0 },
        { id: '2', text: 'Build U-LMS Dashboard', completed: false, orderPosition: 1 },
        { id: '3', text: 'Configure dnd-kit reordering', completed: true, orderPosition: 2 },
    ])

    const handleDragEnd = (event: any) => {
        // 1. Get the reordered array using dnd-kit helper
        const reorderedTodos = move(todos, event)

        if (reorderedTodos) {
            // 2. Map the new index to the orderPosition property
            // This ensures your data always matches the visual order
            const updatedWithOrder = reorderedTodos.map((todo, index) => ({
                ...todo,
                orderPosition: index,
            }))

            console.log('Fresh Todo Order:', updatedWithOrder)
            setTodos(updatedWithOrder)
        }
    }

    const addTodo = () => {
        const newTodo: Todo = {
            id: crypto.randomUUID(),
            text: 'New Task',
            completed: false,
            orderPosition: todos.length,
        }
        setTodos([...todos, newTodo])
    }

    return (
        <div className="mx-auto mt-10 max-w-md space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Tasks</h2>
                <Button size="sm" onClick={addTodo} variant="outline">
                    <Plus className="mr-2 h-4 w-4" /> Add Task
                </Button>
            </div>

            <DragDropProvider onDragEnd={handleDragEnd}>
                <ul className="space-y-2 p-0">
                    {todos.map((todo, index) => (
                        <SortableItem key={todo.id} id={todo.id} index={index}>
                            <div className="flex flex-col">
                                <span className={todo.completed ? 'line-through opacity-50' : ''}>
                                    {todo.text}
                                </span>
                                <span className="text-muted-foreground text-[10px]">
                                    Position: {todo.orderPosition}
                                </span>
                            </div>
                        </SortableItem>
                    ))}
                </ul>
            </DragDropProvider>
        </div>
    )
}
