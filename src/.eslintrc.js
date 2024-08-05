module.exports = {
    root: true,
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:prettier/recommended',
    ],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: 'module',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      "prettier/prettier": [
        "error",
        {
          "endOfLine": "auto"
        },
      ],
    },
  };
  