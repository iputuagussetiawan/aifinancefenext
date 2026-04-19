import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Control, Controller } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface DatePickerProps {
    control: Control<any>
    name: string
    label: string
    error?: any
}

export function UiFormDatePicker({ control, name, label, error }: DatePickerProps) {
    return (
        <div className="relative z-1000 flex flex-col gap-2">
            <label className="text-sm font-medium">{label}</label>
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                type="button" // CRITICAL: Prevents form submission on click
                                variant={'outline'}
                                className={cn(
                                    'w-full justify-start text-left font-normal',
                                    !field.value && 'text-muted-foreground',
                                    error && 'border-destructive',
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value && !isNaN(Date.parse(field.value)) ? (
                                    format(new Date(field.value), 'PPP')
                                ) : (
                                    <span>Pick a date</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="z-1000 w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                // Ensure we pass a Date object or undefined, never an empty string
                                selected={field.value ? new Date(field.value) : undefined}
                                onSelect={(date) => {
                                    // Only update if a date is actually picked
                                    if (date) {
                                        field.onChange(date.toISOString())
                                    }
                                }}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                )}
            />
            {error && <p className="text-destructive text-xs">{error.message}</p>}
        </div>
    )
}
