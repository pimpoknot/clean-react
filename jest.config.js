module.exports = {
    roots: ['<rootDir>/src'],
    collectCoverageFrom: [
        '<rootDir>/src/**/*.{ts,tsx}',
        '!**/*.d.ts'
    ],
    coverageDirectory: 'coverage',
    testEnviroment: 'jsdom',
    transform:{
        '.+\\.ts|tsx': 'ts-jest'
    },
    moduleNameMapper:{
        '@/(.*)': '<rootDir>/src/$1',
        '\\.scss$': 'identity-obj-proxy'
    }
}