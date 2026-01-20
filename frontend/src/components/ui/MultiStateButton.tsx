import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Check } from 'lucide-react';
import { Button } from './Button';
import { ComponentProps } from 'react';

type ButtonState = 'idle' | 'loading' | 'success';

interface MultiStateButtonProps extends ComponentProps<typeof Button> {
    buttonState: ButtonState;
    idleText?: string;
    loadingText?: string;
    successText?: string;
}

const MultiStateButton = ({
    buttonState,
    onClick,
    idleText = "Send Message",
    loadingText = "Sending...",
    successText = "Message Sent!",
    className,
    ...props
}: MultiStateButtonProps) => {
    return (
        <Button
            onClick={onClick}
            disabled={buttonState !== 'idle'}
            className={`relative overflow-hidden transition-all duration-300 w-full md:w-auto min-w-[160px] ${buttonState === 'success' ? 'bg-green-600 hover:bg-green-700' : ''
                } ${className}`}
            {...props}
        >
            <AnimatePresence mode="wait">
                {buttonState === 'idle' && (
                    <motion.span
                        key="idle"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                    >
                        {idleText}
                    </motion.span>
                )}
                {buttonState === 'loading' && (
                    <motion.span
                        key="loading"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                    >
                        <Loader2 className="animate-spin w-4 h-4" />
                        {loadingText}
                    </motion.span>
                )}
                {buttonState === 'success' && (
                    <motion.span
                        key="success"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="flex items-center gap-2 font-bold"
                    >
                        <Check className="w-5 h-5" />
                        {successText}
                    </motion.span>
                )}
            </AnimatePresence>
        </Button>
    );
};

export default MultiStateButton;
