import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";

import { Navigator } from "./navigator/Tabs";

export default function App() {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
}
