import { useContext, useState } from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import { DBContext } from "../context";

const View = styled.View`
  background-color: tomato;
  flex: 1;
  padding: 0px 30px;
`;

const Title = styled.Text`
  color: #fff;
  margin: 50px 0px;
  text-align: center;
  font-size: 30px;
  font-weight: 500;
`;

const TextInput = styled.TextInput`
  background-color: #fff;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 18px;
`;

const Button = styled.TouchableOpacity`
  width: 100%;
  margin-top: 30px;
  background-color: #000;
  padding: 10px 20px;
  align-items: center;
  border-radius: 20px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-wiehgt: 500;
  font-size: 20px;
`;

const Emotions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Emotion = styled.TouchableOpacity`
  background-color: #fff;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 10px;
  overflow: hidden;
  border-width: ${(props) => (props.selected ? "2px" : "0px")};
  box-sizing: border-box;
`;

const EmotionText = styled.Text`
  font-size: 24px;
`;

export const Write = () => {
  const realm = useContext(DBContext);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const emotions = ["😅", "🥹", "🥰", "😎", "😵‍💫", "😏"];
  const onEmtionPress = (icon) => setSelectedEmotion(icon);

  const [feelings, setFeelings] = useState("");
  const onChangeText = (text) => {
    setFeelings(text);
  };

  const onSubmit = () => {
    if (feelings === "" || selectedEmotion === null) {
      return Alert.alert("Please complete form");
    }

    realm.write(() => {
      const feeling = realm.create("Feeling", {
        _id: Date.now(),
        emotion: selectedEmotion,
        message: feelings,
      });
      console.log(feeling);
    });
    setSelectedEmotion(null);
    setFeelings("");
  };
  return (
    <View>
      <Title>How do you feel today?</Title>
      <Emotions>
        {emotions.map((p, i) => (
          <Emotion
            selected={p === selectedEmotion}
            onPress={() => onEmtionPress(p)}
            key={i}
          >
            <EmotionText>{p}</EmotionText>
          </Emotion>
        ))}
      </Emotions>
      <TextInput
        returnKeyType="Save"
        onSubmitEditing={onSubmit}
        value={feelings}
        onChangeText={onChangeText}
        placeholder="Write Your Feelings"
      />
      <Button>
        <ButtonText>Save</ButtonText>
      </Button>
    </View>
  );
};
