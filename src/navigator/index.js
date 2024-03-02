import 'react-native-gesture-handler';
import {Animated, Easing} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {SplashScreen, HomeScreen, PlayerScreen, DetailScreen} from './route';

import {Matrics} from '../common/styles';

const transitionFadeIn = (index, position) => {
  const inputRange = [index - 1, index, index + 1];
  const opacity = position.interpolate({
    inputRange,
    outputRange: [0.5, 1, 1],
  });

  const scaleY = position.interpolate({
    inputRange,
    outputRange: [0.5, 1, 1],
  });

  return {
    opacity,
    transform: [{scaleY}],
  };
};

const transitionFromBottom = (index, layout, position) => {
  const {initHeight} = layout;

  const translateY = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [initHeight, 0, 0],
  });

  const opacity = position.interpolate({
    inputRange: [index - 1, index - 0.99, index],
    outputRange: [0, 1, 1],
  });

  return {opacity, transform: [{translateY}]};
};

const transitionFluid = (index, position) => {
  const inputRange = [index - 1, index, index + 1];
  const opacity = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1],
  });

  const scale = position.interpolate({
    inputRange: [0, 0.01, 0.99, 1],
    outputRange: [0.3, 0.3, 1, 1],
  });

  const translateX = position.interpolate({
    inputRange,
    outputRange: [Matrics.screenWidth - 20, 0, 0],
  });

  const translateY = position.interpolate({
    inputRange,
    outputRange: [Matrics.screenWidth - 40, 0, 0],
  });

  return {
    opacity,
    transform: [{scale}, {translateX}, {translateY}],
  };
};

const transitionConfig = () => ({
  transitionSpec: {
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
    useNativeDriver: true,
  },
  screenInterpolator: sceneProps => {
    const {layout, position, scene} = sceneProps;
    const {index, route} = scene;

    const width = layout.initWidth;
    const translateX = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [width, 0, 0],
    });

    const opacity = position.interpolate({
      inputRange: [index - 1, index - 0.99, index],
      outputRange: [0, 1, 1],
    });
    const params = route.params || {}; // <- That's new
    const transition = params.transition || 'default'; // <- That's new
    return {
      transitionFromBottom: transitionFromBottom(index, layout, position),
      fadeInTransition: transitionFadeIn(index, position),
      fluidTransition: transitionFluid(index, position),
      default: {opacity, transform: [{translateX}]},
    }[transition];
  },
});

const AppNavigation = createStackNavigator(
  {
    SplashScreen: {
      screen: SplashScreen,
      navigationOptions: {
        header: null,
      },
    },

    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        headerShown: false,
      },
    },

    PlayerScreen: {
      screen: PlayerScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    DetailScreen: {
      screen: DetailScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    navigationOptions: {
      gestureEnabled: false,
      headerVisible: false,
    },
    headerMode: 'screen',
    transitionConfig,
  },
);

export default createAppContainer(AppNavigation);
