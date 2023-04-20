import React, { useEffect, useState } from "react";

import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useDB } from "../context";
import { FlatList } from "react-native";

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

const Record = styled.View`
  background-color: #000;
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
  border-radius: 10px;
`;

const Emotion = styled.Text`
  font-size: 20px;
  margin-right: 10px;
`;

const Message = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: 500;
`;

const Separator = styled.View`
  height: 10px;
`;

export const Home = ({ navigation: { navigate } }) => {
  const realm = useDB();
  const [feelings, setFeelings] = useState(realm.objects("Feeling"));
  useEffect(() => {
    const feelings = realm.objects("Feeling");
    feelings.addListener(() => {
      const feelings = realm.objects("Feeling");
      setFeelings(feelings);
    });
  }, []);
  return (
    <View>
      <Title>My Journal</Title>
      <FlatList
        data={feelings}
        keyExtractor={(feeling) => feeling._id + ""}
        ItemSeparatorComponent={<Separator />}
        contentContainerStyle={{ paddingVertical: 10 }}
        renderItem={({ item }) => (
          <Record>
            <Emotion>{item.emotion}</Emotion>
            <Message>{item.message}</Message>
          </Record>
        )}
      />
      <Button onPress={() => navigate("Write")}>
        <Ionicons name="add" color="tomato" size={40} />
      </Button>
    </View>
  );
};
