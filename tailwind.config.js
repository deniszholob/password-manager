module.exports = {
  purge: {
    enabled: process.env.TAILWIND_MODE === 'build',
    content: [
      './**/*.html',
    ]
  },
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {},
    // fill: theme => ({
    //   gray: theme('colors.trueGray'),
    //   red: theme('colors.red'),
    //   green: theme('colors.green'),
    //   blue: theme('colors.sky'),
    // })
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      backgroundColor: ['active'],
    }
  },
  plugins: [],
}
