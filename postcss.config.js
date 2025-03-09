module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? {
      'cssnano': {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
          normalizeWhitespace: false,
          colormin: true,
          reduceIdents: true,
          mergeRules: true,
          zindex: false,
        }],
      },
      '@fullhuman/postcss-purgecss': {
        content: [
          './pages/**/*.{js,jsx,ts,tsx}',
          './components/**/*.{js,jsx,ts,tsx}',
          './app/**/*.{js,jsx,ts,tsx}',
        ],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: {
          standard: ['html', 'body', 'dark'],
          deep: [/^dark:/],
          greedy: [/^prose/, /^bg-/, /^text-/],
        },
      },
    } : {}),
  },
} 