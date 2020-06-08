import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Keyboard,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { THEME } from "../theme";
import { login, logout } from "../store/types";
import { useDispatch, useSelector } from "react-redux";
import { SplashScreen } from "../screens/SplashScreen";
export const Auth = ({ navigation }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => {
    return state.auth.token;
  });

  if (token) {
    navigation.navigate("Main");
  }
  const registration = () => {
    navigation.navigate("Registration");
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const pressHandllerr = () => {
    let check = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email && !password) {
      Alert.alert("Поля не могут быть пустыми!");
    } else if (!password) {
      Alert.alert("Поле password не может быть пустым!");
    } else if (!email) {
      Alert.alert("Поле email не может быть пустым!");
    } else if (password.length < 8) {
      Alert.alert("Длинна пароля не может быть меньше 8 символов");
    } else if (!check.test(email)) {
      Alert.alert("Не валидный email");
    } else {
      Keyboard.dismiss();
      const userData = {
        email: email,
        password: password,
      };
      setEmail("");
      setPassword("");
      dispatch(login(userData));
    }
  };

  const error = useSelector((state) => {
    return state.auth.error;
  });

  const isLoading = useSelector((state) => {
    return state.auth.isLoading;
  });
  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
        <View style={styles.wrapper}>
          <View style={styles.errorWrapper}>
            <Text style={styles.error}>{error}</Text>
          </View>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Авторизируйся</Text>
          </View>
          <TextInput
            value={email}
            placeholder={"Email"}
            onChangeText={setEmail}
            style={styles.input}
            autoCorrect={false}
            autoCapitalize={"none"}
            multilines
          />
          <TextInput
            value={password}
            placeholder={"Password"}
            onChangeText={setPassword}
            style={styles.input}
            autoCorrect={false}
            autoCapitalize={"none"}
            multilines
            secureTextEntry={true}
          />
          <View style={styles.buttonWrapper}>
            <View style={styles.buttonsContainer}>
              <Button
                style={styles.button}
                onPress={pressHandllerr}
                title={"Войти"}
              />
            </View>
            <View style={styles.buttonsContainer}>
              <Button
                style={styles.button}
                onPress={registration}
                title={"Регистрация"}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    flexDirection: "column",
    marginTop: 50,
    backgroundColor: "#E6E6FA",
    justifyContent:'center',
    alignItems:'center'
  },
  buttonsContainer: {
    marginBottom: 10
  },

  input: {
    width: "90%",
    borderBottomColor: THEME.MAIN_COLOR,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#FFF8DC",
    height:50
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "space-around",
    color: "#FF00FF",
  },
  titleWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonWrapper: {
    flexDirection: "column",
    marginTop: 20,
    marginVertical: 20,
    width:'90%'
  },
  error: {
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "space-around",
    color: "blue",
  },
  errorWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
