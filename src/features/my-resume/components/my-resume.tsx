'use client'

import { useRef } from 'react'
import { FileDown } from 'lucide-react' // Added an icon for better UI
import generatePDF, { Margin, Resolution, type Options } from 'react-to-pdf'

import { Button } from '@/components/ui/button'

import MyResumeToolbar from './my-resume-toolbar'
import ResumeAbout from './v1/resume-about'
import ResumeExpOne from './v1/resume-exp-one'
import ResumeWrapper from './v1/resume-wrapper'

const MyResume = () => {
    const targetRef = useRef<HTMLDivElement>(null)

    // 1. Separate Function to handle download with a small delay for stability
    const handleDownload = () => {
        const options: Options = {
            filename: 'my-resume.pdf',
            method: 'open',
            resolution: Resolution.HIGH,
            page: {
                margin: Margin.NONE,
                format: 'A4',
                orientation: 'portrait',
            },
            canvas: {
                mimeType: 'image/png',
                qualityRatio: 1,
            },
            overrides: {
                pdf: {
                    compress: false,
                },
                canvas: {
                    useCORS: true,
                    backgroundColor: '#ffffff',
                },
            },
        }

        // Delay execution slightly to ensure DOM is fully ready
        setTimeout(() => {
            if (targetRef.current) {
                generatePDF(targetRef, options)
            }
        }, 250)
    }

    return (
        <div className="flex min-h-screen flex-col items-center p-8">
            {/* 3. Use the shadcn Button component */}
            <Button onClick={handleDownload} className="sticky top-4 z-50 mb-8 shadow-lg">
                <FileDown className="h-4 w-4" />
                Download Resume PDF
            </Button>
            <div
                ref={targetRef}
                style={{
                    backgroundColor: '#ffffff',
                    color: '#000000',
                }}
            >
                <ResumeWrapper pageNumber={1} totalPages={2}>
                    <ResumeAbout />
                    <ResumeExpOne />
                </ResumeWrapper>
                <ResumeWrapper pageNumber={2} totalPages={2}>
                    <ResumeExpOne />
                </ResumeWrapper>
            </div>
            <MyResumeToolbar />
        </div>
    )
}

export default MyResume
