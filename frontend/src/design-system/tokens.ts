export const designTokens = {
  // Color System 2025-2026
  colors: {
    // Primary: Violet moderne
    primary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0', 
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#6366f1',
      600: '#4f46e5',
      700: '#4338ca',
      800: '#3730a3',
      900: '#312e81',
      950: '#1e1b4b'
    },

    // Accent: Orange/Coral pour insights critiques
    accent: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ff6b6b',
      600: '#ef4444',
      700: '#dc2626',
      800: '#b91c1c',
      900: '#991b1b',
      950: '#7f1d1d'
    },

    // Success: Vert moderne saturé
    success: {
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981',
      600: '#059669',
      700: '#047857',
      800: '#065f46',
      900: '#064e3b',
      950: '#022c22'
    },

    // Warning: Amber pour alertes
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
      950: '#451a03'
    },

    // Error: Rouge moderne
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
      950: '#450a0a'
    },

    // Neutrals: Dark mode first
    neutral: {
      50: '#fafafa',
      100: '#f4f4f5',
      200: '#e4e4e7',
      300: '#d4d4d8',
      400: '#a1a1aa',
      500: '#71717a',
      600: '#52525b',
      700: '#3f3f46',
      800: '#27272a',
      900: '#18181b',
      950: '#09090b'
    }
  },

  // Typography Scale - Variable fonts
  typography: {
    fontFamily: {
      sans: ['Inter Variable', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono Variable', 'monospace']
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }]
    },
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900'
    }
  },

  // Spacing System - 8pt grid
  spacing: {
    0: '0px',
    px: '1px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem'
  },

  // Border Radius - Modernisé
  borderRadius: {
    none: '0px',
    sm: '0.125rem',
    DEFAULT: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
    full: '9999px'
  },

  // Shadows - Soft et profondeur
  boxShadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    none: 'none',
    // Glassmorphism shadows
    glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    glassStrong: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
  },

  // Animation & Transitions
  animation: {
    duration: {
      instant: '0ms',
      fast: '150ms',
      normal: '200ms',
      slow: '300ms',
      slower: '500ms'
    },
    easing: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      // Modern easing curves
      spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      emphasized: 'cubic-bezier(0.2, 0, 0, 1)'
    }
  },

  // Breakpoints - Mobile first
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },

  // Z-Index layers
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800
  }
} as const;

// Dark/Light theme variants
export const themeVariants = {
  light: {
    bg: {
      primary: designTokens.colors.neutral[50],
      secondary: designTokens.colors.neutral[100],
      tertiary: designTokens.colors.neutral[200],
      elevated: '#ffffff',
      glass: 'rgba(255, 255, 255, 0.7)'
    },
    text: {
      primary: designTokens.colors.neutral[900],
      secondary: designTokens.colors.neutral[700],
      tertiary: designTokens.colors.neutral[500],
      inverse: designTokens.colors.neutral[50]
    },
    border: {
      primary: designTokens.colors.neutral[200],
      secondary: designTokens.colors.neutral[300],
      strong: designTokens.colors.neutral[400]
    }
  },
  dark: {
    bg: {
      primary: '#0F172A',
      secondary: designTokens.colors.neutral[900],
      tertiary: designTokens.colors.neutral[800],
      elevated: designTokens.colors.neutral[800],
      glass: 'rgba(15, 23, 42, 0.7)'
    },
    text: {
      primary: designTokens.colors.neutral[50],
      secondary: designTokens.colors.neutral[300],
      tertiary: designTokens.colors.neutral[500],
      inverse: designTokens.colors.neutral[900]
    },
    border: {
      primary: designTokens.colors.neutral[800],
      secondary: designTokens.colors.neutral[700],
      strong: designTokens.colors.neutral[600]
    }
  }
} as const;