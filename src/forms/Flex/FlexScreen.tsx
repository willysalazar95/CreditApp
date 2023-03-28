import React from "react";
import { Text, View } from "react-native";
function FlexScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Flex</Text>
    </View>
  );
}
export default FlexScreen;
