# React Native Development Environment Setup Guide

This guide covers how to set up your development environment for React Native on both macOS and Windows operating systems.

## Table of Contents
- [macOS Setup](#macos-setup)
- [Windows Setup](#windows-setup)
- [Common Issues and Troubleshooting](#common-issues-and-troubleshooting)
- [Additional Resources](#additional-resources)

## macOS Setup

### Prerequisites
1. **Xcode** (for iOS development)
   - Install from the Mac App Store
   - Install Xcode Command Line Tools:
     ```bash
     xcode-select --install
     ```

2. **Node.js & npm**
   - Install using Homebrew:
     ```bash
     brew install node
     ```

3. **Watchman**
   ```bash
   brew install watchman
   ```

4. **CocoaPods**
   ```bash
   sudo gem install cocoapods
   ```

### Installation Steps

1. **Install Expo CLI**
   ```bash
   npm install -g expo-cli
   ```

2. **Create a new project**
   ```bash
   npx create-expo-app YourProjectName
   ```

3. **Run the project**
   ```bash
   cd YourProjectName
   npm run ios     # For iOS
   npm run android # For Android
   ```
   or 
   ```bash
   npx expo start
   ```
   Then:
   - **Press** ```i``` to run on **iOS**
   - **Press** ```a``` to run on **Android**

## Windows Setup

### Prerequisites
1. **Node.js**
   - Download and install from [nodejs.org](https://nodejs.org/)

2. **Java Development Kit (JDK)**
   - Download and install JDK 11 or newer
   - Set JAVA_HOME environment variable

3. **Android Studio**
   - Download from [developer.android.com](https://developer.android.com/studio)
   - Install with:
     - Android SDK
     - Android SDK Platform
     - Android Virtual Device
   - Set ANDROID_HOME environment variable

### Installation Steps

1. **Configure Android SDK**
   - Open Android Studio
   - Install Android SDK Platform 31 (or latest)
   - Install Intel x86 Atom System Image
   - Install Android Emulator

2. **Install Expo CLI**
   ```bash
   npm install -g expo-cli
   ```

3. **Create a new project**
   ```bash
   npx create-expo-app YourProjectName
   ```

4. **Run the project**
   ```bash
   cd YourProjectName
   npm run android 
   ```
   or 
   ```bash
   npx expo start
   ```
   Then:
   - **Press** ```a``` to run on **Android**

## Common Issues and Troubleshooting

### macOS
- **iOS Build Failed**
  - Clean the build:
    ```bash
    cd ios && pod install && cd ..
    npx react-native run-ios --configuration Release
    ```

- **watchman error**
  - Reset watchman:
    ```bash
    watchman watch-del-all
    ```

### Windows
- **adb not found**
  - Add platform-tools to PATH
  - Restart command prompt

- **Gradle build failed**
  - Clean gradle:
    ```bash
    cd android
    ./gradlew clean
    cd ..
    ```

## Additional Resources

- [Official React Native Documentation](https://reactnative.dev/docs/environment-setup)
- [React Native Community](https://github.com/react-native-community)
- [React Native Troubleshooting Guide](https://reactnative.dev/docs/troubleshooting)

## License

This guide is available under the MIT License. Feel free to modify and distribute as needed.
