module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.dev.json'],
    sourceType: 'module',
  },
  ignorePatterns: [
    '/lib/**/*', // Ignore built files.
  ],
  plugins: [
    '@typescript-eslint',
    'import',
  ],
  rules: {
    'callback-return': [
      'error', ['done', 'proceed', 'next', 'onwards', 'callback', 'cb'],
    ],
    'camelcase': ['off', {
      'properties': 'always',
    }],
    'complexity': ['error', 200],
    'comma-style': ['warn', 'last'],
    'curly': ['error'],
    'eqeqeq': ['error', 'always'],
    'eol-last': ['warn'],
    'no-undef': 2,
    'handle-callback-err': ['off'],
    'arrow-body-style': ['off', 2],
    'indent': ['off', 2],
    'linebreak-style': ['error', 'unix'],
    'no-dupe-keys': ['error'],
    'no-duplicate-case': ['error'],
    'no-extra-semi': ['warn'],
    'no-labels': ['error'],
    'no-mixed-spaces-and-tabs': [2, 'smart-tabs'],
    'no-redeclare': ['warn'],
    'no-return-assign': ['error', 'always'],
    'no-sequences': ['error'],
    'no-trailing-spaces': ['warn'],
    'no-unexpected-multiline': ['warn'],
    'no-unreachable': ['warn'],
    'no-magic-numbers': ['off'],
    'max-params': ['off'],
    'max-len': ['off'],
    'max-nested-callbacks': ['off'],
    'max-statements': ['off'],
    'new-cap': ['off'],
    'consistent-this': ['error', 'that'],
    'consistent-return': ['off'],
    'no-unused-vars': [
      'off',
      {
        'caughtErrors': 'all',
        'caughtErrorsIgnorePattern': '^unused($|[A-Z].*$)',
      },
    ],
    'no-use-before-define': ['error', {
      'functions': false,
    }],
    'no-var': 2,
    'one-var': ['warn', 'never'],
    'prefer-arrow-callback': ['warn', {
      'allowNamedFunctions': true,
    }],
    'object-curly-spacing': ['error', 'always'],
    'quotes': [
      'warn',
      'single',
      {
        'avoidEscape': false,
        'allowTemplateLiterals': true,
      },
    ],
  },
};
