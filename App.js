import React, { Component } from 'react';
import { Text,
         View,
         YellowBox,
         StyleSheet} from 'react-native'
import Login from './components/Login'
import Map from './components/Map'
import SignUp from './components/SignUp'
import SpotPage from './components/SpotPage'
import MySpots from './components/MySpots'
import Settings from './components/Settings'
import { createStackNavigator,
         createAppContainer,
         createDrawerNavigator,
         DrawerItems,} from 'react-navigation'; // Version can be specified in package.json
import { Provider } from 'react-redux';
import store from './store'
import { Button } from 'react-native-elements'
import SideMenu from './components/SideMenu.js'
import NewSpotPage from './components/NewSpotPage.js'
import LocationSelectorMap from './components/LocationSelectorMap.js'
import AdminConsole from './components/AdminConsole'
import CommentsPage from './childComponents/CommentsPage.js'
import UsersPage from './childComponents/UsersPage.js'
import PostsPage from './childComponents/PostsPage.js'
import Approvals from './childComponents/Approvals.js'
import ApprovalSpotPage from './childComponents/ApprovalSpotPage.js'



console.disableYellowBox = true;

const RootStack = createStackNavigator(
  {
    Login: {screen: Login},
    SignUp: {screen: SignUp},
    CommentsPage:{screen: CommentsPage},
    UsersPage:{screen: UsersPage},
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
      drawerLockMode:'locked-closed'
    }
  },
)

const Drawer = createStackNavigator(
  {
    Map: {screen: Map},
    'My Spots': {screen: MySpots},
    Settings: {screen: Settings},
    SpotPage: {screen: SpotPage},
    NewSpotPage: {screen: NewSpotPage},
    LocationSelectorMap: {screen: LocationSelectorMap},
    AdminConsole:{screen: AdminConsole},
    PostsPage:{screen: PostsPage},
    Approvals:{screen: Approvals},
    ApprovalSpotPage:{screen: ApprovalSpotPage},

  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  },
  {
    initialRouteName: 'Map',
  }
)


const HomeNavigationDrawer = createDrawerNavigator({
    RootStack: {screen: RootStack},
    Drawer: {screen: Drawer},
}, {
    contentComponent: SideMenu,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    drawerWidth: 250,
});


const PrimaryNav = createStackNavigator(
  {
    HomeNavigationDrawer: { screen: HomeNavigationDrawer }
  },
  {
  // Default config for all screens
  headerMode: 'none',
  title: 'Main',
  initialRouteName: 'HomeNavigationDrawer',
  gesturesEnabled: false
})


const AppContainer = createAppContainer(PrimaryNav)

class App extends Component {

  render(){
    return (
      <Provider store={ store }>
          <AppContainer/>
      </Provider>
     )
  }
}

export default App
