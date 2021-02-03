module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['prettier', 'prettier/react'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'linebreak-style': ['error', 'unix'],
    'react/jsx-uses-vars': 2,
    'react/jsx-uses-react': 2,
    'prettier/prettier': [
      'warn',
      {
        printWidth: 100,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: true,
        quoteProps: 'as-needed',
        trailingComma: 'all',
        bracketSpacing: true,
        arrowParens: 'avoid',
        endOfLine: 'lf',
      },
    ],
  },
};
