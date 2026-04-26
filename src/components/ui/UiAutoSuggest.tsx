'use client'

import * as React from 'react'
import { Check } from 'lucide-react'

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import { Popover, PopoverAnchor, PopoverContent } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface AutoSuggestProps<T> {
    items: T[]
    value: string
    onValueChange: (value: string) => void
    onSelect: (item: T) => void
    placeholder?: string
    emptyMessage?: string
    getSearchValue: (item: T) => string
    renderItem: (item: T) => React.ReactNode
}

// Perbaikan: Menggunakan fungsi reguler untuk mendukung Generics dengan forwardRef
const AutoSuggestInner = <T extends { id: string | number }>(
    {
        items,
        value,
        onValueChange,
        onSelect,
        placeholder = 'Search...',
        emptyMessage = 'No data found.',
        getSearchValue,
        renderItem,
    }: AutoSuggestProps<T>,
    ref: React.ForwardedRef<HTMLInputElement>,
) => {
    const [open, setOpen] = React.useState(false)

    return (
        <Command className="overflow-visible border-none! bg-transparent p-0 shadow-none! [&_div]:border-none!">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverAnchor asChild>
                    <CommandInput
                        ref={ref}
                        placeholder={placeholder}
                        value={value}
                        onValueChange={(search) => {
                            onValueChange(search)
                            setOpen(search.length > 0)
                        }}
                        onFocus={() => setOpen(value.length > 0)}
                        className="border-none! ring-0! outline-hidden! focus:border-none!"
                    />
                </PopoverAnchor>

                <PopoverContent
                    className="mt-1 w-[var(--radix-popover-trigger-width)] p-0"
                    align="start"
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    onInteractOutside={(e) => {
                        // Menutup popover jika user klik di luar,
                        // tapi pastikan tidak menutup jika yang diklik adalah inputnya sendiri
                        if (e.target instanceof Element && !e.target.closest('input')) {
                            setOpen(false)
                        }
                    }}
                >
                    <CommandList className="bg-popover rounded-lg border shadow-md">
                        <CommandEmpty className="text-muted-foreground py-2 text-center text-sm">
                            {emptyMessage}
                        </CommandEmpty>

                        <CommandGroup className="p-0">
                            {items.map((item) => (
                                <CommandItem
                                    key={item.id}
                                    value={getSearchValue(item)}
                                    onSelect={() => {
                                        onSelect(item)
                                        setOpen(false)
                                    }}
                                    className="cursor-pointer"
                                >
                                    <div className="flex w-full items-center justify-between">
                                        <div className="flex flex-1 items-center gap-2">
                                            {renderItem(item)}
                                        </div>
                                        <Check
                                            className={cn(
                                                'h-4 w-4',
                                                value.toLowerCase() ===
                                                    getSearchValue(item).toLowerCase()
                                                    ? 'opacity-100'
                                                    : 'opacity-0',
                                            )}
                                        />
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </PopoverContent>
            </Popover>
        </Command>
    )
}

// Trick untuk mengekspor komponen Generik dengan forwardRef
export const AutoSuggest = React.forwardRef(AutoSuggestInner) as <
    T extends { id: string | number },
>(
    props: AutoSuggestProps<T> & { ref?: React.ForwardedRef<HTMLInputElement> },
) => React.ReactElement

;(AutoSuggest as any).displayName = 'AutoSuggest'
