module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.tsx', // Or your main entry file
    '!src/reportWebVitals.ts',
    '!src/setupTests.ts' // Or similar setup files
  ],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // if you have a setup file
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$ ': 'babel-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js', // if you have CSS modules or global CSS
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js', // for other static assets
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$ ',
    '^.+\\.module\\.(css|sass|scss)$ ',
  ],
  modulePaths: [],
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
    '^.+\\.module\\.(css|sass|scss)$ ': 'identity-obj-proxy',
    // Alias to match your tsconfig/jsconfig paths if you have them
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: [
    'web.js',
    'js',
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'json',
    'web.jsx',
    'jsx',
    'node',
  ],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  resetMocks: true,
}; 