
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface BlurTextProps {
    text: string;
    className?: string;
    delay?: number;
    wordMode?: boolean;
}

const BlurText: React.FC<BlurTextProps> = ({ text, className = '', delay = 0, wordMode = false }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const elementsRef = useRef<(HTMLSpanElement | null)[]>([]);

    useGSAP(() => {
        gsap.fromTo(
            elementsRef.current.filter(Boolean),
            {
                opacity: 0,
                filter: 'blur(10px)',
                y: 20,
                scale: 0.9,
            },
            {
                opacity: 1,
                filter: 'blur(0px)',
                y: 0,
                scale: 1,
                duration: 2,
                stagger: wordMode ? 0.1 : 0.03,
                delay: delay,
                ease: 'power2.out',
            }
        );
    }, { scope: containerRef });

    const items = wordMode ? text.split(' ') : text.split('');

    return (
        <div ref={containerRef} className={`${className} inline-block`}>
            {items.map((item, index) => (
                <span
                    key={index}
                    ref={(el) => { elementsRef.current[index] = el; }}
                    className="inline-block"
                    style={{
                        display: 'inline-block',
                        marginRight: wordMode ? '0.25em' : item === ' ' ? '0.25em' : '0'
                    }}
                >
                    {wordMode ? item : (item === ' ' ? '\u00A0' : item)}
                </span>
            ))}
        </div>
    );
};

export default BlurText;
