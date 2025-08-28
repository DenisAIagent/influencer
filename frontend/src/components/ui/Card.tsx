import React, { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const cardVariants = cva(
  [
    'rounded-xl border transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-white/80 border-slate-200/50 shadow-lg shadow-slate-900/5 backdrop-blur-sm',
          'dark:bg-slate-800/80 dark:border-slate-700/50 dark:shadow-slate-900/20'
        ],
        glass: [
          'bg-white/10 border-white/20 shadow-xl shadow-black/10 backdrop-blur-md',
          'dark:bg-slate-800/10 dark:border-slate-700/20 dark:shadow-black/20'
        ],
        elevated: [
          'bg-white border-slate-200 shadow-xl shadow-slate-900/10',
          'dark:bg-slate-800 dark:border-slate-700 dark:shadow-slate-900/25'
        ],
        outline: [
          'bg-transparent border-2 border-slate-200 shadow-sm',
          'dark:border-slate-700'
        ],
        gradient: [
          'bg-gradient-to-br from-white/90 to-slate-50/90 border-slate-200/50',
          'shadow-xl shadow-slate-900/5 backdrop-blur-sm',
          'dark:from-slate-800/90 dark:to-slate-900/90 dark:border-slate-700/50'
        ]
      },
      size: {
        sm: 'p-4',
        default: 'p-6',
        lg: 'p-8',
        xl: 'p-10'
      },
      hover: {
        none: '',
        lift: 'hover:shadow-2xl hover:-translate-y-1',
        glow: 'hover:shadow-2xl hover:shadow-indigo-500/20 dark:hover:shadow-indigo-400/20',
        scale: 'hover:scale-[1.02]'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      hover: 'none'
    }
  }
);

// Animation variants
const cardAnimations = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  },
  hover: {
    y: -4,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
};

export interface CardProps
  extends Omit<HTMLMotionProps<'div'>, 'size'>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
  interactive?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, hover, interactive = false, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(cardVariants({ variant, size, hover, className }))}
        variants={cardAnimations}
        initial="hidden"
        animate="visible"
        whileHover={interactive ? "hover" : undefined}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

// Card composites
const CardHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 pb-4", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight text-slate-900 dark:text-slate-100", 
      className
    )}
    {...props}
  >
    {children}
  </h3>
));
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-slate-600 dark:text-slate-400", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// Special Cards
const StatsCard = forwardRef<HTMLDivElement, CardProps & {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
}>(({ title, value, change, changeLabel, icon, className, ...props }, ref) => {
  const isPositive = change !== undefined && change >= 0;
  
  return (
    <Card
      ref={ref}
      variant="gradient"
      hover="glow"
      interactive
      className={cn("group relative overflow-hidden", className)}
      {...props}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardContent className="relative">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {title}
            </p>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {value}
            </p>
            {change !== undefined && (
              <div className="flex items-center mt-1">
                <span className={cn(
                  "text-xs font-medium",
                  isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                )}>
                  {isPositive ? '+' : ''}{change}%
                </span>
                {changeLabel && (
                  <span className="text-xs text-slate-500 ml-1">
                    {changeLabel}
                  </span>
                )}
              </div>
            )}
          </div>
          {icon && (
            <div className="text-indigo-500 dark:text-indigo-400 opacity-80">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
});
StatsCard.displayName = "StatsCard";

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  StatsCard,
  cardVariants 
};