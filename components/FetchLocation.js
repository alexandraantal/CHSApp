import React from "react";
import { Text } from "react-native";

import { Button } from "native-base";

const fetchLocation = props => {
  return (
    <Button
      full
      rounded
      style={{
        marginTop: 40,
        marginHorizontal: 50,
        backgroundColor: "#6D98BA"
      }}
      onPress={props.onGetLocation}
    >
      <Text style={{ color: "white" }}>Get Location</Text>
    </Button>
    
  );
};

export default fetchLocation;
