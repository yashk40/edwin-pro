import React from 'react';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, className = "" }) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={delay}
      data-aos-duration="700"
      className={className}
    >
      {children}
    </div>
  );
};

export default FadeIn;