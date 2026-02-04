import { ButtonHTMLAttributes, forwardRef } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/utils/cn'
import { motion, HTMLMotionProps } from 'framer-motion'

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-organic text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-biovitam-primary text-white hover:bg-biovitam-dark shadow-md hover:shadow-lg",
        primary: "bg-biovitam-primary text-white hover:bg-biovitam-dark shadow-md hover:shadow-lg",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline: "border-2 border-biovitam-primary text-biovitam-primary background-transparent hover:bg-biovitam-primary hover:text-white",
        secondary: "bg-biovitam-secondary text-white hover:bg-biovitam-primary hover:shadow-md",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-11 py-2 px-6",
        sm: "h-9 px-4 rounded-organic-sm",
        md: "h-11 px-8",
        lg: "h-14 px-10 text-lg rounded-organic-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

type MotionButtonProps = ButtonProps & HTMLMotionProps<"button">

const Button = forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        {...(props as any)} // eslint-disable-line @typescript-eslint/no-explicit-any
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
