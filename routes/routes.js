import { Navigation } from "react-native-navigation";
import { primaryColor, primaryDarkColor } from '../utils/constant'
export const hideTopBar = (componentId) => {
    Navigation.mergeOptions(componentId, {
        topBar: {
            visible: false
        }
    })
}



export const openDrawer = () => {
    Navigation.mergeOptions('sideDrawer', {
        sideMenu: {
            openGestureMode: 'entireScreen',
            left: {
                visible: true,
                enabled: true,
            }
        }
    })
}

export const goDetail = (componentId, data) => {
    Navigation.push(componentId, {
        component: {
            name: 'detail',
            passProps: {
                payload: data
            },
            options: {
                customTransition: {
                    animations: [
                        {
                            type: 'sharedElement',
                            fromId:  data.id.toString(), toId: data.id.toString(),
                            startDelay: 0, springVelocity: 0.2, duration: 0.5
                        }
                    ],
                    duration: 0.8
                },
                topBar: {
                    backButton  :{
                        color : "white"
                    },
                    title: {
                        text:data.title,
                        alignment : 'fill',
                        color: 'white'
                    },
                }
            }
        }
    });
}


export const goMain = () => Navigation.setRoot({
    root: {
        sideMenu: {
            id: 'sideDrawer',
            left: {
                component: {
                    name: 'slidebar'
                }
            },
            center: {
                bottomTabs: {

                    id: 'BottomTabsId',
                    children: [
                        {
                            stack: {
                                id: 'Tabs',
                                children: [
                                    {
                                        component: {
                                            name: 'home',
                                            options: {
                                                topBar: {
                                                    visible: false,
                                                    height: 0
                                                },
                                                bottomTab: {
                                                    fontSize: 12,
                                                    text: 'Home',
                                                    selectedTextColor: primaryDarkColor,
                                                    selectedIconColor: primaryDarkColor,
                                                    textColor: 'white',
                                                    icon: {
                                                        uri: 'baseline_home_24'
                                                    }
                                                }
                                            }
                                        },
                                    },

                                ]
                            }
                        },
                        {
                            stack: {
                                id: 'Tabs2',
                                children: [
                                    {
                                        component: {
                                            name: 'series',
                                            options: {
                                                topBar: {
                                                    visible: false,
                                                    height: 0
                                                },
                                                bottomTab: {
                                                    text: 'Series',
                                                    textColor: 'white',
                                                    fontSize: 12,
                                                    selectedTextColor: primaryDarkColor,
                                                    selectedIconColor: primaryDarkColor,
                                                    icon: {
                                                        uri: 'baseline_search_24'
                                                    }
                                                }
                                            }
                                        },
                                    },
                                ]
                            }
                        },
                        {
                            stack: {
                                id: 'Tabs3',
                                children: [
                                    {
                                        component: {
                                            name: 'search',
                                            options: {
                                                topBar: {
                                                    visible: false,
                                                    height: 0
                                                },
                                                bottomTab: {
                                                    text: 'Search',
                                                    fontSize: 12,
                                                    textColor: "white",
                                                    selectedTextColor: primaryDarkColor,
                                                    selectedIconColor: primaryDarkColor,
                                                    icon: {
                                                        uri: 'baseline_home_24'
                                                    }
                                                }
                                            }
                                        },
                                    },
                                ]
                            }
                        },
                    ],
                },
            }
        }
    }
}
);
