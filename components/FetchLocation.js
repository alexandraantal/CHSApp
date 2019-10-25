import React from "react";
import { Button } from "react-native";

const fetchLocation = props => {
  return (
    <Button
      title="Get Location"
      //   style={styles.buttonStyle}
      onPress={props.onGetLocation}
    />
  );
};

export default fetchLocation;

// const styles = StyleSheet.create({
//   buttonStyle: {
//     marginTop: 40
//   }
// });
