import React, {Component} from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import fonts from './common/assets/fonts';
import LottieView from 'lottie-react-native';
import SvgIcon from './common/assets/images/SvgIcon';
import {NavigationActions} from 'react-navigation';
export default class SplashScreen extends Component {
  state = {
    spinner: false,
  };

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.replace('HomeScreen');
    }, 3000);
  }
  navigateToScreen(route) {
    // this.props.navigation.replace('HomeScreen');
    const navigateAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: route})],
    });
    this.props.navigation.dispatch(navigateAction);
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
        }}>
        <Text
          style={{
            fontFamily: fonts.type.FredokaOne,
            fontSize: 40,
            color: '#333',
            textAlign: 'left',
          }}>
          Meditation
        </Text>
        <LottieView
          style={{width: 920, height: 400}}
          source={require('./common/assets/images/files/yoga.json')}
          loop
          autoPlay
        />
      </View>
    );
  }
}
