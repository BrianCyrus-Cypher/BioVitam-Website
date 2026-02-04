import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    label: string;
    error?: string;
    multiline?: boolean;
    theme?: 'light' | 'dark';
}

const FloatingLabelInput = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, FloatingLabelInputProps>(
    ({ label, error, className, multiline = false, value, theme = 'light', ...props }, ref) => {
        const [isFocused, setIsFocused] = useState(false);
        const hasValue = value && value.toString().length > 0;

        // Theme configuration
        const themeStyles = {
            light: {
                wrapper: isFocused
                    ? "bg-white border-biovitam-primary ring-2 ring-biovitam-primary/20 shadow-lg"
                    : "bg-white/30 border-white/40 hover:bg-white/50 hover:border-white/60",
                text: "text-biovitam-dark",
                label: "text-gray-500",
                labelFloating: "bg-white text-biovitam-primary",
                labelRest: "text-gray-500"
            },
            dark: {
                wrapper: isFocused
                    ? "bg-white/20 border-white ring-2 ring-white/20 shadow-lg backdrop-blur-md"
                    : "bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30 backdrop-blur-sm",
                text: "text-white",
                label: "text-white/70",
                labelFloating: "bg-white text-biovitam-primary", // Keep pill white for contrast or make it dark? White stand out nicely on glass.
                labelRest: "text-white/70"
            }
        };

        const currentTheme = themeStyles[theme];

        const wrapperClass = cn(
            "relative rounded-organic transition-all duration-300 border",
            currentTheme.wrapper,
            error ? "border-red-500 animate-shake" : "",
            className
        );

        const labelClass = cn(
            "absolute left-4 transition-all duration-300 pointer-events-none",
            isFocused || hasValue
                ? `-top-2.5 text-xs px-2 rounded-full font-bold shadow-sm ${currentTheme.labelFloating}`
                : `top-3.5 text-base ${currentTheme.labelRest}`
        );

        const InputComponent = multiline ? 'textarea' : 'input';

        return (
            <div className="mb-6 relative">
                <div className={wrapperClass}>
                    <InputComponent
                        ref={ref as any} // eslint-disable-line @typescript-eslint/no-explicit-any
                        className={cn(
                            "w-full bg-transparent border-none p-4 placeholder-transparent focus:outline-none focus:ring-0",
                            currentTheme.text,
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
                        placeholder={label}
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
                        className="text-red-400 text-xs mt-1 ml-2 font-bold shadow-black/50 drop-shadow-sm"
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
