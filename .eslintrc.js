module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: [
        'next/core-web-vitals',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended'
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        'no-multi-spaces': 'error',
        'react-hooks/exhaustive-deps': 'off',
        '@typescript-eslint/array-type': 'error',
        '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
        '@typescript-eslint/quotes': ['error', 'backtick'],
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'no-magic-numbers': [
            'error',
            {
                ignore: [1, 0],
            },
        ],
        'no-multiple-empty-lines': [
            'error',
            {
                max: 1,
                maxEOF: 1,
            },
        ],
        'no-trailing-spaces': 'error',
        curly: 2,
    },
    overrides: [
        {
            files: ['*/**/@types/*.ts'],
            rules: {
                '@typescript-eslint/no-unused-vars': 'off',
            },
        },
    ],
}
