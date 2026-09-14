#Sticklers Mobile App

A mobile restaurant ordering app built with React Native, Expo, and Firebase. The app simulates the ordering process with scheduling pickup, browsing menu, customizing 
items, managing the cart, and creating and editing the user's profile.

> Note: This project is a personal application built for demonstration and learning purposes. It is not affiliated with or intended for commercial use by the restaurant.

##Features:
- User authentication with Firebase (Register, Sign In, Log Out, etc)
- Browsing menu options fetched from Firebase
- Customizing menu items
- Add, remove, update items in cart
- Local caching to reduce Firebase reads
- Customize and view profile details

##Tech Stack
- React Native
- Expo
- Expo Router
- TypeScript
- Firebase Authentication
- Cloud Firestore
- AsyncStorage

##Getting Started
Prerequisites
- Node.js
- npm
- Expo CLI / Expo development tools
- Android Studio or an Android device for testing

##Installation
Clone the repository and install the dependencies:
```
git clone https://github.com/daybreak101/sticklers.git
cd sticklers
cd sticklersApp
npm install
```
To start the Expo development server:
```
npx expo start
```
The application can then be opened using an Android emulator or compatible device.
