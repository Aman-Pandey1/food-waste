module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-gesture-handler|react-native-vector-icons|react-native-linear-gradient|react-native-screens|react-native-safe-area-context|firebase|@firebase)/)'
  ],
  moduleNameMapper: {
    '^react-native-vector-icons/(.*)$': '<rootDir>/__mocks__/react-native-vector-icons.js'
  },
};
