import React from 'react'
import { useAuthContext } from '@/providers/auth-provider'
import { Globe, Mail, MapPin, Phone } from 'lucide-react'

const ResumeHeader = () => {
    const { user } = useAuthContext()
    return (
        <section className="relative">
            <div className="absolute top-0 right-0 left-0 h-7 w-full bg-[#2E2C2F]"></div>
            <div className="flex">
                {/* Name Area */}
                <div className="flex flex-1 flex-col justify-end bg-white p-12 pb-0">
                    <h1 className="text-5xl leading-tight font-black tracking-widest text-[#1a1a1a] uppercase">
                        <span className="block">{user?.firstName}</span>
                        <span className="block">{user?.lastName}</span>
                    </h1>
                    <p className="mt-3 text-sm font-semibold tracking-[0.3em] text-[#4a4a4a] uppercase">
                        {user?.jobTitle}
                    </p>
                </div>

                {/* Gray Contact Block */}
                <div className="relative flex w-[320px] flex-col justify-center pt-8 pr-16 pl-6 text-white">
                    {/* The Yellow Stripe */}
                    <div className="absolute top-0 right-15 z-0 h-full w-8 bg-[#f1c40f]"></div>

                    <div className="relative z-10 space-y-3">
                        {[
                            { text: user?.address, Icon: MapPin },
                            { text: user?.phoneNumber, Icon: Phone },
                            { text: user?.email, Icon: Mail },
                            { text: user?.website, Icon: Globe },
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
