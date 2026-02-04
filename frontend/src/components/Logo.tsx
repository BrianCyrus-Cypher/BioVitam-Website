import React from 'react';
import logoImg from '../assets/biovitam-logo.png';

interface LogoProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'light' | 'dark';
}

const BiovitamLogo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
    // Size configurations for responsive logo display
    const sizeClasses = {
        sm: 'h-12 w-auto',
        md: 'h-16 w-auto',
        lg: 'h-24 w-auto',
        xl: 'h-32 w-auto',
    };

    return (
        <img
            src={logoImg}
            alt="BioVitam Organic Biofertilizers"
            className={`${sizeClasses[size]} object-contain rounded-xl drop-shadow-sm ${className}`}
        />
    );
};

export default BiovitamLogo;
