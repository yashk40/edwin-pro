import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, SpringOptions } from 'motion/react';

const springValues: SpringOptions = {
    damping: 30,
    stiffness: 100,
    mass: 2
};

interface TiltedCardProps {
    imageSrc: string;
    altText?: string;
    captionText?: string;
    containerHeight?: string;
    containerWidth?: string;
    imageHeight?: string;
    imageWidth?: string;
    scaleOnHover?: number;
    rotateAmplitude?: number;
    showMobileWarning?: boolean;
    showTooltip?: boolean;
    overlayContent?: React.ReactNode;
    displayOverlayContent?: boolean;
    className?: string; // Added for flexibility
}

export default function TiltedCard({
    imageSrc,
    altText = 'Tilted card image',
    captionText = '',
    containerHeight = '100%',
    containerWidth = '100%',
    imageHeight = '300px',
    imageWidth = '100%',
    scaleOnHover = 1.05,
    rotateAmplitude = 12,
    showMobileWarning = false,
    showTooltip = true,
    overlayContent = null,
    displayOverlayContent = false,
    className = ''
}: TiltedCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useMotionValue(0), springValues);
    const rotateY = useSpring(useMotionValue(0), springValues);
    const scale = useSpring(1, springValues);
    const opacity = useSpring(0);
    const rotateFigcaption = useSpring(0, {
        stiffness: 350,
        damping: 30,
        mass: 1
    });

    const [lastY, setLastY] = useState(0);

    function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left - rect.width / 2;
        const offsetY = e.clientY - rect.top - rect.height / 2;

        const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
        const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

        rotateX.set(rotationX);
        rotateY.set(rotationY);

        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);

        const velocityY = offsetY - lastY;
        rotateFigcaption.set(-velocityY * 0.6);
        setLastY(offsetY);
    }

    function handleMouseEnter() {
        scale.set(scaleOnHover);
        opacity.set(1);
    }

    function handleMouseLeave() {
        opacity.set(0);
        scale.set(1);
        rotateX.set(0);
        rotateY.set(0);
        rotateFigcaption.set(0);
    }

    return (
        <div
            ref={ref}
            className={`relative w-full h-full [perspective:1000px] flex flex-col items-center cursor-pointer ${className}`}
            style={{
                height: containerHeight,
                width: containerWidth
            }}
            onMouseMove={handleMouse}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {showMobileWarning && (
                <div className="absolute top-4 text-center text-sm block sm:hidden z-30">
                    This effect is not optimized for mobile. Check on desktop.
                </div>
            )}

            <motion.div
                className="relative [transform-style:preserve-3d] w-full h-full bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
                style={{
                    rotateX,
                    rotateY,
                    scale
                }}
            >
                <motion.img
                    src={imageSrc}
                    alt={altText}
                    className="absolute top-0 left-0 object-cover w-full will-change-transform [transform:translateZ(0)]"
                    style={{
                        height: imageHeight
                    }}
                />

                {displayOverlayContent && overlayContent && (
                    <motion.div className="relative z-[2] w-full h-full will-change-transform [transform:translateZ(30px)] pointer-events-none">
                        {overlayContent}
                    </motion.div>
                )}
            </motion.div>

            {showTooltip && (
                <motion.div
                    className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-white/90 backdrop-blur shadow-sm px-[10px] py-[4px] text-[10px] font-bold text-slate-800 opacity-0 z-[10] hidden sm:block border border-slate-200"
                    style={{
                        x,
                        y,
                        opacity,
                        rotate: rotateFigcaption
                    }}
                >
                    {captionText}
                </motion.div>
            )}
        </div>
    );
}
