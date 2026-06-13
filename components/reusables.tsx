

export const GrayTitle = ({children}: Readonly<{children: React.ReactNode}>) => {
    return <span className="text-white/40">{children}</span>
}

export const BlueTitle = ({children, className} : Readonly<{children: React.ReactNode, className?: string}>) => {
    return <span className={`bg-linear-to-br font-serif from-blue-300 via-blue-400 to-blue-600 bg-clip-text text-transparent ${className}`}>{children}</span>
}


export const SectionLabel = ({children}: Readonly<{children: React.ReactNode}>) => {
    return <p className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 tracking-[0.14em] uppercase mb-4">
        <span className="w-4 h-px bg-blue-400"></span>
        {children}
        <span className="w-4 h-px bg-blue-400"></span>
        </p>
}

export const sectionHeading = ({gray, blue}: Readonly<{gray: string, blue: string}>) => {
    return <h2 className="font-serif text-[clamp(2rem, 2vw, 3rem)] leading-[1.1] tracking-tight">
        <GrayTitle>{gray}</GrayTitle><br />
        <BlueTitle>{blue}</BlueTitle>
    </h2>
}