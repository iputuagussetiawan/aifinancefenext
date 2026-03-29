'use client'

import { EditorContent } from '@tiptap/react'

import { Toolbar } from './components/toolbar'
import { useTiptap } from './hooks/use-tiptap'

interface EditorProps {
    initialContent?: string
    onChange: (html: string) => void
}

export const RichTextEditor = ({ initialContent = '', onChange }: EditorProps) => {
    const editor = useTiptap(initialContent, onChange)

    // Avoid rendering until the editor is initialized
    if (!editor) {
        return (
            <div className="border-input bg-muted/20 h-[200px] w-full animate-pulse rounded-md border" />
        )
    }

    return (
        <div className="border-input bg-background focus-within:ring-ring relative w-full overflow-hidden rounded-md border shadow-sm transition-all focus-within:ring-1">
            {/* 1. Main Formatting Toolbar */}
            <Toolbar editor={editor} />

            {/* 2. The Editable Area */}
            <div className="min-h-[150px] cursor-text">
                <EditorContent
                    editor={editor}
                    className="prose prose-sm dark:prose-invert h-full min-h-[150px] w-full max-w-none focus:outline-none"
                />
            </div>
        </div>
    )
}
