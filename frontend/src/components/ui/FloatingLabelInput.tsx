import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    label: string;
    error?: string;
    multiline?: boolean;
}

const FloatingLabelInput = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, FloatingLabelInputProps>(
    ({ label, error, className, multiline = false, value, ...props }, ref) => {
        const [isFocused, setIsFocused] = useState(false);
        const hasValue = value && value.toString().length > 0;

        const wrapperClass = cn(
            "relative rounded-organic transition-all duration-300 border",
            isFocused
                ? "bg-white border-biovitam-primary ring-2 ring-biovitam-primary/20 shadow-lg"
                : "bg-white/30 border-white/40 hover:bg-white/50 hover:border-white/60",
            error ? "border-red-500 animate-shake" : "",
            className
        );

        const labelClass = cn(
            "absolute left-4 transition-all duration-300 pointer-events-none text-gray-500",
            isFocused || hasValue ? "-top-2.5 text-xs bg-white px-2 rounded-full text-biovitam-primary font-bold shadow-sm" : "top-3.5 text-base"
        );

        const InputComponent = multiline ? 'textarea' : 'input';

        return (
            <div className="mb-6 relative">
                <div className={wrapperClass}>
                    <InputComponent
                        ref={ref as any}
                        className={cn(
                            "w-full bg-transparent border-none p-4 text-biovitam-dark placeholder-transparent focus:outline-none focus:ring-0",
                            multiline ? "min-h-[120px] resize-y" : ""
                        )}
                        onFocus={(e) => {
                            setIsFocused(true);
                            props.onFocus?.(e);
                        }}
                        onBlur={(e) => {
                            setIsFocused(false);
                            props.onBlur?.(e);
                        }}
                        value={value}
                        placeholder={label} // Needed for floating label trick? No, we use state. But helpful for accessibility.
                        {...props}
                    />
                    <label className={labelClass}>
                        {label}
                    </label>
                </div>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-xs mt-1 ml-2 font-bold"
                    >
                        {error}
                    </motion.p>
                )}
            </div>
        );
    }
);

FloatingLabelInput.displayName = 'FloatingLabelInput';

export default FloatingLabelInput;
