import React from 'react'
import { Globe, Mail, MapPin, Phone } from 'lucide-react'

const ResumeHeader = () => {
    return (
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
                    <div className="absolute top-0 right-15 z-0 h-full w-8 bg-[#f1c40f]"></div>

                    <div className="relative z-10 space-y-3">
                        {[
                            { text: 'Address Name, Australia', Icon: MapPin },
                            { text: '+457 123 4567 8912', Icon: Phone },
                            { text: 'namehere@gmail.com', Icon: Mail },
                            { text: 'www.domainname.com', Icon: Globe },
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center justify-end gap-3">
                                <span className="text-[12px] text-[#1a1a1a]">{item.text}</span>
                                <div className="relative top-1 p-1">
                                    <item.Icon size={14} className="text-[#1a1a1a]" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ResumeHeader
