import React from 'react'

import ResumeFooter from './resume-footer'
import ResumeHeader from './resume-header'

const ResumeWrapper = ({
    children,
    pageNumber,
    totalPages,
}: {
    children: React.ReactNode
    pageNumber: number
    totalPages: number
}) => {
    return (
        <div className="wrapper relative" style={{ width: '794px', height: '1122.5px' }}>
            <ResumeHeader />
            {children}
            <ResumeFooter
                pageNumber={pageNumber}
                totalPages={totalPages}
                userName="Brock Henrecks"
            />
        </div>
    )
}

export default ResumeWrapper
