import React from "react";
import { StyleSheet } from "react-native";
import { MainNavScreens } from "./src/navigation/AppNavigation";
import { Provider } from "react-redux";
import { store } from "./src/store/index";

export default function App() {
  return (
    <Provider style={styles.container} store={store}>
      <MainNavScreens />
    </Provider>
  );
}

const styles = StyleSheet.create({});
