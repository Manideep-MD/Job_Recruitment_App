import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {SCREENS} from '../constants/screenNames';

export const renderTabIcon = (
  route: any,
  focused: boolean,
  theme: any,
) => {
  let iconName = 'home';
  let IconComponent = Ionicons;

  switch (route.name) {
    case SCREENS.HOME:
      iconName = 'home';
      IconComponent = Octicons;
      break;
    case SCREENS.SAVED:
      iconName = 'cards-heart-outline';
      IconComponent = MaterialCommunityIcons;
      break;
    case SCREENS.ANALYTICS:
      iconName = 'analytics';
      IconComponent = MaterialIcons;
      break;
    case SCREENS.PROFILE:
      iconName = 'person-outline';
      IconComponent = Ionicons;
      break;
    default:
      iconName = focused ? 'home' : 'home-outline';
      IconComponent = Ionicons;
      break;
  }

  return (
    <IconComponent
      name={iconName}
      size={24}
      color={focused ? theme?.normalHover : theme.text}
    />
  );
};
