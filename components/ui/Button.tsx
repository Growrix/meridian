'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onDragEnter' | 'onDragLeave' | 'onDragOver'> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'px-5 py-2 text-xs',
  md: 'px-8 py-3 text-xs',
  lg: 'px-10 py-4 text-sm',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    const shouldReduce = useReducedMotion()

    const base =
      'inline-flex items-center justify-center font-body font-medium tracking-widest uppercase transition-colors duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'

    const variantClass =
      variant === 'primary'
        ? 'bg-primary text-dark-bg hover:bg-primary-dark'
        : 'border border-current hover:bg-white hover:text-dark-bg'

    return (
      <motion.button
        ref={ref}
        whileHover={shouldReduce ? {} : { scale: 1.02 }}
        whileTap={shouldReduce ? {} : { scale: 0.98 }}
        transition={{ duration: 0.15 }}
        className={`${base} ${variantClass} ${sizeClasses[size]} ${className}`}
        {...(props as Record<string, unknown>)}
      >
        {children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
export default Button
