import React, {Component} from 'react'
import { View,
         Text,
         StyleSheet,
         Image,
         ScrollView,
         Linking,
         TouchableWithoutFeedback,
         Switch} from 'react-native'
import { Header, Icon, Card, ListItem, Button } from 'react-native-elements'
// import Icon from 'react-native-vector-icons/FontAwesome';
import environment from '../environment.js'
import { withNavigation } from 'react-navigation'
import deviceStorage from '../deviceStorage.js'


const styles = StyleSheet.create({
  container: {
      textDecorationColor:'black',
      color:'black',
      flex: 1,
      backgroundColor: 'white',
      resizeMode: 'stretch'
    },
})

class AdminConsole extends Component {
  constructor(props){
    super(props)
    this.state={
    }
  }

  componentDidMount(){
      deviceStorage.loadJWT('jwt')
      .then(key => fetchUsers(key))

      const fetchUsers = (key) =>{
        fetch(`http://${environment['BASE_URL']}/api/v1/users`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
             Accept: 'application/json',
             Authorization: `Bearer ${key}`
          }
        })
        .then(r=>r.json())
        .then((data)=>this.setState({users: data}))
      }
  }

  toCommentsPage = (item) =>{
    console.log('going to users page', item)
  }

  render(){
    return(
      <View style={styles.container}>
        <Header
          leftComponent={{
            icon: 'menu' ,
            color: 'black',
            onPress: () => this.props.navigation.openDrawer()}}
          centerComponent={{
            fontFamily:'Lobster',
            text: `Admin Console`,
            style: { color: 'black', fontSize: 25 } }}
          backgroundColor='white'
          containerStyle={{
             fontFamily:'Lobster',
             justifyContent: 'space-around',
           }}/>
          <ListItem
            title="Post"
            onPress={()=> { this.props.navigation.navigate('PostsPage')}}
          />
          <ListItem
            title="Users"
            onPress={()=> { this.props.navigation.navigate('UsersPage')}}
            />
      </View>
    )
  }

}



export default withNavigation(AdminConsole)
