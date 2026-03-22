'use client'

import { useRef } from 'react'
import { FileDown } from 'lucide-react' // Added an icon for better UI
import generatePDF, { Margin, Resolution, type Options } from 'react-to-pdf'

import { Button } from '@/components/ui/button'

import ResumeAbout from './v1/resume-about'
import ResumeExpOne from './v1/resume-exp-one'
import ResumeHeader from './v1/resume-header'

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
            <Button onClick={handleDownload} className="mb-8 gap-2">
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
                <div className="wrapper" style={{ width: '794px' }}>
                    <ResumeHeader />
                    <ResumeAbout />
                    <ResumeExpOne />
                </div>
            </div>
        </div>
    )
}

export default MyResume
