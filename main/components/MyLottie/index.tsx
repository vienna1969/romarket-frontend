import React, { useEffect, useRef } from 'react'

export default function MyLottiePlayer({ src, width, height }: { src: string, width: number, height: number }) {
    const ref = useRef(null);
    useEffect(() => {
        import("@lottiefiles/lottie-player");
    });
    return (
        <>
            <lottie-player
                id="firstLottie"
                ref={ref}
                autoplay
                loop
                mode="normal"
                src={src}
                style={{ width: `${width}px`, height: `${height}px` }}
            ></lottie-player>
        </>
    )
}
