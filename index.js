/**
 * @format
 */
import { Navigation } from "react-native-navigation";
import { register } from './routes/registerRoute'
import IconM from 'react-native-vector-icons/MaterialIcons';
import { primaryColor } from "./utils/constant";
register()

Navigation.events().registerAppLaunchedListener(() => {

  Navigation.setDefaultOptions({
    topBar: {
      background: {
        color: primaryColor
      },
    },
    bottomTabs: {
      titleDisplayMode: 'alwaysShow',
      animate: false,
      drawBehind: true,
      backgroundColor: primaryColor
    }
  })

  Navigation.setRoot({
    root: {
      stack: {
        id: 'react-movie',
        children: [
          {
            component: {
              name: 'welcome',
            }
          }
        ]
      },
    }
  });
});