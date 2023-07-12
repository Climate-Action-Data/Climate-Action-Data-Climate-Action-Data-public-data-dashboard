const nextJest = require('next/jest')

const createJestConfig = nextJest({
    dir: './',
})

const customJestConfig = {
    testEnvironment: 'jest-environment-jsdom',
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.ts'
    ],
    coveragePathIgnorePatterns: [
        'node_modules',
        'src/overmind',
        'src/assets'
    ],
    coverageDirectory: '<rootDir>/coverage/',
    testMatch: ['**/*.spec.tsx', '**/*.spec.ts'],
    reporters: [
        'default',
        ['jest-sonar', {
            outputDirectory: '<rootDir>/coverage',
            outputName: 'test-report.xml'
        }]
    ],
}
module.exports = createJestConfig(customJestConfig)