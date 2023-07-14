const nextJest = require('next/jest')

const createJestConfig = nextJest({
    dir: './',
})

//Users/mederic/Workspace/cad/public-data-dashboard/node_modules/.pnpm/d3-color@3.1.0/node_modules/d3-color/src/index.js:1

const customJestConfig = {
    testEnvironment: 'jest-environment-jsdom',
    collectCoverage: true,
    moduleNameMapper: {
        '^d3-color$': '<rootDir>/node_modules/.pnpm/d3-color@3.1.0/node_modules/d3-color/dist/d3-color.min.js',
        // 'd3-color': '<rootDir>/node_modules/d3-color/dist/d3-color.min.js',
    },
    transformIgnorePatterns: [
        // '<rootDir>/node_modules/(?!d3|d3-color)'
    ],
    coveragePathIgnorePatterns: [
        'node_modules',
        'src/overmind',
        'src/assets',
        'src/styles',
        "<rootDir>/src/app/layout.tsx",
        "<rootDir>/src/i18n.ts",
        '<rootDir>/src/components/organisms/GeoMap/GeoMapDemo.tsx',
    ],
    collectCoverageFrom: ['<rootDir>/src/**', '!<rootDir>/src/**/@types/*', '!<rootDir>/src/**/*.snap'],
    testMatch: ['**/*.spec.tsx', '**/*.spec.ts'],
    reporters: [
        'default',
    ],
}
module.exports = createJestConfig(customJestConfig)