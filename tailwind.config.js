const {
  colors
} = require('tailwindcss/defaultTheme')

module.exports = {
  purge: false, // purgecss is configured in postcss.purge.js
  theme: {
    filter: {
      // defaults to {}
      none: 'none',
      grayscale: 'grayscale(1)',
      invert: 'invert(1)',
      sepia: 'sepia(1)',
    },
    backdropFilter: {
      // defaults to {}
      none: 'none',
      blur: 'blur(5px)',
    },
    spacing: {
      px: '1px',
      '0': '0',
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.75rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '8': '2rem',
      '10': '2.5rem',
      '12': '3rem',
      '14': '3.5rem',
      '16': '4rem',
      '20': '5rem',
      '24': '6rem',
      '26': '6.5rem',
      '28': '7rem',
      '30': '7.5rem',
      '32': '8rem',
      '40': '10rem',
      '48': '12rem',
      '56': '14rem',
      '64': '16rem',
      '72': '18rem',
      '80': '20rem',
      '88': '22rem',
      '96': '24rem',
      '104': '28rem',
      '112': '30rem',
      '120': '32rem',
      '128': '34rem',
      '136': '36rem',
      '144': '38rem',
      '152': '40rem',
      '160': '42rem',
      '168': '44rem',
      '176': '46rem',
      '184': '48rem',
      '192': '50rem',
      '200': '52rem',
      '208': '54rem',
      '216': '56rem',
      '224': '58rem',
      '232': '60rem',
      '240': '62rem',
      '248': '64rem',
      '256': '66rem',
    },
    maxWidth: {
      xs: '20rem',
      sm: '24rem',
      md: '28rem',
      lg: '32rem',
      xl: '36rem',
      '2xl': '42rem',
      '3xl': '48rem',
      '4xl': '56rem',
      '5xl': '64rem',
      '6xl': '72rem',
      '7xl': '80rem',
      '8xl': '88rem',
      '9xl': '96rem',
      '10xl': '104rem',
      '11xl': '112rem',
      '12xl': '120rem',
      '13xl': '128rem',
      '14xl': '136rem',
      '15xl': '144rem',
      '16xl': '152rem',
      full: '100%',
    },
    opacity: {
      '0': '0',
      '25': '0.25',
      '50': '0.5',
      '75': '0.75',
      '90': '0.9',
      '95': '0.95',
      '100': '1',
    },
    zIndex: {
      auto: 'auto',
      '0': '0',
      '10': '10',
      '20': '20',
      '30': '30',
      '40': '40',
      '50': '50',
      '60': '60',
      '70': '70',
      '80': '80',
      '90': '90',
      '100': '100',
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      default: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.625rem',
      '2xl': '0.75rem',
      '3xl': '0.875rem',
      '4xl': '1rem',
      full: '9999px',
    },

    extend: {
      top: {
        '14': '3.5rem',
        '16': '4rem',
      },
      inset: {
        '14': '3.5rem',
        '16': '4rem'
      }
    },
  },
  variants: {
    filter: ['responsive'], // defaults to ['responsive']
    backdropFilter: ['responsive'], // defaults to ['responsive']
  },
  plugins: [require('tailwindcss-filters')],
}