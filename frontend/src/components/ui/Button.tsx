import React, { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold',
    'ring-offset-background transition-all duration-200 focus-visible:outline-none',
    'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'select-none relative overflow-hidden'
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/25',
          'hover:from-indigo-700 hover:to-indigo-600 hover:shadow-xl hover:shadow-indigo-500/30',
          'active:from-indigo-800 active:to-indigo-700',
          'dark:from-indigo-500 dark:to-indigo-400 dark:shadow-indigo-400/25',
          'dark:hover:from-indigo-600 dark:hover:to-indigo-500'
        ],
        destructive: [
          'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/25',
          'hover:from-red-700 hover:to-red-600 hover:shadow-xl hover:shadow-red-500/30',
          'active:from-red-800 active:to-red-700'
        ],
        outline: [
          'border-2 border-slate-200 bg-white/50 text-slate-900 backdrop-blur-sm',
          'hover:bg-white/80 hover:border-slate-300',
          'dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-100',
          'dark:hover:bg-slate-800/80 dark:hover:border-slate-600'
        ],
        secondary: [
          'bg-slate-100 text-slate-900 shadow-sm',
          'hover:bg-slate-200 hover:shadow-md',
          'dark:bg-slate-800 dark:text-slate-100',
          'dark:hover:bg-slate-700'
        ],
        ghost: [
          'text-slate-700 hover:bg-slate-100 hover:text-slate-900',
          'dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100'
        ],
        link: 'text-indigo-600 underline-offset-4 hover:underline dark:text-indigo-400',
        premium: [
          'bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600',
          'text-white shadow-lg shadow-violet-500/30',
          'hover:from-violet-700 hover:via-purple-700 hover:to-indigo-700',
          'hover:shadow-xl hover:shadow-violet-500/40',
          'relative overflow-hidden'
        ]
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        default: 'h-10 px-4 py-2',
        lg: 'h-12 px-8 text-base',
        xl: 'h-14 px-10 text-lg',
        icon: 'h-10 w-10 p-0'
      },
      rounded: {
        default: 'rounded-lg',
        full: 'rounded-full',
        none: 'rounded-none'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'default'
    }
  }
);

// Animation variants
const buttonAnimations = {
  tap: { scale: 0.98 },
  hover: { scale: 1.02 },
  initial: { scale: 1 }
};

const premiumShimmer = {
  initial: { x: '-100%' },
  animate: { 
    x: '100%',
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatDelay: 3,
      ease: 'linear'
    }
  }
};

export interface ButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'size'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    rounded, 
    asChild = false, 
    loading = false,
    leftIcon,
    rightIcon,
    children, 
    disabled,
    ...props 
  }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        disabled={disabled || loading}
        variants={buttonAnimations}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        {...props}
      >
        {/* Premium shimmer effect */}
        {variant === 'premium' && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{ width: '50%' }}
            variants={premiumShimmer}
            initial="initial"
            animate="animate"
          />
        )}

        {/* Loading spinner */}
        {loading && (
          <motion.div
            className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}

        {/* Left icon */}
        {leftIcon && !loading && (
          <span className="mr-2 flex items-center">{leftIcon}</span>
        )}

        {/* Button content */}
        <span className={loading ? 'opacity-70' : ''}>{children}</span>

        {/* Right icon */}
        {rightIcon && (
          <span className="ml-2 flex items-center">{rightIcon}</span>
        )}

        {/* Ripple effect for touch feedback */}
        <motion.div
          className="absolute inset-0 rounded-lg bg-white/10"
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{ pointerEvents: 'none' }}
        />
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };