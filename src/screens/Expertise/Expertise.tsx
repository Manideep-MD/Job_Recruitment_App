import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useCustomTheme} from '../../theme/ThemeContext';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../constants/screenNames';
import {Checkbox} from 'react-native-ui-lib';
import { createStyles } from './style';

const Expertise: React.FC = () => {
  const {theme} = useCustomTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<any>();
  const [business, setBusiness] = useState<boolean>(false);
  const [communication, setCommunication] = useState<boolean>(false);
  const [design, setDesign] = useState<boolean>(false);
  const [development, setDevelopment] = useState<boolean>(false);

  const handleSubmit = () => {
    navigation.navigate(SCREENS.PROFILE_DETAILS, {routeName: 'expertise'});
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.expertText}>What is your field of expertise ?</Text>
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.subHeading}>
          please select your field of expertise (up to 2)
        </Text>
      </View>
      <View style={{padding: 10}}>
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={business}
            onValueChange={setBusiness}
            color={theme.checkboxColor}
            label="Business"
            labelStyle={styles.labelText}
          />
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={communication}
            onValueChange={setCommunication}
            color={theme.checkboxColor}
            label="Communication"
            labelStyle={styles.labelText}
          />
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={design}
            onValueChange={setDesign}
            color={theme.checkboxColor}
            label="Design"
            labelStyle={styles.labelText}
          />
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={development}
            onValueChange={setDevelopment}
            color={theme.checkboxColor}
            label="Development"
            labelStyle={styles.labelText}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.btnText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Expertise;


