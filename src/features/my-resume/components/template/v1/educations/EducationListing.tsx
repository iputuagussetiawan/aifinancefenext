import { useQuery } from '@tanstack/react-query'

import { educationService } from '@/features/education/services/education-service'
import type { IEducation } from '@/features/education/types/education-type'

import EducationSkeleton from './EducationSkeleton'

const EducationListing = () => {
    const { data: educations, isLoading } = useQuery({
        queryKey: ['educations'],
        queryFn: educationService.get,
    })
    console.log('educations', educations)

    const formatDate = (dateString: string) => {
        return new Date(dateString).getFullYear()
    }

    const educationList = educations?.data || []
    return (
        <div className="mb-10">
            <h2
                className="mb-1 text-sm font-bold tracking-[0.2em] uppercase"
                style={{ color: '#1a1a1a' }}
            >
                Education
            </h2>
            <div className="mb-4 h-px w-full" style={{ backgroundColor: '#d1d5db' }}></div>
            {isLoading ? (
                <EducationSkeleton />
            ) : educationList.length > 0 ? (
                educationList.map((edu: IEducation) => (
                    <div key={edu._id} className="mb-4">
                        <h3
                            className="text-[10px] font-bold uppercase"
                            style={{ color: '#1a1a1a' }}
                        >
                            {edu.degree}
                        </h3>
                        <p className="text-[9px]" style={{ color: '#4b5563' }}>
                            {edu.schoolName} | {edu.fieldOfStudy}
                        </p>
                        <p className="text-[8px] font-medium" style={{ color: '#9ca3af' }}>
                            {formatDate(edu.startDate)} -{' '}
                            {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                        </p>
                    </div>
                ))
            ) : (
                <p className="text-[9px] text-gray-400 italic">No education history added.</p>
            )}
        </div>
    )
}

export default EducationListing
