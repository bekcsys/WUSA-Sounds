'use client'

import React from 'react'

/**
 * Font Level System for SCANDIA Branded Font
 * 
 * Usage:
 * <Font level={1} weight="bold">Text</Font>
 * <Font level={5} weight="light">Text</Font>
 */

export type FontLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
export type FontWeight = 'light' | 'normal' | 'medium' | 'bold'

interface FontProps {
  level: FontLevel
  weight?: FontWeight
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  as?: keyof JSX.IntrinsicElements
}

/**
 * Font Component - Provides standardized SCANDIA font styling
 */
export const Font: React.FC<FontProps> = ({
  level,
  weight = 'normal',
  children,
  className = '',
  style = {},
  as: Component = 'span',
}) => {
  const baseClass = `font-L-${level}`
  const weightClass = `font-${weight}`
  const combinedClass = `${baseClass} ${weightClass} font-scandia ${className}`.trim()

  return (
    <Component className={combinedClass} style={style}>
      {children}
    </Component>
  )
}

/**
 * Font Level Helper Functions
 * Returns className strings for direct use
 */
export const getFontClass = (level: FontLevel, weight: FontWeight = 'normal'): string => {
  return `font-L-${level} font-${weight} font-scandia`
}

export const getFontStyle = (level: FontLevel, weight: FontWeight = 'normal'): React.CSSProperties => {
  const fontSizes: Record<FontLevel, { min: string; mid: string; max: string }> = {
    1: { min: '10px', mid: '1.2vw', max: '12px' },
    2: { min: '12px', mid: '1.5vw', max: '14px' },
    3: { min: '14px', mid: '1.8vw', max: '16px' },
    4: { min: '16px', mid: '2vw', max: '18px' },
    5: { min: '18px', mid: '2.5vw', max: '22px' },
    6: { min: '20px', mid: '3vw', max: '24px' },
    7: { min: '24px', mid: '3.5vw', max: '28px' },
    8: { min: '28px', mid: '4vw', max: '32px' },
    9: { min: '32px', mid: '5vw', max: '40px' },
    10: { min: '40px', mid: '6vw', max: '48px' },
  }

  const fontWeights: Record<FontWeight, number> = {
    light: 300,
    normal: 400,
    medium: 500,
    bold: 700,
  }

  const lineHeights: Record<FontLevel, number> = {
    1: 1.4,
    2: 1.4,
    3: 1.4,
    4: 1.4,
    5: 1.4,
    6: 1.3,
    7: 1.3,
    8: 1.2,
    9: 1.2,
    10: 1.1,
  }

  const size = fontSizes[level]

  return {
    fontFamily: 'var(--font-primary)',
    fontSize: `clamp(${size.min}, ${size.mid}, ${size.max})`,
    fontWeight: fontWeights[weight],
    lineHeight: lineHeights[level],
  }
}

/**
 * Pre-configured Font Components for common use cases
 */
export const FontL1: React.FC<Omit<FontProps, 'level'>> = (props) => (
  <Font {...props} level={1} />
)

export const FontL2: React.FC<Omit<FontProps, 'level'>> = (props) => (
  <Font {...props} level={2} />
)

export const FontL3: React.FC<Omit<FontProps, 'level'>> = (props) => (
  <Font {...props} level={3} />
)

export const FontL4: React.FC<Omit<FontProps, 'level'>> = (props) => (
  <Font {...props} level={4} />
)

export const FontL5: React.FC<Omit<FontProps, 'level'>> = (props) => (
  <Font {...props} level={5} />
)

export const FontL6: React.FC<Omit<FontProps, 'level'>> = (props) => (
  <Font {...props} level={6} />
)

export const FontL7: React.FC<Omit<FontProps, 'level'>> = (props) => (
  <Font {...props} level={7} />
)

export const FontL8: React.FC<Omit<FontProps, 'level'>> = (props) => (
  <Font {...props} level={8} />
)

export const FontL9: React.FC<Omit<FontProps, 'level'>> = (props) => (
  <Font {...props} level={9} />
)

export const FontL10: React.FC<Omit<FontProps, 'level'>> = (props) => (
  <Font {...props} level={10} />
)

export default Font
