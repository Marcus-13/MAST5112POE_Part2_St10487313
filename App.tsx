import React from 'react';
import AppNavigator from './src/navigation/AppNavigation';

// main App component (the root entry point of the entire React Native app)
// the first component that gets mounted when the app starts
export default function App() {
  return <AppNavigator />;
}


// App.tsx acts as a simple wrapper that delegates all functionality to AppNavigation.tsx
// This keeps the root component clean and separates navigation concerns 