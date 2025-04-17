import { StyleSheet } from "react-native";

const createStyle = () => {

    return StyleSheet.create({
        overlay: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        loaderContainer: {
          width: 150,
          padding: 20,
          backgroundColor: 'white',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        },
        text: {
          marginTop: 10,
          fontSize: 16,
          color: '#000',
        },
      })
   
}

export default createStyle