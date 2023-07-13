const nextJest = require('next/jest')

const createJestConfig = nextJest({
    dir: './',
})

const customJestConfig = {
    testEnvironment: 'jest-environment-jsdom',
    collectCoverage: true,
    coveragePathIgnorePatterns: [
        'node_modules',
        'src/overmind',
        'src/assets',
        "<rootDir>/src/app/layout.tsx",
    ],
    collectCoverageFrom: ['<rootDir>/src/**', '!<rootDir>/src/**/@types/*', '!<rootDir>/src/**/*.snap'],
    testMatch: ['**/*.spec.tsx', '**/*.spec.ts'],
    reporters: [
        'default',
    ],
}
module.exports = createJestConfig(customJestConfig)