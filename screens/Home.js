import React from "react";

import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

const View = styled.View`
  flex: 1;
  background-color: tomato;
  padding: 100px 30px 0px;
`;

const Title = styled.Text`
  color: #fff;
  font-size: 40px;
  margin-bottom: 100px;
`;

const Button = styled.TouchableOpacity`
  position: absolute;
  bottom: 50px;
  right: 50px;
  height: 80px;
  width: 80px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const ButtonText = styled.Text``;

export const Home = ({ navigation: { navigate } }) => {
  return (
    <View>
      <Title>My Journal</Title>
      <Button onPress={() => navigate("Write")}>
        <Ionicons name="add" color="tomato" size={40} />
      </Button>
    </View>
  );
};
