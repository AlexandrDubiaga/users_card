import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainScreen } from "../screens/MainScreen";
import { SettingsScreens } from "../screens/SettingsScreens";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { THEME } from "../theme";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Auth } from "../login/Auth";
import { Registration } from "../login/Registration";

const MainStack = createStackNavigator();
export const MainScreenNavigator = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor:
            Platform.OS === "android" ? THEME.MAIN_COLOR : "#fff",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <MainStack.Screen name="Main" component={MainScreen} />
    </MainStack.Navigator>
  );
};

const SettingsStack = createStackNavigator();
export const SettingsScreenNavigator = () => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? "#f4511e" : "#fff",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <SettingsStack.Screen name="Setting" component={SettingsScreens} />
    </SettingsStack.Navigator>
  );
};

const bottomTabsConfig =
  Platform.OS === "android"
    ? {
        activeTintColor: "#fff",
        style: {
          backgroundColor: THEME.MAIN_COLOR,
        },
      }
    : {
        activeTintColor: "black",
        style: {
          backgroundColor: THEME.MAIN_COLOR,
        },
      };

const Tab =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator()
    : createBottomTabNavigator();

export const MyTabs = () => {
  const OS =
    Platform.OS === "android"
      ? {
          activeTintColor: "#fff",
          barStyle: { backgroundColor: "THEME.MAIN_COLOR" },
        }
      : {
          tabBarOptions: {
            activeTintColor: THEME.MAIN_COLOR,
          },
        };
  return (
    <Tab.Navigator OS>
      <Tab.Screen
        name="MainScreen"
        component={MainScreenNavigator}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-home" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsScreen"
        component={SettingsScreenNavigator}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-settings" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const MainNavigator = createDrawerNavigator();

export const MainNavScreens = () => {
  return (
    <NavigationContainer>
      <MainNavigator.Navigator initialRouteName="Auth">
        <MainNavigator.Screen name="Auth" component={Auth} />
        <MainNavigator.Screen name="Registration" component={Registration} />
        <MainNavigator.Screen name="Main" component={MyTabs} />
      </MainNavigator.Navigator>
    </NavigationContainer>
  );
};
