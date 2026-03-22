import React from 'react'

const ResumeAbout = () => {
    return (
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
                <div className="relative z-10" style={{ marginTop: '24px', marginLeft: '55px' }}>
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
                                objectFit: 'cover',
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
                        Lorem ipsum dolor sit amet, consecte adipiscing elit. Vivamus vulputate
                        libero justo vivamus dolor vulputate of our libero justo. sit use elit
                        consecteture. sit amet Lorem sit elits consecteture. Lorem ipsum dolor sit
                        usr amet ipsum dolor sit adipiscing amet elit amet use elit. Vivamus
                        vulputate dolor vulputate our libero justo. sits user elit consec tetur.
                        sits amet Lorem ipsum lorem ipsum dolor sit amet.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default ResumeAbout
