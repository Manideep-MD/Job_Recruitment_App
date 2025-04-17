import {SCREENS} from '../constants/screenNames';
import SignIn from '../screens/SignIn/SignIn';
import SignUp from '../screens/SignUp/SignUp';
import Welcome from '../screens/Welcome/Welcome';

export const authScreensConfig = [
  {name: SCREENS.WELCOME, component: Welcome},
  {name: SCREENS.LOGIN, component: SignIn},
  {name: SCREENS.REGISTER, component: SignUp},
];
