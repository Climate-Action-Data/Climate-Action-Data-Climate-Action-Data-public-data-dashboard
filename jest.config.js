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
        // '^@/overmind$': '<rootDir>/src/overmind',
        // 'd3-color': '<rootDir>/node_modules/d3-color/dist/d3-color.min.js',
    },
    setupFiles: ["<rootDir>/src/@types/SetupTest.ts", "<rootDir>/src/i18n.ts"],
    transformIgnorePatterns: [
        // '<rootDir>/node_modules/(?!d3|d3-color)'
    ],
    coveragePathIgnorePatterns: [
        'node_modules',
        'src/overmind',
        'src/assets',
        'src/test/mock-data',
        'src/styles',
        "<rootDir>/src/app/layout.tsx",
        "<rootDir>/src/utils/Stickify.ts",
        "<rootDir>/src/i18n.ts",
        "<rootDir>/src/components/organisms/WatchlistProjects/WatchlistProjects.tsx",
        "<rootDir>/src/components/organisms/WatchlistProjects/WatchlistProjects.tsx",
        "<rootDir>/src/components/atoms/WatchlistCheckbox/WatchlistCheckbox.tsx",
        "<rootDir>/src/components/atoms/ProjectSearchHeadContent/ProjectSearchHeadContent.tsx",
        "<rootDir>/src/components/molecules/WatchlistMenu/WatchlistMenu.tsx",
        "<rootDir>/src/components/molecules/AddWatchlistPopup/AddWatchlistPopup.tsx",
        "<rootDir>/src/app/watchlist/all/page.tsx",
        "<rootDir>/src/app/watchlist/view/page.tsx",
        "<rootDir>/src/components/molecules/AuthenticationSection/AuthenticationSection.tsx",
        '<rootDir>/src/components/organisms/GeoMap/GeoMapDemo.tsx',
    ],
    collectCoverageFrom: ['<rootDir>/src/**', '!<rootDir>/src/**/@types/*', '!<rootDir>/src/**/*.snap'],
    testMatch: ['**/*.spec.tsx', '**/*.spec.ts'],
    reporters: [
        'default',
    ],
}
module.exports = createJestConfig(customJestConfig)