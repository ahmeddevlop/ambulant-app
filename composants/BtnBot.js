import { FAB } from "react-native-paper";
const BtbBot = () => {
  return (
    <FAB
      style={{
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 0,
      }}
      small
      icon="plus"
      onPress={() => console.log("Pressed")}
    />
  );
};

export default BtbBot;
