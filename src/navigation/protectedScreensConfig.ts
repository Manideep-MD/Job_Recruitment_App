import { useSelector } from 'react-redux';
import {SCREENS} from '../constants/screenNames';
import Expertise from '../screens/Expertise/Expertise';
import JobCategory from '../screens/JobCategory/JobCategory';
import ProfileDetails from '../screens/ProfileDetails/ProfileDetails';
import BottomTabNavigation from './BottomTabNavigation';



export const protectedScreensConfig = [
  {name: SCREENS.BOTTOM_TAB, component: BottomTabNavigation},
];
