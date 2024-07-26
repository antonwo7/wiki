module.exports = {
  content: ["./src/**/*.{tsx,ts}"],
  theme: {
    extend: {},
    container: {
      center: true,
    },
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}