# Getting Started

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

```sh
BURJXCRYPTOCLI/
├── src/
│   ├── components/
│   │   ├── MarketOverview/
│   │   │   ├── AllCoinListItem.tsx
│   │   │   ├── CoinListTab.tsx
│   │   ├── AllCoinsTab.tsx
│   │   ├── CoinListItem.tsx
│   │   ├── Text.tsx
│   ├── hooks/
│   ├── i18n/
│   │   └── en.ts
│   ├── navigation/
│   ├── screens/
│   │   ├── BiometricScreen.tsx
│   │   ├── CoinDetailScreen.tsx
│   │   └── MarketOverviewScreen.tsx
│   ├── services/
│   ├── theme/
│   │   ├── Colors.ts
│   │   └── Images.ts
│   ├── types/
│   │   └── coin.ts
│   └── utils/
│       └── formatters.ts
├── README.md
├── ... (other project files like package.json, tsconfig.json, etc.)
```

![Simulator Screenshot - iPhone 15 - 2025-04-26 at 17 11 23](https://github.com/user-attachments/assets/e4499289-ce30-4a8c-9dd3-84d8898daeab)

![Simulator Screenshot - iPhone 15 - 2025-04-26 at 17 11 48](https://github.com/user-attachments/assets/7ea403db-47c7-4b6c-9f2b-a273189ee3a0)
