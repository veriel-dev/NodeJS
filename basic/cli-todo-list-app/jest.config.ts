/** @type {import('jest').Config} */
const config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [  
        "**/src/**/__tests__/**/*.test.ts",
        "**/src/**/*.spec.ts",
        "**/src/**/*.test.ts"
    ],
    transform: {
        '^.+\\.ts$': ['ts-jest', {
        tsconfig: 'tsconfig.test.json'
    }]
    },
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/dist/'
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    moduleFileExtensions: ['ts', 'js', 'json', 'node']
};

export default config;