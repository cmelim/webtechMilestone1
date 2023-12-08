module.exports = {
    preset: 'react-native',
    setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
    transformIgnorePatterns: [
      "node_modules/(?!(react-native|@react-native-community|@react-navigation|@react-native|react-navigation))"
    ],
    roots: ["<rootDir>/src"],
    testPathIgnorePatterns: ['/node_modules/', '/e2e/'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    transform: {
      '^.+\\.jsx?$': require.resolve('babel-jest'), 
    },
  };
  