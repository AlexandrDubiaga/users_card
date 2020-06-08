import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ActivityIndicator,
} from "react-native";
import { THEME } from "../theme";
import { logout } from "../store/types";
import { useDispatch, useSelector } from "react-redux";
import { SplashScreen } from "./SplashScreen";
import { getCurrentUser } from "../store/types";
export const MainScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  dispatch(getCurrentUser());
  const token = useSelector((state) => {
    return state.auth.token;
  });
  const currentUser = useSelector((state) => {
    return state.auth.userData.user;
  });

  navigation.setOptions({
    headerRight: () => (
      <Button
        onPress={() => {
          dispatch(logout());
          navigation.navigate("Auth");
        }}
        title="logout"
        style={styles.logout}
      />
    ),
    title: "Home",
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: Platform.OS === "android" ? THEME.MAIN_COLOR : "#fff",
    },
    headerTintColor: Platform.OS === "android" ? "#fff" : THEME.MAIN_COLOR,
    headerTitleStyle: {
      fontWeight: "bold",
    },
    headerRightContainerStyle: {
      padding: 10,
      backgroundColor: "pink",
      borderRadius: 2,
    },
  });
  if(!token){
    <SplashScreen />
  }
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Hello, {currentUser.email}</Text>
      <Image source={{ uri: currentUser.avatar }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "blue",
  },
  title: {
    color: "red",
    fontSize: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
});
