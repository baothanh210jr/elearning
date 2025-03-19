const errorOrWarn = 'warn';

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  extends: [
    '@antfu',
    '@unocss',
    'eslint-config-prettier',
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    '@nuxtjs/eslint-config-typescript'
  ],
  plugins: ['simple-import-sort', 'import'],
  rules: {
    semi: [2, 'always'],
    indent: ['error', 2, { SwitchCase: 1 }],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/order': 'off',
    'sort-imports': 'off',
    // Config syntax of vue file is template -> script -> style
    'vue/block-order': [
      'error',
      {
        order: [['template', 'script'], 'style']
      }
    ],
    '@typescript-eslint/typedef': [
      'error',
      {
        arrowParameter: false,
        variableDeclaration: false,
        arrayDestructuring: false,
        parameter: false,
        propertyDeclaration: false,
        variableDeclarationIgnoreFunction: false
      }
    ],
    '@stylistic/ts/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false
        },
        multilineDetection: 'brackets'
      }
    ],
    // Turn off this rules config because this have conflict with nuxt syntax
    'vue/multi-word-component-names': 'off',
    'vue/attribute-hyphenation': ['error', 'never', { ignore: [] }],
    'vue/v-on-event-hyphenation': ['error', 'never', { ignore: [] }],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/no-setup-props-destructure': 'error',
    'vue/max-attributes-per-line': ['error', { singleline: { max: 2 }, multiline: { max: 1 } }], // setting max line attributes of html is 2 when single line, if attributes have 3 break one line is one attribute
    '@typescript-eslint/no-unused-vars': errorOrWarn, // change to warning because some time we use like interface for a function (e.g: async function onRequest(context: FetchContext) {})
    'vue/no-multiple-template-root': 'off', // Vue 3 can use multiple root
    '@typescript-eslint/no-inferrable-types': 'off',
    'require-await': 'off', // Conflict with service defineNuxtPlugin of Nuxt
    'no-console': 'warn', // Warning if code had a console
    'arrow-parens': 'off', // Agree use brace in arrow function (e.g: arr.find((item) => item.id))
    'antfu/top-level-function': 'off', // disable auto fix normal function to arrow function
    'no-unsafe-optional-chaining': 'off', // Disable unsafe usage of optional chaining (e.g: exampleString || exampleObject?.locale?.defaultLocale)
    'eslint-comments/no-unlimited-disable': 'off', // Disable when write Regex (e.g: /(-?[\.\d]+)rem/g;)
    'comma-dangle': 'off',
    '@stylistic/ts/brace-style': 'off',
    '@stylistic/js/operator-linebreak': 'off',
    '@stylistic/ts/indent': 'off',
    'n/prefer-global/process': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off'
  }
};
