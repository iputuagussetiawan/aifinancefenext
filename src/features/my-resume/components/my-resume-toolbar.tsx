import { Download, ExternalLink, FileDown, Loader2, Monitor } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

type MyResumeToolbarProps = {
    onPreview: () => void
    onDownload: () => void
    isPreviewing: boolean
    isLoading: boolean
}

export default function MyResumeToolbar({
    onPreview,
    onDownload,
    isPreviewing,
    isLoading,
}: MyResumeToolbarProps) {
    return (
        <div className="sticky bottom-4 z-50 mb-8 flex w-fit items-center gap-1 rounded-2xl bg-[#222222] p-2 text-white shadow-2xl">
            {/* Logo Section */}
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1a1a1a] text-xl font-bold">
                AG<span className="mb-2 self-end text-sm">.</span>
            </div>

            {/* Navigation Group */}
            <ToggleGroup
                type="single"
                defaultValue="creator"
                className="gap-1 rounded-xl bg-[#2a2a2a] px-1 py-1"
            >
                <ToggleGroupItem
                    value="creator"
                    className="rounded-lg border border-transparent px-4 py-2 text-xs font-medium hover:bg-transparent data-[state=on]:border-amber-200/50 data-[state=on]:text-amber-200"
                >
                    Total Page
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="font"
                    className="rounded-lg border border-transparent px-4 py-2 text-xs font-medium text-gray-400 hover:text-white"
                >
                    Page 1 of 2
                </ToggleGroupItem>
            </ToggleGroup>

            {/* CTA Button */}
            <div className="flex gap-2">
                {/* Preview Button */}
                <Button
                    onClick={onPreview}
                    className="ml-1 h-12 rounded-xl bg-[#FFF38A] px-6 font-bold text-black hover:cursor-pointer hover:bg-[#ffe945]"
                >
                    {isPreviewing ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Wait...
                        </>
                    ) : (
                        <>
                            <Monitor className="h-4 w-4" />
                            Preview
                        </>
                    )}
                </Button>

                {/* Download Button */}
                <Button
                    onClick={onDownload}
                    disabled={isLoading}
                    className="ml-1 h-12 rounded-xl bg-[#FFF38A] px-6 font-bold text-black hover:cursor-pointer hover:bg-[#ffe945]"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <FileDown className="h-4 w-4" />
                            Download
                        </>
                    )}
                </Button>
            </div>
        </div>
    )
}
