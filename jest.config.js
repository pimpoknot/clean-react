module.exports = {
    roots: ['<rootDir>/src'],
    collectCoverageFrom: [
        '<rootDir>/src/**/*.{ts,tsx}'
    ],
    coverageDirectory: 'coverage',
    testEnviroment: 'jsdom',
    transform:{
        '.+\\.ts|tsx': 'ts-jest'
    },
    moduleNameMapper:{
        '@/(.*)': '<rootDir>/src/$1'
    }
}