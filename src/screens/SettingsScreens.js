import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { THEME } from "../theme";
import { useDispatch, useSelector } from "react-redux";

export const SettingsScreens = ({ navigation }) => {
  const dispatch = useDispatch();
  
  navigation.setOptions({
    title: "Settings",
    headerStyle: {
      backgroundColor: Platform.OS === "android" ? THEME.MAIN_COLOR : "#fff",
    },
    headerTintColor: Platform.OS === "android" ? "#fff" : THEME.MAIN_COLOR,
    headerTitleStyle: {
      fontWeight: "bold",
    },
    headerTitleAlign: "center",
  });
  const user = useSelector((state) => {
    return state.auth.currentUser;
  });

  return (
    <View style={styles.center}>
      <Text style={styles.profileTitle}>USER PROFILE</Text>
      <Text style={styles.descriptionUser}>User_id: {user.id}</Text>
      <Text style={styles.descriptionUser}>Email: {user.email}</Text>
      <Text style={styles.descriptionUser}>User created: {user.created_at}</Text>
      <Text style={styles.descriptionUser}>User lang: {user.locale}</Text>
      <Image source={{ uri: user.avatar }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    color: "blue",
  },
  image: {
    width: "50%",
    height: 70,
  },
  profileTitle:{
    fontSize:20,
    fontWeight:'bold',
    textDecorationLine:'underline'
  },
  descriptionUser:{
    fontSize:17,
    paddingBottom:10
  }
});
