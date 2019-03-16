/**
 * @format
 */
import { Navigation } from "react-native-navigation";
import { register } from './routes/registerRoute'
import IconM from 'react-native-vector-icons/MaterialIcons';
register()

Navigation.events().registerAppLaunchedListener(() => {

  Navigation.setDefaultOptions({
    topBar: {
      background: {
        color: 'red'
      },
    },
    bottomTabs: {
      titleDisplayMode: 'alwaysShow',
      animate: false,
      drawBehind: true,
      backgroundColor: 'red'
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