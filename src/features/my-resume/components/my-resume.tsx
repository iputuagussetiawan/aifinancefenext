'use client'

import React, { useRef } from 'react'
import { FileDown, Globe, Mail, MapPin, Phone } from 'lucide-react' // Added an icon for better UI
import generatePDF, { Margin, Resolution, type Options } from 'react-to-pdf'

import { Button } from '@/components/ui/button'

const MyResume = () => {
    const targetRef = useRef<HTMLDivElement>(null)

    // 1. Separate Function to handle download with a small delay for stability
    const handleDownload = () => {
        const options: Options = {
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

            {/* 4. The area to be captured */}
            <div
                ref={targetRef}
                style={{
                    backgroundColor: '#ffffff',
                    color: '#000000',
                }}
            >
                <div className="wrapper" style={{ width: '794px' }}>
                    <section className="relative">
                        <div className="absolute top-0 right-0 left-0 h-7 w-full bg-[#2E2C2F]"></div>
                        <div className="flex">
                            {/* Name Area */}
                            <div className="flex flex-1 flex-col justify-end bg-white p-12 pb-0">
                                <h1 className="text-5xl leading-none font-bold tracking-tighter text-[#1a1a1a]">
                                    BROCK
                                </h1>
                                <h1 className="text-5xl leading-none font-bold tracking-tighter text-[#1a1a1a]">
                                    HENRECKS
                                </h1>
                                <p className="mt-3 text-sm font-semibold tracking-[0.3em] text-[#4a4a4a] uppercase">
                                    Graphic Designer
                                </p>
                            </div>

                            {/* Gray Contact Block */}
                            <div className="relative flex w-[320px] flex-col justify-center pt-8 pr-16 pl-6 text-white">
                                {/* The Yellow Stripe */}
                                <div className="absolute top-0 right-15 h-full w-8 bg-[#f1c40f]"></div>

                                <div className="z-10 space-y-3">
                                    {[
                                        { text: 'Address Name, Australia', Icon: MapPin },
                                        { text: '+457 123 4567 8912', Icon: Phone },
                                        { text: 'namehere@gmail.com', Icon: Mail },
                                        { text: 'www.domainname.com', Icon: Globe },
                                    ].map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center justify-end gap-3"
                                        >
                                            <span className="text-[12px] text-[#1a1a1a]">
                                                {item.text}
                                            </span>
                                            <div className="p-1">
                                                <item.Icon size={14} className="text-[#1a1a1a]" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ABOUT ME SECTION */}
                    <section
                        className="relative mt-10 flex w-full gap-8 px-12"
                        style={{ backgroundColor: '#ffffff' }}
                    >
                        {/* 1. Profile Picture Column */}
                        <div className="relative w-1/3" style={{ minHeight: '140px' }}>
                            {/* The Gray Background Box - Using Hex to avoid LAB/OKLCH errors */}
                            <div
                                className="absolute top-0 left-0 z-0 h-30 w-full"
                                style={{
                                    backgroundColor: '#e5e7eb',
                                }}
                            ></div>

                            {/* The Circular Image Container */}
                            <div
                                className="relative z-10"
                                style={{ marginTop: '24px', marginLeft: '55px' }}
                            >
                                <div
                                    className="overflow-hidden rounded-full"
                                    style={{
                                        width: '128px',
                                        height: '128px',
                                        border: '2px solid #ffffff',
                                        backgroundColor: '#d1d5db',
                                    }}
                                >
                                    {/* Use <img> with crossOrigin to prevent PDF export crashes */}
                                    <img
                                        src="/images/users/user-1.png"
                                        alt="Profile"
                                        crossOrigin="anonymous"
                                        className="object-cover"
                                        style={{
                                            width: '128px',
                                            height: '128px',
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 2. Text Column */}
                        <div className="flex-1 pt-4">
                            {/* Title with underline */}
                            <div className="mb-4 flex items-center gap-4">
                                <h2
                                    className="text-sm font-bold whitespace-nowrap uppercase"
                                    style={{ color: '#1a1a1a' }}
                                >
                                    About Me
                                </h2>
                                {/* Hardcoded Hex for the line */}
                                <div
                                    style={{
                                        height: '1px',
                                        backgroundColor: '#d1d5db',
                                        width: '100%',
                                    }}
                                ></div>
                            </div>

                            {/* Quote Content */}
                            <div className="flex gap-2">
                                {/* Quote Icon - Serif font for the visual style */}
                                <span
                                    className="font-serif text-3xl leading-none"
                                    style={{ color: '#1a1a1a', marginTop: '-4px' }}
                                >
                                    “
                                </span>

                                <p
                                    className="text-justify text-[10px] leading-relaxed"
                                    style={{ color: '#4b5563' }}
                                >
                                    Lorem ipsum dolor sit amet, consecte adipiscing elit. Vivamus
                                    vulputate libero justo vivamus dolor vulputate of our libero
                                    justo. sit use elit consecteture. sit amet Lorem sit elits
                                    consecteture. Lorem ipsum dolor sit usr amet ipsum dolor sit
                                    adipiscing amet elit amet use elit. Vivamus vulputate dolor
                                    vulputate our libero justo. sits user elit consec tetur. sits
                                    amet Lorem ipsum lorem ipsum dolor sit amet.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* MAIN CONTENT GRID */}
                    <section
                        className="mt-8 flex w-full flex-1 px-12 pb-12"
                        style={{ backgroundColor: '#ffffff' }}
                    >
                        {/* LEFT COLUMN: Education, Skills, Language */}
                        <div className="w-1/3 pr-8">
                            {/* EDUCATION */}
                            <div className="mb-10">
                                <h2
                                    className="mb-1 text-sm font-bold tracking-[0.2em] uppercase"
                                    style={{ color: '#1a1a1a' }}
                                >
                                    Education
                                </h2>
                                <div
                                    className="mb-4 h-[1px] w-full"
                                    style={{ backgroundColor: '#d1d5db' }}
                                ></div>

                                {[1, 2, 3].map((_, i) => (
                                    <div key={i} className="mb-4">
                                        <h3
                                            className="text-[10px] font-bold uppercase"
                                            style={{ color: '#1a1a1a' }}
                                        >
                                            Your Major Degree
                                        </h3>
                                        <p className="text-[9px]" style={{ color: '#4b5563' }}>
                                            Name of University | Location
                                        </p>
                                        <p
                                            className="text-[8px] font-medium"
                                            style={{ color: '#9ca3af' }}
                                        >
                                            2008 - 2010
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* SKILLS */}
                            <div className="mb-10">
                                <h2
                                    className="mb-1 text-sm font-bold tracking-[0.2em] uppercase"
                                    style={{ color: '#1a1a1a' }}
                                >
                                    Skills
                                </h2>
                                <div
                                    className="mb-4 h-[1px] w-full"
                                    style={{ backgroundColor: '#d1d5db' }}
                                ></div>

                                {[
                                    { name: 'Photoshop', level: '85%' },
                                    { name: 'Illustrator', level: '70%' },
                                    { name: 'Indesign', level: '90%' },
                                    { name: 'Powerpoint', level: '60%' },
                                    { name: 'Ms Word', level: '95%' },
                                    { name: 'After Effects', level: '50%' },
                                ].map((skill, i) => (
                                    <div key={i} className="mb-2">
                                        <div className="mb-1 flex items-center justify-between">
                                            <span
                                                className="text-[9px]"
                                                style={{ color: '#4b5563' }}
                                            >
                                                {skill.name}
                                            </span>
                                        </div>
                                        {/* Progress Bar Container */}
                                        <div
                                            className="h-[6px] w-full"
                                            style={{ backgroundColor: '#e5e7eb' }}
                                        >
                                            <div
                                                className="h-full"
                                                style={{
                                                    width: skill.level,
                                                    backgroundColor: '#374151',
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* LANGUAGE */}
                            <div>
                                <h2
                                    className="mb-1 text-sm font-bold tracking-[0.2em] uppercase"
                                    style={{ color: '#1a1a1a' }}
                                >
                                    Language
                                </h2>
                                <div
                                    className="mb-4 h-[1px] w-full"
                                    style={{ backgroundColor: '#d1d5db' }}
                                ></div>
                                <ul className="space-y-1">
                                    <li
                                        className="flex items-center gap-2 text-[9px]"
                                        style={{ color: '#4b5563' }}
                                    >
                                        <span
                                            className="h-1 w-1 rounded-full"
                                            style={{ backgroundColor: '#1a1a1a' }}
                                        ></span>{' '}
                                        English (International)
                                    </li>
                                    <li
                                        className="flex items-center gap-2 text-[9px]"
                                        style={{ color: '#4b5563' }}
                                    >
                                        <span
                                            className="h-1 w-1 rounded-full"
                                            style={{ backgroundColor: '#1a1a1a' }}
                                        ></span>{' '}
                                        Spanish (Mother Language)
                                    </li>
                                    <li
                                        className="flex items-center gap-2 text-[9px]"
                                        style={{ color: '#4b5563' }}
                                    >
                                        <span
                                            className="h-1 w-1 rounded-full"
                                            style={{ backgroundColor: '#1a1a1a' }}
                                        ></span>{' '}
                                        France (Regulation)
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Experience */}
                        <div className="flex-1 border-l pl-8" style={{ borderColor: '#d1d5db' }}>
                            <h2
                                className="mb-1 text-sm font-bold tracking-[0.2em] uppercase"
                                style={{ color: '#1a1a1a' }}
                            >
                                Experience
                            </h2>
                            <div
                                className="mb-6 h-[1px] w-full"
                                style={{ backgroundColor: '#d1d5db' }}
                            ></div>

                            {[
                                { title: 'Senior Graphic Designer', date: 'From 2017 Present' },
                                { title: 'Web Designer & Developer', date: 'From 2018 - 2019' },
                                { title: 'Senior UI/UX Designer', date: 'From 2020 - 2021' },
                            ].map((job, i) => (
                                <div key={i} className="relative mb-8 pl-4">
                                    {/* Timeline Dot */}
                                    <div
                                        className="absolute top-1 -left-[38.5px] h-3 w-3 rounded-full border-2 border-white"
                                        style={{ backgroundColor: '#1a1a1a' }}
                                    ></div>

                                    <h3
                                        className="text-[11px] font-bold uppercase"
                                        style={{ color: '#1a1a1a' }}
                                    >
                                        {job.title}
                                    </h3>
                                    <p
                                        className="mb-2 text-[9px] font-medium"
                                        style={{ color: '#4b5563' }}
                                    >
                                        Company Name | Location | {job.date}
                                    </p>

                                    <p
                                        className="mb-3 text-justify text-[9px] leading-relaxed"
                                        style={{ color: '#6b7280' }}
                                    >
                                        Lorem ipsum dolor sit amet. Consecte adipiscing elits.
                                        Vivamus vulputate libero justo amet use elit. Vivamus
                                        vulputate dolor vulputate our libero justo. sits user elit
                                        consec tetur. sits amet Lorem ipsum lorem ipsum dolor sit
                                        amet.
                                    </p>

                                    <ul className="space-y-1">
                                        {[1, 2, 3, 4].map((_, j) => (
                                            <li
                                                key={j}
                                                className="flex items-start gap-2 text-[8.5px]"
                                                style={{ color: '#6b7280' }}
                                            >
                                                <span
                                                    className="mt-1 h-1 w-1 shrink-0 rounded-full"
                                                    style={{ backgroundColor: '#9ca3af' }}
                                                ></span>
                                                sit use elits consecteture sit amet. Lorem ipsum
                                                dolor sit amet ipsum dolor sit
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default MyResume
