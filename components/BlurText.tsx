
import React from 'react';

interface BlurTextProps {
    text: string;
    className?: string;
    delay?: number;
}

const BlurText: React.FC<BlurTextProps> = ({ text, className = '', delay = 0 }) => {
    return (
        <div
            className={`${className} inline-block animate-blur-in`}
            style={{
                animationDelay: `${delay}ms`,
                opacity: 0,
                animationFillMode: 'forwards'
            }}
        >
            {text}
            <style>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-blur-in {
                    animation: fade-in 0.8s ease-out;
                }
            `}</style>
        </div>
    );
};

export default BlurText;
