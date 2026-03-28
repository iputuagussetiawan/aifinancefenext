'use client'

import * as React from 'react'
import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from '@/components/ui/drawer'

// Define the directions supported by Vaul
type DrawerDirection = 'top' | 'bottom' | 'left' | 'right'

interface ResumeDrawerProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    direction?: DrawerDirection
    title: string
    description?: string
    children: React.ReactNode
    footer?: React.ReactNode
    className?: string
}

export function ResumeDrawer({
    open,
    onOpenChange,
    direction = 'bottom', // Default to standard bottom drawer
    title,
    description,
    children,
    footer,
    className,
}: ResumeDrawerProps) {
    // Logic to determine styles based on direction
    const isVertical = direction === 'right' || direction === 'left'

    const directionStyles = {
        right: 'fixed right-0 top-0 bottom-0 mt-0 h-screen w-full sm:min-w-[30vw] rounded-none border-l',
        left: 'fixed left-0 top-0 bottom-0 mt-0 h-screen w-full sm:w-[450px] rounded-none border-r',
        bottom: 'fixed inset-x-0 bottom-0 mt-24 max-h-[96%] rounded-t-[10px] border-t',
        top: 'fixed inset-x-0 top-0 mb-24 max-h-[96%] rounded-b-[10px] border-b',
    }

    return (
        <Drawer direction={direction} open={open} onOpenChange={onOpenChange}>
            <DrawerContent className={`${directionStyles[direction]} outline-none ${className}`}>
                {/* Handle bar for bottom/top drawers */}
                {!isVertical && (
                    <div className="bg-muted mx-auto mt-4 h-2 w-[100px] rounded-full" />
                )}

                <div className="flex h-full flex-col">
                    <DrawerHeader className="px-6 py-4">
                        <div className="flex items-center justify-between">
                            <DrawerTitle className="text-xl font-bold">{title}</DrawerTitle>
                            <DrawerClose asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-full"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </DrawerClose>
                        </div>
                        {description && <DrawerDescription>{description}</DrawerDescription>}
                    </DrawerHeader>

                    <div className="flex-1 overflow-y-auto px-6 py-2">{children}</div>

                    <DrawerFooter className="border-t px-6 py-4">
                        {footer || (
                            <div className="flex w-full gap-3">
                                <Button className="flex-1">Confirm</Button>
                                <DrawerClose asChild>
                                    <Button variant="outline" className="flex-1">
                                        Cancel
                                    </Button>
                                </DrawerClose>
                            </div>
                        )}
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
