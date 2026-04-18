import React from 'react'

import { Skeleton } from '@/components/ui/skeleton'

export const EducationSkeleton = () => {
    return (
        <div className="space-y-4">
            {[1, 2].map((i) => (
                <div key={i} className="flex flex-col gap-2">
                    {/* Degree Title */}
                    <Skeleton className="h-3 w-[140px] bg-gray-200" />

                    {/* School | Field */}
                    <Skeleton className="h-2 w-[180px] bg-gray-100" />

                    {/* Dates */}
                    <Skeleton className="h-2 w-[60px] bg-gray-50" />
                </div>
            ))}
        </div>
    )
}

// Ensure you don't have multiple default exports in one project folder
export default EducationSkeleton
