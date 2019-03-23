import { Navigation } from "react-native-navigation";
import { primaryColor, primaryDarkColor } from '../utils/constant'
import IconM from 'react-native-vector-icons/MaterialIcons'
import { Icon } from "react-native-elements";
export const hideTopBar = (componentId) => {
    Navigation.mergeOptions(componentId, {
        topBar: {
            visible: false
        }
    })
}



export const openDrawer = (isOpen) => {
    Navigation.mergeOptions('sideDrawer', {
        sideMenu: {
        
            left: {
                visible: isOpen,
                enabled: true,
            }
        }
    })
}


export const goSearch = (componentId) => {
    Navigation.push(componentId, {
        component: {
            name: 'search',
            options: {
                sideMenu: {
                    left: {
                        visible: false,
                    }
                },
                bottomTabs: {
                    visible: false,
                },
                topBar: {
                    visible: false,
                    height: 0
                }
            }
        }
    })
}

export const goCastDetail = (componentId, item) => {
    Navigation.push(componentId, {
        component: {
            name: 'cast_detail',
            passProps: {
                cast: item
            },
            options: {
                topBar: {
                    background: {
                        color: primaryColor
                    },
                    drawBehind: false,
                    visible: true,

                    backButton: {
                        showTitle: false,
                        color: "white"
                    },
                    title: {
                        text: item.name,
                        alignment: 'fill',
                        color: 'white'
                    },

                },
                bottomTabs: {
                    visible: false
                }
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
                bottomTabs:{
                    visible :false
                },

                topBar: {
                    background: {
                        color: primaryColor
                    },
                    drawBehind: true,
                    visible: true,

                    backButton: {
                        showTitle: false,
                        color: "white"
                    },
                    title: {
                        text: data.title,
                        alignment: 'fill',
                        color: 'white'
                    },

                },
            
                // customTransition: {
                    
                //     animations: [
                //         {
                //             type: 'sharedElement',
                //             fromId: data.id.toString(),
                //             toId: 'detail_image',
                //             startDelay: 0,
                //             springVelocity: 0.2,
                //             duration: 0.5
                //         }
                //     ],
                //     duration: 0.8
                // },
                

            }
        }
    });
}

export const goCategory = () => Navigation.setRoot({
    root: {
        sideMenu: {
            options: {
                bottomTabs: {
                    visible: false
                }
            },
            id: 'sideDrawer',
            left: {
                component: {
                    name: 'slidebar'
                }
            },
            center: {
                component: {
                    name: "Categories",
                    options: {
                        bottomTabs: {
                            visible: false
                        }
                    }
                },
            },

        },

    }
})

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
                                                
                                                bottomTab: {
                                                    text: 'Series',
                                                    textColor: 'white',
                                                    fontSize: 12,
                                                    selectedTextColor: primaryDarkColor,
                                                    selectedIconColor: primaryDarkColor,
                                                    icon: {
                                                        uri: 'baseline_category_24'
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
                                            name: 'person',
                                            options: {
                                               
                                                bottomTab: {
                                                    text: 'Person',
                                                    fontSize: 12,
                                                    textColor: "white",
                                                    selectedTextColor: primaryDarkColor,
                                                    selectedIconColor: primaryDarkColor,
                                                    icon: {
                                                        uri: 'baseline_person_24'
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
        },

    }
}
);
