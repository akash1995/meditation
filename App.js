// import React from 'react';
// import {StyleSheet, View, StatusBar} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import PlayerScreen from './src/PlayerScreen';

// export default function App() {
//   return (
//     <LinearGradient
//       style={styles.container}
//       colors={['#f4f4f2', '#17394e', '#17394e']}>
//       {/* <StatusBar barStyle="light-content" backgroundColor="#030303" /> */}
//       <PlayerScreen />
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: '#fff',
//     // alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
import React, {Component} from 'react';
import {View} from 'react-native';
import AppNavigation from './src/navigator';
export default class App extends Component {
  async componentDidMount() {
    console.disableYellowBox = true;
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <AppNavigation />
      </View>
    );
  }
}
