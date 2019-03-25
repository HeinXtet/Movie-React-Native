/**
 * @format
 */
import { Navigation, Constants } from "react-native-navigation";
import { register } from './routes/registerRoute'
import IconM from 'react-native-vector-icons/MaterialIcons';
import { primaryColor } from "./utils/constant";
register()



Navigation.events().registerAppLaunchedListener(() => {

  global.screenId = 'home'

  Navigation.setDefaultOptions({

    bottomTabs: {
      titleDisplayMode: 'alwaysShow',
      animate: false,
      drawBehind: false,
      backgroundColor: primaryColor
    }
    ,
    topBar: {
      visible: false,
      drawBehind: true,
      animate: false,
    },

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